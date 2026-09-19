import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  ArrowLeft,
  ChevronRight,
  Sparkles,
  BookOpen,
  Sprout,
  Droplets,
  Bug,
  CloudSun,
  TrendingUp,
  Cpu,
  CheckCircle2,
  Lightbulb,
  ShieldCheck,
} from "lucide-react";

import "./Resources.css";

const RESOURCE_SECTIONS = [
  {
    id: "farming-knowledge",
    number: "01",
    title: "Farming Knowledge & Best Practices",
    category: "Practical Agronomy",
    icon: BookOpen,
    description:
      "Foundational agronomic principles to help growers maximize field health, plan timely interventions, and sustain land productivity across seasons.",
    points: [
      "Select certified, high-germination seed varieties suited to your agro-climatic zone.",
      "Practice multi-year crop rotation with legumes to naturally enrich soil nitrogen reserves.",
      "Maintain organic matter through compost and green manure to enhance moisture retention.",
      "Calibrate seed spacing and sowing depth to prevent overcrowding and fungal spread.",
    ],
    takeaway:
      "Planning crop cycles well in advance and preparing finely tilled seedbeds significantly reduces seedling mortality.",
  },
  {
    id: "crop-soil-resources",
    number: "02",
    title: "Crop & Soil Stewardship",
    category: "Nutrient & pH Management",
    icon: Sprout,
    description:
      "Understanding soil chemistry is fundamental to avoiding fertilizer waste and preventing long-term soil degradation and acidification.",
    points: [
      "Nitrogen (N) fuels early vegetative shoot vigor; over-application causes lodging and pest susceptibility.",
      "Phosphorus (P) stimulates deep root establishment, early flowering, and robust seed development.",
      "Potassium (K) regulates plant water loss, strengthens cellular walls, and builds disease resistance.",
      "Optimal soil pH ranges between 6.0 and 7.5 for maximum macronutrient bioavailability.",
    ],
    takeaway:
      "Test soil every 2–3 seasons before sowing to apply precisely the nutrients your specific land lacks.",
  },
  {
    id: "water-irrigation",
    number: "03",
    title: "Water & Irrigation Guidance",
    category: "Water Conservation",
    icon: Droplets,
    description:
      "Strategic water management ensures optimal root-zone hydration while safeguarding local water tables and cutting pumping costs.",
    points: [
      "Adopt drip or micro-sprinkler systems to deliver moisture directly to root zones, saving 40–60% water.",
      "Irrigate during early morning or evening hours to minimize high evaporative losses under direct sun.",
      "Apply organic mulching (straw, crop residues) around plant beds to retain ground moisture.",
      "Avoid standing water in clay-heavy fields to prevent root rot and anaerobic soil compaction.",
    ],
    takeaway:
      "Matching irrigation volume to crop growth stages (flowering vs. vegetative) optimizes water productivity.",
  },
  {
    id: "plant-disease-info",
    number: "04",
    title: "Plant Disease Prevention & Health",
    category: "Pathology Awareness",
    icon: Bug,
    description:
      "Early recognition of foliar pathologies, bacterial blights, and fungal rusts allows for timely intervention before crop yield is compromised.",
    points: [
      "Scout fields weekly, inspecting the undersides of lower leaves for early spots, wilting, or powdery mildew.",
      "Ensure adequate row-to-row spacing to encourage air circulation and decrease humidity in crop canopies.",
      "Sterilize pruning shears and farm tools between infected and healthy patches to halt contagion.",
      "Use balanced fertilization; excessive nitrogen produces tender, vulnerable foliage prone to fungal infection.",
    ],
    takeaway:
      "Promptly removing and disposing of infected crop debris breaks the disease cycle for the following season.",
  },
  {
    id: "weather-seasonal-tips",
    number: "05",
    title: "Weather & Seasonal Farming Tips",
    category: "Agro-Climatic Planning",
    icon: CloudSun,
    description:
      "Aligning cultivation activities with local meteorological forecasts mitigates climate risks and prevents input losses.",
    points: [
      "Kharif Season (Monsoon): Ensure robust field drainage systems to prevent waterlogging during cloudbursts.",
      "Rabi Season (Winter): Monitor night temperatures and morning humidity to anticipate frost or powdery mildew risks.",
      "Zaid Season (Summer): Prioritize short-duration legumes, fodder, and heat-resilient vegetables with mulch cover.",
      "Avoid spraying pesticides or applying top-dress urea immediately prior to anticipated heavy rainfalls.",
    ],
    takeaway:
      "Checking weekly precipitation forecasts before scheduling fertilizer broadcasting prevents costly nutrient runoff.",
  },
  {
    id: "mandi-market-info",
    number: "06",
    title: "Mandi & Market Intelligence",
    category: "Economic Guidance",
    icon: TrendingUp,
    description:
      "Understanding wholesale agricultural pricing mechanisms empowers farmers to negotiate transparently and capture fair value for their produce.",
    points: [
      "Minimum Price: The lowest recorded auction bid of the trading day in an APMC mandi.",
      "Maximum Price: The highest rate paid for premium-grade, low-moisture produce lots.",
      "Modal Price: The most frequent transaction rate, reflecting true prevailing market value.",
      "Produce grading and proper post-harvest drying directly command higher auction prices in the mandi.",
    ],
    takeaway:
      "Comparing daily modal rates across neighboring mandis gives growers valuable leverage when dealing with local traders.",
  },
  {
    id: "agri-data-tech",
    number: "07",
    title: "Agricultural Data & Digital Technology",
    category: "Precision Agriculture",
    icon: Cpu,
    isFeatured: true,
    description:
      "How open data repositories, validated machine learning algorithms, and digital platforms are modernizing traditional Indian farming.",
    points: [
      "Machine learning models evaluate multi-factor agricultural data (N, P, K, pH, climate) to forecast crop suitability.",
      "Open government data portals (data.gov.in) provide transparent, daily wholesale mandi arrivals nationwide.",
      "Digital soil testing calculators translate complex laboratory parts-per-million metrics into simple bag recommendations.",
      "Mobile-first interfaces eliminate geographic barriers, delivering precision agronomy directly to rural smartphones.",
    ],
    takeaway:
      "Digital agricultural intelligence complements centuries of farmer wisdom, reducing uncertainty and elevating crop outcomes.",
  },
];

