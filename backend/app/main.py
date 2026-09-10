import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .core.config import settings
from .api.v1.router import api_v1_router
from .ml.predictor import crop_predictor

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger("krishimitra.api")

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Ensure predictor artifacts are loaded
    logger.info("Initializing KrishiMitraAI Backend Application...")
    if not crop_predictor.is_loaded():
        logger.warning("Predictor model not loaded at startup; attempting reload...")
        crop_predictor._load_artifacts()
    if crop_predictor.is_loaded():
        logger.info("RandomForest crop recommendation model loaded successfully into memory.")
    else:
        logger.warning("Warning: Model artifact is missing or could not be loaded.")
    yield
    # Shutdown
    logger.info("Shutting down KrishiMitraAI Backend Application...")

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description=(
        "KrishiMitraAI provides intelligent crop recommendations powered by a Scikit-Learn "
        "RandomForestClassifier trained on empirical agricultural data, coupled with conservative "
        "statistical soil advisory summaries. Note: Model outputs represent statistical confidence "
        "distributions based on historical dataset distributions and not laboratory diagnostic guarantees."
    ),
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    docs_url=f"{settings.API_V1_STR}/docs",
    redoc_url=f"{settings.API_V1_STR}/redoc",
    lifespan=lifespan
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount API Routers
app.include_router(api_v1_router, prefix=settings.API_V1_STR)

@app.get("/", tags=["Root"])
async def root():
    return {
        "app": settings.PROJECT_NAME,
        "version": settings.VERSION,
        "docs": f"{settings.API_V1_STR}/docs",
        "health": f"{settings.API_V1_STR}/health",
        "predict_endpoint": f"{settings.API_V1_STR}/crop-recommendation/predict"
    }

@app.get("/health", tags=["Health"], include_in_schema=False)
async def health_alias():
    return {
        "status": "healthy" if crop_predictor.is_loaded() else "degraded",
        "app_name": settings.PROJECT_NAME,
        "version": settings.VERSION,
        "model_loaded": crop_predictor.is_loaded()
    }
