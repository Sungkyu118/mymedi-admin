# Deprecated Warning Analysis

## Current status on 2026-07-02

- The app now runs on Vue `3.5.x` with Vite, not on the old Vue CLI bridge.
- `corepack yarn lint` passes.
- `corepack yarn build` passes.
- Remaining warnings are mostly historical notes or third-party dependency concerns, not current build blockers.

## What was fixed on 2026-06-20

- Removed `vue-authenticate` from the app dependency graph because it pulled in an extra legacy `axios@0.18.x`.
- Replaced `vue-authenticate` with a local auth service that stores the access token in `localStorage` and applies the `Authorization` header through `axios.defaults`.
- Replaced local Sass `lighten()` and `darken()` calls with `color.adjust()` in the Now UI theme files under `src/assets/sass/now-ui-dashboard`.
- Replaced the remaining local Now UI slash-division warnings in `_variables.scss` with `math.div()`.
- Wrapped the local button mixin fallback declaration in `& {}` to remove that local mixed-declaration warning.

## Verified on 2026-06-23

- `npm run lint` passed at that time.
- `npm run build` passed at that time.
- The production build still reported webpack asset-size warnings and Sass deprecation warnings, but they did not block compilation.
- The Element UI compatibility shim and Vue 2 template syntax cleanup also passed `npm run lint` and `npm run build`.
- The sidebar click cleanup and lifecycle cleanup preparation also passed `npm run lint` and `npm run build`.

## Verified on 2026-06-24

- Vue CLI was upgraded from `3.x` to `5.x` while keeping Vue on `2.7.16`.
- `sass-loader` was upgraded from `7.x` to `10.x`.
- The Babel preset was moved from `@vue/app` to `@vue/cli-plugin-babel/preset` with `corejs: 3`.
- Top-level `core-js@3` was added so Vue CLI 5/Babel usage polyfills can resolve `core-js/modules/es.*.js` during production builds.
- `npm run lint --scripts-prepend-node-path=true` passes.
- `npm run build --scripts-prepend-node-path=true` passes.
- `npm install` reports 94 audit findings after the Vue CLI 5 upgrade: 7 low, 43 moderate, and 44 high.
- The same lint/build path also passes under the local Node binary that reports `v24.15.0` with npm `11.12.1`; npm 11 warns that `--scripts-prepend-node-path` is an unknown CLI config.
- Notification and sidebar plugins no longer create hidden Vue 2 root instances. Their state now lives in service modules, while Vue 2 reactivity is kept with `Vue.observable(...)`.
- Vue 3 migration prep now centralizes global property writes, router options/middleware, and Vuex store options. This reduces the code that must change during the actual Vue 3 package switch.
- The main app now builds on Vue `3.5.x` through `@vue/compat`.
- `element-ui` was replaced with `element-plus`.
- `vue-router` was moved to `4.x`, and Vuex was moved to `4.x`.
- `vue2-transitions` was removed and replaced by local Vue 3 transition wrappers.
- After removing `vue2-transitions`, `npm run lint --scripts-prepend-node-path=true` passes.
- After removing `vue2-transitions`, `npm run build --scripts-prepend-node-path=true` passes.
- Remaining Vue 2 slot attributes, Vue Router 3 `router-link tag` usage, and duplicated Vue 2 lifecycle aliases were removed.
- After that compat-syntax cleanup, `npm run lint --scripts-prepend-node-path=true` passes.
- After that compat-syntax cleanup, `npm run build --scripts-prepend-node-path=true` passes.

## Warnings that still remain

### Sass `@import` deprecation

The theme still relies on legacy Sass module loading:

- `src/assets/sass/now-ui-dashboard.scss`
- `src/assets/sass/now-ui-dashboard/_mixins.scss`
- `src/assets/sass/now-ui-dashboard/_cards.scss`
- `src/assets/sass/now-ui-dashboard/element-ui-plugins/_input.scss`
- `src/assets/sass/now-ui-dashboard/element-ui-plugins/_select.scss`
- `src/assets/sass/now-ui-dashboard/element-ui-plugins/_tables.scss`

This cannot be cleaned up safely as a one-file patch because the theme depends on shared global variables and mixins from the old `@import` model. A proper fix requires converting the theme to `@use` and `@forward`.

### Bootstrap 4 and remaining legacy package warnings

The project still uses:

- `bootstrap@4.2.1`
- older ecosystem packages such as `babel-runtime`, Bootstrap 4-era styles, and legacy dashboard dependencies

Some deprecation output now comes from old dependencies rather than the app code directly. Reducing those warnings further requires a larger upgrade path:

1. Bootstrap 4 to Bootstrap 5 or another Vue 3 compatible styling path
2. Vuex 4 to Pinia if we want the modern Vue ecosystem default
3. removing packages that still pull deprecated `core-js@2` through `babel-runtime`

### Build size warnings

The historical Vue CLI build exceeded webpack's default size guidance. The current Vite build still has large bundles, but the old webpack-specific warning text no longer applies directly:

- `js/auth.*.js`
- `js/dashboard.*.js`
- `js/chunk-*.js`
- several large background images under `dist/img`

These are performance warnings, not compilation failures. The likely fixes are route-level code splitting, reducing bundled dashboard examples, and optimizing large static images.

## Recommended order

1. Keep the local auth service and remove dead legacy auth code first.
2. Migrate the custom Now UI Sass theme from `@import` to `@use` and `@forward`.
3. Continue with Vite and avoid reintroducing Vue CLI-specific configuration.
4. Move Bootstrap 4 styles and old Element overrides to a cleaner Vue 3 compatible stack.
