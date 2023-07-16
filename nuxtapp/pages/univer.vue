<script setup lang="ts">
useHead({
  title: "@univer",
});

const {
  $lightbox: { open: openGallery },
} = useNuxtApp();
// #eos
</script>

<template>
  <VContainer id="page--univ">
    <VCard
      class="mx-auto rounded-t rounded-b-sm"
      max-width="550"
      variant="elevated"
    >
      <VCardItem class="border-b pa-2 px-4">
        <VCardTitle class="d-flex align-center">
          <VIcon start icon="$iconBookOpenText" size="24" class="opacity-40" />
          <h2 class="ms-2 ms-md-4 text-h5 text-medium-emphasis">
            Gold, <em class="font-italic">uputstvo</em>
          </h2>
        </VCardTitle>
      </VCardItem>
      <VCardText class="py-2">
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          Necessitatibus blanditiis rerum a illo esse repellendus dignissimos
          odio ipsam, deleniti assumenda expedita illum sint quam quasi veniam
          sapiente. Totam, consectetur dolorem.
        </p>
      </VCardText>
    </VCard>
  </VContainer>
</template>

<style scoped></style>
