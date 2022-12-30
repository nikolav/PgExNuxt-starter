// https://github.com/Maronato/vue-toastification
import Toast, { useToast } from "vue-toastification";

import options from "@/config/vue-toastification";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Toast, options);

  const toast = useToast();

  // toast("Default toast");
  // toast.info("Info toast");
  // toast.success("Success toast");
  // toast.error("Error toast");
  // toast.warning("Warning toast");

  // // Get the toast ID on creation
  // const toastId = toast("my toast");

  // // Dismiss it later
  // toast.dismiss(toastId);

  // // Pass your custom ID to the toast
  // toast("my other toast", { id: "my id" });
  // toast.dismiss("my id");

  // // Dismiss all toasts
  // toast.clear();

  // render component
  // # import MyComponent from "./MyComponent.vue";
  // # ..
  // # toast(MyComponent);

  return {
    provide: { toast },
  };
});
