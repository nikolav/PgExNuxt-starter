<script setup lang="ts">
import { useStoreFlags } from "@/store";
import { random } from "@/utils";

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

const { open: openGallery } = useLightbox();
const gallery = () =>
  openGallery([
    {
      src: "/local/Koala.jpg",
      title: "koala",
    },
    {
      src: "/local/Penguins.jpg",
      title: "penguins",
    },
    {
      src: "/local/Tulips.jpg",
      title: "tulips",
    },
  ]);

const data = ref([
  {
    key: "A",
    value: 1,
  },
  {
    key: "B",
    value: 2,
  },
  {
    key: "C",
    value: 3,
  },
  {
    key: "D",
    value: 4,
  },
]);
const config = {
  color: "steelblue",
};
const chart = { data, config };

const i1$ = ref<any>(null);

onMounted(() => {
  i1$.value = setInterval(() => {
    data.value = "A B C D"
      .split(" ")
      .map((key) => ({ key, value: random(100) }));
  }, 2345);
});
onUnmounted(() => {
  clearInterval(i1$.value);
});
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
    <v-btn @click="gallery" color="secondary" size="small" variant="outlined">
      gallery
    </v-btn>
    <v-btn @click="setOn" color="primary" size="small" variant="outlined">
      set
    </v-btn>
    <v-btn @click="setOff" color="primary" size="small" variant="outlined">
      unset
    </v-btn>
    <v-btn @click="showToast" color="secondary" size="small" variant="outlined">
      toast
    </v-btn>
    <v-sheet>
      <div v-chartBarVertical="chart"></div>
    </v-sheet>
  </v-container>
</template>

<style scoped></style>
