import routes from "@/routes";
import authService from "../services/auth-service";

authService.initialize();

export default {
  state: {
    isAuthenticated: authService.isAuthenticated()
  },

  getters: {
    isAuthenticated(state) {
      return state.isAuthenticated;
    }
  },

  mutations: {
    SET_AUTHENTICATED(state, isAuthenticated) {
      state.isAuthenticated = isAuthenticated;
    }
  },

  actions: {
    async login({ commit }, payload) {
      const response = await authService.login(payload.user, payload.requestOptions);
      commit("SET_AUTHENTICATED", authService.isAuthenticated());
      routes.push({ name: "Dashboard" });
      return response;
    },

    async register({ commit }, payload) {
      const response = await authService.register(payload.user, payload.requestOptions);
      commit("SET_AUTHENTICATED", authService.isAuthenticated());
      routes.push({ name: "Home" });
      return response;
    },

    async logout({ commit }) {
      await authService.logout();
      commit("SET_AUTHENTICATED", authService.isAuthenticated());
      routes.push({ name: "Login" });
    }
  }
};
