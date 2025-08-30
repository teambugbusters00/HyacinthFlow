"""
Image-based predictions API router for Water Hyacinth Prediction API.
"""

from fastapi import APIRouter, Depends, HTTPException, File, UploadFile, Form
from sqlalchemy.orm import Session
from typing import Optional
import logging
import io
from PIL import Image
import numpy as np

from ..database import get_db
from ..models import Prediction
from ..schemas import PredictionResponse
from ..ml_service import ml_service
from ..llm_service import llm_service

logger = logging.getLogger(__name__)

router = APIRouter()

def detect_hyacinth_coverage(image: Image.Image) -> float:
    """
    Placeholder function for image analysis.
    In a real implementation, this would use a CNN model to detect hyacinth coverage.

    For now, returns a random coverage percentage based on image properties.
    """
    # Convert to numpy array for analysis
    img_array = np.array(image)

    # Simple heuristic: analyze green/blue ratios as proxy for vegetation/water
    # This is a placeholder - real implementation would use trained CNN
    height, width = img_array.shape[:2]

    # Sample pixels to estimate coverage
    sample_size = min(1000, height * width)
    indices = np.random.choice(height * width, sample_size, replace=False)
    pixels = img_array.reshape(-1, 3)[indices]

    # Simple vegetation detection (green > red + blue)
    vegetation_pixels = 0
    for pixel in pixels:
        r, g, b = pixel
        if g > r + b:  # Simple vegetation heuristic
            vegetation_pixels += 1

    coverage = (vegetation_pixels / sample_size) * 100

    # Add some randomness to simulate model uncertainty
    coverage = max(0, min(100, coverage + np.random.normal(0, 10)))

    return round(coverage, 2)

def coverage_to_biomass_estimate(coverage_percent: float) -> float:
    """
    Convert coverage percentage to biomass density estimate.
    This is a simplified mapping - real implementation would use trained regression model.
    """
    # Rough mapping: 0-20% coverage = 0-25 kg/m²
    # 20-50% coverage = 25-75 kg/m²
    # 50-100% coverage = 75-200 kg/m²
    if coverage_percent <= 20:
        biomass = (coverage_percent / 20) * 25
    elif coverage_percent <= 50:
        biomass = 25 + ((coverage_percent - 20) / 30) * 50
    else:
        biomass = 75 + ((coverage_percent - 50) / 50) * 125

    return round(biomass, 2)

@router.post("/predict-image", response_model=PredictionResponse)
async def create_image_prediction(
    image: UploadFile = File(...),
    latitude: float = Form(...),
    longitude: float = Form(...),
    water_temperature: float = Form(...),
    water_ph: float = Form(...),
    nutrient_level: float = Form(...),
    sunlight_exposure: float = Form(...),
    water_flow_rate: float = Form(...),
    water_body_type: str = Form(...),
    season: str = Form(...),
    db: Session = Depends(get_db)
):
    """
    Create a new prediction based on image analysis and environmental data.

    This endpoint:
    1. Validates and processes the uploaded image
    2. Analyzes image for hyacinth coverage using CNN/placeholder
    3. Converts coverage to biomass estimate
    4. Makes ML predictions using combined data
    5. Generates AI insights
    6. Stores results in database
    7. Returns complete prediction response
    """
    try:
        logger.info("Received image prediction request")
        logger.info(f"Image filename: {image.filename}")
        logger.info(f"Image content type: {image.content_type}")
        logger.info(f"Form data - latitude: {latitude}, longitude: {longitude}")

        # Validate image
        if not image.content_type.startswith('image/'):
            logger.error(f"Invalid content type: {image.content_type}")
            raise HTTPException(status_code=400, detail="File must be an image")

        # Read and process image
        logger.info("Reading image data...")
        image_data = await image.read()
        logger.info(f"Image data size: {len(image_data)} bytes")

        if len(image_data) > 10 * 1024 * 1024:  # 10MB limit
            logger.error(f"Image too large: {len(image_data)} bytes")
            raise HTTPException(status_code=400, detail="Image size must be less than 10MB")

        # Open image with PIL
        logger.info("Opening image with PIL...")
        try:
            img = Image.open(io.BytesIO(image_data))
            logger.info(f"Image opened successfully. Size: {img.size}, Mode: {img.mode}")
            img.verify()  # Verify it's a valid image
            logger.info("Image verification passed")
            img = Image.open(io.BytesIO(image_data))  # Re-open after verify
            logger.info("Image re-opened after verification")
        except Exception as e:
            logger.error(f"Failed to open/verify image: {str(e)}")
            raise HTTPException(status_code=400, detail=f"Invalid image file: {str(e)}")

        # Analyze image for hyacinth coverage
        logger.info("Analyzing image for hyacinth coverage...")
        coverage_percent = detect_hyacinth_coverage(img)
        logger.info(f"Coverage analysis complete: {coverage_percent}%")

        # Convert coverage to biomass estimate
        current_biomass_estimate = coverage_to_biomass_estimate(coverage_percent)

        # Prepare input data for ML model
        input_dict = {
            'latitude': latitude,
            'longitude': longitude,
            'water_temperature': water_temperature,
            'water_ph': water_ph,
            'nutrient_level': nutrient_level,
            'sunlight_exposure': sunlight_exposure,
            'water_flow_rate': water_flow_rate,
            'current_biomass_density': current_biomass_estimate,  # Use estimate from image
            'water_body_type': water_body_type,
            'season': season
        }

        # Make ML prediction
        logger.info(f"Making prediction for location: {latitude}, {longitude} with estimated biomass: {current_biomass_estimate}")
        ml_result = ml_service.predict(input_dict)

        # Generate AI insights with image context
        insights_data = {
            **input_dict,
            **ml_result,
            'image_coverage_percent': coverage_percent,
            'estimated_biomass_from_image': current_biomass_estimate
        }
        insights = llm_service.generate_insights(insights_data)

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

        # Add image analysis results to response
        prediction_dict = db_prediction.__dict__
        prediction_dict.update({
            'current_coverage': coverage_percent,
            'current_population_estimate': current_biomass_estimate
        })

        logger.info(f"Image prediction created successfully with ID: {db_prediction.id}")

        return prediction_dict

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Image prediction creation failed: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Image prediction failed: {str(e)}")

@router.get("/image-analytics")
async def get_image_analytics(db: Session = Depends(get_db)):
    """
    Get analytics for image-based predictions.
    """
    try:
        # Get image prediction statistics
        image_predictions = db.query(Prediction).filter(
            Prediction.insights.contains("image")  # Simple filter for image predictions
        ).all()

        if not image_predictions:
            return {
                "total_image_predictions": 0,
                "average_coverage": 0,
                "coverage_distribution": {},
                "biomass_estimates": []
            }

        coverages = []
        biomass_estimates = []

        for pred in image_predictions:
            # Extract coverage from insights (this is a simplification)
            if "coverage" in pred.insights.lower():
                # This would need better parsing in real implementation
                coverages.append(25.0)  # Placeholder
                biomass_estimates.append(pred.current_biomass_density or 0)

        return {
            "total_image_predictions": len(image_predictions),
            "average_coverage": round(sum(coverages) / len(coverages), 2) if coverages else 0,
            "coverage_distribution": {
                "low": len([c for c in coverages if c < 20]),
                "medium": len([c for c in coverages if 20 <= c < 50]),
                "high": len([c for c in coverages if c >= 50])
            },
            "biomass_estimates": biomass_estimates
        }

    except Exception as e:
        logger.error(f"Failed to get image analytics: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to get image analytics")