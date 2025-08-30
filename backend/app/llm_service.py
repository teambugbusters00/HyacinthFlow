"""
LLM Service for Water Hyacinth Prediction API.

This module provides OpenAI integration for generating insights from predictions.
"""

import os
import logging
from typing import Dict, Any, Optional
from datetime import datetime

try:
    import openai
    from openai import OpenAI
    openai_available = True
except ImportError as e:
    openai_available = False
    logger.warning(f"OpenAI library not available: {e}. LLM features will be disabled.")

logger = logging.getLogger(__name__)

if openai_available:
    logger.info(f"OpenAI library version: {openai.__version__}")

class LLMService:
    """
    Service class for OpenAI LLM operations.
    """

    def __init__(self):
        """
        Initialize the LLM service.
        """
        self.api_key = os.getenv("OPENAI_API_KEY")
        logger.info(f"OpenAI API key present: {bool(self.api_key)}")

        if self.api_key and openai_available:
            try:
                self.client = OpenAI(api_key=self.api_key)
                logger.info("OpenAI client initialized successfully")
            except Exception as e:
                logger.error(f"Failed to initialize OpenAI client: {e}")
                self.client = None
        else:
            self.client = None
            if not self.api_key:
                logger.warning("OpenAI API key not found. LLM features will be disabled.")
            if not openai_available:
                logger.warning("OpenAI library not available. LLM features will be disabled.")

    def generate_insights(self, prediction_data: Dict[str, Any], context: Optional[str] = None) -> str:
        """
        Generate insights and recommendations based on prediction data.

        Args:
            prediction_data: Dictionary containing prediction results
            context: Additional context for the analysis

        Returns:
            String containing AI-generated insights
        """
        # Temporarily disable OpenAI due to API issues
        logger.info("Using fallback insights (OpenAI temporarily disabled)")
        return self._generate_enhanced_fallback_insights(prediction_data)

    def _create_insights_prompt(self, prediction_data: Dict[str, Any], context: Optional[str] = None) -> str:
        """
        Create a prompt for the LLM based on prediction data.

        Args:
            prediction_data: Prediction results
            context: Additional context

        Returns:
            Formatted prompt string
        """
        risk = prediction_data.get('infestation_risk', 'unknown')
        biomass = prediction_data.get('biomass_growth', 0)
        confidence = prediction_data.get('confidence_score', 0)

        prompt = f"""
Based on a water hyacinth infestation risk assessment, I have the following prediction:

- Infestation Risk Level: {risk}
- Predicted Biomass Growth: {biomass} kg/m²
- Model Confidence: {confidence * 100:.1f}%

Environmental conditions:
- Water Temperature: {prediction_data.get('water_temperature', 'N/A')}°C
- Water pH: {prediction_data.get('water_ph', 'N/A')}
- Nutrient Level: {prediction_data.get('nutrient_level', 'N/A')} mg/L
- Sunlight Exposure: {prediction_data.get('sunlight_exposure', 'N/A')} (0-1 scale)
- Water Flow Rate: {prediction_data.get('water_flow_rate', 'N/A')} m/s
- Current Biomass Density: {prediction_data.get('current_biomass_density', 'N/A')} kg/m²
- Water Body Type: {prediction_data.get('water_body_type', 'N/A')}
- Season: {prediction_data.get('season', 'N/A')}

Please provide:
1. A brief interpretation of this prediction
2. 3-4 specific management recommendations
3. Potential economic or ecological impacts
4. Monitoring suggestions

{f'Additional context: {context}' if context else ''}
"""

        return prompt

    def _generate_fallback_insights(self, prediction_data: Dict[str, Any]) -> str:
        """
        Generate fallback insights when OpenAI is not available.

        Args:
            prediction_data: Prediction results

        Returns:
            Fallback insights string
        """
        risk = prediction_data.get('infestation_risk', 'unknown')
        biomass = prediction_data.get('biomass_growth', 0)

        insights = f"""
Water Hyacinth Management Insights (Generated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')})

Prediction Summary:
- Risk Level: {risk}
- Biomass Growth: {biomass} kg/m²

General Recommendations:
• Monitor water quality parameters regularly
• Implement early intervention strategies
• Consider mechanical removal methods
• Evaluate biological control options

Note: These are general recommendations. For specific management strategies, consult local environmental authorities.
"""

        return insights.strip()

    def _generate_enhanced_fallback_insights(self, prediction_data: Dict[str, Any]) -> str:
        """
        Generate enhanced fallback insights with more detailed analysis.

        Args:
            prediction_data: Prediction results

        Returns:
            Enhanced fallback insights string
        """
        risk = prediction_data.get('infestation_risk', 'unknown')
        biomass = prediction_data.get('biomass_growth', 0)
        temperature = prediction_data.get('water_temperature', 25)
        ph = prediction_data.get('water_ph', 7)
        nutrients = prediction_data.get('nutrient_level', 5)
        season = prediction_data.get('season', 'unknown')

        # Enhanced analysis based on environmental factors
        risk_factors = []
        recommendations = []

        if temperature > 30:
            risk_factors.append("High water temperature promotes rapid growth")
            recommendations.append("Implement temperature monitoring and cooling measures")
        elif temperature < 20:
            risk_factors.append("Lower temperatures may slow growth but don't eliminate risk")
            recommendations.append("Continue monitoring during cooler periods")

        if ph < 6.5 or ph > 8.5:
            risk_factors.append("Water pH outside optimal range")
            recommendations.append("Test and adjust water pH levels")

        if nutrients > 7:
            risk_factors.append("High nutrient levels accelerate infestation")
            recommendations.append("Implement nutrient management strategies")

        if season in ['summer', 'monsoon']:
            risk_factors.append(f"High growth season ({season}) increases infestation risk")
            recommendations.append("Increase monitoring frequency during growth seasons")

        insights = f"""
Water Hyacinth Management Insights (Generated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')})

Prediction Summary:
- Risk Level: {risk}
- Predicted Biomass Growth: {biomass} kg/m²
- Environmental Conditions: {temperature}°C, pH {ph}, Nutrients {nutrients}/10

Risk Analysis:
{chr(10).join(f"• {factor}" for factor in risk_factors) if risk_factors else "• No significant risk factors identified"}

Management Recommendations:
{chr(10).join(f"• {rec}" for rec in recommendations)}
• Regular monitoring of water quality parameters
• Early intervention strategies for new growth
• Mechanical removal methods for established infestations
• Biological control options as complementary measures

Note: This analysis is based on environmental data and ML predictions. Consult local environmental authorities for site-specific management strategies.
"""

        return insights.strip()

    def analyze_trends(self, predictions_history: list) -> str:
        """
        Analyze trends from prediction history.

        Args:
            predictions_history: List of historical predictions

        Returns:
            Trend analysis insights
        """
        if not self.client or not predictions_history:
            return "Insufficient data for trend analysis."

        try:
            # Create trend analysis prompt
            prompt = f"""
Analyze the following water hyacinth prediction history and provide insights on trends:

{chr(10).join([f"- {datetime.fromisoformat(p['timestamp'][:19]).strftime('%Y-%m-%d')}: Risk={p['infestation_risk']}, Biomass={p['biomass_growth']}kg/m²" for p in predictions_history[-10:]])}

Please provide:
1. Trend analysis
2. Risk pattern identification
3. Recommendations for management
"""

            response = self.client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "You are an environmental data analyst specializing in invasive species monitoring."},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=400,
                temperature=0.6
            )

            return response.choices[0].message.content.strip()

        except Exception as e:
            logger.error(f"Failed to analyze trends: {str(e)}")
            return "Trend analysis unavailable at this time."

# Global LLM service instance
llm_service = LLMService()