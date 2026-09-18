import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Sprout,
  Thermometer,
  ArrowRight,
  RotateCcw,
  AlertCircle,
  CheckCircle2,
  Info,
  Layers,
  Sparkles,
  ArrowLeft,
  ChevronRight,
} from "lucide-react";
import { predictCropRecommendation } from "../services/cropApi";

const PRESETS = [
  {
    name: "Rice Profile",
    data: {
      nitrogen: 90,
      phosphorus: 42,
      potassium: 43,
      temperature: 20.87,
      humidity: 82.0,
      ph: 6.5,
      rainfall: 202.93,
    },
  },
  {
    name: "Maize Profile",
    data: {
      nitrogen: 80,
      phosphorus: 48,
      potassium: 20,
      temperature: 24.5,
      humidity: 65.0,
      ph: 6.2,
      rainfall: 95.0,
    },
  },
  {
    name: "Cotton Profile",
    data: {
      nitrogen: 120,
      phosphorus: 45,
      potassium: 22,
      temperature: 26.0,
      humidity: 78.0,
      ph: 7.2,
      rainfall: 80.0,
    },
  },
];

const INITIAL_FORM = {
  nitrogen: "",
  phosphorus: "",
  potassium: "",
  temperature: "",
  humidity: "",
  ph: "",
  rainfall: "",
};

