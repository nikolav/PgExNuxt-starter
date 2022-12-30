<script setup lang="ts">
import "animate.css";
import { False } from "@/utils";

const { OVERLAYS_ID_START, OVERLAYS_ID_END, $ISMOUNTED, $ISAUTH } =
  useAppConfig();

useState($ISAUTH, False);

// # set $ISMOUNTED flag in plugins/mounted
onUnmounted(() => {
  useState($ISMOUNTED).value = false;
});

</script>

<template>
  <main class="ma-0 pa-0 border-0">
    <NuxtLoadingIndicator color="red" :height="2" />
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
  transition: all 0.24s;
}

/* place outgoing page behind, full-width, to prevent content jump @mode.in-out */
.PAGE-leave-active {
  position: absolute;
  z-index: -1;
  width: 100%;
}

.PAGE-enter-from,
.PAGE-leave-to {
  opacity: 0;
  filter: blur(0.2rem);
}
</style>
