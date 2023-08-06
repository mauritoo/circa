
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
    }),
    getters: {
      getToday(state){
          return state.today
        },
      getIsLoading(state){
          return state.isLoading
        }
    },
    actions: {
      async fetchTodayInfo(lat: number = 39.577185, lng: number = -0.537712) : Promise<Object> {
        try {
          this.isLoading = true
          console.log('fetching......')
          const baseApiUrl = 'https://api.sunrisesunset.io'
          const url = `${baseApiUrl}/json?lat=${lat}&lng=${lng}`
          const response = await axios.get(url)
          this.today = response.data.results as Day
        }
        catch (error) {
          console.log(error)
        } finally {
          this.isLoading = false
          return this.today
        }
      }
    },
})