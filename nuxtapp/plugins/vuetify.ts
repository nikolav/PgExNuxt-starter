import "vuetify/styles";
import {
  createVuetify,
  // ThemeDefinition
} from "vuetify";
import { md2 } from "vuetify/blueprints";
import { aliases, mdi } from "vuetify/iconsets/mdi-svg";

import { light2, dark2 } from "@/assets/themes";

import {
  IconChevronLeft,
  IconChevronRight,
  IconDial,
  IconMagnifyingGlass,
  IconMenu,
  IconRedEye,
} from "@/components/icons";

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

    // @useDisplay composable configuration options
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
    theme: {
      defaultTheme: "dark2",
      // defaultTheme: "light2",
      themes: {
        dark2,
        light2,
      },
      variations: {
        colors: ["primary", "secondary"],
        lighten: 2,
        darken: 2,
      },
    },

    // aliases: {
    //   MyButton: VBtn,
    //   MyButtonAlt: VBtn,
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
      VCol: {
        cols: 12,
      },
    },

    icons: {
      defaultSet: "mdi",
      aliases: {
        ...aliases,
        // # override
        menu: IconMenu,
        // # add: <VIcon icon="$other">
        iconChevronLeft: IconChevronLeft,
        iconChevronRight: IconChevronRight,
        icondial: IconDial,
        iconredeye: IconRedEye,
        iconSearch: IconMagnifyingGlass,
      },
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

// #aliases
// cancel: '...',
// checkboxIndeterminate: '...',
// checkboxOff: '...',
// checkboxOn: '...',
// clear: '...',
// close: '...',
// collapse: '...',
// complete: '...',
// delete: '...',
// delimiter: '...',
// dropdown: '...',
// edit: '...',
// error: '...',
// expand: '...',
// file: '...',
// first: '...',
// info: '...',
// last: '...',
// loading: '...',
// menu: '...',
// minus: '...',
// next: '...',
// plus: '...',
// prev: '...',
// radioOff: '...',
// radioOn: '...',
// ratingEmpty: '...',
// ratingFull: '...',
// ratingHalf: '...',
// sort: '...',
// subgroup: '...',
// success: '...',
// unfold: '...',
// warning: '...',
