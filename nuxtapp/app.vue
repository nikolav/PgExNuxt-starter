<script setup lang="ts">
import "animate.css";
const { OVERLAYS_ID_START, OVERLAYS_ID_END } = useAppConfig();
</script>

<template>
  <main>
    <div :id="OVERLAYS_ID_START" />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <div :id="OVERLAYS_ID_END" />
  </main>
</template>

<style>
/* defalut page/layout transition */
.PAGE-enter-active,
.PAGE-leave-active {
  transition: all 0.2s;
}
.PAGE-enter-from,
.PAGE-leave-to {
  opacity: 0;
}
</style>
