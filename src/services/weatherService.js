import axios from 'axios'

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY

export const getWeatherByCity = async (city) => {
    const res = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
        params: {
            q: city,
            appid: API_KEY,
            units: 'metric',
        },
    })
    return res.data
}
export const getForecastByCity = async (city) => {
    const res = await axios.get('https://api.openweathermap.org/data/2.5/forecast', {
        params: {
            q: city,
            appid: API_KEY,
            units: 'metric',
        },
    })
    return res.data
}
