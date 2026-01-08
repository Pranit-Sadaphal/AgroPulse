"""
FastAPI Backend for AgroPulse - Crop Yield Prediction System
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import joblib
import numpy as np
import json
import os
from pathlib import Path

from app.schemas import PredictionRequest, PredictionResponse, HealthResponse

# Initialize FastAPI app
app = FastAPI(
    title="AgroPulse API",
    description="AI-powered Crop Yield Prediction System",
    version="1.0.0"
)

# CORS configuration - allow all origins in development, configure for production
cors_origins = os.getenv(
    "CORS_ORIGINS",
    "http://localhost:5173,http://localhost:3000"
).split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model and preprocessors
MODEL_DIR = Path(__file__).parent / "model"
model = None
scaler = None
le_crop = None
le_soil = None
feature_names = None

def load_model():
    """Load the trained model and preprocessors"""
    global model, scaler, le_crop, le_soil, feature_names
    
    try:
        model_path = MODEL_DIR / "model.pkl"
        if not model_path.exists():
            raise FileNotFoundError(f"Model not found at {model_path}. Please run train_model.py first.")
        
        model = joblib.load(model_path)
        scaler = joblib.load(MODEL_DIR / "scaler.pkl")
        le_crop = joblib.load(MODEL_DIR / "label_encoder_crop.pkl")
        le_soil = joblib.load(MODEL_DIR / "label_encoder_soil.pkl")
        
        with open(MODEL_DIR / "feature_names.json", 'r') as f:
            feature_names = json.load(f)
        
        print("✓ Model and preprocessors loaded successfully")
    except Exception as e:
        print(f"Error loading model: {e}")
        raise

# Load model on startup
@app.on_event("startup")
async def startup_event():
    load_model()

@app.get("/", response_model=HealthResponse)
async def root():
    """Root endpoint"""
    return HealthResponse(
        status="ok",
        message="AgroPulse API is running"
    )

@app.get("/health", response_model=HealthResponse)
async def health_check():
    """Health check endpoint"""
    if model is None:
        raise HTTPException(status_code=503, detail="Model not loaded")
    
    return HealthResponse(
        status="healthy",
        message="AgroPulse API is operational"
    )

@app.post("/predict", response_model=PredictionResponse)
async def predict_yield(request: PredictionRequest):
    """
    Predict crop yield based on agricultural factors
    """
    if model is None or scaler is None:
        raise HTTPException(status_code=503, detail="Model not loaded. Please ensure train_model.py has been run.")
    
    try:
        # Validate crop and soil types
        valid_crops = ['Wheat', 'Rice', 'Corn', 'Soybean', 'Barley', 'Potato']
        valid_soils = ['Loamy', 'Clay', 'Sandy', 'Silty']
        
        if request.crop_type not in valid_crops:
            raise HTTPException(
                status_code=400,
                detail=f"Invalid crop_type. Must be one of: {valid_crops}"
            )
        
        if request.soil_type not in valid_soils:
            raise HTTPException(
                status_code=400,
                detail=f"Invalid soil_type. Must be one of: {valid_soils}"
            )
        
        # Encode categorical variables
        crop_encoded = le_crop.transform([request.crop_type])[0]
        soil_encoded = le_soil.transform([request.soil_type])[0]
        
        # Prepare feature vector
        features = np.array([[
            crop_encoded,
            soil_encoded,
            request.rainfall_mm,
            request.temperature_c,
            request.fertilizer_kg_ha
        ]])
        
        # Scale features
        features_scaled = scaler.transform(features)
        
        # Predict
        prediction = model.predict(features_scaled)[0]
        
        # Calculate confidence interval (assuming 10% uncertainty)
        confidence_range = prediction * 0.1
        confidence_lower = max(0, prediction - confidence_range)
        confidence_upper = prediction + confidence_range
        
        # Get feature importance if available
        feature_importance = {}
        if hasattr(model, 'feature_importances_'):
            importance_dict = dict(zip(feature_names, model.feature_importances_))
            # Map encoded features back to original names
            feature_importance = {
                "crop_type": float(importance_dict.get('crop_encoded', 0)),
                "soil_type": float(importance_dict.get('soil_encoded', 0)),
                "rainfall_mm": float(importance_dict.get('rainfall_mm', 0)),
                "temperature_c": float(importance_dict.get('temperature_c', 0)),
                "fertilizer_kg_ha": float(importance_dict.get('fertilizer_kg_ha', 0))
            }
        else:
            # Default equal importance for linear regression
            feature_importance = {
                "crop_type": 0.20,
                "soil_type": 0.20,
                "rainfall_mm": 0.20,
                "temperature_c": 0.20,
                "fertilizer_kg_ha": 0.20
            }
        
        return PredictionResponse(
            predicted_yield=float(prediction),
            confidence_lower=float(confidence_lower),
            confidence_upper=float(confidence_upper),
            feature_importance=feature_importance
        )
    
    except ValueError as e:
        raise HTTPException(status_code=400, detail=f"Invalid input: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")

@app.get("/crops")
async def get_crops():
    """Get list of valid crop types"""
    return {
        "crops": ['Wheat', 'Rice', 'Corn', 'Soybean', 'Barley', 'Potato']
    }

@app.get("/soils")
async def get_soils():
    """Get list of valid soil types"""
    return {
        "soils": ['Loamy', 'Clay', 'Sandy', 'Silty']
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

