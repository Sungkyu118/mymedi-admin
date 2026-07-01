import routes from "./routes";

const scrollBehavior = to => {
  if (to.hash) {
    return { el: to.hash };
  }

  return { left: 0, top: 0 };
};

export const vueRouter4Options = {
  routes,
  scrollBehavior,
  linkExactActiveClass: "nav-item active",
};

export { routes, scrollBehavior };
