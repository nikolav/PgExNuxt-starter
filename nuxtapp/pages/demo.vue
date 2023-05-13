<script setup lang="ts">
import { Popup } from "@/components/ui";

// #eos
</script>

<template>
  <VContainer fluid>
    <h1>@demo</h1>
    <Popup placement="right">
      <VBtn>ok</VBtn>
      <template #content>
        <VSheet class="!bg-amber-200 p-4 w-64 rounded" elevation="4">
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laboriosam
            totam accusamus non!
          </p>
        </VSheet>
      </template>
    </Popup>
  </VContainer>
</template>
