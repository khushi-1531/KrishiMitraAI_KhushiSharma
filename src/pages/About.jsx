import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  Sprout,
  ShieldCheck,
  CheckCircle2,
  Target,
  Languages,
  Cpu,
  Database,
  Smartphone,
  Sparkles,
  Layers,
  TrendingUp,
  FlaskConical,
  Users,
  CloudSun,
  ScanLine,
  BarChart3,
  Leaf,
} from "lucide-react";

import farmerImage from "../assets/Farmer_Image.png";
import leavesImage from "../assets/leaves_image.png";
import cropIcon from "../assets/cropRecommendation_image.png";
import soilIcon from "../assets/soilanalysis_image.png";
import marketIcon from "../assets/marketprice_image.png";
import weatherIcon from "../assets/weatherforecast_image.png";
import diseaseIcon from "../assets/diseasedetection_image.png";
import yieldIcon from "../assets/yieldprediction_image.png";

import "./About.css";

const REGIONAL_LANGUAGES = [
  { code: "en", name: "English" },
  { code: "hi", name: "हिंदी (Hindi)" },
  { code: "mr", name: "मराठी (Marathi)" },
  { code: "pa", name: "ਪੰਜਾਬੀ (Punjabi)" },
  { code: "bn", name: "বাংলা (Bengali)" },
  { code: "gu", name: "ગુજરાતી (Gujarati)" },
  { code: "ta", name: "தமிழ் (Tamil)" },
  { code: "te", name: "తెలుగు (Telugu)" },
  { code: "kn", name: "ಕನ್ನಡ (Kannada)" },
  { code: "ml", name: "മലയാളം (Malayalam)" },
  { code: "or", name: "ଓଡ଼ିଆ (Odia)" },
  { code: "bho", name: "भोजपुरी (Bhojpuri)" },
];

