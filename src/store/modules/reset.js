import axios from "axios";
import store from "@/store";
import { API_BASE_URL } from "../../env";

const url = API_BASE_URL;

const actions = {
  async forgotPassword({ commit }, data) {
    await axios.post(`${url}/password-forgot`, { data });
  },
  async createNewPassword({ commit }, data) {
    await axios.post(`${url}/password-reset`, { data });

    const user = {
      data: {
        type: "token",
        attributes: {
          email: data.attributes.email,
          password: data.attributes.password
        }
      }
    };

    const requestOptions = {
      headers: {
        Accept: "application/vnd.api+json",
        "Content-Type": "application/vnd.api+json"
      }
    };

    await store.dispatch("login", { user, requestOptions }, { root: true });
  }
};

const reset = {
  namespaced: true,
  actions
};

export default reset;
