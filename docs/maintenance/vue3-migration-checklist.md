# Vue 3 Migration Checklist

## Current baseline

- Framework: Vue `3.5.x` through `@vue/compat`
- Router: Vue Router `4.x`
- State: Vuex `4.x`
- UI libraries: `element-plus`, Bootstrap 4, Now UI Dashboard theme
- Build system: Vue CLI `5.x`

## Hard blockers in this repository

### Vue 2 app bootstrap

- Completed on 2026-06-24.
- `src/main.js` now delegates to `src/create-app.js`.
- `src/create-app.js` mounts the root component with Vue 3 `createApp(...)`.

### Router and middleware pattern

- Completed on 2026-06-24.
- `src/routes/index.js` now uses `createRouter(...)` and `createWebHistory(...)`.
- The custom `beforeEach` middleware chain remains isolated in `src/routes/middleware-pipeline.js`.

### Vue 2 template syntax

- `.native`
  - `src/components/SidebarPlugin/SidebarItem.vue`
  - `src/pages/Dashboard/Components/Notifications.vue`
  - `src/pages/Dashboard/Layout/TopNavbar.vue`
  - `src/pages/Dashboard/Pages/AuthLayout.vue`
  - `src/pages/Dashboard/Examples/UserManagement/ListUserPage.vue`
- `slot-scope`
  - `src/pages/Dashboard/Dashboard/Dashboard.vue`
  - `src/pages/Dashboard/Layout/DashboardLayout.vue`
  - `src/pages/Dashboard/Examples/UserManagement/ListUserPage.vue`
- `.sync`
  - `src/pages/Dashboard/Components/Notifications.vue`
  - `src/pages/Dashboard/Layout/DashboardLayout.vue`
- old lifecycle names
  - `destroyed()` in `src/components/Collapse/CollapseItem.vue`
  - `destroyed()` in `src/components/Tabs/Tab.vue`
  - `destroyed()` in `src/components/SidebarPlugin/SidebarItem.vue`
  - `beforeDestroy()` in `src/components/SidebarPlugin/SideBar.vue`
  - `beforeDestroy()` in `src/pages/Dashboard/Password/Email.vue`
  - `beforeDestroy()` in `src/pages/Dashboard/Pages/AuthLayout.vue`
  - `beforeDestroy()` in `src/pages/Dashboard/Maps/FullScreenMap.vue`

### UI library replacement work

- Completed on 2026-06-24.
- `element-ui` was replaced by `element-plus`.
- Element component imports remain centralized in `src/ui/element-components.js`.

### State layer follow-up

- Vuex was moved from Vuex 3 to Vuex 4 on 2026-06-24.
- A future cleanup can still move modules to Pinia, but it is no longer a blocker for the Vue 3 runtime.

## Suggested migration path

1. Finish dependency cleanup on Vue 2 first.
2. Upgrade Vue CLI 3 to a modern bundler target.
3. Replace Vue 2 template syntax and lifecycle hooks while still on Vue 2.7 compatibility mode.
4. Swap `element-ui` usage to Vue 3 compatible components.
5. Migrate router bootstrap and guards.
6. Move Vuex modules to Pinia or Vuex 4.
7. Switch the app bootstrap from `new Vue(...)` to `createApp(...)`.
8. Re-test login, register, password reset, dashboard, profile, tables, and map pages.

Steps 4, 5, 6, and 7 are now complete through the Vue 3 compatibility bridge. The remaining work is to remove compatibility-mode assumptions and run browser-level route checks.

## Migration feasibility

The project can be migrated, but not as a quick package bump. The main cost is not `vue` itself. The main cost is the combination of:

- Vue 2 template syntax spread across the repo
- `element-ui`
- Bootstrap 4 and the legacy Sass theme structure
- legacy webpack/Vue CLI build assumptions that still need a Vue 3 runtime pass

The safest path is a staged migration, not a one-shot upgrade.

## Next executable work packages

### Step 1: Element UI compatibility map

Goal: prepare the UI library replacement before touching Vue 3 app bootstrap.

- Status: completed on 2026-06-23.
- `element-ui` imports are now centralized in `src/ui/element-components.js`.
- The shim exports the exact components currently used: `Input`, `InputNumber`, `Tooltip`, `Popover`, `Loading`, `Table`, `TableColumn`, `Select`, and `Option`.
- The shim stays backed by `element-ui` while the app is still on Vue 2.
- Later, switch only the shim internals to `element-plus` after the Vue 3 branch is ready.

### Step 2: Vue 2 template syntax cleanup

Goal: reduce the number of Vue 3 breaking changes before upgrading the runtime.

- Status: completed on 2026-06-23.
- `slot-scope` was replaced with `v-slot` in the dashboard table usages.
- `.sync` was replaced with explicit `:prop` and `@update:prop` listeners for modal and sidebar share usage.
- Most `@click.native` usages were replaced by adding listener forwarding to `n-button` and click emission to `navbar-toggle-button`.
- The remaining `@click.native` in `src/components/SidebarPlugin/SidebarItem.vue` was removed by moving the sidebar-close behavior onto normal click handling inside the link content.

### Step 3: Lifecycle cleanup

Goal: make unmount cleanup easy to carry into Vue 3 while Vue 2 is still running.

- Status: completed on 2026-06-23.
- Cleanup logic was moved into named methods where Vue 2 lifecycle hooks previously contained inline cleanup.
- Vue 3 lifecycle hook names were added alongside the existing Vue 2 hook names:
  - `destroyed` plus `unmounted`
  - `beforeDestroy` plus `beforeUnmount`
- Keep both names until the app actually runs on Vue 3. After the Vue 3 runtime switch, remove the Vue 2 hook names.
- `rg -n '@click\.native|slot-scope|\.sync' src` has no remaining matches.

