import vitePluginVuetify from "vite-plugin-vuetify";

import {
  REDIS_HOST,
  REDIS_PORT,
  REDIS_PASSWORD,
  ENDPOINT_GRAPHQL,
} from "./config";

// https://nuxt.com/docs/api/configuration/nuxt-config#nuxt-configuration-reference
export default defineNuxtConfig({
  // # client-side output
  // # use .generate command to produce html in .output/public
  // # specify routes for nitro to prerender @nitro.prerender.routes<path[]>
  ssr: false,

  // # disable implicit auto imports
  // imports: {
  //   autoImport: false,
  // },

  // https://nuxt.com/docs/getting-started/configuration#environment-variables-and-private-tokens
  runtimeConfig: {
    // # server secrests, vars.. only available server-side
    // # update runtime config values using a matching environment variable name prefixed with `NUXT_`
    // privateField: "value",

    // @ keys within runtimeConfig.public are available client-side
    public: {},
  },

  // alias: {
  //   "@": resolve(__dirname, "assets"),
  //   assets: "/<rootDir>/assets",
  // },

  modules: [
    "@vueuse/nuxt",

    "@nuxtjs/tailwindcss",

    [
      "@pinia/nuxt",
      {
        autoImports: ["defineStore", ["defineStore", "definePiniaStore"]],
      },
    ],

    // https://next.vuetifyjs.com/en/features/treeshaking/#automatic-treeshaking
    async (_options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) => {
        try {
          config.plugins &&
            config.plugins.push(
              vitePluginVuetify({
                // # https://next.vuetifyjs.com/en/features/sass-variables/#component-specific-variables
                // styles: { configFile: "assets/vuetify-sass-variables.scss" },
              })
            );
        } catch (error) {
          // ignore
        }
      });
    },

    // https://apollo.nuxtjs.org/getting-started/quick-start
    "@nuxtjs/apollo",

    // https://v1.image.nuxtjs.org/components/nuxt-img#usage
    "@nuxt/image-edge",
  ],
  app: {
    head: {
      // @useHead(); # https://nuxt.com/docs/getting-started/seo-meta#composable-usehead
      charset: "utf-8",
      viewport:
        "width=device-width, initial-scale=1.0, shrink-to-fit=no, minimum-scale=1",
      title: "Nikola Vuković",
      titleTemplate: "%s | nikolav.rs",
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
        // {
        //   rel: "preconnect",
        //   href: "https://fonts.googleapis.com",
        // },
        // {
        //   rel: "stylesheet",
        //   href: "https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600;1,700&display=swap",
        // },
        // {
        //   rel: "stylesheet",
        //   href: "https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap",
        // },
      ],
      noscript: [
        // <noscript>JavaScript is required</noscript>
        { children: "JavaScript is required" },
      ],
      bodyAttrs: {
        class: "scrollbar-thin"
      },
    },
    // css-transition all pages
    pageTransition: { name: "PAGE", mode: "in-out" },
    // enable layout transitions to apply an automatic transition for all layouts
    layoutTransition: { name: "PAGE", mode: "in-out" },
  },
  css: [
    "@/assets/style/scrollbar-thin.scss",
    "@/assets/style/reset.css",
    "@/assets/style/main.scss",
    "vuetify/lib/styles/main.sass",
    "@mdi/font/css/materialdesignicons.min.css",
    "vue-toastification/dist/index.css",
    "@fancyapps/ui/dist/fancybox/fancybox.css",
  ],
  build: {
    transpile: [
      "vuetify",
      // # https://greensock.com/docs/v3/Installation
      // # If server side rendering add GSAP to transpile property
      "gsap",
    ],
  },
  buildModules: ["@nuxtjs/google-fonts"],
  vite: {
    define: {
      "process.env.DEBUG": false,
    },
    // ssr: { noExternal: ["vuetify"] },
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
    autoImports: true,
    authType: "Bearer",
    authHeader: "Authorization",
    tokenStorage: "cookie",
    proxyCookies: true,
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
  },

  // https://v1.image.nuxtjs.org/get-started/#configuration
  image: {},

  // https://google-fonts.nuxtjs.org/
  googleFonts: {
    families: {
      Roboto: true,
      "Open+Sans": {
        wght: [300, 400, 600, 700],
        ital: [100],
      },
    },
    useStylesheet: true,
    download: false,
  },
});
