import { h, Transition } from "vue";
import "./transition-styles.scss";

function setDuration(el, duration) {
  el.style.transitionDuration = `${duration}ms`;
}

function clearDuration(el) {
  el.style.transitionDuration = "";
}

function createCssTransition(name, defaultDuration = 300) {
  return {
    name,
    props: {
      duration: {
        type: Number,
        default: defaultDuration,
      },
      mode: {
        type: String,
        default: undefined,
      },
      appear: Boolean,
    },
    setup(props, { slots }) {
      const applyDuration = (el) => setDuration(el, props.duration);

      return () =>
        h(
          Transition,
          {
            name,
            mode: props.mode,
            appear: props.appear,
            duration: props.duration,
            onBeforeEnter: applyDuration,
            onBeforeLeave: applyDuration,
            onAfterEnter: clearDuration,
            onAfterLeave: clearDuration,
            onEnterCancelled: clearDuration,
            onLeaveCancelled: clearDuration,
          },
          slots
        );
    },
  };
}

export const FadeTransition = createCssTransition("fade", 300);
export const ZoomCenterTransition = createCssTransition("zoom-center", 300);
export const SlideYUpTransition = createCssTransition("slide-y-up", 300);
export const SlideYDownTransition = createCssTransition("slide-y-down", 300);

export const CollapseTransition = {
  name: "CollapseTransition",
  props: {
    duration: {
      type: Number,
      default: 300,
    },
  },
  setup(props, { slots }) {
    const beforeEnter = (el) => {
      setDuration(el, props.duration);
      el.style.height = "0";
      el.style.opacity = "0";
      el.style.overflow = "hidden";
    };
    const enter = (el) => {
      el.style.height = `${el.scrollHeight}px`;
      el.style.opacity = "1";
    };
    const afterEnter = (el) => {
      clearDuration(el);
      el.style.height = "";
      el.style.overflow = "";
    };
    const beforeLeave = (el) => {
      setDuration(el, props.duration);
      el.style.height = `${el.scrollHeight}px`;
      el.style.opacity = "1";
      el.style.overflow = "hidden";
    };
    const leave = (el) => {
      el.style.height = "0";
      el.style.opacity = "0";
    };
    const afterLeave = (el) => {
      clearDuration(el);
      el.style.height = "";
      el.style.opacity = "";
      el.style.overflow = "";
    };

    return () =>
      h(
        Transition,
        {
          css: false,
          onBeforeEnter: beforeEnter,
          onEnter: enter,
          onAfterEnter: afterEnter,
          onEnterCancelled: afterLeave,
          onBeforeLeave: beforeLeave,
          onLeave: leave,
          onAfterLeave: afterLeave,
          onLeaveCancelled: afterLeave,
        },
        slots
      );
  },
};
