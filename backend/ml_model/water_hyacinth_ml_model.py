"""
Water Hyacinth Management ML Model with Optuna Hyperparameter Tuning
====================================================================

This script provides a complete ML solution for water hyacinth infestation prediction
and management optimization using multiple algorithms with automated hyperparameter tuning.

Features:
- Data preprocessing and feature engineering
- Multiple ML models: Random Forest, SVM, XGBoost
- Optuna hyperparameter optimization
- Model evaluation and comparison
- Prediction pipeline for new data
"""

import numpy as np
import pandas as pd
import optuna
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.ensemble import RandomForestClassifier, RandomForestRegressor
from sklearn.svm import SVC, SVR
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.metrics import accuracy_score, classification_report, mean_squared_error, r2_score
from sklearn.impute import SimpleImputer
import xgboost as xgb
from xgboost import XGBClassifier, XGBRegressor
import warnings
warnings.filterwarnings('ignore')

class WaterHyacinthMLModel:
    """
    Comprehensive ML model for water hyacinth management with hyperparameter tuning.
    """

    def __init__(self, problem_type='classification'):
        """
        Initialize the ML model.

        Args:
            problem_type (str): 'classification' for infestation risk prediction
                              'regression' for biomass prediction
        """
        self.problem_type = problem_type
        self.scaler = StandardScaler()
        self.imputer = SimpleImputer(strategy='mean')
        self.label_encoder = LabelEncoder()
        self.best_model = None
        self.best_params = None
        self.feature_names = None

    def generate_sample_data(self, n_samples=1000):
        """
        Generate synthetic sample data for water hyacinth management.
        In real scenarios, replace this with actual data collection.
        """
        np.random.seed(42)

        # Environmental features
        data = {
            'latitude': np.random.uniform(10, 30, n_samples),
            'longitude': np.random.uniform(70, 90, n_samples),
            'water_temperature': np.random.uniform(20, 35, n_samples),
            'water_ph': np.random.uniform(6.5, 8.5, n_samples),
            'nutrient_level': np.random.uniform(0.1, 2.0, n_samples),
            'sunlight_exposure': np.random.uniform(0.3, 1.0, n_samples),
            'water_flow_rate': np.random.uniform(0.1, 5.0, n_samples),
            'current_biomass_density': np.random.uniform(0, 100, n_samples),
            'water_body_type': np.random.choice(['lake', 'river', 'pond', 'reservoir'], n_samples),
            'season': np.random.choice(['spring', 'summer', 'autumn', 'winter'], n_samples)
        }

        df = pd.DataFrame(data)

        # Generate target variables based on environmental conditions
        if self.problem_type == 'classification':
            # Classification: Infestation risk (low, medium, high)
            risk_score = (
                df['water_temperature'] * 0.3 +
                df['nutrient_level'] * 0.4 +
                df['sunlight_exposure'] * 0.2 +
                df['water_flow_rate'] * (-0.1) +
                np.random.normal(0, 0.5, n_samples)
            )

            # Convert to risk categories
            df['infestation_risk'] = pd.cut(risk_score,
                                          bins=3,
                                          labels=['low', 'medium', 'high'])

        else:
            # Regression: Predicted biomass growth
            biomass_growth = (
                df['water_temperature'] * 2.5 +
                df['nutrient_level'] * 15.0 +
                df['sunlight_exposure'] * 25.0 +
                df['water_flow_rate'] * (-3.0) +
                df['current_biomass_density'] * 0.1 +
                np.random.normal(0, 5, n_samples)
            )
            df['biomass_growth'] = np.maximum(0, biomass_growth)

        return df

    def preprocess_data(self, df):
        """
        Preprocess the data for ML modeling.
        """
        # Separate features and target
        if self.problem_type == 'classification':
            target_col = 'infestation_risk'
        else:
            target_col = 'biomass_growth'

        # Remove target column and get features
        feature_cols = [col for col in df.columns if col != target_col]
        X = df[feature_cols].copy()
        y = df[target_col].copy()

        # Handle categorical variables
        categorical_cols = X.select_dtypes(include=['object']).columns
        for col in categorical_cols:
            X[col] = self.label_encoder.fit_transform(X[col].astype(str))

        # Handle missing values
        X = pd.DataFrame(self.imputer.fit_transform(X), columns=X.columns)

        # Scale numerical features
        numerical_cols = X.select_dtypes(include=[np.number]).columns
        X[numerical_cols] = self.scaler.fit_transform(X[numerical_cols])

        # Encode target for classification
        if self.problem_type == 'classification':
            y = self.label_encoder.fit_transform(y)

        self.feature_names = X.columns.tolist()
        return X, y

    def objective(self, trial, X_train, y_train):
        """
        Optuna objective function for hyperparameter optimization.
        """
        # Suggest model type
        model_name = trial.suggest_categorical("model", ["RandomForest", "SVM", "XGBoost"])

        if model_name == "RandomForest":
            if self.problem_type == 'classification':
                n_estimators = trial.suggest_int("n_estimators", 50, 300)
                max_depth = trial.suggest_int("max_depth", 2, 20)
                min_samples_split = trial.suggest_int("min_samples_split", 2, 10)
                min_samples_leaf = trial.suggest_int("min_samples_leaf", 1, 5)

                model = RandomForestClassifier(
                    n_estimators=n_estimators,
                    max_depth=max_depth,
                    min_samples_split=min_samples_split,
                    min_samples_leaf=min_samples_leaf,
                    random_state=42
                )
            else:
                n_estimators = trial.suggest_int("n_estimators", 50, 300)
                max_depth = trial.suggest_int("max_depth", 2, 20)
                min_samples_split = trial.suggest_int("min_samples_split", 2, 10)

                model = RandomForestRegressor(
                    n_estimators=n_estimators,
                    max_depth=max_depth,
                    min_samples_split=min_samples_split,
                    random_state=42
                )

        elif model_name == "SVM":
            C = trial.suggest_float("C", 0.1, 10.0, log=True)
            kernel = trial.suggest_categorical("kernel", ["linear", "poly", "rbf"])
            gamma = trial.suggest_categorical("gamma", ["scale", "auto"])

            if self.problem_type == 'classification':
                model = SVC(C=C, kernel=kernel, gamma=gamma, probability=True, random_state=42)
            else:
                model = SVR(C=C, kernel=kernel, gamma=gamma)

        else:  # XGBoost
            n_estimators = trial.suggest_int("n_estimators", 50, 300)
            max_depth = trial.suggest_int("max_depth", 2, 15)
            learning_rate = trial.suggest_float("learning_rate", 0.01, 0.3, log=True)
            subsample = trial.suggest_float("subsample", 0.6, 1.0)
            colsample_bytree = trial.suggest_float("colsample_bytree", 0.6, 1.0)

            if self.problem_type == 'classification':
                model = XGBClassifier(
                    n_estimators=n_estimators,
                    max_depth=max_depth,
                    learning_rate=learning_rate,
                    subsample=subsample,
                    colsample_bytree=colsample_bytree,
                    eval_metric='logloss',
                    random_state=42
                )
            else:
                model = XGBRegressor(
                    n_estimators=n_estimators,
                    max_depth=max_depth,
                    learning_rate=learning_rate,
                    subsample=subsample,
                    colsample_bytree=colsample_bytree,
                    random_state=42
                )

        # Cross-validation score
        if self.problem_type == 'classification':
            score = cross_val_score(model, X_train, y_train, cv=3, scoring="accuracy").mean()
        else:
            score = cross_val_score(model, X_train, y_train, cv=3, scoring="r2").mean()

        return score

    def optimize_hyperparameters(self, X_train, y_train, n_trials=50):
        """
        Optimize hyperparameters using Optuna.
        """
        print(f"Starting hyperparameter optimization with {n_trials} trials...")

        study = optuna.create_study(direction="maximize")
        study.optimize(lambda trial: self.objective(trial, X_train, y_train), n_trials=n_trials)

        self.best_params = study.best_trial.params
        print(f"Best trial score: {study.best_trial.value:.4f}")
        print(f"Best parameters: {self.best_params}")

        return study

    def train_best_model(self, X_train, y_train, X_test, y_test):
        """
        Train the best model with optimized hyperparameters.
        """
        model_name = self.best_params.pop("model")

        if model_name == "RandomForest":
            if self.problem_type == 'classification':
                self.best_model = RandomForestClassifier(**self.best_params, random_state=42)
            else:
                self.best_model = RandomForestRegressor(**self.best_params, random_state=42)

        elif model_name == "SVM":
            if self.problem_type == 'classification':
                self.best_model = SVC(**self.best_params, probability=True, random_state=42)
            else:
                self.best_model = SVR(**self.best_params)

        else:  # XGBoost
            if self.problem_type == 'classification':
                self.best_model = XGBClassifier(**self.best_params, eval_metric='logloss', random_state=42)
            else:
                self.best_model = XGBRegressor(**self.best_params, random_state=42)

        # Train the model
        self.best_model.fit(X_train, y_train)

        # Evaluate on test set
        y_pred = self.best_model.predict(X_test)

        if self.problem_type == 'classification':
            accuracy = accuracy_score(y_test, y_pred)
            print(f"\nTest Accuracy: {accuracy:.4f}")
            print("\nClassification Report:")
            print(classification_report(y_test, y_pred))
        else:
            mse = mean_squared_error(y_test, y_pred)
            r2 = r2_score(y_test, y_pred)
            print(f"\nTest MSE: {mse:.4f}")
            print(f"Test R² Score: {r2:.4f}")

        return y_pred

    def get_feature_importance(self):
        """
        Get feature importance from the trained model.
        """
        if self.best_model is None:
            print("Model not trained yet!")
            return None

        if hasattr(self.best_model, 'feature_importances_'):
            importance = self.best_model.feature_importances_
        elif hasattr(self.best_model, 'coef_'):
            importance = np.abs(self.best_model.coef_[0])
        else:
            print("Feature importance not available for this model type.")
            return None

        feature_importance_df = pd.DataFrame({
            'feature': self.feature_names,
            'importance': importance
        }).sort_values('importance', ascending=False)

        return feature_importance_df

    def predict_new_data(self, new_data):
        """
        Make predictions on new data.
        """
        if self.best_model is None:
            print("Model not trained yet!")
            return None

        # Preprocess new data (same as training data)
        new_data_processed = new_data.copy()

        # Handle categorical variables
        categorical_cols = new_data_processed.select_dtypes(include=['object']).columns
        for col in categorical_cols:
            # Handle unseen categories by mapping them to a default value
            try:
                new_data_processed[col] = self.label_encoder.transform(new_data_processed[col].astype(str))
            except ValueError as e:
                # If unseen categories, map them to the most common category
                unique_values = self.label_encoder.classes_
                default_value = unique_values[0]  # Use first category as default
                new_data_processed[col] = [default_value if val not in unique_values else val
                                         for val in new_data_processed[col].astype(str)]
                new_data_processed[col] = self.label_encoder.transform(new_data_processed[col])

        # Handle missing values
        new_data_processed = pd.DataFrame(
            self.imputer.transform(new_data_processed),
            columns=new_data_processed.columns
        )

        # Scale numerical features
        numerical_cols = new_data_processed.select_dtypes(include=[np.number]).columns
        new_data_processed[numerical_cols] = self.scaler.transform(new_data_processed[numerical_cols])

        # Make predictions
        predictions = self.best_model.predict(new_data_processed)

        if self.problem_type == 'classification':
            # Convert back to original labels
            predictions = self.label_encoder.inverse_transform(predictions)

        return predictions

