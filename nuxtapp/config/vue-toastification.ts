import { PluginOptions, POSITION } from "vue-toastification";

const options = <PluginOptions>{
  maxToasts: 20,
  newestOnTop: true,
  position: POSITION.TOP_RIGHT,
  shareAppContext: true,
  timeout: 5000,
  transition: "Vue-Toastification__bounce",
};

export default options;
