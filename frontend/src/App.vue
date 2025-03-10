<template>
  <div class="app" :class="{ 'hide-menu': !isMenuVisible || !user }">
    <div class="toast-container">
      <BToast
        v-for="toast in toasts"
        :key="toast.id"
        v-model="toast.show"
        :title="toast.title"
        :variant="toast.variant"
        solid
        auto-hide-delay="3000"
      >
        {{ toast.message }}
      </BToast>
    </div>
    <Header
      title="Code Noir - Know Hub"
      :hideToggle="!user"
      :hideUserDropdown="!user"
    />
    <Menu v-if="user" />
    <Loading v-if="validatingToken" />
    <Content v-else />
    <Footer />
  </div>
</template>

<script>
import axios from "axios";
import { baseApiUrl, userKey } from "@/global";
import { reactive, provide } from "vue";
import Header from "./components/template/Header.vue";
import Menu from "./components/template/Menu.vue";
import Content from "./components/template/Content.vue";
import Footer from "./components/template/Footer.vue";
import { mapState } from "vuex";
import Loading from "./components/template/Loading.vue";
import { inject } from "vue";

export default {
  setup() {
    const toasts = reactive([]);

    const showToast = (
      message = null,
      variant = "success",
      title = "Notificação"
    ) => {
      const id = Date.now();

      const toastMessage =
        variant === "success"
          ? message || "Operação realizada com sucesso!"
          : message || "Oops... Erro inesperado.";

      toasts.push({ id, show: true, title, message: toastMessage, variant });

      setTimeout(() => {
        const index = toasts.findIndex((t) => t.id === id);
        if (index !== -1) {
          toasts.splice(index, 1);
        }
      }, 3000);
    };

    provide("showToast", showToast);

    return { toasts };
  },
  name: "App",
  components: { Header, Menu, Content, Footer, Loading },
  computed: mapState(["isMenuVisible", "user"]),
  data: function () {
    return {
      validatingToken: false,
      currentBreakpoint: inject("mq").current || "md",
    };
  },
  methods: {
    async validateToken() {
      this.validatingToken = true;

      const json = localStorage.getItem(userKey);
      const userData = JSON.parse(json);
      this.$store.commit("setUser", null);

      if (!userData) {
        this.validatingToken = false;
        this.$router.push({ name: "auth" });
        return;
      }

      const res = await axios.post(`${baseApiUrl}/validateToken`, userData);

      if (res.data) {
        console.log(this.currentBreakpoint);
        if (
          this.currentBreakpoint === "sm" ||
          this.currentBreakpoint === "xs"
        ) {
          this.$store.commit("toggleMenu", false);
        }
        this.$store.commit("setUser", userData);
      } else {
        localStorage.removeItem(userKey);
        this.$router.push({ name: "auth" });
      }

      this.validatingToken = false;
    },
  },
  created() {
    this.validateToken();
  },
};
</script>

<style>
* {
  font-family: "Lato", "sans-serif";
}

body {
  margin: 0;
  padding: 0;
}

.app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  height: 100vh;
  display: grid;
  grid-template-rows: 60px 1fr 40px;
  grid-template-columns: 300px 1fr;
  grid-template-areas:
    "header header"
    "menu content"
    "menu footer";
}

.app.hide-menu {
  grid-template-areas: "header header" "content content" "footer footer";
}

.toast-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1050;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
