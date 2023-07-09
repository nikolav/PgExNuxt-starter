<script setup lang="ts">
// @
useHead({
  title: "O meni",
});

const {
  $lightbox: { open: openGallery },
} = useNuxtApp();
const lightboxMe = () => openGallery([{ src: "/nikolav.me.0.jpg" }]);
// #eos
</script>

<template>
  <VContainer>
    <VSheet class="pa-2 pa-md-4">
      <section class="space-y-2 md:space-y-4">
        <h2 class="text-h5 d-flex align-center">
          <span>Ukratko o meni: </span>
          <VBtn
            icon
            color="secondary"
            variant="plain"
            @click="lightboxMe"
            class="ms-2"
          >
            <VIcon icon="$iconSearch" />
          </VBtn>
        </h2>
        <p>
          Pozdrav 👋🏻! Ja sam Nikola Vuković, veb programer iz Mladenovca,
          Srbije. Imam više od 5 godina iskustva
          <em class="!italic"> fullstack web </em>
          razvoja, fokus na korisnički interfejs, interakciju i modeliranje
          podataka. U slobodno vreme bavim se gimnastikom, modernim
          tehnologijama, stranim jezicima, vinom i alkoholnim pićima, istorijom,
          umetnošću, putovanjima, pozitivnim životnim navikama, knjigovodstvom,
          logistikom i dizajnom.
        </p>
      </section>
    </VSheet>
  </VContainer>
</template>

<style scoped></style>
