const viteEnv = import.meta.env;

function readEnv(primaryKey, legacyKey, fallback = "") {
  const primaryValue = viteEnv[primaryKey];
  if (primaryValue != null && primaryValue !== "") {
    return primaryValue;
  }

  const legacyValue = legacyKey ? viteEnv[legacyKey] : undefined;
  if (legacyValue != null && legacyValue !== "") {
    return legacyValue;
  }

  return fallback;
}

function trimTrailingSlash(value) {
  return value.replace(/\/$/, "");
}

export const IS_PRODUCTION = viteEnv.PROD;
export const BASE_URL = viteEnv.BASE_URL || "/";
export const APP_IS_DEMO = String(readEnv("VITE_APP_IS_DEMO", "VUE_APP_IS_DEMO", "0"));
export const API_BASE_URL = readEnv("VITE_APP_API_BASE_URL", "VUE_APP_API_BASE_URL");
export const APP_API_KEY = readEnv("VITE_APP_API_KEY", "VUE_APP_API_KEY");
export const APP_BASE_URL = trimTrailingSlash(
  readEnv(
    "VITE_APP_BASE_URL",
    "VUE_APP_BASE_URL",
    typeof window !== "undefined" ? window.location.origin : ""
  )
);