function About() {
  const { t } = useTranslation();

  return (
    <main className="about-page-wrapper">
      {/* ================= HEADER & BREADCRUMB ================= */}
      <header className="about-header-container">
        <nav className="about-breadcrumb" aria-label="Breadcrumb">
          <Link to="/" className="breadcrumb-link">
            <ArrowLeft size={16} />
            <span>{t("navbar.home", "Home")}</span>
          </Link>
          <ChevronRight size={14} className="breadcrumb-separator" />
          <span className="breadcrumb-current">{t("navbar.about", "About Us")}</span>
        </nav>

        <div className="about-title-section">
          <div className="about-badge-pill">
            <Sparkles size={15} />
            <span>Smart Agriculture Platform</span>
          </div>
          <h1>{t("about.title", "About KrishiMitra AI")}</h1>
          <p className="about-lead-text">
            {t(
              "about.lead",
              "KrishiMitra AI is an intelligent, farmer-centric agricultural platform designed to bridge the gap between complex agronomic science, real-time market data, and everyday farming decisions."
            )}
          </p>
        </div>
      </header>

      {/* ================= 1. ABOUT KRISHIMITRA AI (HERO STORY) ================= */}
      <section className="about-story-card">
        {/* Subtle decorative leaf accent */}
        <img
          src={leavesImage}
          alt=""
          aria-hidden="true"
          className="story-watermark-leaves"
        />

        <div className="about-story-text">
          <span className="section-tag">Agricultural Companion</span>
          <h2>Empowering Farmers with Actionable Intelligence</h2>
          <p>
            Agriculture forms the backbone of India, supporting over half our population. Yet,
            smallholder farmers routinely face immense uncertainty — unpredictable rainfall,
            unbalanced soil nutrients, shifting market rates, and fragmented advice.
          </p>
          <p>
            <strong>KrishiMitra AI</strong> was built to transform agricultural decision-making into
            a straightforward, transparent, and data-backed process. By translating complex scientific
            metrics into intuitive visual guidance and multilingual advisories, we help farmers
            maximize yields and achieve fair prices.
          </p>

          <div className="about-story-highlights">
            <div className="highlight-item">
              <CheckCircle2 size={18} className="highlight-icon" />
              <span>
                <strong>Objective Decision Support:</strong> Scientifically validated recommendations
                grounded in empirical agronomic parameters.
              </span>
            </div>
            <div className="highlight-item">
              <CheckCircle2 size={18} className="highlight-icon" />
              <span>
                <strong>Real-Time Mandi Visibility:</strong> Direct integration with official Government
                of India APMC market arrival feeds.
              </span>
            </div>
            <div className="highlight-item">
              <CheckCircle2 size={18} className="highlight-icon" />
              <span>
                <strong>Zero Barriers to Access:</strong> 100% free, responsive on any phone, and
                accessible across 12 Indian regional languages.
              </span>
            </div>
          </div>
        </div>

        <div className="about-story-visual">
          <div className="farmer-image-frame">
            <img
              src={farmerImage}
              alt="Indian farmer in agricultural field"
              loading="lazy"
            />
          </div>
          <div className="story-floating-badge">
            <div className="floating-badge-icon">
              <ShieldCheck size={20} />
            </div>
            <div className="floating-badge-content">
              <span className="floating-badge-title">Farmer-First Innovation</span>
              <span className="floating-badge-sub">Empirical Data & Transparent Guidance</span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 2. OUR PURPOSE ================= */}
      <section className="about-section">
        <div className="section-header">
          <span className="section-tag">Core Mission</span>
          <h2>Our Purpose</h2>
          <p>
            We believe every farmer deserves access to the same precision intelligence used in modern
            agricultural research laboratories.
          </p>
        </div>

        <div className="purpose-grid">
          <div className="purpose-card">
            <div className="purpose-icon-box">
              <Target size={24} />
            </div>
            <h3>Democratize Agriculture Data</h3>
            <p>
              Transform raw laboratory soil reports, meteorological readings, and wholesale commodity
              records into plain-language advice that can be acted upon immediately in the field.
            </p>
          </div>

          <div className="purpose-card">
            <div className="purpose-icon-box">
              <Sprout size={24} />
            </div>
            <h3>Reduce Farming Risk</h3>
            <p>
              Empower growers with empirical crop recommendations and nutrient balance indicators,
              reducing costly crop failures, soil exhaustion, and fertilizer misapplications.
            </p>
          </div>

          <div className="purpose-card">
            <div className="purpose-icon-box">
              <TrendingUp size={24} />
            </div>
            <h3>Improve Market Transparency</h3>
            <p>
              Equip farmers with live daily wholesale prices across APMC mandis nationwide so they can
              negotiate confidently and sell their produce when and where returns are highest.
            </p>
          </div>
        </div>
      </section>

      {/* ================= 3. WHAT KRISHIMITRA AI PROVIDES (INFORMATION-ONLY) ================= */}
      <section className="about-section">
        <div className="section-header">
          <span className="section-tag">Platform Features</span>
          <h2>What KrishiMitra AI Provides</h2>
          <p>
            A comprehensive overview of the six core modules comprising the KrishiMitra AI platform,
            spanning machine learning predictions, real-time market intelligence, and agro-climatic capabilities.
          </p>
        </div>

        <div className="services-grid-wrapper">
          <div className="services-grid">
            {/* 1. Crop Recommendation */}
            <div className="about-service-card">
              <div className="service-card-top">
                <img src={cropIcon} alt="Crop Recommendation" className="service-icon-img" />
                <span className="service-status-pill operational">Machine Learning</span>
              </div>
              <div className="service-card-body">
                <h4>Crop Recommendation</h4>
                <p>
                  Evaluates 7 soil and environmental factors — Nitrogen, Phosphorus, Potassium,
                  Temperature, Humidity, Soil pH, and Rainfall — using a trained Random Forest Classifier
                  to recommend optimal crops with high statistical confidence.
                </p>
              </div>
              <div className="service-card-footer">
                <span className="service-info-tag">
                  <Cpu size={13} />
                  RandomForest Classifier • 99.5% Test Accuracy
                </span>
              </div>
            </div>

            {/* 2. Soil Analysis / Soil Health */}
            <div className="about-service-card">
              <div className="service-card-top">
                <img src={soilIcon} alt="Soil Analysis" className="service-icon-img" />
                <span className="service-status-pill operational">Nutrient Evaluation</span>
              </div>
              <div className="service-card-body">
                <h4>Soil Analysis & Health</h4>
                <p>
                  Assesses primary soil macronutrients (N, P, K) and chemical pH metrics against optimal
                  dataset ranges, calculating NPK ratio balance and providing clear restorative guidance
                  to sustain soil fertility.
                </p>
              </div>
              <div className="service-card-footer">
                <span className="service-info-tag">
                  <FlaskConical size={13} />
                  NPK Ratio Balancing • Soil Health Scoring
                </span>
              </div>
            </div>

            {/* 3. Mandi / Market Prices */}
            <div className="about-service-card">
              <div className="service-card-top">
                <img src={marketIcon} alt="Mandi Market Prices" className="service-icon-img" />
                <span className="service-status-pill operational">Government API Feed</span>
              </div>
              <div className="service-card-body">
                <h4>Mandi / Market Prices</h4>
                <p>
                  Direct synchronization with official Government of India Agmarknet data across 28+
                  states, displaying live minimum, maximum, and modal wholesale rates updated daily to
                  eliminate middlemen information asymmetry.
                </p>
              </div>
              <div className="service-card-footer">
                <span className="service-info-tag">
                  <Database size={13} />
                  Live Agmarknet Data • 1,000+ APMC Mandis
                </span>
              </div>
            </div>

            {/* 4. Disease Detection */}
            <div className="about-service-card">
              <div className="service-card-top">
                <img src={diseaseIcon} alt="Plant Disease Detection" className="service-icon-img" />
                <span className="service-status-pill capability">Computer Vision Model</span>
              </div>
              <div className="service-card-body">
                <h4>Plant Disease Detection</h4>
                <p>
                  Computer vision deep learning framework structured for leaf photograph diagnosis,
                  aimed at recognizing early symptoms of foliage blights, bacterial spots, and fungal
                  pathologies to recommend targeted remedies.
                </p>
              </div>
              <div className="service-card-footer">
                <span className="service-info-tag">
                  <ScanLine size={13} />
                  Deep Learning Vision • Foliar Pathology
                </span>
              </div>
            </div>

            {/* 5. Weather Forecast */}
            <div className="about-service-card">
              <div className="service-card-top">
                <img src={weatherIcon} alt="Weather Forecast" className="service-icon-img" />
                <span className="service-status-pill capability">Agro-Climatic Intelligence</span>
              </div>
              <div className="service-card-body">
                <h4>Weather Forecast</h4>
                <p>
                  Location-aware meteorological data integration providing rainfall projections,
                  temperature trends, and humidity levels to assist farmers in timing irrigation cycles,
                  pesticide application, and harvesting operations.
                </p>
              </div>
              <div className="service-card-footer">
                <span className="service-info-tag">
                  <CloudSun size={13} />
                  Meteorological Sync • Field Operation Timing
                </span>
              </div>
            </div>

            {/* 6. Yield Prediction */}
            <div className="about-service-card">
              <div className="service-card-top">
                <img src={yieldIcon} alt="Yield Prediction" className="service-icon-img" />
                <span className="service-status-pill capability">Harvest Analytics</span>
              </div>
              <div className="service-card-body">
                <h4>Yield Prediction</h4>
                <p>
                  Data-driven statistical modeling designed to forecast seasonal crop production based
                  on historical harvest metrics, acreage, and climatic indicators, helping farmers plan
                  storage, logistics, and revenue targets.
                </p>
              </div>
              <div className="service-card-footer">
                <span className="service-info-tag">
                  <BarChart3 size={13} />
                  Historical Trend Modeling • Multi-Factor Analytics
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 4. FARMER-CENTRIC APPROACH ================= */}
      <section className="about-section">
        <div className="section-header">
          <span className="section-tag">Human-Centered Design</span>
          <h2>Our Farmer-Centric Approach</h2>
          <p>
            Technology is effective only when it is accessible to the people who need it most.
          </p>
        </div>

        <div className="farmer-centric-grid">
          <div className="centric-card">
            <div className="centric-icon-box">
              <Languages size={22} />
            </div>
            <h3>Multilingual Accessibility</h3>
            <p>
              KrishiMitra AI supports 12 regional languages spoken across India. Farmers can navigate,
              read market rates, and view recommendations in their native language with one click.
            </p>
            <div className="language-chips-row">
              {REGIONAL_LANGUAGES.map((lang) => (
                <span key={lang.code} className="lang-chip">
                  {lang.name}
                </span>
              ))}
            </div>
          </div>

          <div className="centric-card">
            <div className="centric-icon-box">
              <Smartphone size={22} />
            </div>
            <h3>Optimized for Rural Connectivity</h3>
            <p>
              Clean, fast, and responsive design optimized for standard smartphones and varying mobile
              network speeds. No heavy payloads or unnecessary animations that drain mobile data.
            </p>
          </div>

          <div className="centric-card">
            <div className="centric-icon-box">
              <Layers size={22} />
            </div>
            <h3>Simple, Jargon-Free Guidance</h3>
            <p>
              Complex statistical distributions and soil chemistry metrics are presented using clear
              badges, color-coded ranges, and practical suggestions that anyone can understand and act upon.
            </p>
          </div>
        </div>
      </section>

      {/* ================= 5. TECHNOLOGY & HOW IT HELPS ================= */}
      <section className="about-section">
        <div className="section-header">
          <span className="section-tag">Engineering Foundation</span>
          <h2>Technology Grounded in Verified Data</h2>
          <p>
            A transparent overview of how KrishiMitra AI delivers fast, reliable, and verified results.
          </p>
        </div>

        <div className="tech-grid">
          <div className="tech-card">
            <div className="tech-icon-box">
              <Cpu size={20} />
            </div>
            <h4>Empirical Machine Learning</h4>
            <p>
              Utilizes a Scikit-Learn Random Forest Classifier rigorously trained on multi-regional
              agricultural datasets to provide high-accuracy crop predictions.
            </p>
          </div>

          <div className="tech-card">
            <div className="tech-icon-box">
              <Database size={20} />
            </div>
            <h4>Official Government Open Data</h4>
            <p>
              Consumes real-time wholesale arrival records directly from the Government of India Open
              Government Data (OGD) Agmarknet repository.
            </p>
          </div>

          <div className="tech-card">
            <div className="tech-icon-box">
              <FlaskConical size={20} />
            </div>
            <h4>High-Speed FastAPI Backend</h4>
            <p>
              Asynchronous Python backend with structured Pydantic data validation, automated in-memory
              caching, and sub-100ms response latencies.
            </p>
          </div>

          <div className="tech-card">
            <div className="tech-icon-box">
              <Users size={20} />
            </div>
            <h4>Modern Responsive Frontend</h4>
            <p>
              Component-based React single-page application engineered with accessible HTML semantics,
              internationalization (i18n), and fluid responsive layouts.
            </p>
          </div>
        </div>
      </section>

      {/* ================= 6. CLOSING CTA BANNER ================= */}
      <section className="about-cta-banner">
        <div className="about-cta-content">
          <h2>Ready to Explore KrishiMitra AI?</h2>
          <p>
            Start utilizing data-driven crop recommendations and live mandi market pricing to make
            informed agricultural decisions for your field today.
          </p>
        </div>

        <div className="about-cta-actions">
          <Link to="/" className="about-cta-btn primary">
            <span>Back to Home</span>
          </Link>
        </div>
      </section>
    </main>
  );
}

export default About;
