<template>
  <div class="slider"
       :class="[`slider-${type}`]"
       :disabled="disabled">

  </div>
</template>
<script>
import noUiSlider from 'nouislider';

export default {
  name: 'slider',
  props: {
    modelValue: [String, Array, Number],
    value: [String, Array, Number],
    disabled: Boolean,
    start: {
      type: [Number, Array],
      default: 0
    },
    connect: {
      type: [Boolean, Array],
      default: () => [true, false]
    },
    range: {
      type: Object,
      default: () => {
        return {
          min: 0,
          max: 100
        };
      }
    },
    type: {
      type: String,
      default: ''
    },
    options: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      slider: null
    };
  },
  methods: {
    emitValue(value) {
      this.$emit('update:modelValue', value);
      this.$emit('change', value);
    },
    createSlider() {
      noUiSlider.create(this.$el, {
        start: this.currentValue || this.start,
        connect: this.connect,
        range: this.range,
        ...this.options
      });
      const slider = this.$el.noUiSlider;
      slider.on('slide', () => {
        let value = slider.get();
        if (value !== this.currentValue) {
          this.emitValue(value);
        }
      });
    }
  },
  computed: {
    currentValue() {
      if (this.modelValue !== undefined) {
        return this.modelValue;
      }
      return this.value;
    }
  },
  mounted() {
    this.createSlider();
  },
  watch: {
    currentValue(newValue, oldValue) {
      const slider = this.$el.noUiSlider;
      const sliderValue = slider.get();
      if (newValue !== oldValue && sliderValue !== newValue) {
        if (Array.isArray(sliderValue) && Array.isArray(newValue)) {
          if (
            oldValue.length === newValue.length &&
            oldValue.every((v, i) => v === newValue[i])
          ) {
            slider.set(newValue);
          }
        } else {
          slider.set(newValue);
        }
      }
    }
  }
};
</script>
<style lang="scss">
@use "../assets/sass/now-ui-dashboard/plugins/plugin-nouislider";
</style>
