import { resolve as pathResolve } from "path"
import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue"

export default defineConfig({
  resolve: {
    alias: { "@": pathResolve(__dirname) },
  },
  server: {
    host: "0.0.0.0",
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./config/setupTests.mjs"],
    clearMocks: true,
    deps: {
      inline: [/@nuxt\/test-utils-edge/],
    },
  },
  plugins: [vue()]
});
