"""
Pydantic schemas for request/response validation
"""

from pydantic import BaseModel, Field
from typing import Optional

class PredictionRequest(BaseModel):
    """Request schema for crop yield prediction"""
    crop_type: str = Field(..., description="Type of crop", examples=["Wheat", "Rice", "Corn", "Soybean", "Barley", "Potato"])
    soil_type: str = Field(..., description="Type of soil", examples=["Loamy", "Clay", "Sandy", "Silty"])
    rainfall_mm: float = Field(..., ge=0, le=2000, description="Rainfall in millimeters", examples=[800.0])
    temperature_c: float = Field(..., ge=0, le=50, description="Temperature in Celsius", examples=[25.0])
    fertilizer_kg_ha: float = Field(..., ge=0, le=500, description="Fertilizer usage in kg/hectare", examples=[150.0])
    
    class Config:
        json_schema_extra = {
            "example": {
                "crop_type": "Wheat",
                "soil_type": "Loamy",
                "rainfall_mm": 800.0,
                "temperature_c": 25.0,
                "fertilizer_kg_ha": 150.0
            }
        }

class PredictionResponse(BaseModel):
    """Response schema for crop yield prediction"""
    predicted_yield: float = Field(..., description="Predicted yield in tons/hectare")
    confidence_lower: float = Field(..., description="Lower bound of confidence interval")
    confidence_upper: float = Field(..., description="Upper bound of confidence interval")
    feature_importance: dict = Field(..., description="Feature importance scores")
    
    class Config:
        json_schema_extra = {
            "example": {
                "predicted_yield": 5.23,
                "confidence_lower": 4.71,
                "confidence_upper": 5.75,
                "feature_importance": {
                    "crop_type": 0.25,
                    "soil_type": 0.20,
                    "rainfall_mm": 0.15,
                    "temperature_c": 0.20,
                    "fertilizer_kg_ha": 0.20
                }
            }
        }

class HealthResponse(BaseModel):
    """Health check response"""
    status: str
    message: str

