import { createApp } from "vue";

import App from "./App.vue";
import { installAppHead } from "./head/app-head";
import routes from "./routes";
import store from "./store";
import { installAppPlugins } from "./app-plugins";

export function createVueApp() {
  installAppHead();

  const app = createApp(App);

  installAppPlugins(app);

  app.use(routes);
  app.use(store);

  return app.mount("#app");
}
