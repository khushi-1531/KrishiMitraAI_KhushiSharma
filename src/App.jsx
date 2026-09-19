import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CropRecommendation from "./pages/CropRecommendation";
import MarketPrices from "./pages/MarketPrices";
import About from "./pages/About";
import Services from "./pages/Services";
import Resources from "./pages/Resources";
import Contact from "./pages/Contact";
import YieldPrediction from "./pages/YieldPrediction";

function DiseaseDetection() {
  const { t } = useTranslation();
  return (
    <div className="page-placeholder">
      <h1>{t("services.diseaseDetection.title", "Disease Detection")}</h1>
      <p>{t("services.diseaseDetection.description", "Upload leaf images and detect diseases early with AI.")}</p>
      <Link to="/" style={{ color: "#1d7136", fontWeight: 600, marginTop: "8px", textDecoration: "none" }}>
        ← {t("navbar.home", "Back to Home")}
      </Link>
    </div>
  );
}

function WeatherForecast() {
  const { t } = useTranslation();
  return (
    <div className="page-placeholder">
      <h1>{t("services.weather.title", "Weather Forecast")}</h1>
      <p>{t("services.weather.description", "Get weather updates and forecasts for your location.")}</p>
      <Link to="/" style={{ color: "#1d7136", fontWeight: 600, marginTop: "8px", textDecoration: "none" }}>
        ← {t("navbar.home", "Back to Home")}
      </Link>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route path="/" element={<Home />} />

        <Route
          path="/crop-recommendation"
          element={<CropRecommendation />}
        />

        <Route
          path="/disease-detection"
          element={<DiseaseDetection />}
        />

        <Route
          path="/weather-forecast"
          element={<WeatherForecast />}
        />

        <Route
          path="/yield-prediction"
          element={<YieldPrediction />}
        />

        <Route
          path="/market-prices"
          element={<MarketPrices />}
        />

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/services"
          element={<Services />}
        />

        <Route
          path="/resources"
          element={<Resources />}
        />

        <Route
          path="/contact"
          element={<Contact />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;