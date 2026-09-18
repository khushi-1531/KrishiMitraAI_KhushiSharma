import axios from 'axios';

const API_BASE_URL = import.meta.env?.VITE_API_BASE_URL || 'http://127.0.0.1:8001/api/v1';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

/**
 * Predict recommended crop and get soil advisory from the FastAPI ML service.
 * @param {Object} params - { nitrogen/N, phosphorus/P, potassium/K, temperature, humidity, ph, rainfall }
 * @returns {Promise<Object>} API response data
 */
export const predictCropRecommendation = async (params) => {
  try {
    const payload = {
      nitrogen: Number(params.nitrogen ?? params.N),
      phosphorus: Number(params.phosphorus ?? params.P),
      potassium: Number(params.potassium ?? params.K),
      temperature: Number(params.temperature),
      humidity: Number(params.humidity),
      ph: Number(params.ph ?? params.pH),
      rainfall: Number(params.rainfall),
    };

    const response = await apiClient.post('/crop-recommendation/predict', payload);
    return response.data;
  } catch (error) {
    if (error.response) {
      const detail = error.response.data?.detail;
      const message =
        typeof detail === 'string'
          ? detail
          : Array.isArray(detail)
          ? detail.map((d) => d.msg || d.message || JSON.stringify(d)).join(', ')
          : 'Server returned an error processing your recommendation request.';
      throw new Error(message, { cause: error });
    } else if (error.request) {
      throw new Error(
        'Unable to connect to KrishiMitraAI API server at http://127.0.0.1:8001. Please verify that the FastAPI backend is running.',
        { cause: error }
      );
    } else {
      throw new Error(error.message || 'An unexpected error occurred.', { cause: error });
    }
  }
};

/**
 * Check backend service and ML model health
 */
export const checkHealth = async () => {
  try {
    const response = await apiClient.get('/health');
    return response.data;
  } catch (error) {
    return {
      status: 'offline',
      model_loaded: false,
      error: error.message,
    };
  }
};

export default {
  predictCropRecommendation,
  checkHealth,
};

