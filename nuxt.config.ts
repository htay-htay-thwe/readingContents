// nuxt.config.js
export default defineNuxtConfig({
  // Compatibility & devtools
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },

  // Enable static target for Netlify
  ssr: true,           
  target: 'static', 
  generate: {
    fallback: '200.html'
  },

  // Global CSS
  css: [
    'flowbite/dist/flowbite.css',
    '~/assets/css/main.css',
    'aos/dist/aos.css',
  ],

  // Nuxt modules
  modules: [
    '@pinia/nuxt',
    '@vee-validate/nuxt',
    '@nuxtjs/color-mode'
  ],

  // VeeValidate config
  veeValidate: {
    autoImports: true,
    componentNames: {
      Form: 'VeeForm',
      Field: 'VeeField',
      FieldArray: 'VeeFieldArray',
      ErrorMessage: 'VeeErrorMessage',
    },
  },

  // PostCSS config
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  // Plugins
  plugins: [
    '~/plugins/aos.js',
  ],

  // Pinia config
  pinia: {
    storesDirs: ['./stores/**', './custom-folder/stores/**'],
  },

  // Nitro config for Netlify (optional if you ever want SSR serverless)
  // nitro: {
  //   preset: 'netlify', 
  // },

  // Vite or build options (optional)
  build: {
    transpile: ['flowbite'],
  }
});
