<script setup lang="ts">
import { useStoreFlags } from "@/store";

definePageMeta({
  middleware: ["log"],
});

const { $ISPROCESSING } = useAppConfig();
const flags = useStoreFlags();
const isSet_1 = computed(() => (flags.isSet("$1") ? "yes" : "no"));
const isSet_processing = computed(() =>
  flags.isSet($ISPROCESSING) ? "yes" : "no"
);

const setOn = () => flags.set("$1");
const setOff = () => flags.unset("$1");

const { $toast } = useNuxtApp();
const showToast = () => $toast(`message --${Date.now()}`);
</script>

<template>
  <v-container>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Et doloremque
      excepturi, ipsa deserunt nisi, eligendi ipsam eum iusto quaerat est sequi.
      Debitis aliquam nihil neque voluptatum exercitationem fugiat quos iure.
    </p>
    <v-sheet>
      <p>isSet_1: [{{ isSet_1 }}]</p>
      <p>isSet_processing: [{{ isSet_processing }}]</p>
    </v-sheet>
    <v-btn @click="setOn" color="primary" size="small" variant="outlined">
      set
    </v-btn>
    <v-btn @click="setOff" color="primary" size="small" variant="outlined">
      unset
    </v-btn>
    <v-btn @click="showToast" color="secondary" size="small" variant="outlined">
      toast
    </v-btn>
  </v-container>
</template>

<style scoped></style>
