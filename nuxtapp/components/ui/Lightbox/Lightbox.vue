<script setup lang="ts">
// https://onycat.com/vue-easy-lightbox/
import VueEasyLightbox from "vue-easy-lightbox";

const { isActive, images, index, close } = useLightbox();
</script>

<template>
  <VueEasyLightbox
    :visible="isActive"
    :imgs="images"
    :index="index"
    :loop="true"
    @hide="close"
  >
  </VueEasyLightbox>
</template>

<style scoped></style>
