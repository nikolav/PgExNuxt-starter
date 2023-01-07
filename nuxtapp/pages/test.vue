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
// const data = ref([
//   {
//     key: 11,
//     value: 1,
//   },
//   {
//     key: 12,
//     value: 2,
//   },
//   {
//     key: 13,
//     value: 1,
//   },
//   {
//     key: 14,
//     value: 2,
//   },
// ]);

const config = {
  color: "orange",
};

// @chart
const chart = { data, config };

const i1$ = ref<any>(null);

onMounted(() => {
  i1$.value = setInterval(() => {
    data.value = "A B C D"
      .split(" ")
      .map((key) => ({ key, value: random(100) }));
  }, 2345);

  // i1$.value = setInterval(() => {
  //   data.value = [11, 12, 13, 14]
  //     .map((key) => ({ key, value: random(100) }));
  // }, 2345);
});

const {
  error,
  data: vars,
  add: addVar,
  rm: rmVar,
  put: putVar,
  unsubscribe,
} = useFirestoreCollection("vars");
const newVar = async () => {
  await addVar({
    name: `var::${Date.now()}`,
    value: Math.random(),
  });
};
const removeVar = async () => {
  await rmVar("RDIaatw1zt6g7aobNjMW");
};
const updateVar = async () => {
  await putVar({ id: "RDIaatw1zt6g7aobNjMW", value: random(100) });
};

const {
  error: errorDoc,
  doc,
  put: putDoc,
  increment: incDoc,
  unsubscribe: unsubscribeDoc,
  path,
} = useFirestoreDoc("@3");

const updateDoc = async () => {
  await putDoc({ x0: random(10), y0: random(100) });
};

const incrementDoc = async () => {
  await incDoc({ x0: 1 });
};

onUnmounted(() => {
  unsubscribe();
  unsubscribeDoc();
  clearInterval(i1$.value);
});
const { $jQuery } = useNuxtApp();
watchEffect(() => {
  if ($jQuery?.value) {
    const { $ } = $jQuery.value;
    console.log($("body button"));
  }
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
    <v-btn @click="updateDoc" color="primary" size="small" variant="outlined">
      updateDoc
    </v-btn>
    <v-btn
      @click="incrementDoc"
      color="primary"
      size="small"
      variant="outlined"
    >
      incrementDoc
    </v-btn>
    <v-btn @click="newVar" color="primary" size="small" variant="outlined">
      newVar
    </v-btn>
    <v-btn @click="updateVar" color="primary" size="small" variant="outlined">
      updateVar
    </v-btn>
    <v-btn @click="removeVar" color="primary" size="small" variant="outlined">
      rmVar
    </v-btn>
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
      <!-- <div v-chartLine="chart"></div> -->
    </v-sheet>
    <v-sheet>
      <pre>
        {{
          JSON.stringify(
            { error, errorDoc, docPath: path, doc, vars },
            null,
            2
          )
        }}
      </pre>
    </v-sheet>
  </v-container>
</template>

<style scoped></style>
