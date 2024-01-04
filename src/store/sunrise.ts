import { defineStore } from 'pinia';
import axios from 'axios';

export const useSunriseStore = defineStore('sunrise', {
  state: () => ({
    days: [],
    today: {
      first_light: '',
      dawn: '',
      sunrise: '',
      solar_noon: '',
      golden_hour: '',
      sunset: '',
      last_light: '',
      day_length: '',
    } as Day,
    isLoading: false,
    dayLoaded: false,
    isError: false,
    isResponseOk: false,
    placeName: '',
  }),
  getters: {
    getToday: (state) => state.today,
    getIsLoading: (state) => state.isLoading,
    getIsError: (state) => state.isError,
  },
  actions: {
    cleanLocalStorage() {
      this.today = <Day>{};
      this.placeName = '';
      this.dayLoaded = false;
      localStorage.removeItem('placeName');
      localStorage.removeItem('today');
    },
    checkLocalStorage() {
      const placeName = localStorage.getItem('placeName');
      const todayString = localStorage.getItem('today');
      if (placeName && todayString) {
        this.placeName = placeName;
        this.today = JSON.parse(todayString);
        this.dayLoaded = true;
      }
    },
    async fetchTodayInfo(
      placeName: string,
      lat: number,
      lng: number
    ): Promise<Object> {
      try {
        this.isLoading = true;
        this.isError = false;
        const baseApiUrl = import.meta.env.VITE_BASE_API_SUNRISE;
        const url = `${baseApiUrl}/json?lat=${lat}&lng=${lng}`;
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
          this.today = response.data.results as Day;
          this.isResponseOk = true;
          this.dayLoaded = true;
          this.placeName =
            placeName.charAt(0).toUpperCase() + placeName.slice(1);
          localStorage.setItem('placeName', this.placeName);
          localStorage.setItem('today', JSON.stringify(this.today));
        } else {
          this.isError = true;
          throw new Error(response.data.body);
        }
      } catch (error) {
        this.isError = true;
        console.log(error);
      } finally {
        this.isLoading = false;
        return this.today;
      }
    },
  },
});
