<script setup lang="ts">
const tag$ = ref("@A");
const { docs, put: putDoc, rm: rmDoc } = useApiCollection(tag$.value);

const randomData = () => ({
  x0: Math.random(),
  y0: Math.random(),
  [Date.now()]: "--now",
});
const docId = ref("");

const addDoc = async () => {
  await putDoc({ data: randomData() });
};
const updateDoc = async () => {
  await putDoc({
    id: docId.value,
    data: randomData(),
  });
};
const removeDoc = async () => {
  await rmDoc(docId.value);
};

const { doc: docNode, put: upsertDocNode } = useApiDoc("d@1");
const upsertNode = async () => await upsertDocNode(randomData());
</script>

<template>
  <v-container fluid>
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
      <v-btn
        @click="upsertNode"
        color="secondary"
        size="small"
        variant="outlined"
        type="button"
      >
        doc.upsert
      </v-btn>
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
        {{ JSON.stringify({ docNode, docs }, null, 2) }}
      </pre>
    </v-sheet>
  </v-container>
</template>

<style scoped></style>
