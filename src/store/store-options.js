import auth from "./modules/auth";
import reset from "./modules/reset";
import alerts from "./modules/alerts-module";

export const storeOptions = {
  modules: {
    auth,
    reset,
    alerts
  }
};
