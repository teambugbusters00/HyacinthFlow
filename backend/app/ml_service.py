"""
ML Service for Water Hyacinth Prediction API.

This module provides a service layer for the ML model integration.
"""

import pandas as pd
import numpy as np
from typing import Dict, Any, Optional
import logging
from pathlib import Path

# Import the ML model
from ..ml_model.water_hyacinth_ml_model import WaterHyacinthMLModel

logger = logging.getLogger(__name__)

class MLService:
    """
    Service class for ML model operations.
    """

    def __init__(self):
        """
        Initialize the ML service.
        """
        self.classification_model = None
        self.regression_model = None
        self._initialize_models()

    def _initialize_models(self):
        """
        Initialize and train the ML models.
        """
        try:
            logger.info("Initializing ML models...")

            # Initialize classification model (infestation risk)
            self.classification_model = WaterHyacinthMLModel(problem_type='classification')

            # Generate training data
            df = self.classification_model.generate_sample_data(n_samples=1000)

            # Preprocess data
            X, y = self.classification_model.preprocess_data(df)

            # Split data
            from sklearn.model_selection import train_test_split
            X_train, X_test, y_train, y_test = train_test_split(
                X, y, test_size=0.2, random_state=42, stratify=y
            )

            # Optimize hyperparameters
            self.classification_model.optimize_hyperparameters(X_train, y_train, n_trials=20)

            # Train the model
            self.classification_model.train_best_model(X_train, y_train, X_test, y_test)

            # Initialize regression model (biomass growth)
            self.regression_model = WaterHyacinthMLModel(problem_type='regression')

            # Generate training data for regression
            df_reg = self.regression_model.generate_sample_data(n_samples=1000)

            # Preprocess data
            X_reg, y_reg = self.regression_model.preprocess_data(df_reg)

            # Split data
            X_train_reg, X_test_reg, y_train_reg, y_test_reg = train_test_split(
                X_reg, y_reg, test_size=0.2, random_state=42
            )

            # Optimize hyperparameters
            self.regression_model.optimize_hyperparameters(X_train_reg, y_train_reg, n_trials=20)

            # Train the model
            self.regression_model.train_best_model(X_train_reg, y_train_reg, X_test_reg, y_test_reg)

            logger.info("ML models initialized successfully")

        except Exception as e:
            logger.error(f"Failed to initialize ML models: {str(e)}")
            raise

    def predict(self, input_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Make predictions using both classification and regression models.

        Args:
            input_data: Dictionary containing environmental parameters

        Returns:
            Dictionary with prediction results
        """
        try:
            # Convert input data to DataFrame
            df = pd.DataFrame([input_data])

            # Make classification prediction (infestation risk)
            risk_prediction = self.classification_model.predict_new_data(df)
            infestation_risk = risk_prediction[0] if risk_prediction is not None else "unknown"

            # Make regression prediction (biomass growth)
            biomass_prediction = self.regression_model.predict_new_data(df)
            biomass_growth = float(biomass_prediction[0]) if biomass_prediction is not None else 0.0

            # Calculate confidence score (simplified)
            confidence_score = self._calculate_confidence_score(input_data)

            return {
                "infestation_risk": infestation_risk,
                "biomass_growth": round(biomass_growth, 2),
                "confidence_score": confidence_score,
                "model_version": "1.0.0"
            }

        except Exception as e:
            logger.error(f"Prediction failed: {str(e)}")
            raise

    def _calculate_confidence_score(self, input_data: Dict[str, Any]) -> float:
        """
        Calculate a simplified confidence score based on input data quality.

        Args:
            input_data: Input environmental parameters

        Returns:
            Confidence score between 0 and 1
        """
        # Simple confidence calculation based on data completeness and reasonableness
        score = 0.8  # Base confidence

        # Check if values are within reasonable ranges
        if not (10 <= input_data.get('latitude', 0) <= 30):
            score -= 0.1
        if not (70 <= input_data.get('longitude', 0) <= 90):
            score -= 0.1
        if not (20 <= input_data.get('water_temperature', 0) <= 35):
            score -= 0.1
        if not (6.5 <= input_data.get('water_ph', 0) <= 8.5):
            score -= 0.1

        return max(0.5, min(1.0, score))  # Clamp between 0.5 and 1.0

    def get_feature_importance(self) -> Dict[str, Any]:
        """
        Get feature importance from the trained models.

        Returns:
            Dictionary with feature importance data
        """
        try:
            classification_importance = self.classification_model.get_feature_importance()
            regression_importance = self.regression_model.get_feature_importance()

            return {
                "classification": classification_importance.to_dict('records') if classification_importance is not None else [],
                "regression": regression_importance.to_dict('records') if regression_importance is not None else []
            }

        except Exception as e:
            logger.error(f"Failed to get feature importance: {str(e)}")
            return {"classification": [], "regression": []}

# Global ML service instance
ml_service = MLService()