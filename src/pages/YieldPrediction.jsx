import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  TrendingUp,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  AlertCircle,
  CheckCircle2,
  Info,
  Layers,
  MapPin,
  Calendar,
  Sprout,
  Droplets,
  FlaskConical,
  Bug,
  HelpCircle,
} from "lucide-react";
import { predictCropYield } from "../services/yieldApi";
import "./YieldPrediction.css";

const STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir",
  "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra",
  "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Puducherry",
  "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

const CROPS = [
  "Arecanut", "Arhar/Tur", "Bajra", "Banana", "Barley", "Black pepper",
  "Cardamom", "Cashewnut", "Castor seed", "Coconut", "Coriander", "Cotton(lint)",
  "Cowpea(Lobia)", "Dry chillies", "Garlic", "Ginger", "Gram", "Grapes",
  "Groundnut", "Guar seed", "Horse-gram", "Jowar", "Jute", "Khesari",
  "Lentil", "Linseed", "Maize", "Mango", "Masoor", "Mesta", "Moong",
  "Moong(Green Gram)", "Moth", "Mustard", "Niger seed", "Oilseeds total",
  "Onion", "Other  Rabi pulses", "Other Cereals", "Other Kharif pulses",
  "Other Summer Pulses", "Peas & beans (Pulses)", "Potato", "Ragi",
  "Rapeseed &Mustard", "Rice", "Rubber", "Safflower", "Sannhamp", "Sesamum",
  "Small millets", "Soyabean", "Sugarcane", "Sunflower", "Sweet potato",
  "Tapioca", "Tobacco", "Tomato", "Turmeric", "Urad", "Wheat", "other oilseeds"
];

const SEASONS = [
  "Autumn", "Kharif", "Rabi", "Summer", "Whole Year", "Winter"
];

const PRESETS = [
  {
    name: "Wheat (Punjab)",
    badge: "Rabi Cereal",
    data: {
      year: 2024,
      state: "Punjab",
      crop: "Wheat",
      season: "Rabi",
      area: 2500,
      annual_rainfall: 650,
      fertilizer: 350000,
      pesticide: 950,
    },
  },
  {
    name: "Jowar (West Bengal)",
    badge: "Kharif Millet",
    data: {
      year: 2024,
      state: "West Bengal",
      crop: "Jowar",
      season: "Kharif",
      area: 600,
      annual_rainfall: 1650,
      fertilizer: 99000,
      pesticide: 260,
    },
  },
  {
    name: "Sweet Potato (Meghalaya)",
    badge: "Tuber Crop",
    data: {
      year: 2024,
      state: "Meghalaya",
      crop: "Sweet potato",
      season: "Whole Year",
      area: 4400,
      annual_rainfall: 3200,
      fertilizer: 740000,
      pesticide: 1750,
    },
  },
  {
    name: "Coconut (Andhra Pradesh)",
    badge: "Plantation (Nuts/ha)",
    data: {
      year: 2024,
      state: "Andhra Pradesh",
      crop: "Coconut",
      season: "Whole Year",
      area: 95000,
      annual_rainfall: 1050,
      fertilizer: 12000000,
      pesticide: 30000,
    },
  },
];

const INITIAL_FORM = {
  year: 2024,
  state: "",
  crop: "",
  season: "",
  area: "",
  annual_rainfall: "",
  fertilizer: "",
  pesticide: "",
};

