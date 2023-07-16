<script setup lang="ts">
// import * as tree$ from "nikolav-treets";

useHead({
  title: ".Demo",
});

const field1$ = ref("");

// #eos
</script>

<template>
  <VContainer fluid>
    <h1 class="text-h1">@demo</h1>
    <VSheet class="ma-2 pa-4" max-width="550px">
      <VTextField
        model-value="field1$"
        name="field1"
        label="Field_1"
        id="_1"
      ></VTextField>
    </VSheet>
  </VContainer>
</template>
