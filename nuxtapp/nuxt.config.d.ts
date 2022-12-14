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
  }
}

export {}
