import { defineStore } from 'pinia';
import axios from 'axios';

export const useLocationStore = defineStore('location', {
  state: () => ({
    isLoading: false as boolean,
    isError: false as boolean,
    isResponseOk: false as boolean,
    locations: [] as MyLocation[],
  }),
  getters: {
    getLocations(state) {
      return state.locations;
    },
    getIsLoading(state) {
      return state.isLoading;
    },
    getIsError(state) {
      return state.isError;
    },
    getIsResponseOk(state) {
      return state.isResponseOk;
    },
  },
  actions: {
    async fetchLocations(
      placeName: string = '',
      limit: number = 5
    ): Promise<MyLocation[]> {
      try {
        this.isLoading = true;
        this.isError = false;
        const apiKey = import.meta.env.VITE_API_KEY_LOCATION;
        const baseApiUrl = import.meta.env.VITE_BASE_API_LOCATION;
        const url = `${baseApiUrl}/direct?q=${placeName}&limit=${limit}&appid=${apiKey}`;
        const { data } = await axios.get(url);
        this.locations = data;
        return this.locations;
      } catch (error) {
        this.isError = true;
        console.log(error);
      } finally {
        this.isLoading = false;
        return this.locations;
      }
    },
  },
});
