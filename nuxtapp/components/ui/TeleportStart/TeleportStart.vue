<script setup lang="ts">
const { OVERLAYS_ID_START } = useAppConfig();
const toStart = computed(() => `#${OVERLAYS_ID_START}`);
</script>

<template>
  <Teleport :to="toStart">
    <slot></slot>
  </Teleport>
</template>
