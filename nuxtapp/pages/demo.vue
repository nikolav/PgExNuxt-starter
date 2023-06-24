<script setup lang="ts">
import { A } from "nikolav-treets";
import demoGallerySlides from "@/assets/gallery--test.json";

const {
  $lightbox: { open: openGallery },
} = useNuxtApp();
const gallery = () => openGallery(demoGallerySlides);
const res = JSON.stringify({ a: new A() });

// #eos
</script>

<template>
  <VContainer fluid>
    <h1 class="text-h1">@demo</h1>
    <VSheet class="ma-2 pa-4" max-width="550px">
      <p>
        {{ res }}
      </p>
    </VSheet>
    <VBtn @click="gallery">
      <VIcon start icon="$iconredeye" size="18" />
      ok.gallery
    </VBtn>
  </VContainer>
</template>
