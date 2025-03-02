import Components from "unplugin-vue-components/webpack";
import { BootstrapVueNextResolver } from "bootstrap-vue-next";

export default {
  configureWebpack: {
    plugins: [
      Components({
        resolvers: [BootstrapVueNextResolver()],
      }),
    ],
  },
};
