<script setup lang="ts">
// import * as tree$ from "nikolav-treets";

useHead({
  title: ".Demo",
});

const { toggle } = useToggleAutoOff(2233);

// #eos
</script>

<template>
  <VContainer fluid>
    <h1 class="text-h1">@demo</h1>
    <VBtn color="secondary" @click="toggle.on"> ok </VBtn>

    <VRow justify="center" no-gutters>
      <VSheet v-if="toggle.isActive.value" class="ma-2 pa-4">
        <VAvatar icon size="64" color="secondary">
          <VIcon icon="$iconCart" size="32" />
        </VAvatar>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta
          reprehenderit aut minus?
        </p>
      </VSheet>
    </VRow>
  </VContainer>
</template>
