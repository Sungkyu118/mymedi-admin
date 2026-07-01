<template>
  <ul class="pagination" :class="paginationClass">
    <li class="page-item prev-page" :class="{disabled: currentPage === 1}">
      <a class="page-link" aria-label="Previous" @click="prevPage">
        «
      </a>
    </li>
    <li class="page-item"
        v-for="item in range(minPage, maxPage)"
        :key="item"
        :class="{active: currentPage === item}">
      <a class="page-link" @click="changePage(item)">{{item}}</a>
    </li>
    <li class="page-item page-pre next-page" :class="{disabled: currentPage === totalPages}">
      <a class="page-link" aria-label="Next" @click="nextPage">
        »
      </a>
    </li>
  </ul>
</template>
<script>
export default {
  name: 'n-pagination',
  props: {
    type: {
      type: String,
      default: 'primary',
      validator: value => {
        return [
          'default',
          'primary',
          'danger',
          'success',
          'warning',
          'info'
        ].includes(value);
      }
    },
    pageCount: {
      type: Number,
      default: 0
    },
    perPage: {
      type: Number,
      default: 10
    },
    total: {
      type: Number,
      default: 0
    },
    modelValue: {
      type: Number,
      default: undefined
    },
    value: {
      type: Number,
      default: 1
    }
  },
  computed: {
    currentPage() {
      if (this.modelValue !== undefined) {
        return this.modelValue;
      }
      return this.value;
    },
    paginationClass() {
      return `pagination-${this.type}`;
    },
    totalPages() {
      if (this.pageCount > 0) return this.pageCount;
      if (this.total > 0) {
        return Math.ceil(this.total / this.perPage);
      }
      return 1;
    },
    pagesToDisplay() {
      if (this.totalPages > 0 && this.totalPages < this.defaultPagesToDisplay) {
        return this.totalPages;
      }
      return this.defaultPagesToDisplay;
    },
    minPage() {
      if (this.currentPage >= this.pagesToDisplay) {
        const pagesToAdd = Math.floor(this.pagesToDisplay / 2);
        const newMaxPage = pagesToAdd + this.currentPage;
        if (newMaxPage > this.totalPages) {
          return this.totalPages - this.pagesToDisplay + 1;
        }
        return this.currentPage - pagesToAdd;
      } else {
        return 1;
      }
    },
    maxPage() {
      if (this.currentPage >= this.pagesToDisplay) {
        const pagesToAdd = Math.floor(this.pagesToDisplay / 2);
        const newMaxPage = pagesToAdd + this.currentPage;
        if (newMaxPage < this.totalPages) {
          return newMaxPage;
        } else {
          return this.totalPages;
        }
      } else {
        return this.pagesToDisplay;
      }
    }
  },
  data() {
    return {
      defaultPagesToDisplay: 5
    };
  },
  methods: {
    emitPage(value) {
      this.$emit('update:modelValue', value);
      this.$emit('change', value);
    },
    range(min, max) {
      let arr = [];
      for (let i = min; i <= max; i++) {
        arr.push(i);
      }
      return arr;
    },
    changePage(item) {
      this.emitPage(item);
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.emitPage(this.currentPage + 1);
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.emitPage(this.currentPage - 1);
      }
    }
  },
  watch: {
    perPage() {
      this.emitPage(1);
    },
    total() {
      this.emitPage(1);
    }
  }
};
</script>
