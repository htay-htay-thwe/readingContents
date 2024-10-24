// nuxt.config.js
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  css: [
    '~/assets/css/main.css',
    'swiper/swiper-bundle.css', // Ensure this is included for Swiper styles
  ],
  modules: [
    '@pinia/nuxt',
    '@vee-validate/nuxt',
    'nuxt-swiper', // Add this line to include the nuxt-swiper module
  ],
  swiper: {
    // Add any optional Swiper configuration here
    prefix: 'Swiper',
    styleLang: 'css',
    modules: ['pagination', 'navigation'], // Ensure these modules are included
  },
  veeValidate: {
    autoImports: true,
    componentNames: {
      Form: 'VeeForm',
      Field: 'VeeField',
      FieldArray: 'VeeFieldArray',
      ErrorMessage: 'VeeErrorMessage',
    },
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  pinia: {
    storesDirs: ['./stores/**', './custom-folder/stores/**'],
  },
});
