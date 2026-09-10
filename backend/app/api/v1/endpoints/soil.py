from fastapi import APIRouter, status
from ....schemas.crop_schema import (
    SoilAnalysisRequest,
    SoilAdvisoryResponse,
)
from ....ml.soil_advisory import generate_soil_advisory

router = APIRouter()

@router.post(
    "/soil-analysis/analyze",
    response_model=SoilAdvisoryResponse,
    status_code=status.HTTP_200_OK,
    summary="Evaluate soil health metrics and generate diagnostic advisory report",
    description=(
        "Accepts core soil macronutrients (N, P, K, pH) and optional secondary physicochemical parameters "
        "(EC, OC, CaCO3), evaluating soil health, nutrient status, and balanced diagnostic observations "
        "derived directly from dataset distributions without requiring crop or climate features."
    )
)
async def analyze_soil(request: SoilAnalysisRequest) -> SoilAdvisoryResponse:
    return generate_soil_advisory(
        n=request.nitrogen,
        p=request.phosphorus,
        k=request.potassium,
        ph_val=request.ph,
        ec=request.ec,
        oc=request.oc,
        caco3=request.caco3
    )
