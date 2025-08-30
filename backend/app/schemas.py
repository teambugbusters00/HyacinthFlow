"""
Pydantic schemas for request/response validation in Water Hyacinth Prediction API.
"""

from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class PredictionBase(BaseModel):
    """
    Base schema for prediction data.
    """
    latitude: float = Field(..., ge=-90, le=90, description="Latitude of the water body")
    longitude: float = Field(..., ge=-180, le=180, description="Longitude of the water body")
    water_temperature: float = Field(..., ge=0, le=50, description="Water temperature in °C")
    water_ph: float = Field(..., ge=0, le=14, description="Water pH level")
    nutrient_level: float = Field(..., ge=0, le=10, description="Nutrient concentration (mg/L)")
    sunlight_exposure: float = Field(..., ge=0, le=1, description="Solar exposure (0-1 scale)")
    water_flow_rate: float = Field(..., ge=0, le=20, description="Water flow rate (m/s)")
    current_biomass_density: float = Field(..., ge=0, le=500, description="Current biomass density (kg/m²)")
    water_body_type: str = Field(..., description="Type of water body (lake, river, pond, reservoir)")
    season: str = Field(..., description="Season (spring, summer, autumn, winter)")

class PredictionCreate(PredictionBase):
    """
    Schema for creating a new prediction.
    """
    pass

class PredictionResponse(PredictionBase):
    """
    Schema for prediction response.
    """
    id: int
    timestamp: datetime
    infestation_risk: Optional[str] = None
    biomass_growth: Optional[float] = None
    insights: Optional[str] = None

    class Config:
        from_attributes = True

class PredictionResult(BaseModel):
    """
    Schema for ML model prediction results.
    """
    infestation_risk: str = Field(..., description="Predicted infestation risk (low/medium/high)")
    biomass_growth: float = Field(..., description="Predicted biomass growth (kg/m²)")
    confidence_score: Optional[float] = Field(None, description="Model confidence score")

class InsightsRequest(BaseModel):
    """
    Schema for requesting LLM insights.
    """
    prediction_id: int = Field(..., description="ID of the prediction to analyze")
    context: Optional[str] = Field(None, description="Additional context for insights")

class InsightsResponse(BaseModel):
    """
    Schema for LLM insights response.
    """
    prediction_id: int
    insights: str = Field(..., description="AI-generated insights and recommendations")
    generated_at: datetime

class HealthResponse(BaseModel):
    """
    Schema for health check response.
    """
    status: str
    service: str
    version: Optional[str] = None