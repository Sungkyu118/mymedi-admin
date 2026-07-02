<template>
  <div
    v-if="mapError"
    class="full-screen-map full-screen-map--placeholder"
  >
    {{ mapError }}
  </div>
  <div v-else id="map" class="full-screen-map"></div>
</template>
<script>
import { hasGoogleMapsApiKey, loadGoogleMapsApi } from "./google-maps-api";

export default {
  data() {
    return {
      nav: null,
      mapError: "",
    };
  },
  methods: {
    initMap() {
      const myLatlng = new window.google.maps.LatLng(40.748817, -73.985428);
      const mapOptions = {
        zoom: 11,
        center: myLatlng,
        disableDefaultUI: true,
        scrollwheel: false,
        styles: [
          {
            elementType: "geometry",
            stylers: [
              {
                color: "#f5f5f5",
              },
            ],
          },
          {
            elementType: "labels.icon",
            stylers: [
              {
                visibility: "off",
              },
            ],
          },
          {
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#616161",
              },
            ],
          },
          {
            elementType: "labels.text.stroke",
            stylers: [
              {
                color: "#f5f5f5",
              },
            ],
          },
          {
            featureType: "administrative.land_parcel",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#bdbdbd",
              },
            ],
          },
          {
            featureType: "poi",
            elementType: "geometry",
            stylers: [
              {
                color: "#eeeeee",
              },
            ],
          },
          {
            featureType: "poi",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#757575",
              },
            ],
          },
          {
            featureType: "poi.park",
            elementType: "geometry",
            stylers: [
              {
                color: "#e5e5e5",
              },
            ],
          },
          {
            featureType: "poi.park",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#9e9e9e",
              },
            ],
          },
          {
            featureType: "road",
            elementType: "geometry",
            stylers: [
              {
                color: "#ffffff",
              },
            ],
          },
          {
            featureType: "road.arterial",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#757575",
              },
            ],
          },
          {
            featureType: "road.highway",
            elementType: "geometry",
            stylers: [
              {
                color: "#dadada",
              },
            ],
          },
          {
            featureType: "road.highway",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#616161",
              },
            ],
          },
          {
            featureType: "road.local",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#9e9e9e",
              },
            ],
          },
          {
            featureType: "transit.line",
            elementType: "geometry",
            stylers: [
              {
                color: "#e5e5e5",
              },
            ],
          },
          {
            featureType: "transit.station",
            elementType: "geometry",
            stylers: [
              {
                color: "#eeeeee",
              },
            ],
          },
          {
            featureType: "water",
            elementType: "geometry",
            stylers: [
              {
                color: "#c9c9c9",
              },
            ],
          },
          {
            featureType: "water",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#9e9e9e",
              },
            ],
          },
        ],
      };

      const map = new window.google.maps.Map(
        document.getElementById("map"),
        mapOptions
      );
      return map;
    },
    restoreNavbar() {
      if (!this.nav) {
        return;
      }

      this.nav.classList.add("navbar-transparent");
      this.nav.classList.remove("bg-white");
      this.nav.classList.remove("fixed-top");
    },
  },
  async mounted() {
    const nav = document.getElementsByTagName("nav");
    if (nav.length > 0) {
      this.nav = nav[0];
    }

    if (this.nav) {
      this.nav.classList.add("bg-white");
      this.nav.classList.add("fixed-top");
      this.nav.classList.remove("navbar-transparent");
    }

    if (!hasGoogleMapsApiKey) {
      this.mapError = "Google Maps API key is not configured.";
      return;
    }

    try {
      const google = await loadGoogleMapsApi();
      if (!google) {
        this.mapError = "Google Maps API key is not configured.";
        return;
      }
      this.initMap(google);
    } catch (error) {
      this.mapError = "Google Maps could not be loaded.";
    }
  },
  beforeUnmount() {
    this.restoreNavbar();
  },
};
</script>
<style>
#map {
  height: 100vh;
}

.full-screen-map--placeholder {
  align-items: center;
  background: #f4f5f7;
  color: #6c757d;
  display: flex;
  font-weight: 600;
  justify-content: center;
  text-align: center;
}
</style>
