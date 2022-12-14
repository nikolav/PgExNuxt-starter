
import { configureIO } from "@/services";

const socket = configureIO();

export default defineNuxtPlugin(() => {
  return {
    provide: { socket }
  }
})
