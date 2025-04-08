import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ForecastList from '@/components/ForecastList.vue'

const forecastMock = [
    {
        dt: 1,
        dt_txt: '2025-04-09 12:00:00',
        main: { temp: 29 },
        weather: [{ description: 'few clouds', icon: '02d' }],
    },
]

describe('ForecastList.vue', () => {
    it('renders forecast data correctly', () => {
        const wrapper = mount(ForecastList, {
            props: { forecast: forecastMock },
        })

        expect(wrapper.text()).toContain('few clouds')
        expect(wrapper.text()).toContain('29°C')
        expect(wrapper.find('img').exists()).toBe(true)
    })
})