function CropRecommendation() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [result, setResult] = useState(null);

  const validateField = (name, value) => {
    if (value === "" || value === null || value === undefined) {
      return "This field is required";
    }
    const num = Number(value);
    if (isNaN(num)) {
      return "Must be a valid numeric value";
    }

    switch (name) {
      case "nitrogen":
      case "phosphorus":
      case "potassium":
        if (num < 0 || num > 300) return "Valid range is 0 to 300";
        break;
      case "temperature":
        if (num < -10 || num > 60) return "Valid range is -10°C to 60°C";
        break;
      case "humidity":
        if (num < 0 || num > 100) return "Valid range is 0% to 100%";
        break;
      case "ph":
        if (num < 0 || num > 14) return "Valid range is 0 to 14 pH";
        break;
      case "rainfall":
        if (num < 0 || num > 1000) return "Valid range is 0 to 1000 mm";
        break;
      default:
        break;
    }
    return null;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      const err = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: err }));
    }
  };

  const handlePresetSelect = (preset) => {
    setFormData({
      nitrogen: preset.data.nitrogen !== undefined ? preset.data.nitrogen.toString() : "",
      phosphorus: preset.data.phosphorus !== undefined ? preset.data.phosphorus.toString() : "",
      potassium: preset.data.potassium !== undefined ? preset.data.potassium.toString() : "",
      temperature: preset.data.temperature !== undefined ? preset.data.temperature.toString() : "",
      humidity: preset.data.humidity !== undefined ? preset.data.humidity.toString() : "",
      ph: preset.data.ph !== undefined ? preset.data.ph.toString() : "",
      rainfall: preset.data.rainfall !== undefined ? preset.data.rainfall.toString() : "",
    });
    setErrors({});
    setApiError(null);
  };

  const handleReset = () => {
    setFormData(INITIAL_FORM);
    setErrors({});
    setApiError(null);
    setResult(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError(null);

    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const err = validateField(key, formData[key]);
      if (err) newErrors[key] = err;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      const response = await predictCropRecommendation(formData);
      setResult(response);
      // Scroll to result smoothly on mobile
      setTimeout(() => {
        const resElem = document.getElementById("recommendation-result");
        if (resElem) {
          resElem.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    } catch (err) {
      setApiError(err.message || "Failed to process crop recommendation");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="crop-page-wrapper">
      {/* Header Banner */}
      <div className="crop-header-container">
        <div className="crop-breadcrumb">
          <Link to="/" className="breadcrumb-link">
            <ArrowLeft size={16} />
            {t("navbar.home", "Home")}
          </Link>
          <ChevronRight size={14} className="breadcrumb-separator" />
          <span className="breadcrumb-current">
            {t("services.cropRecommendation.title", "Crop Recommendation")}
          </span>
        </div>

        <div className="crop-title-section">
          <div className="badge-pill">
            <Sparkles size={16} />
            <span>AI Agricultural Intelligence</span>
          </div>
          <h1>{t("services.cropRecommendation.title", "Crop Recommendation Engine")}</h1>
          <p>
            Enter your field&apos;s soil nutrient parameters and environmental measurements to receive
            data-driven crop suggestions powered by machine learning.
          </p>
        </div>
      </div>

      <div className="crop-content-layout">
        {/* Left Column: Form & Presets */}
        <div className="crop-form-card">
          <div className="card-header-row">
            <div>
              <h2>Soil & Climate Parameters</h2>
              <p className="card-subtext">Provide 7 environmental and soil readings</p>
            </div>
            <button
              type="button"
              className="reset-btn-secondary"
              onClick={handleReset}
              title="Reset all fields"
            >
              <RotateCcw size={15} />
              <span>Reset</span>
            </button>
          </div>

          {/* Quick Preset Buttons */}
          <div className="presets-container">
            <span className="presets-label">
              <Info size={14} /> Quick Samples:
            </span>
            <div className="preset-buttons">
              {PRESETS.map((p, idx) => (
                <button
                  key={idx}
                  type="button"
                  className="preset-tag"
                  onClick={() => handlePresetSelect(p)}
                >
                  {p.name}
                </button>
              ))}
            </div>
          </div>

          {apiError && (
            <div className="alert-box alert-error">
              <AlertCircle size={20} className="alert-icon" />
              <div className="alert-content">
                <strong>Recommendation Request Failed</strong>
                <p>{apiError}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            {/* Section A: Soil Macronutrients */}
            <div className="form-group-section">
              <div className="section-title-row">
                <Sprout size={18} className="section-icon" />
                <h3>Soil Macronutrients & pH</h3>
              </div>

              <div className="form-grid-2">
                <div className="input-field-group">
                  <label htmlFor="nitrogen">
                    Nitrogen (N) <span className="unit-tag">kg/ha (0-300)</span>
                  </label>
                  <div className="input-with-icon">
                    <input
                      id="nitrogen"
                      name="nitrogen"
                      type="number"
                      step="any"
                      placeholder="e.g. 90"
                      value={formData.nitrogen}
                      onChange={handleChange}
                      className={errors.nitrogen ? "input-error" : ""}
                    />
                  </div>
                  {errors.nitrogen && <span className="field-error-text">{errors.nitrogen}</span>}
                </div>

                <div className="input-field-group">
                  <label htmlFor="phosphorus">
                    Phosphorus (P) <span className="unit-tag">kg/ha (0-300)</span>
                  </label>
                  <div className="input-with-icon">
                    <input
                      id="phosphorus"
                      name="phosphorus"
                      type="number"
                      step="any"
                      placeholder="e.g. 42"
                      value={formData.phosphorus}
                      onChange={handleChange}
                      className={errors.phosphorus ? "input-error" : ""}
                    />
                  </div>
                  {errors.phosphorus && (
                    <span className="field-error-text">{errors.phosphorus}</span>
                  )}
                </div>

                <div className="input-field-group">
                  <label htmlFor="potassium">
                    Potassium (K) <span className="unit-tag">kg/ha (0-300)</span>
                  </label>
                  <div className="input-with-icon">
                    <input
                      id="potassium"
                      name="potassium"
                      type="number"
                      step="any"
                      placeholder="e.g. 43"
                      value={formData.potassium}
                      onChange={handleChange}
                      className={errors.potassium ? "input-error" : ""}
                    />
                  </div>
                  {errors.potassium && <span className="field-error-text">{errors.potassium}</span>}
                </div>

                <div className="input-field-group">
                  <label htmlFor="ph">
                    Soil pH <span className="unit-tag">Scale 0 - 14</span>
                  </label>
                  <div className="input-with-icon">
                    <input
                      id="ph"
                      name="ph"
                      type="number"
                      step="0.01"
                      placeholder="e.g. 6.5"
                      value={formData.ph}
                      onChange={handleChange}
                      className={errors.ph ? "input-error" : ""}
                    />
                  </div>
                  {errors.ph && <span className="field-error-text">{errors.ph}</span>}
                </div>
              </div>
            </div>

            {/* Section B: Environmental Conditions */}
            <div className="form-group-section">
              <div className="section-title-row">
                <Thermometer size={18} className="section-icon" />
                <h3>Climate & Environmental Conditions</h3>
              </div>

              <div className="form-grid-3">
                <div className="input-field-group">
                  <label htmlFor="temperature">
                    Temperature <span className="unit-tag">°C (-10 to 60)</span>
                  </label>
                  <div className="input-with-icon">
                    <input
                      id="temperature"
                      name="temperature"
                      type="number"
                      step="0.1"
                      placeholder="e.g. 20.8"
                      value={formData.temperature}
                      onChange={handleChange}
                      className={errors.temperature ? "input-error" : ""}
                    />
                  </div>
                  {errors.temperature && (
                    <span className="field-error-text">{errors.temperature}</span>
                  )}
                </div>

                <div className="input-field-group">
                  <label htmlFor="humidity">
                    Humidity <span className="unit-tag">% (0 to 100)</span>
                  </label>
                  <div className="input-with-icon">
                    <input
                      id="humidity"
                      name="humidity"
                      type="number"
                      step="0.1"
                      placeholder="e.g. 82.0"
                      value={formData.humidity}
                      onChange={handleChange}
                      className={errors.humidity ? "input-error" : ""}
                    />
                  </div>
                  {errors.humidity && <span className="field-error-text">{errors.humidity}</span>}
                </div>

                <div className="input-field-group">
                  <label htmlFor="rainfall">
                    Rainfall <span className="unit-tag">mm (0 to 1000)</span>
                  </label>
                  <div className="input-with-icon">
                    <input
                      id="rainfall"
                      name="rainfall"
                      type="number"
                      step="0.1"
                      placeholder="e.g. 202.9"
                      value={formData.rainfall}
                      onChange={handleChange}
                      className={errors.rainfall ? "input-error" : ""}
                    />
                  </div>
                  {errors.rainfall && <span className="field-error-text">{errors.rainfall}</span>}
                </div>
              </div>
            </div>

            {/* Submit CTA */}
            <div className="form-actions">
              <button
                type="submit"
                id="crop-recommendation-submit-btn"
                disabled={loading}
                className={`submit-recommendation-btn ${loading ? "btn-loading" : ""}`}
              >
                {loading ? (
                  <>
                    <span className="spinner-indicator"></span>
                    Evaluating Soil & Climate Model...
                  </>
                ) : (
                  <>
                    <Sprout size={18} />
                    Get AI Recommendation
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: Results or Guide Placeholder */}
        <div className="crop-result-column" id="recommendation-result">
          {result && result.prediction ? (
            <div className="results-container animate-fade-in">
              {/* Primary Crop Card */}
              <div className="primary-crop-card">
                <div className="primary-crop-badge">
                  <CheckCircle2 size={16} />
                  <span>Primary Recommendation</span>
                </div>

                <div className="crop-hero-content">
                  <div className="crop-avatar">
                    <Sprout size={36} />
                  </div>
                  <div className="crop-title-group">
                    <h2 className="recommended-crop-name">
                      {result.prediction.recommended_crop.toUpperCase()}
                    </h2>
                    <span className="crop-sublabel">Optimal match for your input profile</span>
                  </div>
                </div>

                <div className="confidence-meter-box">
                  <div className="confidence-header">
                    <span className="confidence-label">Model Statistical Probability</span>
                    <span className="confidence-percentage">
                      {result.prediction.confidence_pct.toFixed(1)}%
                    </span>
                  </div>
                  <div className="confidence-progress-bar">
                    <div
                      className="confidence-fill"
                      style={{ width: `${Math.min(result.prediction.confidence_pct, 100)}%` }}
                    ></div>
                  </div>
                  <div className="tier-row">
                    <span
                      className={`tier-badge tier-${result.prediction.confidence_tier.toLowerCase()}`}
                    >
                      {result.prediction.confidence_tier} Confidence Tier
                    </span>
                    <span className="probability-note">
                      *Output represents statistical model scoring over reference datasets.
                    </span>
                  </div>
                </div>
              </div>

              {/* Alternative Crops */}
              {result.prediction.top_alternatives &&
                result.prediction.top_alternatives.length > 0 && (
                  <div className="alternatives-card">
                    <div className="card-mini-title">
                      <Layers size={16} />
                      <h3>Alternative Crop Candidates</h3>
                    </div>
                    <div className="alternatives-grid">
                      {result.prediction.top_alternatives.map((alt, idx) => (
                        <div key={idx} className="alt-crop-item">
                          <span className="alt-crop-name">
                            {alt.crop.charAt(0).toUpperCase() + alt.crop.slice(1)}
                          </span>
                          <span className="alt-crop-score">{alt.confidence_pct.toFixed(1)}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
            </div>
          ) : (
            <div className="empty-state-guide">
              <div className="guide-icon-circle">
                <Sprout size={32} />
              </div>
              <h3>Ready for Analysis</h3>
              <p>
                Fill out the 7 soil and climate parameters on the left or select a quick sample
                profile to run the recommendation engine.
              </p>
              <div className="guide-steps">
                <div className="guide-step-item">
                  <span className="step-num">1</span>
                  <span>Input field N-P-K nutrient readings & soil pH</span>
                </div>
                <div className="guide-step-item">
                  <span className="step-num">2</span>
                  <span>Enter temperature, humidity, and rainfall conditions</span>
                </div>
                <div className="guide-step-item">
                  <span className="step-num">3</span>
                  <span>Obtain AI-evaluated crop recommendations</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CropRecommendation;
