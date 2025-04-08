import { defineStore } from 'pinia'
import { getWeatherByCity, getForecastByCity } from '@/services/weatherService'
import axios from 'axios'

export const useWeatherStore = defineStore('weather', {
  state: () => ({
    data: null,
    forecast: [],
    error: null,
    loading: false,
  }),
  actions: {
    async fetchWeather(city) {
      this.loading = true
      try {
        this.error = null
        this.data = await getWeatherByCity(city)
        const forecastRes = await getForecastByCity(city)
        this.forecast = forecastRes.list.filter(item => item.dt_txt.includes('12:00:00'))
      } catch (err) {
        this.error = 'City not found'
        this.data = null
        this.forecast = []
      } finally {
        this.loading = false
      }
    },
    async fetchWeatherByCoords(lat, lon) {
      this.loading = true
      try {
        this.error = null
        const res = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
          params: {
            lat,
            lon,
            appid: import.meta.env.VITE_OPENWEATHER_API_KEY,
            units: 'metric'
          }
        })
        this.data = res.data
        const forecastRes = await axios.get('https://api.openweathermap.org/data/2.5/forecast', {
          params: {
            lat,
            lon,
            appid: import.meta.env.VITE_OPENWEATHER_API_KEY,
            units: 'metric'
          }
        })
        this.forecast = forecastRes.data.list.filter(item => item.dt_txt.includes('12:00:00'))
      } catch (e) {
        this.error = 'Location weather not found'
        this.data = null
        this.forecast = []
      } finally {
        this.loading = false
      }
    },
  },
})
