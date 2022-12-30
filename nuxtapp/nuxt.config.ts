import vuetify from "vite-plugin-vuetify";

import {
  REDIS_HOST,
  REDIS_PORT,
  REDIS_PASSWORD,
  ENDPOINT_GRAPHQL,
} from "./config";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // # client-side output
  // # use .generate command to produce html in .output/public
  // # specify routes for nitro to prerender @nitro.prerender.routes<path[]>
  // ssr: false,

  // imports: {
  //   autoImport: false,
  // },

  // https://nuxt.com/docs/getting-started/configuration#environment-variables-and-private-tokens
  runtimeConfig: {
    // # server secrests, vars.. only available server-side
    // privateField: "value",

    // @ keys within runtimeConfig.public are available client-side
    public: {},
  },

  modules: [
    "@vueuse/nuxt",

    "@nuxtjs/tailwindcss",

    [
      "@pinia/nuxt",
      {
        autoImports: ["defineStore", ["defineStore", "definePiniaStore"]],
      },
    ],

    async (_options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) => {
        config.plugins && config.plugins.push(vuetify());
      });
    },

    // https://apollo.nuxtjs.org/getting-started/quick-start
    "@nuxtjs/apollo",
  ],
  app: {
    head: {
      // @useHead(); # https://nuxt.com/docs/getting-started/seo-meta#composable-usehead
      charset: "utf-16",
      viewport:
        "width=device-width, initial-scale=1.0, shrink-to-fit=no, minimum-scale=1",
      title: "nuxtapp",
      titleTemplate: "%s | Nuxt3",
      // https://www.geeksforgeeks.org/meta-tags-in-nuxt-js/
      meta: [
        { name: "description", content: "App" },
        { name: "theme-color", content: "#fafafa" },
      ],
      link: [
        {
          rel: "icon",
          type: "image/x-icon",
          href: "/favicon.ico",
        },
        {
          rel: "preconnect",
          href: "https://fonts.googleapis.com",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600;1,700&display=swap",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap",
        },
      ],
      // bodyAttrs: {
      //   class: 'test'
      // },
    },
    // css-transition all pages
    pageTransition: { name: "PAGE", mode: "in-out" },
    // enable layout transitions to apply an automatic transition for all layouts
    layoutTransition: { name: "PAGE", mode: "in-out" },
  },
  css: [
    "@/assets/style/reset.css",
    "@/assets/style/main.scss",
    "vuetify/lib/styles/main.sass",
    "@mdi/font/css/materialdesignicons.min.css",
    "vue-toastification/dist/index.css",
  ],
  build: {
    transpile: ["vuetify"],
  },
  vite: {
    define: {
      "process.env.DEBUG": false,
    },
  },
  nitro: {
    // https://nuxt.com/docs/guide/directory-structure/server#example-using-redis
    storage: {
      redis: {
        driver: "redis",
        host: REDIS_HOST,
        port: REDIS_PORT,
        username: "",
        password: REDIS_PASSWORD,
        db: 0,
        tls: {},
      },
    },

    // # build nitro from preset
    // preset: 'node-server',
    // # ..or use env variable with build
    // # $ NITRO_PRESET=node-server nuxt build

    // prerender: {
    //   routes: ["/user/1", "/user/2"],
    // },
  },
  tailwindcss: {
    cssPath: "~/src/tailwind.css",
    configPath: "~/config/tailwind.cjs",
    // exposeConfig: false,
    // config: {},
    // injectPosition: 0,
    viewer: false,
  },

  // https://apollo.nuxtjs.org/getting-started/configuration#configuration
  // https://apollo.nuxtjs.org/getting-started/configuration#clients
  apollo: {
    clients: {
      default: {
        httpEndpoint: ENDPOINT_GRAPHQL,
        httpLinkOptions: {
          // Enable sending cookies over cross-origin requests
          credentials: "include",
        },
        tokenName: "apollo:default.token",
      },
    },
    autoImports: true,
    authType: "Bearer",
    authHeader: "Authorization",
    tokenStorage: "cookie",
    proxyCookies: true,
  },
});
