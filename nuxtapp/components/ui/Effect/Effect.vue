<script setup lang="ts">
import { Ref } from "vue";

import { TEffectOnEnd } from "@/types";
import { DEFAULT_EFFECT, DEFAULT_DURATION, EFFECT } from "@/config/effect";
import { noop, hasOwn } from "@/utils";

const props = withDefaults(
  defineProps<{
    isActive: Ref<boolean>;
    effect?: string;
    duration?: number;
    onEnd?: TEffectOnEnd;
  }>(),
  {
    effect: DEFAULT_EFFECT,
    duration: DEFAULT_DURATION,
    onEnd: noop,
  }
);

const effect = hasOwn(EFFECT, props.effect) ? props.effect : DEFAULT_EFFECT;
const node$ = ref(null);
const isEnded$ = ref(true);

const transitionEnded = (...args: any[]) => {
  isEnded$.value = true;
  props.isActive.value = false;
  props.onEnd && props.onEnd(...args);
};
const ANIMATED_ = "animate__animated";
const animatecss_ = (node: any, animation: string, duration: number) =>
  new Promise((resolve) => {
    const animation_ = `animate__${animation}`;

    node.addEventListener("animationend", cleanup_, { once: true });
    node.style.setProperty("--animate-duration", `${duration / 1000}s`);

    // trigger animation
    node.classList.add(ANIMATED_, animation_);

    // @cleanup
    function cleanup_(evt: any) {
      evt.stopPropagation();
      node.classList.remove(ANIMATED_, animation_);
      resolve(evt);
    }
  });

watch(props.isActive, (isActive) => {
  if (!isEnded$.value) return;
  if (!isActive) return;
  isEnded$.value = false;
  animatecss_(node$.value, effect, props.duration).then(transitionEnded);
});
</script>

<template>
  <div ref="node$">
    <slot></slot>
  </div>
</template>

<style scoped></style>
