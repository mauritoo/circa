import axios from 'axios';
import { WeatherResponse } from '../types/WeatherResponse';

class LocationsApi {
  apiKey: string;
  baseApiUrl: string;

  constructor() {
    this.apiKey = import.meta.env.VITE_API_KEY_LOCATION;
    this.baseApiUrl = import.meta.env.VITE_BASE_API_LOCATION;
  }

  fetchLocations = async (
    placeName: string,
    limit: number,
    lang: string = 'es'
  ): Promise<MyLocation[]> => {
    const url = `${this.baseApiUrl}/geo/1.0/direct?q=${placeName}&limit=${limit}&appid=${this.apiKey}&lang=${lang}`;
    const { data } = await axios.get(url);
    return data;
  };

  fetchWeather = async (
    lat: string,
    lon: string,
    units: string = 'metric',
    lang: string = 'es'
  ): Promise<WeatherResponse> => {
    const url = `${this.baseApiUrl}/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=${units}&lang=${lang}`;
    const { data } = await axios.get(url);
    return data;
  };
}

export default LocationsApi;
