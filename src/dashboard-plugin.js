// Polyfills for js features used in the Dashboard but not supported in some browsers (mainly IE)
import './polyfills';
// Notifications plugin. Used on Notifications page
import Notifications from 'src/components/NotificationPlugin';
// A plugin file where you could register global components used across the app
import GlobalComponents from './globalComponents.js';
// A plugin file where you could register global directives
import GlobalDirectives from './globalDirectives.js';
// Sidebar on the right. Used as a local plugin in DashboardLayout.vue
import SideBar from './components/SidebarPlugin/index.js';

// library auto imports
import 'es6-promise/auto';

export default {
  install(Vue) {
    Vue.use(GlobalComponents);
    Vue.use(GlobalDirectives);
    Vue.use(SideBar);
    Vue.use(Notifications);
  }
};
