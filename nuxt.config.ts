/**
 * @type {import('@nuxt/types').Configuration}
 */
export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },

  app: {
    head: {
      title: "TROOV TEST Application",
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
    }
  },

  css: ["bootstrap/dist/css/bootstrap.min.css"],

  runtimeConfig: {
    public: {
      apiBase: "http://localhost:5000/api", // API base URL
    },
  },

  plugins: [{ src: "~/plugins/bootstrap.client.ts", mode: "client" }],

  modules: ["@nuxt/image", "@pinia/nuxt"],

  image: {
    domains: ["example.com", "picsum.photos"], // Add domains for external images
    screens: {
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
    },
  },
});
