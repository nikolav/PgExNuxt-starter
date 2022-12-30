
import EE from "eventemitter3";

const emitter = new EE();

// https://nuxt.com/docs/guide/directory-structure/plugins#automatically-providing-helpers
export default defineNuxtPlugin(() => {
  return {
    provide: { emitter }
  }
});
