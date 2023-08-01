<script setup lang="ts">
// import * as tree$ from "nikolav-treets";
import { Grid2by2 } from "@/components/ui";

useHead({
  title: ".Demo",
});

const { toggle } = useToggleAutoOff(2345);

// #eos
</script>

<template>
  <VContainer fluid>
    <h1 class="text-h1">@demo</h1>
    <VBtn color="secondary" @click="toggle.on"> ok </VBtn>

    <VRow justify="center" no-gutters>
      <Grid2by2
        v-if="toggle.isActive.value"
        elevation="2"
        max-width="640"
        min-height="400"
        rounded
      >
        <template #cell-bl>
          <VAlert prominent rounded="0">
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
        </template>
      </Grid2by2>
    </VRow>
  </VContainer>
</template>
