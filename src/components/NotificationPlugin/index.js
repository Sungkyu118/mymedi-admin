import Notifications from './Notifications.vue';
import { notificationStore, notify } from './notification-service';
import { setGlobalProperties } from '../../vue-global-properties';
import { reactive } from 'vue';

const reactiveNotificationStore = reactive(notificationStore);

const NotificationsPlugin = {
  install(app, options) {
    setGlobalProperties(app, {
      $notify: notify,
      $notifications: reactiveNotificationStore
    });
    app.component('Notifications', Notifications);
    if (options) {
      notificationStore.setOptions(options);
    }
  }
};

export default NotificationsPlugin;