function Resources() {
  const { t } = useTranslation();

  return (
    <main className="resources-page-wrapper">
      {/* ================= HEADER & BREADCRUMB ================= */}
      <header className="resources-header-container">
        <nav className="resources-breadcrumb" aria-label="Breadcrumb">
          <Link to="/" className="breadcrumb-link">
            <ArrowLeft size={16} />
            <span>{t("navbar.home", "Home")}</span>
          </Link>
          <ChevronRight size={14} className="breadcrumb-separator" />
          <span className="breadcrumb-current">{t("navbar.resources", "Resources")}</span>
        </nav>

        <div className="resources-title-section">
          <div className="resources-badge-pill">
            <Sparkles size={15} />
            <span>Farmer Knowledge</span>
          </div>
          <h1>{t("resources.title", "Resources")}</h1>
          <p className="resources-lead-text">
            {t(
              "resources.lead",
              "Practical agricultural knowledge, soil and water stewardship guidelines, market intelligence insights, and modern digital farming advice to help farmers make informed decisions."
            )}
          </p>
        </div>
      </header>

      {/* ================= 7 INFORMATION-ONLY RESOURCE CARDS ================= */}
      <section className="resources-grid-section">
        <div className="resources-cards-grid">
          {RESOURCE_SECTIONS.map((res) => {
            const IconComponent = res.icon;
            return (
              <div
                key={res.id}
                className={`resource-card ${res.isFeatured ? "card-featured" : ""}`}
              >
                <div className="resource-card-header">
                  <div className="resource-header-left">
                    <div className="resource-icon-box">
                      <IconComponent size={22} />
                    </div>
                    <div className="resource-card-title-group">
                      <span className="resource-category-tag">{res.category}</span>
                      <h2>{res.title}</h2>
                    </div>
                  </div>
                  <span className="resource-number-pill">{res.number}</span>
                </div>

                <div className="resource-card-body">
                  <p className="resource-description-text">{res.description}</p>

                  <div className="resource-points-list">
                    {res.points.map((pt, idx) => (
                      <div key={idx} className="resource-point-item">
                        <CheckCircle2 size={15} className="resource-point-icon" />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>

                  <div className="resource-takeaway-box">
                    <Lightbulb size={16} className="takeaway-icon" />
                    <div className="takeaway-text">
                      <strong>Key Practice: </strong>
                      {res.takeaway}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= CLOSING SECTION (BACK TO HOME ONLY) ================= */}
      <section className="resources-closing-banner">
        <div className="resources-closing-content">
          <h2>Learn, Plan, and Farm Smarter</h2>
          <p>
            Continuous learning and timely information form the foundation of resilient farming. By
            combining traditional agronomic experience with scientific data, farmers can protect soil
            vitality, maximize seasonal harvests, and secure sustainable livelihoods.
          </p>
        </div>

        <div className="resources-trust-badges">
          <div className="resources-badge-item">
            <CheckCircle2 size={16} />
            <span>Verified Agricultural Principles</span>
          </div>
          <div className="resources-badge-item">
            <ShieldCheck size={16} />
            <span>Practical & Jargon-Free</span>
          </div>
          <div className="resources-badge-item">
            <Sprout size={16} />
            <span>Farmer-First Education</span>
          </div>
        </div>

        <div className="resources-closing-action">
          <Link to="/" className="resources-home-btn">
            <span>Back to Home</span>
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Resources;
