import os
import json
import datetime
from pathlib import Path
import pandas as pd
import numpy as np
import joblib
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split, cross_val_score, StratifiedKFold
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix

from ..core.config import settings

def train_model():
    print("=" * 60)
    print("Starting KrishiMitraAI Crop Recommendation Model Training")
    print("=" * 60)

    # 1. Resolve dataset path
    dataset_path = settings.get_dataset_path()
    print(f"Loading dataset from: {dataset_path}")
    if not dataset_path.exists():
        raise FileNotFoundError(f"Dataset not found at {dataset_path}")

    df = pd.read_csv(dataset_path)
    print(f"Dataset loaded successfully. Shape: {df.shape}")

    feature_cols = ['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall']
    target_col = 'label'

    # Check required columns
    for col in feature_cols + [target_col]:
        if col not in df.columns:
            raise ValueError(f"Missing expected column in dataset: {col}")

    X = df[feature_cols]
    y = df[target_col]

    unique_classes = sorted(y.unique().tolist())
    print(f"Features: {feature_cols}")
    print(f"Total Target Classes ({len(unique_classes)}): {unique_classes}")

    # 2. Train/Test Split (80% Train, 20% Test with Stratification)
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )
    print(f"Training samples: {X_train.shape[0]}, Test samples: {X_test.shape[0]}")

    # 3. Model Definition & Training
    rf_model = RandomForestClassifier(
        n_estimators=100,
        random_state=42,
        n_jobs=-1
    )
    
    print("\nTraining RandomForestClassifier...")
    rf_model.fit(X_train, y_train)
    print("Model training complete.")

    # 4. Evaluation on Holdout Test Set
    y_pred = rf_model.predict(X_test)
    test_accuracy = float(accuracy_score(y_test, y_pred))
    
    clf_report = classification_report(y_test, y_pred, output_dict=True, zero_division=0)
    conf_matrix = confusion_matrix(y_test, y_pred).tolist()

    # 5. Stratified 5-Fold Cross Validation
    cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
    cv_scores = cross_val_score(rf_model, X, y, cv=cv, scoring='accuracy')
    cv_mean = float(cv_scores.mean())
    cv_std = float(cv_scores.std())

    print("\n" + "=" * 40)
    print("EVALUATION RESULTS (Objective Calculation)")
    print("=" * 40)
    print(f"Holdout Test Accuracy: {test_accuracy * 100:.2f}%")
    print(f"Stratified 5-Fold CV Mean Accuracy: {cv_mean * 100:.2f}% (+/- {cv_std * 100:.2f}%)")
    print(f"Macro F1-Score: {clf_report['macro avg']['f1-score']:.4f}")
    print(f"Weighted F1-Score: {clf_report['weighted avg']['f1-score']:.4f}")

    # 6. Feature Importances
    feature_importances = {
        col: float(imp) for col, imp in zip(feature_cols, rf_model.feature_importances_)
    }
    sorted_importances = sorted(feature_importances.items(), key=lambda item: item[1], reverse=True)
    print("\nFeature Importances:")
    for feat, imp in sorted_importances:
        print(f"  - {feat:12s}: {imp:.4f}")

    # 7. Serialize Artifacts
    artifacts_dir = settings.ARTIFACTS_DIR
    artifacts_dir.mkdir(parents=True, exist_ok=True)

    model_save_path = settings.MODEL_PATH
    joblib.dump(rf_model, model_save_path)
    print(f"\nTrained model artifact saved to: {model_save_path}")

    metadata = {
        "model_type": "RandomForestClassifier",
        "n_estimators": 100,
        "random_state": 42,
        "trained_at": datetime.datetime.now(datetime.timezone.utc).isoformat(),
        "dataset_source": str(dataset_path),
        "total_dataset_records": int(len(df)),
        "train_samples": int(len(X_train)),
        "test_samples": int(len(X_test)),
        "features": feature_cols,
        "classes": unique_classes,
        "num_classes": len(unique_classes),
        "metrics": {
            "test_accuracy": test_accuracy,
            "cv_5fold_mean": cv_mean,
            "cv_5fold_std": cv_std,
            "macro_precision": float(clf_report['macro avg']['precision']),
            "macro_recall": float(clf_report['macro avg']['recall']),
            "macro_f1": float(clf_report['macro avg']['f1-score']),
            "weighted_f1": float(clf_report['weighted avg']['f1-score']),
        },
        "feature_importances": feature_importances,
        "per_class_metrics": {
            c: {
                "precision": float(clf_report[c]["precision"]),
                "recall": float(clf_report[c]["recall"]),
                "f1-score": float(clf_report[c]["f1-score"]),
                "support": int(clf_report[c]["support"])
            }
            for c in unique_classes if c in clf_report
        }
    }

    metadata_save_path = settings.METADATA_PATH
    with open(metadata_save_path, "w", encoding="utf-8") as f:
        json.dump(metadata, f, indent=2)
    print(f"Model metadata & evaluation metrics saved to: {metadata_save_path}")
    print("=" * 60)
    print("Training Pipeline Successfully Completed!")
    print("=" * 60)

if __name__ == "__main__":
    train_model()
