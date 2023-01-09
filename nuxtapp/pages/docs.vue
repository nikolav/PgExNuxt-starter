<script setup lang="ts">

const tag$ = ref("@A");
const { docs, put: putDoc, rm: rmDoc } = useApiCollection(tag$.value);

const radomData = () => ({
  x0: Math.random(),
  y0: Math.random(),
  [Date.now()]: "--now",
});
const docId = ref("");

const addDoc = async () => {
  await putDoc({ data: radomData() });
};
const updateDoc = async () => {
  await putDoc({
    id: docId.value,
    data: radomData(),
  });
};
const removeDoc = async () => {
  await rmDoc(docId.value);
};
</script>

<template>
  <v-text-field
    type="text"
    v-model="tag$"
    autocomplete="off"
    clearable
    label="tag"
  ></v-text-field>
  <v-text-field
    type="text"
    v-model="docId"
    autocomplete="off"
    clearable
    label="doc.id, docId"
  ></v-text-field>
  <v-btn-group>
    <v-btn @click="addDoc" size="small" variant="outlined" type="button">
      addDoc
    </v-btn>
    <v-btn @click="updateDoc" size="small" variant="outlined" type="button">
      updateDoc
    </v-btn>
    <v-btn @click="removeDoc" size="small" variant="outlined" type="button">
      removeDoc
    </v-btn>
  </v-btn-group>
  <v-sheet>
    <pre>
      {{ JSON.stringify({ docs }, null, 2) }}
    </pre>
  </v-sheet>
</template>

<style scoped></style>
