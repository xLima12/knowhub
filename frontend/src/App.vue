<template>
  <div class="app" :class="{ 'hide-menu': !isMenuVisible }">
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
      :hideToggle="false"
      :hideUserDropdown="false"
    />
    <Menu />
    <Content />
    <Footer />
  </div>
</template>

<script>
import { reactive, provide } from "vue";
import Header from "./components/template/Header.vue";
import Menu from "./components/template/Menu.vue";
import Content from "./components/template/Content.vue";
import Footer from "./components/template/Footer.vue";
import { mapState } from "vuex";

export default {
  setup() {
    // Lista de toasts ativos
    const toasts = reactive([]);

    // Função para exibir um toast
    const showToast = (
      message = null,
      variant = "success",
      title = "Notificação"
    ) => {
      const id = Date.now(); // Identificador único

      const toastMessage =
        variant === "success"
          ? message || "Operação realizada com sucesso!"
          : message || "Oops... Erro inesperado.";

      toasts.push({ id, show: true, title, message: toastMessage, variant });

      // Remover o toast após 3 segundos
      setTimeout(() => {
        const index = toasts.findIndex((t) => t.id === id);
        if (index !== -1) {
          toasts.splice(index, 1);
        }
      }, 3000);
    };

    // Tornar a função disponível globalmente
    provide("showToast", showToast);

    return { toasts };
  },
  name: "App",
  components: { Header, Menu, Content, Footer },
  computed: mapState(["isMenuVisible"]),
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
