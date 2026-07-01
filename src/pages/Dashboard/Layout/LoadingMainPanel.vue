<template>
  <div class="row" v-loading="true" id="loading">
  </div>
</template>
<script>
import { Loading } from '@/ui/element-loading';

export default {
  directives: {
    loading: Loading.directive
  }
};
</script>
<style>
#loading {
  min-height: 200px;
  display: flex;
  align-items: center;
}

.el-loading-spinner .path {
  stroke: #66615b !important;
}

.el-loading-mask {
  background: transparent !important;
}
</style>
