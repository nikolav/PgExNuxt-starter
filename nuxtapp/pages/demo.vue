<script setup lang="ts">
import * as tree$ from "nikolav-treets";
import demoGallerySlides from "@/assets/gallery--test.json";

const {
  $lightbox: { open: openGallery },
} = useNuxtApp();
const gallery = () => openGallery(demoGallerySlides);

const { tree } = tree$;

const t1 = new tree();
t1.json({
  a: "#root",
  children: [{ a: 1 }, { a: 2, children: [{ a: 21 }, { a: 22 }] }],
});
const res = JSON.stringify({ t1: t1.first().ls().map(node$ => node$.value()) });

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
