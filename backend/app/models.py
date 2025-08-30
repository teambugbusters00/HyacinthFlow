"""
SQLAlchemy models for Water Hyacinth Prediction API.
"""

from sqlalchemy import Column, Integer, Float, String, DateTime, Text
from sqlalchemy.sql import func
from .database import Base

class Prediction(Base):
    """
    Model for storing water hyacinth predictions.
    """
    __tablename__ = "predictions"

    id = Column(Integer, primary_key=True, index=True)
    timestamp = Column(DateTime(timezone=True), server_default=func.now(), index=True)

    # Environmental parameters
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    water_temperature = Column(Float, nullable=False)
    water_ph = Column(Float, nullable=False)
    nutrient_level = Column(Float, nullable=False)
    sunlight_exposure = Column(Float, nullable=False)
    water_flow_rate = Column(Float, nullable=False)
    current_biomass_density = Column(Float, nullable=False)
    water_body_type = Column(String(50), nullable=False)
    season = Column(String(20), nullable=False)

    # Prediction results
    infestation_risk = Column(String(20), nullable=True)  # low, medium, high
    biomass_growth = Column(Float, nullable=True)  # kg/m²

    # LLM insights
    insights = Column(Text, nullable=True)

    def __repr__(self):
        return f"<Prediction(id={self.id}, risk={self.infestation_risk}, biomass={self.biomass_growth})>"