from pydantic import BaseModel, Field, model_validator
from typing import List, Optional, Dict, Any

class CropRecommendationRequest(BaseModel):
    # Core crop recommendation & soil macronutrient parameters
    nitrogen: float = Field(..., ge=0.0, le=300.0, description="Nitrogen content in soil (N)")
    phosphorus: float = Field(..., ge=0.0, le=300.0, description="Phosphorus content in soil (P)")
    potassium: float = Field(..., ge=0.0, le=300.0, description="Potassium content in soil (K)")
    temperature: float = Field(..., ge=-10.0, le=60.0, description="Temperature in degree Celsius")
    humidity: float = Field(..., ge=0.0, le=100.0, description="Relative humidity in percentage")
    ph: float = Field(..., ge=0.0, le=14.0, description="Soil pH value (0-14)")
    rainfall: float = Field(..., ge=0.0, le=1000.0, description="Rainfall in mm")

    @model_validator(mode='before')
    @classmethod
    def handle_aliases(cls, data: Any) -> Any:
        if isinstance(data, dict):
            # Map N, P, K, pH aliases
            if 'N' in data and 'nitrogen' not in data:
                data['nitrogen'] = data['N']
            if 'P' in data and 'phosphorus' not in data:
                data['phosphorus'] = data['P']
            if 'K' in data and 'potassium' not in data:
                data['potassium'] = data['K']
            if 'pH' in data and 'ph' not in data:
                data['ph'] = data['pH']
        return data

class AlternativeCrop(BaseModel):
    crop: str
    confidence_pct: float

class PredictionResult(BaseModel):
    recommended_crop: str
    confidence_pct: float
    confidence_tier: str  # High, Moderate, Low
    top_alternatives: List[AlternativeCrop] = []

class CropRecommendationResponse(BaseModel):
    status: str = "success"
    prediction: PredictionResult
    input_received: Dict[str, float]

class HealthCheckResponse(BaseModel):
    status: str
    app_name: str
    version: str
    model_loaded: bool
    model_details: Optional[Dict[str, Any]] = None


