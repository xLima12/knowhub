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

const app = createApp(App);
app.component("QuillEditor", QuillEditor);
app.use(createBootstrap());
app.use(store);
app.use(router);
app.mount("#app");
