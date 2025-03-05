import "font-awesome/css/font-awesome.css";
import { createApp } from "vue";
import { createBootstrap } from "bootstrap-vue-next";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue-next/dist/bootstrap-vue-next.css";
import App from "./App.vue";
import store from "./config/store";
import router from "./config/router";
import axios from "axios";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import PrimeVue from "primevue/config";
import Aura from "@primeuix/themes/aura";

axios.defaults.headers.common.Authorization =
  "bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwibmFtZSI6IkZlbGlwZSBMaW1hIiwiZW1haWwiOiJmbGltYUBjb2Rlbm9pci5jb20uYnIiLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNzQxMTM3NzE4LCJleHAiOjE3NDEzOTY5MTh9.fk05SBgeGqxjoOIpcGW74vOb3vcLfHbzDlwEUw64W3s";

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
app.component("QuillEditor", QuillEditor);
app.use(createBootstrap());
app.use(store);
app.use(router);
app.mount("#app");
