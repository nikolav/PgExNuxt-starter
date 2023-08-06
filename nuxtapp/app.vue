<script setup lang="ts">
// metadata components
// <Title>, <Base>, <NoScript>, <Style>, <Meta>, <Link>, <Body>, <Html> and <Head>

import { AppProcessing } from "@/components/ui";

const {
  $ISMOUNTED,
  CLASSNAME_DARK,
  OVERLAYS_ID_END,
  OVERLAYS_ID_START,
  THEME_DARK,
} = useAppConfig();

const mounted$ = useState($ISMOUNTED);

// $ISMOUNTED set flag @plugins/mounted
onUnmounted(() => {
  mounted$.value = false;
});

const theme = useState("theme", () => THEME_DARK);

const darkHtmlClass$ = computed(() =>
  useThemeIsDark().value ? CLASSNAME_DARK : ""
);
useHead({
  titleTemplate: (title) => `${title ? title + " | " : ""}Nikola Vuković`,
  bodyAttrs: {
    class: "scrollbar-thin dark:selection:bg-white/20",
  },
  htmlAttrs: {
    class: darkHtmlClass$,
  },
});

// #eos
</script>

<template>
  <VApp :theme="theme">
    <!-- @prepend -->
    <section :id="OVERLAYS_ID_START" />

    <!-- @content -->
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <!-- @append -->
    <section :id="OVERLAYS_ID_END" />

    <!-- @spinner-be -->
    <AppProcessing />

    <!-- @loading-t -->
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
