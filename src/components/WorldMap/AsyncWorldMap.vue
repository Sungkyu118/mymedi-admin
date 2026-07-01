<template>
  <world-map :data="data"></world-map>
</template>
<script>
import { LoadingPanel } from '../index';

const WorldMap = () => ({
  component: import(
    /* webpackChunkName: "dashboard-map" */ './WorldMap.vue'
  ),
  loading: LoadingPanel,
  delay: 200
});
export default {
  components: {
    WorldMap
  },
  props: {
    data: {
      type: Object,
      default: () => {
        return {};
      }
    }
  }
};
</script>
<style>
</style>
