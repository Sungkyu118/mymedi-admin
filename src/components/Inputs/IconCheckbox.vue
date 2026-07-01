<template>
  <div class="choice"
       :class="{active: isChecked}"
       data-toggle="wizard-checkbox"
       @click="updateValue">
    <input type="checkbox"
           :name="name"
           :disabled="disabled"
           :checked="isChecked">
    <div class="icon">
      <slot name="icon">
        <i :class="icon"></i>
      </slot>
    </div>
    <slot name="title">
      <h6>{{title}}</h6>
    </slot>
  </div>
</template>
<script>
export default {
  name: 'icon-checkbox',
  props: {
    modelValue: {
      type: Boolean,
      default: undefined
    },
    checked: {
      type: Boolean,
      default: false
    },
    name: String,
    title: String,
    icon: String,
    disabled: Boolean
  },
  methods: {
    updateValue() {
      const nextValue = !this.isChecked;
      this.$emit('update:modelValue', nextValue);
      this.$emit('change', nextValue);
    }
  },
  computed: {
    isChecked() {
      if (this.modelValue !== undefined) {
        return this.modelValue;
      }
      return this.checked;
    }
  }
};
</script>
<style>
</style>
