# Tooltips

<hr>

We used [Tooltip from Element Plus](https://element-plus.org/en-US/component/tooltip.html) and customized the look of it.
It's a really handy component and can be integrated very easily. 
The Tooltip and Popover components are initialized through the shared Element component registration module.


```js
import { ElTooltip as Tooltip } from "element-plus";
```
Global usage
```js
app.use(Tooltip)
```
Local usage
```js
export default {
  components: {
    [Tooltip.name]: Tooltip
  }
}
```

### Simple tooltip
```html
/*vue*/
<desc>
</desc>
<template>
 <el-tooltip content="Info"
             :open-delay="300"
             placement="top">
     <n-button>
       Top
     </n-button>
  </el-tooltip>
</template>

<script>
  export default {}
</script>
```
