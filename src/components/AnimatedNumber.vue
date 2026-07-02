<template>
  <span>{{animatedNumber}}</span>
</template>
<script>
import * as TWEEN from '@tweenjs/tween.js';

export default {
  props: {
    value: {
      default: 0
    },
    duration: {
      type: Number,
      default: 500
    }
  },
  data() {
    return {
      animatedNumber: 0
    };
  },
  methods: {
    initAnimation(newValue, oldValue) {
      const startValue = Number(oldValue ?? 0);
      const endValue = Number(newValue ?? 0);

      if (!Number.isFinite(startValue) || !Number.isFinite(endValue)) {
        this.animatedNumber = Number.isFinite(endValue) ? endValue.toFixed(0) : "0";
        return;
      }

      function animate() {
        if (TWEEN.update()) {
          requestAnimationFrame(animate);
        }
      }

      new TWEEN.Tween({ tweeningNumber: startValue })
        .easing(TWEEN.Easing.Quadratic.Out)
        .to({ tweeningNumber: endValue }, this.duration)
        .onUpdate((state) => {
          this.animatedNumber = Number(state.tweeningNumber).toFixed(0);
        })
        .start();

      animate();
    }
  },
  mounted() {
    this.initAnimation(this.value, 0);
  },
  watch: {
    value(newValue, oldValue) {
      this.initAnimation(newValue, oldValue);
    }
  }
};
</script>
<style>
</style>
