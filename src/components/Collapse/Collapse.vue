<template>
  <div id="accordion"
       role="tablist"
       aria-multiselectable="true"
       class="card-collapse">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'collapse',
  props: {
    animationDuration: {
      type: Number,
      default: 250
    },
    multipleActive: {
      type: Boolean,
      default: true
    },
    activeIndex: {
      type: Number,
      default: -1
    }
  },
  provide() {
    return {
      animationDuration: this.animationDuration,
      multipleActive: this.multipleActive,
      addItem: this.addItem,
      removeItem: this.removeItem,
      deactivateAll: this.deactivateAll
    };
  },
  data() {
    return {
      items: []
    };
  },
  methods: {
    addItem(item) {
      this.items.push(item);
      this.items.sort((left, right) => {
        if (!left.$el || !right.$el || left === right) {
          return 0;
        }

        const position = left.$el.compareDocumentPosition(right.$el);
        if (position & Node.DOCUMENT_POSITION_FOLLOWING) {
          return -1;
        }
        if (position & Node.DOCUMENT_POSITION_PRECEDING) {
          return 1;
        }
        return 0;
      });
    },
    removeItem(item) {
      const items = this.items;
      const index = items.indexOf(item);
      if (index > -1) {
        items.splice(index, 1);
      }
    },
    deactivateAll() {
      this.items.forEach(item => {
        item.active = false;
      });
    },
    activateItem() {
      if (!this.multipleActive) {
        this.deactivateAll()
      }
      if (this.activeIndex !== -1) {
        this.items[this.activeIndex].active = true;
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.activateItem();
    });
  },
  watch: {
    activeIndex() {
      this.activateItem();
    }
  }
};
</script>

<style scoped>
</style>
