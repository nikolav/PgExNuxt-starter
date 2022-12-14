<script setup lang="ts">
const counter = ref(0);
const inc = () => { counter.value += 1 };
// @usage
// <com v-slot="{ counter, inc }">
// ..
// </com>
</script>

<template>
  <slot :counter="counter" :inc="inc"></slot>
</template>

<style scoped>

</style>
