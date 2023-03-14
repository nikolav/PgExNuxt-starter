<script setup lang="ts">
const { OVERLAYS_ID_END } = useAppConfig();
// const toEnd = computed(() => `#${OVERLAYS_ID_END}`);
const toEnd = `#${OVERLAYS_ID_END}`;
</script>

<template>
  <Teleport :to="toEnd">
    <slot></slot>
  </Teleport>
</template>