### Step 4: Build tool migration spike

Goal: decide between Vue CLI 5 and Vite with measured risk.

- Status: completed with Vue CLI 5 on 2026-06-24.
- Upgraded `@vue/cli-service`, Babel/ESLint/PWA Vue CLI plugins, and `sass-loader` while keeping Vue at `2.7.16`.
- Replaced the old `@vue/app` Babel preset with `@vue/cli-plugin-babel/preset`.
- Added top-level `core-js@3` because Vue CLI 5/Babel usage polyfills resolve `core-js/modules/es.*.js` from the app root.
- `npm run lint --scripts-prepend-node-path=true` passes.
- `npm run build --scripts-prepend-node-path=true` passes.
- The build still emits Sass deprecation warnings and webpack asset-size warnings, but no longer fails on missing `core-js` modules.
- Vite should remain a later option only if Vue CLI 5 becomes a blocker. At this point, Vue CLI 5 is the lower-risk bridge because it preserves the existing webpack aliases, PWA setup, and chunk naming assumptions.

### Step 5: Vue 3 branch

Goal: move framework runtime after the compatibility cleanup is already small.

- Status: buildable on Vue 3 compatibility mode as of 2026-06-24.
- The current app still runs on Vue `2.7.16`, but the Vue 2 bootstrap is now isolated:
  - `src/main.js` only installs app plugins and calls the app factory.
  - `src/app-plugins.js` centralizes root plugin installation.
  - `src/create-app.js` centralizes the Vue 2 `new Vue(...)` instance creation.
- Root app instance coupling was removed from the alert flow:
  - `src/store/modules/alerts-module.js` no longer calls `store.$app.$notify(...)`.
  - `src/components/NotificationPlugin/notification-service.js` owns the notification store and `notify(...)` function.
  - `src/components/NotificationPlugin/index.js` no longer creates a hidden `new Vue(...)` instance for notifications.
- Vue global property writes are now centralized:
  - `src/vue-global-properties.js` writes to Vue 2 `Vue.prototype` today.
  - The same helper is ready to write to Vue 3 `app.config.globalProperties` after the app factory switches from the Vue constructor to the Vue app instance.
  - `$sidebar`, `$notify`, `$notifications`, and `$isDemo` no longer write to `Vue.prototype` directly in feature plugins.
- Sidebar state was also moved behind a service:
  - `src/components/SidebarPlugin/sidebar-service.js` owns the sidebar state and behavior.
  - `src/components/SidebarPlugin/index.js` no longer creates a hidden `new Vue(...)` instance for sidebar state.
  - Vue 2 reactivity is preserved through `Vue.observable(...)` until the real Vue 3 switch replaces this with Vue 3 `reactive(...)` or app-level provides.
- `rg -n 'new Vue\(|\$app|NotificationStore|SidebarStore' src` now leaves only the intentional Vue 2 app factory in `src/create-app.js`.
- Router migration surface was reduced:
  - `src/routes/router-options.js` owns `routes`, `scrollBehavior`, and Vue Router 3 options.
  - `src/routes/middleware-pipeline.js` owns the custom `beforeEach` middleware chain.
  - `src/routes/index.js` now only installs Vue Router/Vue Meta, creates the Vue Router 3 instance, and attaches the middleware pipeline.
- Vuex migration surface was reduced:
  - `src/store/store-options.js` owns the current Vuex module map.
  - `src/store/index.js` now only installs Vuex and creates the Vuex 3 store instance.
- Node runtime check:
  - `nvm` has an incomplete `v20.16.0` folder with no `node.exe`.
  - The local `v20.10.0` folder currently contains a `node.exe` that reports `v24.15.0` with npm `11.12.1`.
  - `npm run lint --scripts-prepend-node-path=true` passes on that Node 24 runtime, with npm warning that `--scripts-prepend-node-path` is unknown.
  - `npm run build --scripts-prepend-node-path=true` passes on that Node 24 runtime, with the existing Sass and asset-size warnings.
- `vue`, `@vue/compat`, and `@vue/compiler-sfc` are on `3.5.x`.
- Vue Router is on `4.x`.
- Vuex is on `4.x`.
- `element-ui`, `vue-template-compiler`, `vue-meta`, `vue-axios`, and `vee-validate` were removed.
- `vue2-transitions` was replaced by local Vue 3 transition wrappers in `src/components/Transitions`.
- `npm run lint --scripts-prepend-node-path=true` passes.
- `npm run build --scripts-prepend-node-path=true` passes.

### Step 6: Remove compatibility-mode assumptions

Goal: move from buildable Vue 3 compat mode toward native Vue 3 behavior.

- Status: template and lifecycle cleanup completed on 2026-06-24.
- Replaced remaining Vue 2 slot syntax such as `slot="header"`, `slot="footer"`, `slot="image"`, and `slot="title"` with Vue 3 named slot syntax.
- Replaced Vue Router 3-only `router-link tag="li"` usage in the auth navbar with explicit `<li>` wrappers and normal `router-link` content.
- Removed duplicated Vue 2 lifecycle aliases (`beforeDestroy`, `destroyed`) where matching Vue 3 hooks already existed.
- Changed the sidebar item root from a dynamic `router-link` with `tag="li"` to an explicit `<li>` root so the sidebar DOM shape no longer depends on removed Vue Router 3 behavior.
- `rg -n 'slot=|beforeDestroy\(|destroyed\(|<router-link[^\n]*tag=|tag="li"' src` has no remaining matches.
- `npm run lint --scripts-prepend-node-path=true` passes.
- `npm run build --scripts-prepend-node-path=true` passes.
- Run a browser pass through login, dashboard, user profile, tables, notifications, maps, and password reset.
