import { Loader } from "@googlemaps/js-api-loader";
import { APP_API_KEY } from "@/env";

const apiKey = (APP_API_KEY || "").trim();

export const hasGoogleMapsApiKey = apiKey.length > 0;

let loaderPromise = null;

export async function loadGoogleMapsApi() {
  if (!hasGoogleMapsApiKey) {
    return null;
  }

  if (!loaderPromise) {
    loaderPromise = (async () => {
      const loader = new Loader({
        apiKey,
        version: "weekly",
      });

      await loader.importLibrary("maps");
      return window.google;
    })();
  }

  return loaderPromise;
}
