<script setup lang="ts">
// import { useStoreAuth } from "@/store";

useHead({
  title: "",
});

const { byName: getVarByName } = useApiVariables();
const adminEmail$ = getVarByName("admin:email");
// @@
</script>

<template>
  <VContainer class="p-2 min-h-[256px]">
    <VContainer fluid>
      <VRow align="center">
        <VCol class="text-center">
          <VAvatar size="64" color="warning">
            <strong class="text-xl">👷🏻‍♂️</strong>
          </VAvatar>
          <span> Sajt je trenutno u izradi.</span>
        </VCol>
      </VRow>
    </VContainer>
    <VDivider />
    <h2 class="text-h5 mt-4 text-center text-disabled !italic">
      {{ adminEmail$ }}
    </h2>
  </VContainer>
</template>

<style scoped></style>