def main():
    """
    Main function to run the complete ML pipeline.
    """
    print("=" * 60)
    print("Water Hyacinth Management ML Model")
    print("=" * 60)

    # Initialize model
    model = WaterHyacinthMLModel(problem_type='classification')  # or 'regression'

    # Generate sample data (replace with real data)
    print("\n1. Generating sample data...")
    df = model.generate_sample_data(n_samples=1000)
    print(f"Dataset shape: {df.shape}")
    print(f"Features: {list(df.columns[:-1])}")
    print(f"Target: {df.columns[-1]}")

    # Preprocess data
    print("\n2. Preprocessing data...")
    X, y = model.preprocess_data(df)
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y if model.problem_type == 'classification' else None
    )
    print(f"Training set: {X_train.shape}")
    print(f"Test set: {X_test.shape}")

    # Optimize hyperparameters
    print("\n3. Optimizing hyperparameters...")
    study = model.optimize_hyperparameters(X_train, y_train, n_trials=30)

    # Train best model
    print("\n4. Training best model...")
    y_pred = model.train_best_model(X_train, y_train, X_test, y_test)

    # Feature importance
    print("\n5. Feature importance analysis...")
    feature_importance = model.get_feature_importance()
    if feature_importance is not None:
        print("\nTop 10 most important features:")
        print(feature_importance.head(10))

    # Example prediction on new data
    print("\n6. Example prediction on new data...")
    sample_new_data = df.head(3)[df.columns[:-1]]  # Remove target column
    predictions = model.predict_new_data(sample_new_data)
    print(f"Sample predictions: {predictions}")

    print("\n" + "=" * 60)
    print("ML Pipeline Complete!")
    print("=" * 60)

if __name__ == "__main__":
    main()