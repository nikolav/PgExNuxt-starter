<script setup lang="ts">
// https://valgeirb.github.io/vue3-popper/guide/getting-started.html
import Popper from "vue3-popper";

</script>

<template>
  <Popper v-bind="$attrs">
    <slot></slot>
    <template #content="contentProps">
      <Transition name="PanelTransitionFade">
        <div v-if="$attrs.show">
          <slot name="content" v-bind="contentProps"></slot>
        </div>
      </Transition>
    </template>
  </Popper>
</template>

<style scoped>
/* https://valgeirb.github.io/vue3-popper/guide/getting-started.html#what-about-styles */
.PanelTransitionFade-enter-active {
  animation: fade 0.2s ease-out;
}
.PanelTransitionFade-leave-active {
  animation: fade 0.1s ease-out reverse;
}
@keyframes fade {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
