import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  ArrowLeft,
  ChevronRight,
  Sparkles,
  Check,
  CheckCircle2,
  ShieldCheck,
  Sprout,
  Cpu,
  FlaskConical,
  Database,
  ScanLine,
  CloudSun,
  BarChart3,
  Layers,
} from "lucide-react";

import cropIcon from "../assets/cropRecommendation_image.png";
import soilIcon from "../assets/soilanalysis_image.png";
import marketIcon from "../assets/marketprice_image.png";
import diseaseIcon from "../assets/diseasedetection_image.png";
import weatherIcon from "../assets/weatherforecast_image.png";
import yieldIcon from "../assets/yieldprediction_image.png";
import leavesImage from "../assets/leaves_image.png";

import "./Services.css";

const SERVICES_DATA = [
  {
    id: "crop-recommendation",
    name: "Crop Recommendation",
    category: "Machine Learning Prediction",
    statusText: "Available • Operational",
    statusClass: "status-available",
    image: cropIcon,
    description:
      "Evaluates 7 soil nutrient and environmental parameters — Nitrogen (N), Phosphorus (P), Potassium (K), Temperature, Humidity, Soil pH, and Rainfall — to recommend optimal crop options tailored to your specific land.",
    features: [
      "7-Parameter multi-variable analysis",
      "Scikit-Learn Random Forest Classifier (99.5% accuracy)",
      "Ranked alternatives with statistical confidence tiers",
    ],
    infoTag: "Operational ML Service • Verified Dataset",
    iconComponent: Cpu,
  },
  {
    id: "soil-analysis",
    name: "Soil Analysis & Soil Health",
    category: "Nutrient Evaluation System",
    statusText: "Available • Operational",
    statusClass: "status-available",
    image: soilIcon,
    description:
      "Assesses essential macronutrient levels and chemical pH against empirical dataset medians and quartile distributions, providing NPK balance ratios, overall soil health scoring, and actionable restorative guidance.",
    features: [
      "N-P-K ratio diagnostic and balancing",
      "0–100 Soil Health Index rating",
      "Actionable soil conditioning & fertilizer advisory",
    ],
    infoTag: "Agronomic Diagnostic • Soil Fertility Focus",
    iconComponent: FlaskConical,
  },
  {
    id: "market-prices",
    name: "Mandi / Market Prices",
    category: "Live Government Market Data",
    statusText: "Available • Operational",
    statusClass: "status-available",
    image: marketIcon,
    description:
      "Connects directly with the Government of India Open Data Agmarknet API to provide real-time daily wholesale prices across thousands of APMC mandis, tracking minimum, maximum, and modal commodity rates nationwide.",
    features: [
      "Live APMC mandi wholesale price feeds",
      "Daily minimum, maximum & modal rates",
      "Multi-level state, district, and commodity search",
    ],
    infoTag: "Official data.gov.in Integration • Daily Updates",
    iconComponent: Database,
  },
  {
    id: "disease-detection",
    name: "Plant Disease Detection",
    category: "Computer Vision Framework",
    statusText: "Model Developed • Capability",
    statusClass: "status-developed",
    image: diseaseIcon,
    description:
      "Deep learning computer vision architecture structured for foliar leaf diagnosis, designed to recognize early-stage crop infections, bacterial spots, and fungal blights from uploaded plant photos before extensive field damage occurs.",
    features: [
      "Leaf photograph pathology classification",
      "Early warning against foliar blights and rusts",
      "Targeted organic & chemical remediation guidance",
    ],
    infoTag: "Deep Learning Vision • Early Blight Detection",
    iconComponent: ScanLine,
  },
  {
    id: "weather-forecast",
    name: "Weather Forecast",
    category: "Agro-Climatic Intelligence",
    statusText: "Planned • Capability",
    statusClass: "status-planned",
    image: weatherIcon,
    description:
      "Location-based agro-climatic forecasting tracking precipitation likelihood, temperature shifts, and humidity patterns to guide farmers on optimal operational windows for sowing, spraying, irrigation, and harvesting.",
    features: [
      "Hyper-local rainfall & humidity projections",
      "Field operational timing guidance",
      "Extreme weather risk & frost advisories",
    ],
    infoTag: "Meteorological Sync • Field Timing Guidance",
    iconComponent: CloudSun,
  },
  {
    id: "yield-prediction",
    name: "Yield Prediction",
    category: "Predictive Harvest Analytics",
    statusText: "Model Developed • Capability",
    statusClass: "status-developed",
    image: yieldIcon,
    description:
      "Data-driven statistical modeling designed to forecast seasonal harvest quantities based on acreage, historical crop yields, and seasonal climate patterns, supporting farmers in storage logistics and financial planning.",
    features: [
      "Historical production trend regression",
      "Acreage-based seasonal yield estimation",
      "Post-harvest storage & marketing support",
    ],
    infoTag: "Multi-Factor Analytics • Harvest Estimation",
    iconComponent: BarChart3,
  },
];

