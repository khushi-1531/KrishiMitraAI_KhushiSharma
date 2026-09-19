import os
import json
import datetime
from pathlib import Path
import pandas as pd
import numpy as np
import joblib

from sklearn.ensemble import RandomForestRegressor
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.pipeline import Pipeline
from sklearn.metrics import r2_score, mean_absolute_error, mean_squared_error

from ..core.config import settings

def train_yield_model():
    print("=" * 65)
    print("Starting KrishiMitraAI Yield Prediction Model Training")
    print("=" * 65)

    # 1. Locate dataset files
    project_root = settings.PROJECT_ROOT
    train_path = project_root / "datasets" / "train-00000-of-00001.parquet"
    test_path = project_root / "datasets" / "test-00000-of-00001.parquet"

    print(f"Loading training dataset from: {train_path}")
    print(f"Loading testing dataset from:  {test_path}")

    if not train_path.exists():
        raise FileNotFoundError(f"Training dataset not found at {train_path}")
    if not test_path.exists():
        raise FileNotFoundError(f"Testing dataset not found at {test_path}")

    df_train = pd.read_parquet(train_path)
    df_test = pd.read_parquet(test_path)

    print(f"Train samples loaded: {df_train.shape[0]} rows, {df_train.shape[1]} columns")
    print(f"Test samples loaded:  {df_test.shape[0]} rows, {df_test.shape[1]} columns")

    # 2. Features and Target Definition (STRICT: Production EXCLUDED to prevent target leakage)
    categorical_features = ['State', 'Crop', 'Season']
    numerical_features = ['Year', 'Area', 'Annual_Rainfall', 'Fertilizer', 'Pesticide']
    feature_cols = ['Year', 'State', 'Crop', 'Season', 'Area', 'Annual_Rainfall', 'Fertilizer', 'Pesticide']
    target_col = 'Yield'

    print(f"\nTarget Variable: {target_col}")
    print(f"Input Features ({len(feature_cols)}): {feature_cols}")
    print(f"Categorical Features: {categorical_features}")
    print(f"Numerical Features:   {numerical_features}")
    print("[LEAKAGE CHECK] 'Production' is strictly EXCLUDED from feature set.")

    # Validate presence of columns
    for col in feature_cols + [target_col]:
        if col not in df_train.columns:
            raise ValueError(f"Missing column in train set: {col}")
        if col not in df_test.columns:
            raise ValueError(f"Missing column in test set: {col}")

    X_train = df_train[feature_cols]
    y_train = df_train[target_col]

    X_test = df_test[feature_cols]
    y_test = df_test[target_col]

    # 3. Preprocessing Pipeline Definition
    preprocessor = ColumnTransformer(
        transformers=[
            ('num', StandardScaler(), numerical_features),
            ('cat', OneHotEncoder(handle_unknown='ignore', sparse_output=False), categorical_features),
        ],
        remainder='drop'
    )

    # 4. Complete Pipeline Definition (Preprocessing + Regressor)
    pipeline = Pipeline(steps=[
        ('preprocessor', preprocessor),
        ('regressor', RandomForestRegressor(
            n_estimators=200,
            min_samples_split=5,
            min_samples_leaf=2,
            random_state=42,
            n_jobs=2
        ))
    ])

    # 5. Train Model
    print(f"\nTraining RandomForestRegressor(n_estimators=200, random_state=42) on {len(X_train)} samples...")
    start_time = datetime.datetime.now()
    pipeline.fit(X_train, y_train)
    training_duration = (datetime.datetime.now() - start_time).total_seconds()
    print(f"Training completed in {training_duration:.2f} seconds.")

    # 6. Evaluation on Official Hold-Out Test Set
    print("\nEvaluating on official hold-out test set...")
    y_pred_test = pipeline.predict(X_test)
    y_pred_train = pipeline.predict(X_train)

    test_r2 = float(r2_score(y_test, y_pred_test))
    test_mae = float(mean_absolute_error(y_test, y_pred_test))
    test_rmse = float(np.sqrt(mean_squared_error(y_test, y_pred_test)))

    train_r2 = float(r2_score(y_train, y_pred_train))
    train_mae = float(mean_absolute_error(y_train, y_pred_train))
    train_rmse = float(np.sqrt(mean_squared_error(y_train, y_pred_train)))

    print("\n" + "=" * 50)
    print("EVALUATION METRICS (Hold-Out Test Set)")
    print("=" * 50)
    print(f"Test R² Score: {test_r2:.4f}")
    print(f"Test MAE:      {test_mae:.4f}")
    print(f"Test RMSE:     {test_rmse:.4f}")
    print("-" * 50)
    print(f"Train R²:      {train_r2:.4f} | Train MAE: {train_mae:.4f} | Train RMSE: {train_rmse:.4f}")
    print("=" * 50)

    # 7. Serialize Pipeline Artifact
    artifacts_dir = settings.ARTIFACTS_DIR
    artifacts_dir.mkdir(parents=True, exist_ok=True)

    model_save_path = settings.YIELD_MODEL_PATH
    joblib.dump(pipeline, model_save_path, compress=3)
    print(f"\nTrained Yield Prediction pipeline artifact saved to:\n  {model_save_path}")

    # 8. Save Model Metadata
    metadata = {
        "model_type": "RandomForestRegressor",
        "n_estimators": 200,
        "random_state": 42,
        "target_col": target_col,
        "feature_cols": feature_cols,
        "categorical_features": categorical_features,
        "numerical_features": numerical_features,
        "train_rows": len(df_train),
        "test_rows": len(df_test),
        "trained_at": datetime.datetime.now().isoformat(),
        "training_duration_seconds": round(training_duration, 2),
        "metrics": {
            "test_r2": round(test_r2, 4),
            "test_mae": round(test_mae, 4),
            "test_rmse": round(test_rmse, 4),
            "train_r2": round(train_r2, 4),
            "train_mae": round(train_mae, 4),
            "train_rmse": round(train_rmse, 4)
        },
        "dataset_notes": {
            "source": "train-00000-of-00001.parquet and test-00000-of-00001.parquet",
            "leakage_prevention": "Production column strictly excluded from inputs",
            "extension_records_2021_2026": (
                "Years 2021-2026 were identified during data inspection as benchmark/projected "
                "extension records rather than verified field observations, kept for trend coverage."
            ),
            "crop_scale_handling": (
                "Coconut yield scale (measured in nuts/hectare up to 21,000) is natively handled "
                "alongside field crops (tonnes/hectare) using Random Forest multi-split trees."
            )
        },
        "unique_categories": {
            "states": sorted(df_train['State'].unique().tolist()),
            "crops": sorted(df_train['Crop'].unique().tolist()),
            "seasons": sorted(df_train['Season'].unique().tolist())
        }
    }

    metadata_save_path = settings.YIELD_METADATA_PATH
    with open(metadata_save_path, "w", encoding="utf-8") as f:
        json.dump(metadata, f, indent=2)
    print(f"Model metadata saved to:\n  {metadata_save_path}")

    return metadata

if __name__ == "__main__":
    train_yield_model()
