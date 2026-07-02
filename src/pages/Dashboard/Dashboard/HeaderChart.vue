<template>
  <div class="header-chart" :style="{ height: `${resolvedHeight}px` }">
    <svg
      class="header-chart__svg"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient :id="gradientId" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#80b6f4" />
          <stop offset="100%" stop-color="#ffffff" />
        </linearGradient>
        <linearGradient :id="fillId" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#ffffff" stop-opacity="0.28" />
          <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
        </linearGradient>
      </defs>

      <g class="header-chart__grid">
        <line
          v-for="gridLine in gridLines"
          :key="gridLine"
          x1="0"
          :y1="gridLine"
          x2="100"
          :y2="gridLine"
        />
      </g>

      <polygon :points="fillPoints" :fill="`url(#${fillId})`" />
      <polyline
        :points="linePoints"
        fill="none"
        :stroke="`url(#${gradientId})`"
        class="header-chart__line"
      />
      <circle
        v-for="point in normalizedPoints"
        :key="point.key"
        :cx="point.x"
        :cy="point.y"
        class="header-chart__point"
      />
    </svg>
  </div>
</template>

<script>
export default {
  name: 'header-chart',
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    height: {
      type: [Number, String],
      default: 255,
    },
  },
  computed: {
    resolvedHeight() {
      return Number(this.height) || 255;
    },
    gradientId() {
      return `header-chart-gradient-${this.$?.uid ?? "default"}`;
    },
    fillId() {
      return `header-chart-fill-${this.$?.uid ?? "default"}`;
    },
    gridLines() {
      return [18, 36, 54, 72, 90];
    },
    normalizedPoints() {
      const values = this.data.length ? this.data : [0];
      const minValue = Math.min(...values);
      const maxValue = Math.max(...values);
      const range = maxValue - minValue || 1;

      return values.map((value, index) => {
        const x = values.length === 1 ? 50 : 6 + (index / (values.length - 1)) * 88;
        const y = 86 - ((value - minValue) / range) * 58;

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
.header-chart {
  width: 100%;
}

.header-chart__svg {
  width: 100%;
  height: 100%;
  overflow: visible;
}

.header-chart__grid line {
  stroke: rgba(255, 255, 255, 0.14);
  stroke-width: 0.5;
}

.header-chart__line {
  stroke-width: 2.2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.header-chart__point {
  fill: #1e3d60;
  stroke: #ffffff;
  stroke-width: 1;
  r: 1.9;
}
</style>
