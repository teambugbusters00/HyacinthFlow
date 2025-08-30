"""
Example Usage of Water Hyacinth ML Model
========================================

This script demonstrates various ways to use the WaterHyacinthMLModel
for different scenarios and problem types.
"""

import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from water_hyacinth_ml_model import WaterHyacinthMLModel

def example_classification():
    """
    Example: Classification problem - Predicting infestation risk
    """
    print("=" * 60)
    print("EXAMPLE 1: CLASSIFICATION - Infestation Risk Prediction")
    print("=" * 60)
    
    # Initialize classification model
    model = WaterHyacinthMLModel(problem_type='classification')
    
    # Generate sample data
    df = model.generate_sample_data(n_samples=500)
    print(f"Generated {len(df)} samples for classification")
    
    # Preprocess data
    X, y = model.preprocess_data(df)
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )
    
    # Optimize hyperparameters
    print("\nOptimizing hyperparameters...")
    study = model.optimize_hyperparameters(X_train, y_train, n_trials=20)
    
    # Train and evaluate
    y_pred = model.train_best_model(X_train, y_train, X_test, y_test)
    
    # Feature importance
    feature_importance = model.get_feature_importance()
    print("\nTop 5 most important features for infestation risk:")
    print(feature_importance.head())
    
    return model

def example_regression():
    """
    Example: Regression problem - Predicting biomass growth
    """
    print("\n" + "=" * 60)
    print("EXAMPLE 2: REGRESSION - Biomass Growth Prediction")
    print("=" * 60)
    
    # Initialize regression model
    model = WaterHyacinthMLModel(problem_type='regression')
    
    # Generate sample data
    df = model.generate_sample_data(n_samples=500)
    print(f"Generated {len(df)} samples for regression")
    
    # Preprocess data
    X, y = model.preprocess_data(df)
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )
    
    # Optimize hyperparameters
    print("\nOptimizing hyperparameters...")
    study = model.optimize_hyperparameters(X_train, y_train, n_trials=20)
    
    # Train and evaluate
    y_pred = model.train_best_model(X_train, y_train, X_test, y_test)
    
    # Feature importance
    feature_importance = model.get_feature_importance()
    print("\nTop 5 most important features for biomass growth:")
    print(feature_importance.head())
    
    return model

def example_real_data_simulation():
    """
    Example: Simulating real-world data collection and prediction
    """
    print("\n" + "=" * 60)
    print("EXAMPLE 3: Real-World Data Simulation")
    print("=" * 60)
    
    # Simulate real data collection from different water bodies
    np.random.seed(42)
    
    # Create realistic data for different water bodies
    water_bodies = {
        'Lake Victoria': {
            'latitude': 1.3733, 'longitude': 32.2903,
            'water_temperature': 25.5, 'water_ph': 7.2,
            'nutrient_level': 1.8, 'sunlight_exposure': 0.9,
            'water_flow_rate': 0.2, 'current_biomass_density': 45.0,
            'water_body_type': 'lake', 'season': 'summer'
        },
        'Nile River': {
            'latitude': 30.0444, 'longitude': 31.2357,
            'water_temperature': 22.0, 'water_ph': 7.8,
            'nutrient_level': 0.5, 'sunlight_exposure': 0.7,
            'water_flow_rate': 3.5, 'current_biomass_density': 15.0,
            'water_body_type': 'river', 'season': 'summer'
        },
        'Local Pond': {
            'latitude': 15.0, 'longitude': 75.0,
            'water_temperature': 28.0, 'water_ph': 6.8,
            'nutrient_level': 2.2, 'sunlight_exposure': 0.8,
            'water_flow_rate': 0.1, 'current_biomass_density': 80.0,
            'water_body_type': 'pond', 'season': 'summer'
        }
    }
    
    # Convert to DataFrame
    real_data = pd.DataFrame(water_bodies).T
    print("Real-world water body data:")
    print(real_data)
    
    # Use classification model for risk assessment
    model = WaterHyacinthMLModel(problem_type='classification')
    
    # Train model with sample data first
    df = model.generate_sample_data(n_samples=300)
    X, y = model.preprocess_data(df)
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )
    
    # Quick training (fewer trials for demonstration)
    study = model.optimize_hyperparameters(X_train, y_train, n_trials=10)
    model.train_best_model(X_train, y_train, X_test, y_test)
    
    # Predict risk for real water bodies
    predictions = model.predict_new_data(real_data)
    
    print("\nRisk Assessment for Real Water Bodies:")
    for water_body, risk in zip(real_data.index, predictions):
        print(f"{water_body}: {risk.upper()} RISK")
        
        # Provide recommendations based on risk level
        if risk == 'high':
            print(f"  → Immediate intervention required")
            print(f"  → Consider mechanical removal and chemical treatment")
        elif risk == 'medium':
            print(f"  → Regular monitoring needed")
            print(f"  → Implement preventive measures")
        else:
            print(f"  → Low priority for management")
            print(f"  → Continue routine monitoring")

