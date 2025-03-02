import "font-awesome/css/font-awesome.css";
import { createApp } from "vue";
import { createBootstrap } from "bootstrap-vue-next";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue-next/dist/bootstrap-vue-next.css";
import App from "./App.vue";
import store from "./config/store";
import router from "./config/router";
import axios from "axios";

axios.defaults.headers.common.Authorization =
  "bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwibmFtZSI6IkZlbGlwZSBMaW1hIiwiZW1haWwiOiJmbGltYUBjb2Rlbm9pci5jb20uYnIiLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNzQwODc4NDYxLCJleHAiOjE3NDExMzc2NjF9.lfV5mhNRMpAWPcthfnklcpyeZTDPScAOX3MO_4Zlc2k";

const app = createApp(App);
app.use(createBootstrap());
app.use(store);
app.use(router);
app.mount("#app");
