<template>
  <world-map :data="data"></world-map>
</template>
<script>
import { defineAsyncComponent } from "vue";
import { LoadingPanel } from "../index";

const WorldMap = defineAsyncComponent({
  loader: () =>
    import(
      /* webpackChunkName: "dashboard-map" */ "./WorldMap.vue"
    ),
  loadingComponent: LoadingPanel,
  delay: 200,
});
export default {
  components: {
    WorldMap,
  },
  props: {
    data: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
};
</script>
<style>
</style>
