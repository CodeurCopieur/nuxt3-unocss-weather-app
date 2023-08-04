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
        'veryCool': '#0000ff', // class="text-very-cool"
        'brand': {
          'primary': 'hsla(var(--hue, 217), 78%, 51%)', //class="bg-brand-primary"
        }
      },
      fontFamily: {
        Roboto: ['Roboto']
      }
    }
  },
  devtools: { enabled: true }
})
