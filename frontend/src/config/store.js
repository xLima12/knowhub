import { createStore } from "vuex";

export default createStore({
  state: {
    isMenuVisible: true,
    user: {
      name: "Usuário Mock",
      email: "mock@codenoir.com.br",
    },
  },
  getters: {
    getUser(state) {
      return state.user || { name: "Visitante", email: "" };
    },
  },
  mutations: {
    toggleMenu(state, isVisible) {
      if (isVisible === undefined) {
        state.isMenuVisible = !state.isMenuVisible;
      } else {
        state.isMenuVisible = isVisible;
      }
    },
  },
});
