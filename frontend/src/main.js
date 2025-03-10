import "font-awesome/css/font-awesome.css";
import { createApp } from "vue";
import { createBootstrap } from "bootstrap-vue-next";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue-next/dist/bootstrap-vue-next.css";
import App from "./App.vue";
import store from "./config/store";
import router from "./config/router";
import "./config/axios";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import PrimeVue from "primevue/config";
import Aura from "@primeuix/themes/aura";
import { Vue3Mq } from "vue3-mq";

const app = createApp(App);
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      prefix: "p",
      darkModeSelector: "system",
      cssLayer: false,
    },
  },
});
app.use(Vue3Mq, {
  breakpoints: {
    xs: 576,
    sm: 768,
    md: 960,
    lg: 1140,
    xl: Infinity,
  },
});
app.component("QuillEditor", QuillEditor);
app.use(createBootstrap());
app.use(store);
app.use(router);
app.mount("#app");
