<script setup lang="ts">
import { SpinnerDots } from "@/components/spinners";
//
const appProcessing = useAppProcessing();
// #eos
</script>

<template>
  <VSlideYReverseTransition>
    <section
      v-if="appProcessing.status.value"
      class="!fixed bottom-0 right-4 **bg-info z-[9999]"
    >
      <slot>
        <SpinnerDots size="64" v-bind="$attrs" />
      </slot>
    </section>
  </VSlideYReverseTransition>
</template>

<style scoped></style>
