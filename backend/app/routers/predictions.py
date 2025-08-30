"""
Predictions API router for Water Hyacinth Prediction API.
"""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
import logging

from ..database import get_db
from ..models import Prediction
from ..schemas import PredictionCreate, PredictionResponse, PredictionResult
from ..ml_service import ml_service
from ..llm_service import llm_service

logger = logging.getLogger(__name__)

router = APIRouter()

@router.post("/predict", response_model=PredictionResponse)
async def create_prediction(
    prediction_data: PredictionCreate,
    db: Session = Depends(get_db)
):
    """
    Create a new prediction based on environmental data.

    This endpoint:
    1. Validates input data
    2. Makes ML predictions
    3. Generates AI insights
    4. Stores results in database
    5. Returns complete prediction response
    """
    try:
        # Convert Pydantic model to dict
        input_dict = prediction_data.dict()

        # Make ML prediction
        logger.info(f"Making prediction for location: {prediction_data.latitude}, {prediction_data.longitude}")
        ml_result = ml_service.predict(input_dict)

        # Generate AI insights
        insights = llm_service.generate_insights({**input_dict, **ml_result})

        # Create database record
        db_prediction = Prediction(
            **input_dict,
            infestation_risk=ml_result["infestation_risk"],
            biomass_growth=ml_result["biomass_growth"],
            insights=insights
        )

        db.add(db_prediction)
        db.commit()
        db.refresh(db_prediction)

        logger.info(f"Prediction created successfully with ID: {db_prediction.id}")

        return db_prediction

    except Exception as e:
        logger.error(f"Prediction creation failed: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")

@router.get("/predictions", response_model=List[PredictionResponse])
async def get_predictions(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    """
    Get list of predictions with pagination.

    Args:
        skip: Number of records to skip
        limit: Maximum number of records to return
    """
    try:
        predictions = db.query(Prediction).offset(skip).limit(limit).all()
        return predictions

    except Exception as e:
        logger.error(f"Failed to retrieve predictions: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to retrieve predictions")

@router.get("/predictions/{prediction_id}", response_model=PredictionResponse)
async def get_prediction(
    prediction_id: int,
    db: Session = Depends(get_db)
):
    """
    Get a specific prediction by ID.
    """
    try:
        prediction = db.query(Prediction).filter(Prediction.id == prediction_id).first()
        if prediction is None:
            raise HTTPException(status_code=404, detail="Prediction not found")
        return prediction

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Failed to retrieve prediction {prediction_id}: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to retrieve prediction")

@router.get("/predictions/recent/{limit}")
async def get_recent_predictions(
    limit: int = 10,
    db: Session = Depends(get_db)
):
    """
    Get recent predictions ordered by timestamp.
    """
    try:
        predictions = (
            db.query(Prediction)
            .order_by(Prediction.timestamp.desc())
            .limit(limit)
            .all()
        )
        return predictions

    except Exception as e:
        logger.error(f"Failed to retrieve recent predictions: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to retrieve recent predictions")

@router.get("/analytics/summary")
async def get_prediction_summary(db: Session = Depends(get_db)):
    """
    Get summary statistics of predictions.
    """
    try:
        total_predictions = db.query(Prediction).count()

        risk_counts = db.query(
            Prediction.infestation_risk,
            db.func.count(Prediction.id)
        ).group_by(Prediction.infestation_risk).all()

        avg_biomass = db.query(db.func.avg(Prediction.biomass_growth)).scalar()

        return {
            "total_predictions": total_predictions,
            "risk_distribution": dict(risk_counts),
            "average_biomass_growth": round(avg_biomass, 2) if avg_biomass else 0
        }

    except Exception as e:
        logger.error(f"Failed to get prediction summary: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to get prediction summary")

@router.get("/feature-importance")
async def get_feature_importance():
    """
    Get feature importance from the ML models.
    """
    try:
        importance_data = ml_service.get_feature_importance()
        return importance_data

    except Exception as e:
        logger.error(f"Failed to get feature importance: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to get feature importance")