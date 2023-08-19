<script setup lang="ts">
// import * as tree$ from "nikolav-treets";

useHead({
  title: ".Demo",
});

const { gravatar, loading, reload } = useGravatar();

// #eos
</script>

<template>
  <VContainer fluid>
    <h1 class="text-h1">@demo</h1>
    <VImg :src="gravatar" max-width="52" max-height="52" />
    <VBtn @click="reload">loading [{{ loading }}]</VBtn>
  </VContainer>
</template>
