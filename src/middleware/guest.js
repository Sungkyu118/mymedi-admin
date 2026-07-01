import store from "../store";
import { LOGIN_REQUIRED } from "../auth-config";

export default function guest() {
  if (!LOGIN_REQUIRED) {
    return true;
  }

  if (store.getters.isAuthenticated) {
    return { name: "Home" };
  }

  return true;
}
