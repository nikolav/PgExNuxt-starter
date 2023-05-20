<script setup lang="ts">
import "animate.css";

import { Lightbox } from "@/components/ui";

const { OVERLAYS_ID_START, OVERLAYS_ID_END, $ISMOUNTED, THEME_DARK } =
  useAppConfig();

const mounted$ = useState($ISMOUNTED);

// $ISMOUNTED set flag @plugins/mounted
onUnmounted(() => {
  mounted$.value = false;
});

const theme = useState("theme", () => THEME_DARK);
</script>

<template>
  <VApp :theme="theme">
    <div :id="OVERLAYS_ID_START"></div>

    <!-- @@content -->
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <!-- https://github.com/XiongAmao/vue-easy-lightbox  -->
    <Lightbox />

    <div :id="OVERLAYS_ID_END"></div>

    <!-- https://nuxt.com/docs/api/components/nuxt-loading-indicator -->
    <NuxtLoadingIndicator color="red" :height="2" />
  </VApp>
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
