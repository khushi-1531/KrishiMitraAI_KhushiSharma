from fastapi import APIRouter, status
from ....schemas.yield_schema import (
    YieldPredictionRequest,
    YieldPredictionResponse,
)
from ....ml.yield_predictor import yield_predictor

router = APIRouter()

@router.post(
    "/yield-prediction/predict",
    response_model=YieldPredictionResponse,
    status_code=status.HTTP_200_OK,
    summary="Predict crop yield using Random Forest ML model",
    description=(
        "Accepts 8 agronomic parameters (year, state, crop, season, area, annual_rainfall, fertilizer, pesticide) "
        "and evaluates the trained Random Forest model to predict crop yield per hectare."
    )
)
async def predict_yield(request: YieldPredictionRequest) -> YieldPredictionResponse:
    return yield_predictor.predict(request)
