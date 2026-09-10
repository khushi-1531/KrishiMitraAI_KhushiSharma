import os
from pathlib import Path
from pydantic import BaseModel

class Settings(BaseModel):
    PROJECT_NAME: str = "KrishiMitraAI API"
    API_V1_STR: str = "/api/v1"
    VERSION: str = "1.0.0"
    
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
