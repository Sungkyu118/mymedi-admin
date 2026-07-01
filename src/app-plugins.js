import DashboardPlugin from "./dashboard-plugin";
import IsDemo from "./components/isDemo";

export function installAppPlugins(app) {
  app.use(DashboardPlugin);
  app.use(IsDemo);
}
