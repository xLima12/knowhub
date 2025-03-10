import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    isMenuVisible: false,
    user: null,
  },
  getters: {
    getUser(state) {
      return state.user || { name: "Visitante", email: "" };
    },
  },
  mutations: {
    toggleMenu(state, isVisible) {
      if (!state.user) {
        state.isMenuVisible = false;
        return;
      }

      if (isVisible === undefined) {
        state.isMenuVisible = !state.isMenuVisible;
      } else {
        state.isMenuVisible = isVisible;
      }
    },
    setUser(state, user) {
      state.user = user;
      if (user) {
        axios.defaults.headers.common["Authorization"] = `bearer ${user.token}`;
        state.isMenuVisible = true;
      } else {
        delete axios.defaults.headers.common["Authorization"];
        state.isMenuVisible = false;
      }
    },
  },
});