const LIFECYCLE_STEPS = [
  {
    step: "1",
    phase: "Pre-Sowing",
    title: "Soil & Crop Selection",
    description:
      "Evaluate soil macronutrients (NPK) and pH balance to choose the most suitable crop variety with high statistical confidence.",
  },
  {
    step: "2",
    phase: "Growth Stage",
    title: "Weather & Plant Health",
    description:
      "Monitor localized climatic windows for timely irrigation and scan crop leaves early to prevent widespread disease infection.",
  },
  {
    step: "3",
    phase: "Harvest Stage",
    title: "Yield & Storage Planning",
    description:
      "Anticipate seasonal harvest quantities through predictive modeling to prepare labor, storage silos, and logistics.",
  },
  {
    step: "4",
    phase: "Selling Stage",
    title: "Mandi Market Intelligence",
    description:
      "Track live wholesale prices across APMC mandis to negotiate transparently and sell produce at peak regional prices.",
  },
];

function Services() {
  const { t } = useTranslation();

  return (
    <main className="services-page-wrapper">
      {/* ================= HEADER & BREADCRUMB ================= */}
      <header className="services-header-container">
        <nav className="services-breadcrumb" aria-label="Breadcrumb">
          <Link to="/" className="breadcrumb-link">
            <ArrowLeft size={16} />
            <span>{t("navbar.home", "Home")}</span>
          </Link>
          <ChevronRight size={14} className="breadcrumb-separator" />
          <span className="breadcrumb-current">{t("navbar.services", "Services")}</span>
        </nav>

        <div className="services-title-section">
          <div className="services-badge-pill">
            <Sparkles size={15} />
            <span>Smart Agricultural Suite</span>
          </div>
          <h1>{t("services.title", "Our Smart Services")}</h1>
          <p className="services-lead-text">
            {t(
              "services.lead",
              "KrishiMitra AI brings essential agricultural decision-support tools together onto a single, accessible platform. Designed to assist farmers at every stage of cultivation — from soil testing and crop selection to real-time market selling."
            )}
          </p>
        </div>
      </header>

      {/* ================= SIX SERVICE CARDS (INFORMATION-ONLY) ================= */}
      <section className="services-section">
        <div className="services-section-header">
          <span className="section-tag">Core Modules</span>
          <h2>Platform Services & Capabilities</h2>
          <p>
            Explore our six integrated modules, highlighting operational machine learning features,
            official market feeds, and developed agronomic capabilities.
          </p>
        </div>

        <div className="services-cards-grid">
          {SERVICES_DATA.map((service) => {
            const Icon = service.iconComponent;
            return (
              <div key={service.id} className="service-module-card">
                <div>
                  <div className="module-card-top">
                    <div className="module-icon-container">
                      <img src={service.image} alt={service.name} />
                    </div>
                    <span className={`module-status-badge ${service.statusClass}`}>
                      {service.statusText}
                    </span>
                  </div>

                  <div className="module-card-body" style={{ marginTop: "14px" }}>
                    <span className="module-category-label">{service.category}</span>
                    <h3>{service.name}</h3>
                    <p>{service.description}</p>

                    <div className="module-features-list">
                      {service.features.map((feat, idx) => (
                        <div key={idx} className="module-feature-item">
                          <Check size={14} className="feature-check-icon" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="module-card-footer">
                  <span className="module-info-pill">
                    <Icon size={13} />
                    {service.infoTag}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= LIFECYCLE: HOW SERVICES SUPPORT FARMERS ================= */}
      <section className="services-section">
        <div className="lifecycle-card">
          <img
            src={leavesImage}
            alt=""
            aria-hidden="true"
            className="lifecycle-watermark"
          />

          <div className="services-section-header">
            <span className="section-tag">Integrated Workflow</span>
            <h2>How Our Services Work Together</h2>
            <p>
              KrishiMitra AI services are structured to support farmers continuously through each
              critical milestone of the seasonal agricultural lifecycle.
            </p>
          </div>

          <div className="lifecycle-steps-grid">
            {LIFECYCLE_STEPS.map((item) => (
              <div key={item.step} className="lifecycle-step-item">
                <div className="step-number-badge">{item.step}</div>
                <div>
                  <span className="module-category-label" style={{ fontSize: "11px" }}>
                    {item.phase}
                  </span>
                  <h4>{item.title}</h4>
                </div>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CLOSING SECTION: INFORMATIONAL ================= */}
      <section className="services-closing-banner">
        <div className="closing-banner-header">
          <h2>Smart Decisions for Better Farming</h2>
          <p>
            By uniting soil chemistry, predictive modeling, and real-time market transparency,
            KrishiMitra AI empowers farmers with the data-backed clarity required to cultivate
            sustainably, reduce seasonal losses, and achieve fair economic returns.
          </p>
        </div>

        <div className="closing-trust-badges">
          <div className="closing-badge-item">
            <CheckCircle2 size={16} />
            <span>Science-Backed Algorithms</span>
          </div>
          <div className="closing-badge-item">
            <ShieldCheck size={16} />
            <span>Official Government Agmarknet Data</span>
          </div>
          <div className="closing-badge-item">
            <Sprout size={16} />
            <span>100% Free & Farmer-Centric</span>
          </div>
          <div className="closing-badge-item">
            <Layers size={16} />
            <span>Unified Single Platform</span>
          </div>
        </div>

        <div className="closing-cta-action">
          <Link to="/" className="services-home-btn">
            <span>Back to Home</span>
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Services;
