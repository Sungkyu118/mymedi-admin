import { setGlobalProperty } from "../vue-global-properties";
import { APP_IS_DEMO } from "../env";

const isDemoPlugin = {
    install: (Vue) => {
      setGlobalProperty(Vue, "$isDemo", APP_IS_DEMO);
    }
  }
    
export default isDemoPlugin
