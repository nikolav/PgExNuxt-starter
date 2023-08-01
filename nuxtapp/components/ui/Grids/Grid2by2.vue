<template>
  <VSheet v-bind="$attrs" class="grid2x2 grid2x2-layout">
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
  &-layout {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
  }
}
</style>
