<template>
  <div class="bootstrap-switch bootstrap-switch-wrapper bootstrap-switch-animate" :class="switchClass">
    <div class="bootstrap-switch-container" @click="triggerToggle()">
      <span class="bootstrap-switch-handle-on" :class="{[`bootstrap-switch-${color}`]: color}">
        <slot name="on">
            {{onText}}
        </slot>
      </span>
      <span class="bootstrap-switch-label"></span>
      <span class="bootstrap-switch-handle-off bootstrap-switch-default">
        <slot name="off">
            {{offText}}
        </slot>
      </span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'n-switch',
  props: {
    modelValue: [Array, Boolean],
    value: [Array, Boolean],
    onText: String,
    offText: String,
    color: String
  },
  computed: {
    switchClass() {
      let base = 'bootstrap-switch-';
      let state = this.switchValue ? 'on' : 'off';
      return base + state;
    },
    switchValue: {
      get() {
        if (this.modelValue !== undefined) {
          return this.modelValue;
        }
        return this.value;
      },
      set(value) {
        this.$emit('update:modelValue', value);
        this.$emit('change', value);
      }
    }
  },
  methods: {
    triggerToggle() {
      this.switchValue = !this.switchValue;
    }
  }
};
</script>
<style lang="scss">
@use "../assets/sass/now-ui-dashboard/plugins/plugin-bootstrap-switch";
</style>