def example_feature_analysis():
    """
    Example: Analyzing feature importance and environmental factors
    """
    print("\n" + "=" * 60)
    print("EXAMPLE 4: Feature Analysis and Environmental Insights")
    print("=" * 60)
    
    # Train both classification and regression models
    class_model = WaterHyacinthMLModel(problem_type='classification')
    reg_model = WaterHyacinthMLModel(problem_type='regression')
    
    # Generate data
    df = class_model.generate_sample_data(n_samples=400)
    
    # Train classification model
    X, y = class_model.preprocess_data(df)
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )
    study = class_model.optimize_hyperparameters(X_train, y_train, n_trials=15)
    class_model.train_best_model(X_train, y_train, X_test, y_test)
    
    # Train regression model
    df_reg = reg_model.generate_sample_data(n_samples=400)
    X, y = reg_model.preprocess_data(df_reg)
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )
    study = reg_model.optimize_hyperparameters(X_train, y_train, n_trials=15)
    reg_model.train_best_model(X_train, y_train, X_test, y_test)
    
    # Compare feature importance
    class_importance = class_model.get_feature_importance()
    reg_importance = reg_model.get_feature_importance()
    
    print("Feature Importance Comparison:")
    print("\nClassification (Infestation Risk):")
    print(class_importance.head(5))
    
    print("\nRegression (Biomass Growth):")
    print(reg_importance.head(5))
    
    # Environmental insights
    print("\nEnvironmental Insights:")
    print("1. Nutrient levels are critical for both risk and growth prediction")
    print("2. Water flow rate has negative correlation (higher flow = lower risk)")
    print("3. Temperature and sunlight exposure are key growth factors")
    print("4. Current biomass density is important for growth prediction")

def example_optimization_scenarios():
    """
    Example: Different optimization scenarios for management
    """
    print("\n" + "=" * 60)
    print("EXAMPLE 5: Management Optimization Scenarios")
    print("=" * 60)
    
    # Scenario 1: High-risk area with limited resources
    print("Scenario 1: High-Risk Area with Limited Resources")
    high_risk_data = pd.DataFrame({
        'latitude': [25.0], 'longitude': [75.0],
        'water_temperature': [32.0], 'water_ph': [7.0],
        'nutrient_level': [2.5], 'sunlight_exposure': [0.95],
        'water_flow_rate': [0.1], 'current_biomass_density': [90.0],
        'water_body_type': ['pond'], 'season': ['summer']
    })
    
    # Train model
    model = WaterHyacinthMLModel(problem_type='classification')
    df = model.generate_sample_data(n_samples=200)
    X, y = model.preprocess_data(df)
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )
    study = model.optimize_hyperparameters(X_train, y_train, n_trials=10)
    model.train_best_model(X_train, y_train, X_test, y_test)
    
    # Predict risk
    risk = model.predict_new_data(high_risk_data)[0]
    print(f"Predicted Risk: {risk.upper()}")
    
    if risk == 'high':
        print("Recommended Actions:")
        print("- Immediate mechanical removal")
        print("- Chemical treatment application")
        print("- Community mobilization")
        print("- Regular monitoring (weekly)")
    
    # Scenario 2: Biomass prediction for resource planning
    print("\nScenario 2: Biomass Prediction for Resource Planning")
    reg_model = WaterHyacinthMLModel(problem_type='regression')
    X, y = reg_model.preprocess_data(df)
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )
    study = reg_model.optimize_hyperparameters(X_train, y_train, n_trials=10)
    reg_model.train_best_model(X_train, y_train, X_test, y_test)
    
    # Predict biomass growth
    biomass_growth = reg_model.predict_new_data(high_risk_data)[0]
    print(f"Predicted Biomass Growth: {biomass_growth:.2f} kg/m²")
    
    if biomass_growth > 50:
        print("High biomass potential - consider:")
        print("- Biogas production facilities")
        print("- Composting operations")
        print("- Handicraft material supply")
    elif biomass_growth > 20:
        print("Moderate biomass - suitable for:")
        print("- Local composting")
        print("- Small-scale biogas")
    else:
        print("Low biomass - focus on:")
        print("- Prevention measures")
        print("- Monitoring only")

def main():
    """
    Run all examples
    """
    print("Water Hyacinth ML Model - Example Usage")
    print("=" * 60)
    
    try:
        # Run all examples
        example_classification()
        example_regression()
        example_real_data_simulation()
        example_feature_analysis()
        example_optimization_scenarios()
        
        print("\n" + "=" * 60)
        print("All examples completed successfully!")
        print("=" * 60)
        
    except Exception as e:
        print(f"Error running examples: {e}")
        print("Make sure all dependencies are installed:")
        print("pip install -r requirements.txt")

if __name__ == "__main__":
    main()
