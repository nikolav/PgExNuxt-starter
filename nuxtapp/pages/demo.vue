<script setup lang="ts">
import demoGallerySlides from "@/assets/gallery--test.json";

const {
  $lightbox: { open: openGallery },
} = useNuxtApp();
const gallery = () => openGallery(demoGallerySlides);

// #eos
</script>

<template>
  <VContainer fluid>
    <h1 class="text-h1">@demo</h1>
    <VBtn @click="gallery">
      <VIcon start icon="$iconredeye" size="18" />
      ok.gallery
    </VBtn>
  </VContainer>
</template>
