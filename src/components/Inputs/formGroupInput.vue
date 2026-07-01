<template>
  <div
    class="form-group"
    :class="[
      { 'input-group': hasIcon },
      { 'has-danger': error },
      { 'input-group-focus': focused },
      { 'has-label': label || $slots.label },
      { 'has-success': !error && touched },
    ]"
  >
    <slot name="label">
      <label v-if="label" :class="labelClasses">
        {{ label }}
        <span v-if="required">*</span>
      </label>
    </slot>

    <slot name="addonLeft">
      <div v-if="addonLeftIcon" class="input-group-addon input-group-prepend">
        <i :class="addonLeftIcon"></i>
      </div>
    </slot>
    <slot>
      <input
        :value="inputValue"
        v-bind="$attrs"
        class="form-control"
        :class="[{ valid: inputValue && !error }, inputClasses]"
        aria-describedby="addon-right addon-left"
        @input="updateValue"
        @focus="onFocus"
        @blur="onBlur"
      />
    </slot>
    <slot name="addonRight">
      <span v-if="addonRightIcon" class="input-group-addon input-group-append">
        <i :class="addonRightIcon"></i>
      </span>
    </slot>

    <slot name="infoBlock"></slot>
    <slot name="helpBlock">
      <div
        class="text-danger invalid-feedback"
        style="display: block"
        :class="{ 'mt-2': hasIcon }"
        v-if="error"
      >
        {{ error[0] }}
      </div>
    </slot>
  </div>
</template>
<script>
export default {
  inheritAttrs: false,
  name: "fg-input",
  props: {
    required: Boolean,
    label: String,
    error: Array,
    labelClasses: String,
    inputClasses: String,
    modelValue: [String, Number],
    value: [String, Number],
    addonRightIcon: String,
    addonLeftIcon: String,
  },
  data() {
    return {
      touched: false,
      focused: false,
    };
  },
  computed: {
    inputValue() {
      return this.modelValue ?? this.value ?? "";
    },
    hasIcon() {
      const { addonRight, addonLeft } = this.$slots;
      return (
        addonRight !== undefined ||
        addonLeft !== undefined ||
        this.addonRightIcon !== undefined ||
        this.addonLeftIcon !== undefined
      );
    },
  },
  methods: {
    updateValue(evt) {
      const value = evt.target.value;
      if (!this.touched && value) {
        this.touched = true;
      }
      this.$emit("update:modelValue", value);
      this.$emit("input", value);
    },
    onFocus(evt) {
      this.focused = true;
      this.$emit("focus", evt);
    },
    onBlur(evt) {
      this.focused = false;
      this.$emit("blur", evt);
    },
  },
};
</script>
<style>
</style>
