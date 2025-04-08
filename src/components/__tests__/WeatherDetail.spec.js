import { render } from '@testing-library/vue'
import WeatherDetail from '../WeatherDetail.vue'

describe('WeatherDetail.vue', () => {
  const mockWeather = {
    name: 'Jakarta',
    weather: [
      {
        description: 'clear sky',
        icon: '01d',
      },
    ],
    main: {
      temp: 30,
      humidity: 60,
      feels_like: 32,
    },
    wind: {
      speed: 3.6,
    },
    sys: {
      sunrise: 1691341200, // timestamp dummy
      sunset: 1691384400,
    },
    timezone: 25200, // GMT+7 (dalam detik)
  }

  it('renders correctly with props', () => {
    const { getByText, getByAltText } = render(WeatherDetail, {
      props: {
        weather: mockWeather,
      },
    })

    expect(getByText('Jakarta')).toBeTruthy()
    expect(getByText(/clear sky/i)).toBeTruthy()
    expect(getByText(/30°C/)).toBeTruthy()
    expect(getByAltText('icon')).toBeTruthy()
  })
})
