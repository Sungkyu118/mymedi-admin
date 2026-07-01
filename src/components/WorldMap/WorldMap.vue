<template>
  <div class="world-map-lite">
    <div
      v-for="entry in normalizedEntries"
      :key="entry.code"
      class="world-map-lite__row"
    >
      <div class="world-map-lite__meta">
        <span class="world-map-lite__code">{{ entry.code }}</span>
        <span class="world-map-lite__value">{{ formatValue(entry.value) }}</span>
      </div>
      <div class="world-map-lite__track">
        <div
          class="world-map-lite__fill"
          :style="{ width: `${entry.width}%` }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
const FALLBACK_MAP_DATA = {
  AUS: 760,
  BRA: 550,
  CAN: 120,
  DEU: 1300,
  FRA: 540,
  GBR: 690,
  GEO: 200,
  IND: 200,
  ROU: 600,
  RUS: 300,
  USA: 2920,
};

export default {
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    sourceData() {
      return Object.keys(this.data || {}).length ? this.data : FALLBACK_MAP_DATA;
    },
    normalizedEntries() {
      const entries = Object.entries(this.sourceData)
        .map(([code, value]) => ({
          code,
          value: Number(value) || 0,
        }))
        .sort((left, right) => right.value - left.value);

      const maxValue = entries.length ? entries[0].value : 1;

      return entries.map((entry) => ({
        ...entry,
        width: maxValue ? Math.max((entry.value / maxValue) * 100, 6) : 0,
      }));
    },
  },
  methods: {
    formatValue(value) {
      return new Intl.NumberFormat().format(value);
    },
  },
};
</script>

<style scoped>
.world-map-lite {
  display: grid;
  gap: 12px;
  padding: 8px 0 4px;
}

.world-map-lite__row {
  display: grid;
  gap: 6px;
}

.world-map-lite__meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #2c2c2c;
  font-size: 0.8rem;
  font-weight: 600;
}

.world-map-lite__code {
  letter-spacing: 0.08em;
}

.world-map-lite__value {
  color: #66615b;
}

.world-map-lite__track {
  overflow: hidden;
  height: 8px;
  border-radius: 999px;
  background: #e9ecef;
}

.world-map-lite__fill {
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, #2ca8ff 0%, #18ce0f 100%);
}
</style>
