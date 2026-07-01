import { createRouter, createWebHistory } from "vue-router";

import { runMiddlewarePipeline } from "./middleware-pipeline";
import { vueRouter4Options } from "./router-options";

const router = createRouter({
  ...vueRouter4Options,
  history: createWebHistory()
});

runMiddlewarePipeline(router);

export default router;
