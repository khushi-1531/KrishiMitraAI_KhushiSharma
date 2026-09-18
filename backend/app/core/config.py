import os
from pathlib import Path
from pydantic import BaseModel

# Load .env file into os.environ if present
def _load_env():
    candidates = [
        Path(__file__).resolve().parent.parent.parent / ".env",
        Path(__file__).resolve().parent.parent.parent.parent / ".env",
    ]
    for env_file in candidates:
        if env_file.exists():
            try:
                with open(env_file, "r", encoding="utf-8") as f:
                    for line in f:
                        line = line.strip()
                        if not line or line.startswith("#") or "=" not in line:
                            continue
                        k, v = line.split("=", 1)
                        k = k.strip()
                        v = v.strip().strip('"').strip("'")
                        if k and k not in os.environ:
                            os.environ[k] = v
            except Exception:
                pass

_load_env()

class Settings(BaseModel):
    PROJECT_NAME: str = "KrishiMitraAI API"
    API_V1_STR: str = "/api/v1"
    VERSION: str = "1.0.0"

    # Official Government of India Mandi Prices API config
    MANDI_API_KEY: str = os.getenv("MANDI_API_KEY", "")
    MANDI_API_BASE_URL: str = "https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070"
    MANDI_CACHE_TTL_SECONDS: int = 1800  # 30-minute in-memory cache
    
    # Path configurations
    BASE_DIR: Path = Path(__file__).resolve().parent.parent.parent
    PROJECT_ROOT: Path = BASE_DIR.parent
    
    # Dataset search locations in priority order
    DATASET_FILENAME: str = "Crop_recommendation.csv"
    
    # Artifact directory for ML model and metadata
    ARTIFACTS_DIR: Path = BASE_DIR / "app" / "ml" / "artifacts"
    MODEL_PATH: Path = ARTIFACTS_DIR / "crop_rf_model.joblib"
    METADATA_PATH: Path = ARTIFACTS_DIR / "model_metadata.json"
    
    # CORS settings
    CORS_ORIGINS: list[str] = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "*"
    ]


    def get_dataset_path(self) -> Path:
        """Finds the dataset across possible workspace locations."""
        candidates = [
            self.PROJECT_ROOT / "datasets" / self.DATASET_FILENAME,
            self.PROJECT_ROOT / "data" / self.DATASET_FILENAME,
            self.BASE_DIR / "datasets" / self.DATASET_FILENAME,
            self.PROJECT_ROOT.parent / "data" / self.DATASET_FILENAME,
        ]
        for candidate in candidates:
            if candidate.exists():
                return candidate
        # Fallback to default
        return self.PROJECT_ROOT / "datasets" / self.DATASET_FILENAME

settings = Settings()
