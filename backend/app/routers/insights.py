"""
Insights API router for Water Hyacinth Prediction API.
"""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import logging

from ..database import get_db
from ..models import Prediction
from ..schemas import InsightsRequest, InsightsResponse
from ..llm_service import llm_service

logger = logging.getLogger(__name__)

router = APIRouter()

@router.post("/insights", response_model=InsightsResponse)
async def generate_insights(
    request: InsightsRequest,
    db: Session = Depends(get_db)
):
    """
    Generate AI insights for a specific prediction.

    This endpoint:
    1. Retrieves the prediction from database
    2. Generates AI insights using OpenAI
    3. Updates the prediction record with new insights
    4. Returns the insights
    """
    try:
        # Get prediction from database
        prediction = db.query(Prediction).filter(Prediction.id == request.prediction_id).first()
        if prediction is None:
            raise HTTPException(status_code=404, detail="Prediction not found")

        # Prepare prediction data for LLM
        prediction_data = {
            "latitude": prediction.latitude,
            "longitude": prediction.longitude,
            "water_temperature": prediction.water_temperature,
            "water_ph": prediction.water_ph,
            "nutrient_level": prediction.nutrient_level,
            "sunlight_exposure": prediction.sunlight_exposure,
            "water_flow_rate": prediction.water_flow_rate,
            "current_biomass_density": prediction.current_biomass_density,
            "water_body_type": prediction.water_body_type,
            "season": prediction.season,
            "infestation_risk": prediction.infestation_risk,
            "biomass_growth": prediction.biomass_growth
        }

        # Generate insights
        logger.info(f"Generating insights for prediction ID: {request.prediction_id}")
        insights = llm_service.generate_insights(prediction_data, request.context)

        # Update prediction record with new insights
        prediction.insights = insights
        db.commit()

        logger.info(f"Insights generated successfully for prediction ID: {request.prediction_id}")

        return InsightsResponse(
            prediction_id=request.prediction_id,
            insights=insights,
            generated_at=prediction.timestamp
        )

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Insights generation failed: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Insights generation failed: {str(e)}")

@router.get("/insights/{prediction_id}")
async def get_prediction_insights(
    prediction_id: int,
    db: Session = Depends(get_db)
):
    """
    Get existing insights for a prediction.
    """
    try:
        prediction = db.query(Prediction).filter(Prediction.id == prediction_id).first()
        if prediction is None:
            raise HTTPException(status_code=404, detail="Prediction not found")

        if not prediction.insights:
            raise HTTPException(status_code=404, detail="No insights available for this prediction")

        return InsightsResponse(
            prediction_id=prediction_id,
            insights=prediction.insights,
            generated_at=prediction.timestamp
        )

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Failed to retrieve insights for prediction {prediction_id}: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to retrieve insights")

@router.post("/insights/trends")
async def analyze_trends(
    limit: int = 20,
    db: Session = Depends(get_db)
):
    """
    Analyze trends from recent predictions.

    Args:
        limit: Number of recent predictions to analyze
    """
    try:
        # Get recent predictions
        predictions = (
            db.query(Prediction)
            .order_by(Prediction.timestamp.desc())
            .limit(limit)
            .all()
        )

        if not predictions:
            raise HTTPException(status_code=404, detail="No predictions found for trend analysis")

        # Convert to dict format for LLM
        predictions_data = [
            {
                "timestamp": p.timestamp.isoformat(),
                "infestation_risk": p.infestation_risk,
                "biomass_growth": p.biomass_growth,
                "latitude": p.latitude,
                "longitude": p.longitude
            }
            for p in predictions
        ]

        # Generate trend analysis
        logger.info(f"Analyzing trends from {len(predictions_data)} predictions")
        trend_analysis = llm_service.analyze_trends(predictions_data)

        return {
            "analysis": trend_analysis,
            "predictions_analyzed": len(predictions_data),
            "date_range": {
                "from": predictions[-1].timestamp.isoformat(),
                "to": predictions[0].timestamp.isoformat()
            }
        }

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Trend analysis failed: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Trend analysis failed: {str(e)}")

@router.get("/insights/summary")
async def get_insights_summary(db: Session = Depends(get_db)):
    """
    Get summary of insights and recommendations.
    """
    try:
        total_predictions = db.query(Prediction).count()
        predictions_with_insights = db.query(Prediction).filter(Prediction.insights.isnot(None)).count()

        # Get risk distribution
        risk_summary = db.query(
            Prediction.infestation_risk,
            db.func.count(Prediction.id)
        ).group_by(Prediction.infestation_risk).all()

        return {
            "total_predictions": total_predictions,
            "predictions_with_insights": predictions_with_insights,
            "insights_coverage": f"{(predictions_with_insights/total_predictions*100):.1f}%" if total_predictions > 0 else "0%",
            "risk_distribution": dict(risk_summary),
            "most_common_risk": max(dict(risk_summary).items(), key=lambda x: x[1])[0] if risk_summary else None
        }

    except Exception as e:
        logger.error(f"Failed to get insights summary: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to get insights summary")