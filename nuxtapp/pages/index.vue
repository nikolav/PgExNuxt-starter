<script setup lang="ts">
import { useDisplay } from "vuetify";
// import { useStoreAuth } from "@/store";

useHead({
  title: "",
});

const { name: screenSizeName } = useDisplay();

const { byName: getVarByName } = useApiVariables();
const adminName$ = getVarByName("admin:name");
const adminEmail$ = getVarByName("admin:email");
// @@
</script>

<template>
  <VContainer class="p-2 min-h-[256px]">
    <h2 class="text-h4">Screen size: [{{ screenSizeName }}]</h2>
    <h2 class="text-h4">{{ adminName$ }} @ [{{ adminEmail$ }}]</h2>
    <VContainer fluid>
      <VRow>
        <VCol class="text-center">
          <VAvatar size="64" color="warning">
            <strong class="text-xl">👷🏻‍♂️</strong>
          </VAvatar>
        </VCol>
      </VRow>
    </VContainer>
  </VContainer>
</template>

<style scoped></style>
