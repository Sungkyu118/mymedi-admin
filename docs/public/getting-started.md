## Vue Frontend Setup

To start using this dashboard you will need to to install some dependencies or copy some files to your
project.

<hr>

## Steps to install

1. Navigate to your Vue Now UI Dashboard project folder: `cd your-vue-now-ui-dashbord-project`
2. Install project dependencies: `corepack yarn install`
3. Create env files from the provided examples
4. Put shared values in `.env`
5. Put local development URLs in `.env.development`
6. Put production URLs in `.env.production`
7. `VITE_APP_BASE_URL` should contain the URL of your Vue Now UI Dashboard Project (eg. http://127.0.0.1:8080/)
8. `VITE_APP_API_BASE_URL` should contain the URL of your Laravel JSON:API Project. (eg. http://localhost:3000/api/v1)
9. Run `corepack yarn dev` to start the application in a local development environment or `corepack yarn build` to build release distributables.

## Now UI Dashboard

Now UI Dashboard is built as Vue plugin so you can simply import it and use it.

```js
import Vue from "vue";
import Dashboard from "@/plugins/dashboard-plugin";
Vue.use(Dashboard);
```

## Global Components

Now UI comes with an extensive set of custom Vue components. Some of them are globally instantiated so
it's easier to use them across the app without importing them each time.

Here's the list of global components:

- **Badge**
- **BaseAlert**
- **BaseButton**
- **BaseCheckbox**
- **BaseInput**
- **BaseDropdown**
- **BaseNav**
- **BasePagination**
- **BaseProgress**
- **BaseRadio**
- **BaseSlider**
- **BaseSwitch**
- **BaseHeader**
- **Card**
- **StatsCard**
- **Modal**
- **RouteBreadcrumb**
- **ElInput** (Element Plus)
- **ElTooltip** (Element Plus)
- **ElPopover** (Element Plus)
- **Sidebar**
- **SidebarItem**

## Local components

Besides the components mentioned above, we have some extra components/plugins that are usually less used
and bigger. In order to not affect the overall bundle size of the Now UI Dashboard, they should be imported locally.

You can find the components inside `src/components/` folder.

## Starter template

To get started faster, we provide a starter template inside the project. It's a bare bones
layout with nav, footer and a hello world. To enable it go to **main.js** and change line 3

```js{3}
import Vue from "vue";
import App from "./App.vue";
import routes from './routes';
```


## Build Tooling

The current app runs on [Vite](https://vitejs.dev/) with a root `index.html`, `vite.config.mjs`, and an ESLint flat config.
Most project-level configuration now lives in files such as `package.json`, `vite.config.mjs`, `eslint.config.cjs`, and `.postcssrc.js`.

## Learn more

Stay up to date on the development journey and connect with us on:

<ul>
  <li>Follow Creative Tim on
    <a href="https://twitter.com/creativetim">Twitter</a>.</li>
  <li>Read and subscribe to The Official
    <a href="http://blog.creative-tim.com">Creative Tim Blog</a>.</li>
  <li>Follow Creative Tim on
    <a href="https://www.instagram.com/creativetimofficial">Instagram</a>.</li>
  <li>Follow Creative Tim on
    <a href="https://www.facebook.com/creativetim">Facebook</a>.</li>
</ul>

<ul>
  <li>Follow Updivision on
    <a href="https://www.facebook.com/updivision/">Facebook</a>.</li>
  <li>Follow Updivision on
    <a href="https://twitter.com/updivision/">Twitter</a>.</li>
  <li>Follow Updivision on
    <a href="https://www.linkedin.com/company/updivision">Linkedin</a>.</li>
  <li>Read and subscribe to The Official
    <a href="https://updivision.com/blog/">Updivision Blog</a>.</li>
</ul>
