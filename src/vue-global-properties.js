function getGlobalProperties(target) {
  if (target && target.config && target.config.globalProperties) {
    return target.config.globalProperties;
  }

  return target.prototype;
}

export function setGlobalProperty(target, key, value) {
  getGlobalProperties(target)[key] = value;
}

export function setGlobalProperties(target, properties) {
  Object.keys(properties).forEach(key => {
    setGlobalProperty(target, key, properties[key]);
  });
}
