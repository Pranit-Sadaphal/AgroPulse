"""
ML Model Training Script for AgroPulse
Trains regression models to predict crop yield based on agricultural factors.
"""

import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.linear_model import LinearRegression
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
import joblib
import os

# Set random seed for reproducibility
np.random.seed(42)

def generate_agricultural_dataset(n_samples=2000):
    """
    Generate a realistic agricultural dataset for crop yield prediction.
    """
    data = {
        'crop_type': np.random.choice(['Wheat', 'Rice', 'Corn', 'Soybean', 'Barley', 'Potato'], n_samples),
        'soil_type': np.random.choice(['Loamy', 'Clay', 'Sandy', 'Silty'], n_samples),
        'rainfall_mm': np.random.normal(800, 200, n_samples).clip(300, 1500),
        'temperature_c': np.random.normal(25, 5, n_samples).clip(15, 35),
        'fertilizer_kg_ha': np.random.normal(150, 50, n_samples).clip(50, 300),
    }
    
    df = pd.DataFrame(data)
    
    # Create realistic yield based on relationships
    # Base yield varies by crop type
    crop_base = {
        'Wheat': 4.5,
        'Rice': 5.0,
        'Corn': 6.5,
        'Soybean': 3.0,
        'Barley': 4.0,
        'Potato': 25.0
    }
    
    # Soil type multipliers
    soil_multiplier = {
        'Loamy': 1.2,
        'Clay': 1.0,
        'Sandy': 0.8,
        'Silty': 1.1
    }
    
    # Calculate yield with realistic relationships
    yield_values = []
    for idx, row in df.iterrows():
        base = crop_base[row['crop_type']]
        soil = soil_multiplier[row['soil_type']]
        
        # Rainfall effect (optimal around 800mm)
        rainfall_effect = 1 + 0.0003 * (row['rainfall_mm'] - 800) - 0.0000005 * (row['rainfall_mm'] - 800)**2
        
        # Temperature effect (optimal around 25°C)
        temp_effect = 1 + 0.02 * (row['temperature_c'] - 25) - 0.001 * (row['temperature_c'] - 25)**2
        
        # Fertilizer effect (diminishing returns)
        fert_effect = 1 + 0.002 * row['fertilizer_kg_ha'] - 0.000003 * row['fertilizer_kg_ha']**2
        
        yield_val = base * soil * rainfall_effect * temp_effect * fert_effect
        
        # Add some noise
        yield_val += np.random.normal(0, yield_val * 0.1)
        
        yield_values.append(max(0.5, yield_val))  # Ensure positive yield
    
    df['yield_tons_ha'] = yield_values
    
    return df

def train_models():
    """
    Train and evaluate regression models for crop yield prediction.
    """
    print("Generating agricultural dataset...")
    df = generate_agricultural_dataset(n_samples=2000)
    
    print(f"Dataset shape: {df.shape}")
    print(f"\nDataset statistics:")
    print(df.describe())
    
    # Encode categorical variables
    le_crop = LabelEncoder()
    le_soil = LabelEncoder()
    
    df['crop_encoded'] = le_crop.fit_transform(df['crop_type'])
    df['soil_encoded'] = le_soil.fit_transform(df['soil_type'])
    
    # Prepare features
    feature_cols = ['crop_encoded', 'soil_encoded', 'rainfall_mm', 'temperature_c', 'fertilizer_kg_ha']
    X = df[feature_cols]
    y = df['yield_tons_ha']
    
    # Split data
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    # Scale features
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)
    
    # Train Linear Regression
    print("\n" + "="*50)
    print("Training Linear Regression...")
    lr_model = LinearRegression()
    lr_model.fit(X_train_scaled, y_train)
    
    lr_pred = lr_model.predict(X_test_scaled)
    lr_mae = mean_absolute_error(y_test, lr_pred)
    lr_rmse = np.sqrt(mean_squared_error(y_test, lr_pred))
    lr_r2 = r2_score(y_test, lr_pred)
    
    print(f"Linear Regression - MAE: {lr_mae:.3f}, RMSE: {lr_rmse:.3f}, R²: {lr_r2:.3f}")
    
    # Train Random Forest Regressor
    print("\n" + "="*50)
    print("Training Random Forest Regressor...")
    rf_model = RandomForestRegressor(n_estimators=100, max_depth=10, random_state=42)
    rf_model.fit(X_train_scaled, y_train)
    
    rf_pred = rf_model.predict(X_test_scaled)
    rf_mae = mean_absolute_error(y_test, rf_pred)
    rf_rmse = np.sqrt(mean_squared_error(y_test, rf_pred))
    rf_r2 = r2_score(y_test, rf_pred)
    
    print(f"Random Forest - MAE: {rf_mae:.3f}, RMSE: {rf_rmse:.3f}, R²: {rf_r2:.3f}")
    
    # Choose best model (Random Forest typically performs better)
    if rf_r2 > lr_r2:
        best_model = rf_model
        best_name = "Random Forest"
        print(f"\n✓ Best model: {best_name} (R²: {rf_r2:.3f})")
    else:
        best_model = lr_model
        best_name = "Linear Regression"
        print(f"\n✓ Best model: {best_name} (R²: {lr_r2:.3f})")
    
    # Save model and preprocessors
    model_dir = "app/model"
    os.makedirs(model_dir, exist_ok=True)
    
    joblib.dump(best_model, os.path.join(model_dir, "model.pkl"))
    joblib.dump(scaler, os.path.join(model_dir, "scaler.pkl"))
    joblib.dump(le_crop, os.path.join(model_dir, "label_encoder_crop.pkl"))
    joblib.dump(le_soil, os.path.join(model_dir, "label_encoder_soil.pkl"))
    
    # Save feature names
    import json
    with open(os.path.join(model_dir, "feature_names.json"), 'w') as f:
        json.dump(feature_cols, f)
    
    print(f"\n✓ Model saved to {model_dir}/model.pkl")
    print(f"✓ Preprocessors saved to {model_dir}/")
    
    # Calculate feature importance for Random Forest
    if hasattr(best_model, 'feature_importances_'):
        feature_importance = dict(zip(feature_cols, best_model.feature_importances_))
        print(f"\nFeature Importance:")
        for feature, importance in sorted(feature_importance.items(), key=lambda x: x[1], reverse=True):
            print(f"  {feature}: {importance:.4f}")
    
    return best_model, scaler, le_crop, le_soil

if __name__ == "__main__":
    print("="*50)
    print("AgroPulse - ML Model Training")
    print("="*50)
    train_models()
    print("\n" + "="*50)
    print("Training completed successfully!")
    print("="*50)

