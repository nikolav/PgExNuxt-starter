<script setup lang="ts">
import "animate.css";
import { Lightbox } from "@/components/ui";

const { OVERLAYS_ID_START, OVERLAYS_ID_END, $ISMOUNTED } = useAppConfig();

// $ISMOUNTED set flag @plugins/mounted
onUnmounted(() => {
  useState($ISMOUNTED).value = false;
});

const theme = useState("theme", () => "dark");
</script>

<template>
  <v-app :theme="theme">
    <div :id="OVERLAYS_ID_START" />

    <!-- @@content -->
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <div :id="OVERLAYS_ID_END"></div>

    <!-- global lightbox -->
    <!-- https://github.com/XiongAmao/vue-easy-lightbox  -->
    <Lightbox />

    <!-- loading indicator -->
    <div class="fixed top-0 inset-x-0 z-1">
      <NuxtLoadingIndicator color="red" :height="2" />
    </div>
  </v-app>
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
