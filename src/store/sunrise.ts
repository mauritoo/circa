
import { defineStore } from 'pinia'
import axios from "axios"

export const useSunriseStore = defineStore("sunrise", {
    state: () => ({
        days: [],
        today: {},
    }),
    getters: {
      getToday(state){
          return state.today
        }
    },
    actions: {
      async fetchTodayInfo(lat: number = 39.577185, lng: number = -0.537712) {
        try {
          const baseApiUrl = 'https://api.sunrisesunset.io'
          const url = `${baseApiUrl}/json?lat=${lat}&lng=${lng}`
          const response = await axios.get(url)
          this.today = response.data.results
          }
          catch (error) {
            console.log(error)
        }
      }
    },
})