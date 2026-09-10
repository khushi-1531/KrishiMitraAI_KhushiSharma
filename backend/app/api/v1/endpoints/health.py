from fastapi import APIRouter
from ....core.config import settings
from ....schemas.crop_schema import HealthCheckResponse
from ....ml.predictor import crop_predictor

router = APIRouter()

@router.get(
    "/health",
    response_model=HealthCheckResponse,
    summary="Service and ML model health check",
    description="Returns the status of the FastAPI service and the loading state of the crop recommendation ML model."
)
async def health_check() -> HealthCheckResponse:
    model_loaded = crop_predictor.is_loaded()
    return HealthCheckResponse(
        status="healthy" if model_loaded else "degraded",
        app_name=settings.PROJECT_NAME,
        version=settings.VERSION,
        model_loaded=model_loaded,
        model_details=crop_predictor.get_model_details()
    )
