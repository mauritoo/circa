
import { defineStore } from 'pinia'
import axios from "axios"

export const useSunriseStore = defineStore("sunrise", {
    state: () => ({
        days: [],
        today: {
          'first_light': '',
          'dawn': '',
          'sunrise': '',
          'solar_noon': '',
          'golden_hour': '',
          'sunset': '',
          'last_light': '',
          'day_length': '',          
        } as Day,
        isLoading: false,
        isError: false,
        isResponseOk: false,
        placeName: '',
    }),
    getters: {
      getToday(state){
          return state.today
        },
      getIsLoading(state){
          return state.isLoading
        },
      getIsError(state){
          return state.isError
        }
    },
    actions: {
      async fetchTodayInfo(placeName: string, lat: number = 39.577185, lng: number = -0.537712) : Promise<Object> {
        try {
          this.isLoading = true
          this.isError = false
          const baseApiUrl = 'https://api.sunrisesunset.io'
          const url = `${baseApiUrl}/json?lat=${lat}&lng=${lng}`
          const response = await axios.get(url)
          if (response.data.status === 'OK') {
            this.today = response.data.results as Day
            this.isResponseOk = true
            this.placeName = placeName
          } else {
            this.isError = true
            throw new Error(response.data.body)
          }
        }
        catch (error) {
          this.isError = true
          console.log(error)
        } finally {
          this.isLoading = false
          return this.today
        }
      }
    },
})