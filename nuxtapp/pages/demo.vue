<script setup lang="ts">
// import * as tree$ from "nikolav-treets";

useHead({
  title: ".Demo",
});

const data = ref([
  {
    key: 0,
    value: 12,
  },
  {
    key: 2,
    value: 22,
  },
  {
    key: 3,
    value: 5,
  },
  {
    key: 4,
    value: 11,
  },
]);
const config = {};
const chart = { data, config };

// #eos
</script>

<template>
  <VContainer fluid>
    <h1 class="text-h1">@demo</h1>
    <VRow justify="center" no-gutters>
      <VSheet class="ma-2 pa-4">
        <section v-chartArea="chart" />
      </VSheet>
    </VRow>
  </VContainer>
</template>
