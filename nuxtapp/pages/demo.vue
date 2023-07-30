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
      <VAlert
        elevation="2"
        v-if="toggle.isActive.value"
        border="end"
        prominent
        rounded
        max-width="640"
      >
        <template #prepend>
          <VIcon icon="$iconCart" size="32" />
        </template>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta
          reprehenderit aut minus?
        </p>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta
          reprehenderit aut minus?
        </p>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta
          reprehenderit aut minus?
        </p>
      </VAlert>
    </VRow>
  </VContainer>
</template>
