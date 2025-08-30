// API service for communicating with the backend
const API_BASE_URL = '/api/v1';

export interface PredictionData {
  latitude: number;
  longitude: number;
  water_temperature: number;
  water_ph: number;
  nutrient_level: number;
  sunlight_exposure: number;
  water_flow_rate: number;
  current_biomass_density: number;
  water_body_type: string;
  season: string;
}

export interface PredictionResponse {
  id: number;
  latitude: number;
  longitude: number;
  water_temperature: number;
  water_ph: number;
  nutrient_level: number;
  sunlight_exposure: number;
  water_flow_rate: number;
  current_biomass_density: number;
  water_body_type: string;
  season: string;
  infestation_risk: string;
  biomass_growth: number;
  insights: string;
  timestamp: string;
}

export interface ImagePredictionData {
  image: File;
  latitude: number;
  longitude: number;
  water_temperature: number;
  water_ph: number;
  nutrient_level: number;
  sunlight_exposure: number;
  water_flow_rate: number;
  water_body_type: string;
  season: string;
}

class ApiService {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;

    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || `HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`API request failed: ${endpoint}`, error);
      throw error;
    }
  }

  // Predictions
  async createPrediction(data: PredictionData): Promise<PredictionResponse> {
    return this.request<PredictionResponse>('/predict', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getPredictions(skip = 0, limit = 100): Promise<PredictionResponse[]> {
    return this.request<PredictionResponse[]>(`/predictions?skip=${skip}&limit=${limit}`);
  }

  async getPrediction(id: number): Promise<PredictionResponse> {
    return this.request<PredictionResponse>(`/predictions/${id}`);
  }

  async getRecentPredictions(limit = 10): Promise<PredictionResponse[]> {
    return this.request<PredictionResponse[]>(`/predictions/recent/${limit}`);
  }

  // Image predictions
  async createImagePrediction(data: ImagePredictionData): Promise<PredictionResponse> {
    const formData = new FormData();
    formData.append('image', data.image);
    formData.append('latitude', data.latitude.toString());
    formData.append('longitude', data.longitude.toString());
    formData.append('water_temperature', data.water_temperature.toString());
    formData.append('water_ph', data.water_ph.toString());
    formData.append('nutrient_level', data.nutrient_level.toString());
    formData.append('sunlight_exposure', data.sunlight_exposure.toString());
    formData.append('water_flow_rate', data.water_flow_rate.toString());
    formData.append('water_body_type', data.water_body_type);
    formData.append('season', data.season);

    return this.request<PredictionResponse>('/predict-image', {
      method: 'POST',
      body: formData,
      headers: {}, // Let browser set content-type for FormData
    });
  }

  // Analytics
  async getPredictionSummary() {
    return this.request('/analytics/summary');
  }

  async getImageAnalytics() {
    return this.request('/image-analytics');
  }

  async getFeatureImportance() {
    return this.request('/feature-importance');
  }

  // Health check
  async healthCheck() {
    return this.request('/health');
  }
}

export const apiService = new ApiService();