function YieldPrediction() {
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

    if (name === "state" || name === "crop" || name === "season") {
      if (typeof value !== "string" || !value.trim()) {
        return "Please select a valid option";
      }
      return null;
    }

    const num = Number(value);
    if (isNaN(num)) {
      return "Must be a valid number";
    }

    switch (name) {
      case "year":
        if (num < 0) return "Year cannot be negative";
        if (num < 1990 || num > 2035) return "Year should be between 1990 and 2035";
        break;
      case "area":
        if (num < 0) return "Area cannot be negative";
        if (num === 0) return "Area must be greater than 0 hectares";
        break;
      case "annual_rainfall":
        if (num < 0) return "Rainfall cannot be negative";
        break;
      case "fertilizer":
        if (num < 0) return "Fertilizer quantity cannot be negative";
        break;
      case "pesticide":
        if (num < 0) return "Pesticide quantity cannot be negative";
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
      const fieldError = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: fieldError }));
    }
    if (apiError) setApiError(null);
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const fieldError = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: fieldError }));
  };

  const handlePresetSelect = (preset) => {
    setFormData({ ...preset.data });
    setErrors({});
    setApiError(null);
    setResult(null);
  };

  const handleReset = () => {
    setFormData(INITIAL_FORM);
    setErrors({});
    setApiError(null);
    setResult(null);
  };

  const validateAll = () => {
    const newErrors = {};
    Object.keys(INITIAL_FORM).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });
    setErrors(newErrors);
    return {
      isValid: Object.keys(newErrors).length === 0,
      errors: newErrors,
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError(null);

    const { isValid, errors: validationErrors } = validateAll();
    if (!isValid) {
      const firstErrorKey = Object.keys(validationErrors)[0];
      const el = document.querySelector(`[name="${firstErrorKey}"]`);
      if (el) el.focus();
      return;
    }

    setLoading(true);

    try {
      const data = await predictCropYield(formData);
      setResult(data);
      // Smoothly scroll to result container
      setTimeout(() => {
        const resElem = document.getElementById("yield-result-section");
        if (resElem) resElem.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch (err) {
      setApiError(err.message || "Failed to predict crop yield. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="yield-page">
      {/* Header Container */}
      <div className="yield-header">
        <div className="yield-breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <span>Yield Prediction</span>
        </div>

        <div className="yield-title-wrap">
          <div className="yield-badge">
            <Sparkles size={16} />
            <span>AI Agricultural Analytics</span>
          </div>
          <h1 className="yield-title">Yield Prediction</h1>
          <p className="yield-subtitle">
            Estimate crop yield using crop, location, season, area and agricultural factors.
          </p>
        </div>
      </div>

      <div className="yield-content-container">
        {/* Quick-fill Sample Presets */}
        <div className="yield-presets-box">
          <div className="presets-header">
            <Layers size={18} />
            <span>Quick Sample Profiles (Click to Auto-fill)</span>
          </div>
          <div className="presets-grid">
            {PRESETS.map((preset, idx) => (
              <button
                key={idx}
                type="button"
                className="preset-btn"
                onClick={() => handlePresetSelect(preset)}
              >
                <span className="preset-name">{preset.name}</span>
                <span className="preset-badge">{preset.badge}</span>
              </button>
            ))}
          </div>
        </div>

        {/* API Error Notification */}
        {apiError && (
          <div className="yield-error-banner" role="alert">
            <AlertCircle size={20} />
            <div className="yield-error-content">
              <strong>Prediction Request Notice:</strong>
              <p>{apiError}</p>
            </div>
            <button
              type="button"
              className="error-dismiss-btn"
              onClick={() => setApiError(null)}
            >
              ×
            </button>
          </div>
        )}

        {/* Main Input Form Card */}
        <div className="yield-form-card">
          <form onSubmit={handleSubmit} noValidate>
            <div className="form-section-title">
              <Sprout size={20} />
              <h3>Farm & Agricultural Parameters</h3>
            </div>

            <div className="form-grid">
              {/* Year */}
              <div className={`form-group ${errors.year ? "has-error" : ""}`}>
                <label htmlFor="input-year">
                  <Calendar size={15} />
                  <span>Harvest Year</span>
                  <span className="required-star">*</span>
                </label>
                <input
                  type="number"
                  id="input-year"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="e.g. 2024"
                  min="1990"
                  max="2035"
                />
                {errors.year && <span className="error-text">{errors.year}</span>}
              </div>

              {/* State */}
              <div className={`form-group ${errors.state ? "has-error" : ""}`}>
                <label htmlFor="select-state">
                  <MapPin size={15} />
                  <span>State / Union Territory</span>
                  <span className="required-star">*</span>
                </label>
                <select
                  id="select-state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option value="">-- Select State --</option>
                  {STATES.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
                {errors.state && <span className="error-text">{errors.state}</span>}
              </div>

              {/* Crop */}
              <div className={`form-group ${errors.crop ? "has-error" : ""}`}>
                <label htmlFor="select-crop">
                  <Sprout size={15} />
                  <span>Crop</span>
                  <span className="required-star">*</span>
                </label>
                <select
                  id="select-crop"
                  name="crop"
                  value={formData.crop}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option value="">-- Select Crop --</option>
                  {CROPS.map((cr) => (
                    <option key={cr} value={cr}>
                      {cr}
                    </option>
                  ))}
                </select>
                {errors.crop && <span className="error-text">{errors.crop}</span>}
              </div>

              {/* Season */}
              <div className={`form-group ${errors.season ? "has-error" : ""}`}>
                <label htmlFor="select-season">
                  <Calendar size={15} />
                  <span>Season</span>
                  <span className="required-star">*</span>
                </label>
                <select
                  id="select-season"
                  name="season"
                  value={formData.season}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option value="">-- Select Season --</option>
                  {SEASONS.map((sn) => (
                    <option key={sn} value={sn}>
                      {sn}
                    </option>
                  ))}
                </select>
                {errors.season && <span className="error-text">{errors.season}</span>}
              </div>

              {/* Area */}
              <div className={`form-group ${errors.area ? "has-error" : ""}`}>
                <label htmlFor="input-area">
                  <Layers size={15} />
                  <span>Cultivated Area (Hectares)</span>
                  <span className="required-star">*</span>
                </label>
                <input
                  type="number"
                  step="any"
                  id="input-area"
                  name="area"
                  value={formData.area}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="e.g. 5.5"
                  min="0.01"
                />
                {errors.area && <span className="error-text">{errors.area}</span>}
              </div>

              {/* Annual Rainfall */}
              <div className={`form-group ${errors.annual_rainfall ? "has-error" : ""}`}>
                <label htmlFor="input-rainfall">
                  <Droplets size={15} />
                  <span>Annual Rainfall (mm)</span>
                  <span className="required-star">*</span>
                </label>
                <input
                  type="number"
                  step="any"
                  id="input-rainfall"
                  name="annual_rainfall"
                  value={formData.annual_rainfall}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="e.g. 1100"
                  min="0"
                />
                {errors.annual_rainfall && (
                  <span className="error-text">{errors.annual_rainfall}</span>
                )}
              </div>

              {/* Fertilizer */}
              <div className={`form-group ${errors.fertilizer ? "has-error" : ""}`}>
                <label htmlFor="input-fertilizer">
                  <FlaskConical size={15} />
                  <span>Fertilizer Applied (kg)</span>
                  <span className="required-star">*</span>
                </label>
                <input
                  type="number"
                  step="any"
                  id="input-fertilizer"
                  name="fertilizer"
                  value={formData.fertilizer}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="e.g. 350000"
                  min="0"
                />
                {errors.fertilizer && (
                  <span className="error-text">{errors.fertilizer}</span>
                )}
              </div>

              {/* Pesticide */}
              <div className={`form-group ${errors.pesticide ? "has-error" : ""}`}>
                <label htmlFor="input-pesticide">
                  <Bug size={15} />
                  <span>Pesticide Applied (kg)</span>
                  <span className="required-star">*</span>
                </label>
                <input
                  type="number"
                  step="any"
                  id="input-pesticide"
                  name="pesticide"
                  value={formData.pesticide}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="e.g. 950"
                  min="0"
                />
                {errors.pesticide && (
                  <span className="error-text">{errors.pesticide}</span>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="form-actions">
              <button
                type="button"
                className="reset-btn"
                onClick={handleReset}
                disabled={loading}
              >
                <RotateCcw size={16} />
                <span>Reset Form</span>
              </button>

              <button
                type="submit"
                className="submit-btn"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner"></span>
                    <span>Predicting Yield...</span>
                  </>
                ) : (
                  <>
                    <span>Predict Yield</span>
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Prediction Results Section */}
        {result && (
          <div id="yield-result-section" className="yield-result-card">
            <div className="result-header">
              <div className="result-status-badge">
                <CheckCircle2 size={18} />
                <span>Prediction Ready</span>
              </div>
              <span className="result-model-badge">
                Random Forest ML Regressor
              </span>
            </div>

            {/* Main Result Highlight Box */}
            <div className="yield-highlight-box">
              <span className="yield-highlight-label">Predicted Yield</span>
              <div className="yield-number-row">
                <span className="yield-number">
                  {Number(result.predicted_yield).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 4,
                  })}
                </span>
                <span className="yield-unit">{result.unit}</span>
              </div>
              <p className="yield-disclaimer">
                Forecast calculated from empirical multi-factor agricultural models.
              </p>
            </div>

            {/* Summary Details Grid */}
            <div className="result-details-grid">
              <div className="detail-item">
                <span className="detail-label">Crop</span>
                <span className="detail-value">{result.crop}</span>
              </div>

              <div className="detail-item">
                <span className="detail-label">State</span>
                <span className="detail-value">{result.state}</span>
              </div>

              <div className="detail-item">
                <span className="detail-label">Season</span>
                <span className="detail-value">{result.season}</span>
              </div>

              <div className="detail-item">
                <span className="detail-label">Area</span>
                <span className="detail-value">{result.area} Hectares</span>
              </div>
            </div>

            {/* Farmer Insight Banner */}
            <div className="farmer-tips-banner">
              <Info size={20} />
              <div>
                <strong>Yield Maximization Tip:</strong>
                <p>
                  Maintain balanced NPK fertilization and timely irrigation matching the critical
                  growth stages of {result.crop} to realize optimal harvest output.
                </p>
              </div>
            </div>

            {/* Card Footer Actions */}
            <div className="result-footer-actions">
              <Link to="/" className="back-home-btn">
                <ArrowLeft size={16} />
                <span>Back to Home</span>
              </Link>

              <button
                type="button"
                className="predict-another-btn"
                onClick={() => {
                  setResult(null);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                <span>Predict Another Crop</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default YieldPrediction;
