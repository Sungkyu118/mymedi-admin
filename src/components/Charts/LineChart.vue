<template>
  <div class="lite-line-chart" :style="{ height: `${resolvedHeight}px` }">
    <svg
      class="lite-line-chart__svg"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient :id="gradientId" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" :stop-color="strokeColor" />
          <stop offset="100%" stop-color="#ffffff" />
        </linearGradient>
        <linearGradient :id="fillId" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" :stop-color="fillColor" stop-opacity="0.45" />
          <stop offset="100%" :stop-color="fillColor" stop-opacity="0" />
        </linearGradient>
      </defs>

      <polygon
        class="lite-line-chart__area"
        :points="fillPoints"
        :fill="`url(#${fillId})`"
      />
      <polyline
        class="lite-line-chart__line"
        :points="linePoints"
        fill="none"
        :stroke="`url(#${gradientId})`"
      />
      <circle
        v-for="point in normalizedPoints"
        :key="point.key"
        class="lite-line-chart__point"
        :cx="point.x"
        :cy="point.y"
        :fill="strokeColor"
      />
    </svg>
  </div>
</template>

<script>
const FALLBACK_COLOR = '#f96332';

function hexToRgb(hex, alpha = 1) {
  const normalized = (hex || FALLBACK_COLOR).replace('#', '');
  const r = parseInt(normalized.slice(0, 2), 16);
  const g = parseInt(normalized.slice(2, 4), 16);
  const b = parseInt(normalized.slice(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export default {
  name: 'line-chart',
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    color: {
      type: String,
      default: FALLBACK_COLOR,
    },
    height: {
      type: [Number, String],
      default: 200,
    },
  },
  computed: {
    resolvedHeight() {
      return Number(this.height) || 200;
    },
    strokeColor() {
      return this.color || FALLBACK_COLOR;
    },
    fillColor() {
      return hexToRgb(this.strokeColor, 1);
    },
    gradientId() {
      return `lite-line-gradient-${this._uid}`;
    },
    fillId() {
      return `lite-line-fill-${this._uid}`;
    },
    normalizedPoints() {
      const values = this.data.length ? this.data : [0];
      const minValue = Math.min(...values);
      const maxValue = Math.max(...values);
      const range = maxValue - minValue || 1;

      return values.map((value, index) => {
        const x = values.length === 1 ? 50 : (index / (values.length - 1)) * 100;
        const y = 90 - ((value - minValue) / range) * 70;

        return {
          key: `${index}-${value}`,
          x: Number(x.toFixed(2)),
          y: Number(y.toFixed(2)),
        };
      });
    },
    linePoints() {
      return this.normalizedPoints.map((point) => `${point.x},${point.y}`).join(' ');
    },
    fillPoints() {
      if (!this.normalizedPoints.length) {
        return '0,100 100,100';
      }

      const first = this.normalizedPoints[0];
      const last = this.normalizedPoints[this.normalizedPoints.length - 1];

      return [
        `${first.x},100`,
        ...this.normalizedPoints.map((point) => `${point.x},${point.y}`),
        `${last.x},100`,
      ].join(' ');
    },
  },
};
</script>

<style scoped>
.lite-line-chart {
  width: 100%;
}

.lite-line-chart__svg {
  width: 100%;
  height: 100%;
  overflow: visible;
}

.lite-line-chart__line {
  stroke-width: 2.6;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.lite-line-chart__point {
  r: 1.75;
  stroke: #ffffff;
  stroke-width: 0.8;
}
</style>
