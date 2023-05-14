<script setup lang="ts">
// https://valgeirb.github.io/vue3-popper/guide/getting-started.html
import Popper from "vue3-popper";
import { ITransitionNames } from "@/types";

const DEFAULT_popupTransition = "pop";
const popupTransitions: ITransitionNames = {
  pop: "PopupTransitionPop",
};

const props = withDefaults(defineProps<{ popupTransition?: string }>(), {
  popupTransition: "pop",
});
const transitionName = computed<string>(
  () =>
    popupTransitions[props.popupTransition] ??
    popupTransitions[DEFAULT_popupTransition]
);

// #eos
</script>

<template>
  <Popper offsetDistance="8" v-bind="$attrs">
    <slot></slot>
    <template #content="contentProps">
      <Transition :name="transitionName">
        <section v-if="contentProps.isOpen">
          <slot name="content" v-bind="contentProps"></slot>
        </section>
      </Transition>
    </template>
  </Popper>
</template>

<style>
/* https://valgeirb.github.io/vue3-popper/guide/getting-started.html#what-about-styles */
/* https://popper.js.org/docs/v2/constructors/#options */
.PopupTransitionPop-enter-from,
.PopupTransitionPop-leave-to {
  opacity: 0;
  transform: scale(1.1);
}
.PopupTransitionPop-enter-active {
  transition: all 0.2s ease-out;
}
.PopupTransitionPop-leave-active {
  transition: all 0.1s ease-out;
}
</style>
