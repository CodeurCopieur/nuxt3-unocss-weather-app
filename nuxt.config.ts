// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
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
        "weather-primary": "#00668A",
        "weather-secondary": "#004E71",
      },
      fontFamily: {
        Roboto: ['Roboto']
      }
    }
  },
  devtools: { enabled: true }
})
