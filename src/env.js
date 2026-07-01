const viteEnv = import.meta.env;

function trimTrailingSlash(value) {
  return value.replace(/\/$/, "");
}

export const IS_PRODUCTION = viteEnv.PROD;
export const BASE_URL = viteEnv.BASE_URL || "/";
export const APP_IS_DEMO = String(viteEnv.VITE_APP_IS_DEMO ?? "0");
export const API_BASE_URL = viteEnv.VITE_APP_API_BASE_URL || "";
export const APP_API_KEY = viteEnv.VITE_APP_API_KEY || "";
export const APP_BASE_URL = trimTrailingSlash(
  viteEnv.VITE_APP_BASE_URL ||
    (typeof window !== "undefined" ? window.location.origin : "")
);
