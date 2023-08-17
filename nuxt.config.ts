// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      baseUrl: "https://api.mapbox.com/geocoding/v5/mapbox.places/",
      baseUrl2: "https://api.openweathermap.org/data/2.5/",
      currencyKey: process.env.CURRENCY_API_KEY || process.env.API_KEY,
      currencyKey2: process.env.CURRENCY_API_KEY2 || process.env.API_KEY2,
    }
  },
  modules: ['@unocss/nuxt','nuxt-icon'],
  unocss: {
    uno: true,
    preflight: true,
    shortcuts: {
      // shortcuts to multiple utilities
      'btn': 'py-2 px-4 font-semibold rounded-lg shadow-md',
      'btn-green': 'text-white bg-green-500 hover:bg-green-700',
      // single utility alias
      'red': 'text-red-100'
    },
    theme: {
      // ...
      colors: {
        "weather-primary": "#0ea5e9",
        "weather-secondary": "#004E71",
        "weather-tertiary": "#f43f5e",
      },
      fontFamily: {
        Roboto: ['Roboto']
      }
    }
  },
  devtools: { enabled: true }
})
