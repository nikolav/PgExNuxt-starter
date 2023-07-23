import { PluginOptions, POSITION } from "vue-toastification";

const options = <PluginOptions>{
  maxToasts: 10,
  newestOnTop: true,
  position: POSITION.TOP_RIGHT,
  shareAppContext: true,
  timeout: 6789,
  transition: "Vue-Toastification__bounce",
};

export default options;
