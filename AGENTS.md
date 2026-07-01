# AGENTS.md

## Scope
- This repository is the base admin frontend project for MyMedi.
- Treat `E:\intellij project\mymedi-admin` as the primary working root for future frontend admin tasks.
- Focus application changes under `src/` unless the task is specifically about docs or static assets.

## Stack
- Vue 2 application bootstrapped with Vue CLI 3.
- Routing uses `vue-router` in history mode.
- State uses `vuex` modules.
- UI is based on the Creative Tim / Now UI Dashboard Pro Vue 2 template.
- Main UI libraries include Bootstrap 4, Element UI, Chart.js, CKEditor, and Axios.

## Primary Commands
- Install dependencies: `npm install`
- Start dev server: `npm run serve`
- Alias command kept by project: `npm run dev`
- Production build: `npm run build`
- Lint: `npm run lint`

## Project Layout
- `src/main.js`: app entry; wires router, store, plugins, VueMeta, and axios.
- `src/routes/`: router instance plus route table and auth/guest middleware flow.
- `src/store/`: Vuex store and modules such as `auth`, `reset`, `alerts`, and `profile`.
- `src/axios/`: API auth bootstrap using `VueAuthenticate`.
- `src/pages/Dashboard/`: main dashboard, auth pages, tables, maps, and example screens.
- `src/components/`: reusable UI building blocks and local plugins.
- `src/assets/`: Sass theme files, fonts, and dashboard styling.
- `public/`: static files and icons.
- `docs/`: separate documentation app with its own `package.json`; do not edit it unless the task is explicitly docs-related.
- `documentation/`: generated documentation assets; avoid manual edits unless the user asks for it.

## Environment
- Expected env keys are defined in `.env.example`:
  - `VUE_APP_BASE_URL`
  - `VUE_APP_API_BASE_URL`
  - `VUE_APP_API_KEY`
  - `VUE_APP_IS_DEMO`
- API authentication setup reads `VUE_APP_API_BASE_URL` and posts to `/login` and `/register`.

## Working Notes
- Prefer `npm` over other package managers because the repo already includes `package-lock.json`.
- Use existing route patterns in `src/routes/routes.js` when adding screens.
- Preserve the current Vue 2 Options API style unless the user explicitly asks for a migration.
- Reuse the existing Vuex module pattern for stateful features instead of introducing a new state library.
- Keep styling changes aligned with the existing Now UI Dashboard Sass structure before adding ad hoc CSS.
- Treat `docs/` as a separate mini-app; install and run it from that directory if docs work is needed.

## Known Gotchas
- `src/store/modules/auth.js` currently sets `isAuthenticated: true` by default, so route-guard behavior may not reflect real auth state during debugging.
- The repository uses history mode routing, so server-side fallback behavior matters for deep links in deployment.
- There is no obvious test suite configured for the main app; verify changes with linting and targeted manual checks unless the user asks for tests.
- If git commands complain about dubious ownership in sandboxed environments, use a safe-directory override for this repo before assuming git is broken.

## Agent Expectations
- Read the relevant route, page, store, and service files before changing behavior.
- Prefer focused edits that match existing file organization rather than broad refactors.
- Do not rewrite template/demo areas unless they are part of the requested feature.
- When a task touches auth, API calls, or route guards, verify the interaction across router, store, and axios setup together.
