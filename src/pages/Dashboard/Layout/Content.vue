<template>
  <div class="content">
    <router-view v-slot="{ Component }">
      <FadeTransition :duration="200" mode="out-in">
        <!-- your content here -->
        <component :is="Component"></component>
      </FadeTransition>
    </router-view>
  </div>
</template>
<script>
import { FadeTransition } from "src/components/Transitions";
export default {
  components: {
    FadeTransition,
  },
};
</script>
<style>
</style>
