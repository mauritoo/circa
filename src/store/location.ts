import { defineStore } from 'pinia';
import LocationsApi from '../api/locationsApi';

export const useLocationStore = defineStore('location', {
  state: () => ({
    isLoading: false as boolean,
    isError: false as boolean,
    isResponseOk: false as boolean,
    locations: [] as MyLocation[],
    selectedLocation: {} as MyLocation,
  }),
  getters: {
    getLocations: (state) => state.locations,
    getSelectedLocation: (state) => state.selectedLocation,
    getIsLoading: (state) => state.isLoading,
    getIsError: (state) => state.isError,
    getIsResponseOk: (state) => state.isResponseOk,
  },
  actions: {
    async fetchLocations(
      placeName: string = '',
      limit: number = 5
    ): Promise<MyLocation[]> {
      try {
        const locationsApi = new LocationsApi();
        this.isLoading = true;
        this.isError = false;
        const data: MyLocation[] = await locationsApi.fetchLocations(
          placeName,
          limit
        );
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
    selectLocation(location: MyLocation): void {
      this.selectedLocation = location;
    },
  },
});
