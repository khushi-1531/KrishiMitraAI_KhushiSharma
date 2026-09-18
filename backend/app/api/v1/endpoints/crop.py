from fastapi import APIRouter, status
from ....schemas.crop_schema import (
    CropRecommendationRequest,
    CropRecommendationResponse,
)
from ....ml.predictor import crop_predictor

router = APIRouter()

@router.post(
    "/crop-recommendation/predict",
    response_model=CropRecommendationResponse,
    status_code=status.HTTP_200_OK,
    summary="Predict optimal crop recommendation using ML model",
    description=(
        "Accepts 7 soil and climate features (N, P, K, temperature, humidity, pH, rainfall) "
        "and evaluates the trained Random Forest model to recommend the most suitable crop with probability distribution."
    )
)
async def predict_crop(request: CropRecommendationRequest) -> CropRecommendationResponse:
    return crop_predictor.predict(request)
