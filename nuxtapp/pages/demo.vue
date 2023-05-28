<script setup lang="ts">
const btnLabel = ref("ok");
const onclick = () => {
  btnLabel.value = `${Date.now()}`;
};
// #eos
</script>

<template>
  <VContainer fluid>
    <h1>@demo</h1>
    <VBtn @click="onclick" color="secondary" variant="outlined">
      <VIcon start icon="$icondial" size="18" />
      {{ btnLabel }}
    </VBtn>
  </VContainer>
</template>
