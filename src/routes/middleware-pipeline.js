async function runMiddleware(middleware, context) {
  for (const guard of middleware) {
    const result = await guard(context);
    if (result !== undefined && result !== true) {
      return result;
    }
  }

  return true;
}

export function runMiddlewarePipeline(router) {
  router.beforeEach(async (to, from) => {
    if (!to.meta.middleware) {
      return true;
    }

    const middleware = Array.isArray(to.meta.middleware)
      ? to.meta.middleware
      : [to.meta.middleware];

    return runMiddleware(middleware, { from, to, router });
  });
}
