<script setup lang="ts">
import VueEasyLightbox from "vue-easy-lightbox";

const { images, index, isActive, close } = useLightbox();

</script>

<template>
  <VueEasyLightbox
    :visible="isActive"
    :imgs="images"
    :index="index"
    @hide="close"
    :loop="true"
  ></VueEasyLightbox>
</template>

<style scoped></style>
