// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: [
    'vuetify/styles',
    '@mdi/font/css/materialdesignicons.min.css',
  ],
  build: {
    transpile: ['vuetify'],
  },
  modules: [
    '@netlify/nuxt',
    'nuxt-icon',
    '@nuxt/image',
  ],
  vite: {
    define: {
      'process.env.DEBUG': false,
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "vuetify/styles" as *;'
        }
      }
    },
    plugins: [
      // @ts-ignore
      import('vite-tsconfig-paths')
    ]
  },
  runtimeConfig: {
    woocommerce: {
      url: "https://timob18.sg-host.com",
      consumerKey: "ck_8a5e742a1ac9b08dae6e1f3b83d4931104d74084",
      consumerSecret: "cs_725aa0414be6d4a90f27bda1ba766fe935fd2892"
    },
  },
  experimental: { appManifest: false },
  compatibilityDate: "2024-12-18",
});
