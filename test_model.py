"""
Simple Test Script for Water Hyacinth ML Model
==============================================

This script tests the basic functionality of the WaterHyacinthMLModel
to ensure everything works correctly.
"""

import sys
import traceback
from water_hyacinth_ml_model import WaterHyacinthMLModel
from sklearn.model_selection import train_test_split

def test_basic_functionality():
    """Test basic model functionality"""
    print("Testing basic functionality...")
    
    try:
        # Test model initialization
        model = WaterHyacinthMLModel(problem_type='classification')
        print("[OK] Model initialization successful")
        
        # Test data generation
        df = model.generate_sample_data(n_samples=100)
        print(f"[OK] Data generation successful: {df.shape}")
        
        # Test data preprocessing
        X, y = model.preprocess_data(df)
        print(f"[OK] Data preprocessing successful: {X.shape}, {y.shape}")
        
        # Test train-test split
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.2, random_state=42, stratify=y
        )
        print(f"[OK] Train-test split successful: {X_train.shape}, {X_test.shape}")
        
        # Test hyperparameter optimization (with fewer trials for speed)
        study = model.optimize_hyperparameters(X_train, y_train, n_trials=5)
        print("[OK] Hyperparameter optimization successful")
        
        # Test model training
        y_pred = model.train_best_model(X_train, y_train, X_test, y_test)
        print("[OK] Model training successful")
        
        # Test feature importance
        feature_importance = model.get_feature_importance()
        print("[OK] Feature importance analysis successful")
        
        # Test prediction on new data
        new_data = df.head(2)[df.columns[:-1]]  # Remove target column
        predictions = model.predict_new_data(new_data)
        print(f"[OK] Prediction successful: {predictions}")
        
        return True
        
    except Exception as e:
        print(f"[FAIL] Test failed: {e}")
        traceback.print_exc()
        return False

def test_regression_model():
    """Test regression model functionality"""
    print("\nTesting regression model...")
    
    try:
        # Test regression model
        model = WaterHyacinthMLModel(problem_type='regression')
        print("[OK] Regression model initialization successful")
        
        # Test data generation
        df = model.generate_sample_data(n_samples=100)
        print(f"[OK] Regression data generation successful: {df.shape}")
        
        # Test data preprocessing
        X, y = model.preprocess_data(df)
        print(f"[OK] Regression data preprocessing successful: {X.shape}, {y.shape}")
        
        # Test train-test split
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.2, random_state=42
        )
        print(f"[OK] Regression train-test split successful: {X_train.shape}, {X_test.shape}")
        
        # Test hyperparameter optimization
        study = model.optimize_hyperparameters(X_train, y_train, n_trials=5)
        print("[OK] Regression hyperparameter optimization successful")
        
        # Test model training
        y_pred = model.train_best_model(X_train, y_train, X_test, y_test)
        print("[OK] Regression model training successful")
        
        return True
        
    except Exception as e:
        print(f"[FAIL] Regression test failed: {e}")
        traceback.print_exc()
        return False

def test_error_handling():
    """Test error handling"""
    print("\nTesting error handling...")
    
    try:
        # Test prediction without training
        model = WaterHyacinthMLModel(problem_type='classification')
        df = model.generate_sample_data(n_samples=10)
        new_data = df.head(2)[df.columns[:-1]]
        
        predictions = model.predict_new_data(new_data)
        if predictions is None:
            print("[OK] Properly handled prediction without training")
        else:
            print("[FAIL] Should have raised error for untrained model")
            return False
        
        return True
        
    except Exception as e:
        print(f"[FAIL] Error handling test failed: {e}")
        return False

def main():
    """Run all tests"""
    print("Water Hyacinth ML Model - Test Suite")
    print("=" * 50)
    
    tests = [
        test_basic_functionality,
        test_regression_model,
        test_error_handling
    ]
    
    passed = 0
    total = len(tests)
    
    for test in tests:
        if test():
            passed += 1
        print()
    
    print("=" * 50)
    print(f"Test Results: {passed}/{total} tests passed")
    
    if passed == total:
        print("[SUCCESS] All tests passed! The model is working correctly.")
        return True
    else:
        print("[ERROR] Some tests failed. Please check the errors above.")
        return False

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)
