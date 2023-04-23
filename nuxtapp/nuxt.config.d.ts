declare module "@nuxt/schema" {
  interface NuxtConfig {
    tailwindcss?: {
      cssPath?: string | undefined;
      configPath?: string | undefined;
      exposeConfig?: boolean | undefined;
      config?: any;
      injectPosition?: number | undefined;
      viewer?: boolean | undefined;
    };
    googleFonts?: {
      families?: {
        [name: string]:
          | boolean
          | number[]
          | { wght?: number[]; ital?: number[] };
      };
      display?: string;
      subsets?: string | string[];
      text?: string | null;
      prefetch?: boolean;
      preconnect?: boolean;
      preload?: boolean;
      useStylesheet?: boolean;
      download?: boolean;
      base64?: boolean;
      inject?: boolean;
      overwriting?: boolean;
      outputDir?: string;
      stylePath?: string;
      fontsDir?: string;
      fontsPath?: string;
    };
  }
}

export {};
