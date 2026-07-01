<template>
  <div id="map" class="full-screen-map"></div>
</template>
<script>
import GoogleMapsLoader from "google-maps";
import { API_KEY } from "./API_KEY";
GoogleMapsLoader.KEY = API_KEY;

export default {
  data() {
    return {
      nav: null,
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

      const marker = new window.google.maps.Marker({
        position: myLatlng,
        title: "Regular Map!",
      });

      marker.setMap(map);
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
  mounted() {
    const nav = document.getElementsByTagName("nav");
    if (nav.length > 0) {
      this.nav = nav[0];
    }

    if (this.nav) {
      this.nav.classList.add("bg-white");
      this.nav.classList.add("fixed-top");
      this.nav.classList.remove("navbar-transparent");
    }

    GoogleMapsLoader.load((google) => {
      this.initMap(google);
    });
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
</style>
