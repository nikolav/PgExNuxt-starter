<script setup lang="ts">
import { isNumeric } from "@/utils";
import { StringOrNumber } from "@/types";

const props = withDefaults(
  defineProps<{
    leftWidth: StringOrNumber;
    rightWidth: StringOrNumber;
    topHeight: StringOrNumber;
    bottomHeight: StringOrNumber;
  }>(),
  {
    leftWidth: "1fr",
    rightWidth: "1fr",
    topHeight: "1fr",
    bottomHeight: "1fr",
  }
);

const px = (val: StringOrNumber) => <string>(isNumeric(val) ? `${val}px` : val);
// #eos
</script>
<template>
  <VSheet v-bind="$attrs" class="grid2x2 grid2x2--layout">
    <div class="cell-tl">
      <slot name="cell-tl" />
    </div>
    <div class="cell-tr">
      <slot name="cell-tr" />
    </div>
    <div class="cell-bl">
      <slot name="cell-bl" />
    </div>
    <div class="cell-br">
      <slot name="cell-br" />
    </div>
  </VSheet>
</template>

<style scoped lang="scss">
.grid2x2 {
  display: grid;
  &--layout {
    grid-template-columns: v-bind("px(props.leftWidth)") v-bind(
        "px(props.rightWidth)"
      );
    grid-template-rows: v-bind("px(props.topHeight)") v-bind(
        "px(props.bottomHeight)"
      );
  }
}
</style>
