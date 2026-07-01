import Sidebar from './SideBar.vue';
import SidebarItem from './SidebarItem.vue';
import { configureSidebar, sidebarStore } from './sidebar-service';
import { setGlobalProperty } from '../../vue-global-properties';
import { reactive } from 'vue';

const reactiveSidebarStore = reactive(sidebarStore);

const SidebarPlugin = {
  install(app, options) {
    configureSidebar(options);
    setGlobalProperty(
      app,
      '$sidebar',
      reactiveSidebarStore
    );
    app.component('side-bar', Sidebar);
    app.component('sidebar-item', SidebarItem);
  }
};

export default SidebarPlugin;
