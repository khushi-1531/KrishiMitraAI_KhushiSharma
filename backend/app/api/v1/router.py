from fastapi import APIRouter
from .endpoints import health, crop, soil, market

api_v1_router = APIRouter()

api_v1_router.include_router(health.router, tags=["Health"])
api_v1_router.include_router(crop.router, tags=["Crop Recommendation"])
api_v1_router.include_router(soil.router, tags=["Soil Analysis"])
api_v1_router.include_router(market.router, tags=["Market Prices"])
