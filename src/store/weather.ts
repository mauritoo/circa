import { defineStore } from 'pinia';
import LocationsApi from '../api/locationsApi';
import { WeatherResponse } from '../types/WeatherResponse';

export const useWeatherStore = defineStore('weather', {
  state: () => ({
    isError: false as boolean,
    isLoading: false as boolean,
    isResponseOk: false as boolean,
    weather: {} as WeatherResponse,
  }),
  getters: {
    getDescription: (state) =>
      state.weather?.weather && state.weather?.weather[0]?.description,
    getIcon: (state) =>
      state.weather?.weather && state.weather?.weather[0]?.icon,
    getIsError: (state) => state.isError,
    getIsResponseOk: (state) => state.isResponseOk,
    getMax: (state) => state.weather?.main?.temp_max,
    getMin: (state) => state.weather?.main?.temp_min,
    getName: (state) => state.weather?.name,
    getTemperature: (state) => state.weather?.main?.temp,
    getTitle: (state) =>
      state.weather?.weather && state.weather?.weather[0]?.main,
    getWeather: (state) => state.weather,
  },
  actions: {
    async fetchWeather(lat: string, lon: string): Promise<WeatherResponse> {
      try {
        const locationsApi = new LocationsApi();
        this.isLoading = true;
        this.isError = false;
        const data: WeatherResponse = await locationsApi.fetchWeather(lat, lon);
        this.weather = data;
        return this.weather;
      } catch (error) {
        this.isError = true;
        console.log(error);
      } finally {
        this.isLoading = false;
        return this.weather;
      }
    },
  },
});
