<script setup lang="ts">
import { useStoreFlags } from "@/store";

const { isSet } = useStoreFlags();
const { $ISPROCESSING } = useAppConfig();
const processing$ = computed(() => isSet($ISPROCESSING));

watch(processing$, (processing$) => console.log({ processing$ }));
// #eos
</script>

<template>
  <VSlideYReverseTransition>
    <section
      v-if="processing$"
      class="!fixed bottom-1 right-1 **bg-info **z-10"
    >
      <slot>
        <p>@TODO: component.AppProcessing</p>
      </slot>
    </section>
  </VSlideYReverseTransition>
</template>

<style scoped></style>
