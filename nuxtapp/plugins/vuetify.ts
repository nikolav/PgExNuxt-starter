import "vuetify/styles";
import {
  createVuetify,
  // ThemeDefinition
} from "vuetify";
import { md2 } from "vuetify/blueprints";
import { aliases, mdi } from "vuetify/iconsets/mdi-svg";

// const demoLightTheme: ThemeDefinition = {
//   dark: false,
//   colors: {
//     background: '#FFFFFF',
//     surface: '#FFFFFF',
//     primary: '#6200EE',
//     secondary: '#03DAC6',
//     error: '#B00020',
//     info: '#2196F3',
//     success: '#4CAF50',
//     warning: '#FB8C00',
//   }
// };

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    ssr: true,
    blueprint: md2,

    // https://next.vuetifyjs.com/en/features/display-and-platform/#interface
    // display: {
    //   mobileBreakpoint: "sm",
    //   thresholds: {
    //     xs: 0,
    //     sm: 340,
    //     md: 540,
    //     lg: 800,
    //     xl: 1280,
    //   },
    // },

    // https://next.vuetifyjs.com/en/features/theme/
    // https://next.vuetifyjs.com/en/features/theme/#theme-object-structure
    // theme: {
    //   // defaultTheme: "dark",
    //   // defaultTheme: "demoLightTheme",
    //   // themes: {
    //   //   demoLightTheme,
    //   // },
    //   // variations: {
    //   //   colors: ["primary", "secondary"],
    //   //   lighten: 5,
    //   //   darken: 5,
    //   // },
    // },

    // @@ set component/alias props
    defaults: {
      global: {
        ripple: true,
      },
      VSheet: {
        elevation: 2,
      },
      // MyButton: {
      //   color: 'primary',
      //   variant: 'tonal',
      // },
      // VBtn: {
      //   color: 'secondary',
      //   variant: 'flat'
      // },
      // VCard: {
      //   MyButton: { color: 'secondary' },
      //   VBtn: { color: 'primary' },
      // },
    },
    // aliases: {
    //   MyButton: VBtn,
    //   MyButtonAlt: VBtn,
    // },

    icons: {
      defaultSet: "mdi",
      aliases,
      sets: {
        mdi,
      },
    },

    // locale: {
    //   locale: 'zhHans',
    //   fallback: 'sv',
    //   messages: { zhHans, pl, sv }
    // }
  });
  // @@
  nuxtApp.vueApp.use(vuetify);
});
