// nuxt.config.js
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  css: [
    'flowbite/dist/flowbite.css', // Add this line
    '~/assets/css/main.css',
    'aos/dist/aos.css',
  ],
  modules: ['@pinia/nuxt', '@vee-validate/nuxt', '@nuxtjs/color-mode'],
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
  plugins: [
    '~/plugins/aos.js', // Add this line to register the AOS plugin
  ],
  pinia: {
    storesDirs: ['./stores/**', './custom-folder/stores/**'],
  },
});
