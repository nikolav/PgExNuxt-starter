<script setup lang="ts">
import { mdiAccount } from "@mdi/js";
import { useDisplay } from "vuetify";
import { useStoreAuth } from "@/store";
import { find, get } from "@/utils";
import { IVariable } from "@/types";

useHead({
  title: "",
});

// @@
const { name: screenSizeName } = useDisplay();
const icon = ref(mdiAccount);

// @@auth
const auth = useStoreAuth();
const login = () =>
  auth.authenticate({ email: "admin@nikolav.rs", password: "122333" });
const logout = () => auth.logout();

// @@variables
const variables = useApiVariables();
const putVar = () => variables.put("x", Math.random());
const dropVar = () => {
  if (!variables.ls.value?.length) return;
  const v = find(variables.ls.value, (node: IVariable) => "x" === node.name);
  if (!v) return;
  variables.drop(get(v, "id"));
};
const varX = computed(() => {
  let x;
  if (variables.ls.value?.length) {
    const v = find(variables.ls.value, (node: IVariable) => "x" === node.name);
    if (v) {
      x = get(v, "value");
    }
  }
  return x;
});

// @@session
const session = useApiSession();
const putSession = () => session.put({ x: Math.random() });
const clearSession = () => session.clear();

// @@messages
const messages = useApiMessages();
const messageAdd = () => messages.post(`message --${Math.random()}`);

// @@storage
const file1$ = ref();
const file1_name = "file_1";
const file1_title = ref("");
const file1_description = ref("");
const setFile1 = ([file1]: any[]) => {
  file1$.value = file1;
};
const resetFile1 = () => {
  file1$.value = null;
  file1_title.value = "";
  file1_description.value = "";
};
const storage = useApiStorage();
const onStorage = async () => {
  const uploadedFiles = await storage.upload({
    name: file1_name,
    file: file1$.value,
    title: file1_title.value,
    description: file1_description.value,
  });
  if (0 < uploadedFiles.length) resetFile1();
};
const dlFileID = ref("");
const onStorageDowload = async () => {
  const downloadedFileID = await storage.download(dlFileID.value);
  console.log({ downloadedFileID });
};
const rmFileID = ref("");
const onStorageRemove = async () => {
  const removedFileID = await storage.remove(rmFileID.value);
  console.log({ removedFileID });
};

const fileIdUrl = ref("");
const onStoragePublicUrl = async () => {
  console.log({ url: await storage.publicUrl(fileIdUrl.value) });
};

const likeTopicID = ref("122");
const likes = useApiLikes(likeTopicID.value);
const onLike = likes.like;
const onUnlike = likes.unlike;

// @@comments
const commentsTopicID = "@B";
const cmts$ = useApiComments(commentsTopicID);
const cmt$ = ref("");
const addComment = async () => {
  await cmts$.add({ value: cmt$.value });
};
const rmComment = async () => {
  await cmts$.remove(cmt$.value);
};

// @@firebase.storage
const tempFiles$ = ref<any[]>([]);
const tempUrls$ = ref<string[]>([]);
const firebaseStorage = useFirebaseStorage("temp");
watchEffect(async () => {
  tempFiles$.value = await Promise.all(
    firebaseStorage.nodes.value.map((ref$) => firebaseStorage.info(ref$))
  );
  tempUrls$.value = await Promise.all(
    firebaseStorage.nodes.value.map((ref$) => firebaseStorage.url(ref$))
  );
});
const firebaseFile$ = ref();
const firebaseFileName$ = ref<string>("");
const firebaseSetFile = ([file]: any[]) => {
  firebaseFile$.value = file;
};
const onFirebaseUpload = async () => {
  if (!firebaseFile$.value) return;
  const resFirebaseUpload = await firebaseStorage.upload(
    firebaseFile$.value,
    firebaseFileName$.value || firebaseFile$.value.name
  );
  console.log({ resFirebaseUpload });
};
const firebaseRmFile = async () => {
  if (!firebaseFileName$.value) return;
  await firebaseStorage.rm(firebaseStorage.toRef(firebaseFileName$.value));
};
</script>

<template>
  <v-container class="p-2 min-h-[256px]">
    <h4>{{ screenSizeName }}</h4>
    <v-btn-group size="small" color="secondary" variant="outlined">
      <v-btn :prepend-icon="icon" color="primary" @click="login"> login </v-btn>
      <v-btn @click="logout"> logout </v-btn>
      <v-btn @click="putVar"> put var </v-btn>
      <v-btn @click="dropVar"> drop var </v-btn>
      <v-btn @click="putSession"> sess.put </v-btn>
      <v-btn @click="clearSession"> sess clear </v-btn>
      <v-btn @click="messageAdd"> message add </v-btn>
    </v-btn-group>
    <v-sheet>
      <form @submit.prevent="onStorage" noValidate>
        <v-file-input
          :name="file1_name"
          clearable
          show-size
          label="file"
          @update:modelValue="setFile1"
        ></v-file-input>
        <v-text-field
          autocomplete="off"
          type="text"
          clearable
          label="file.title"
          v-model="file1_title"
        ></v-text-field>
        <v-text-field
          autocomplete="off"
          type="text"
          clearable
          label="file.description"
          v-model="file1_description"
        ></v-text-field>
        <v-btn type="submit" block color="primary" variant="outlined">
          upload
        </v-btn>
      </form>
    </v-sheet>
    <!-- firebase.storage -->
    <v-sheet>
      <form @submit.prevent="onFirebaseUpload" noValidate>
        <v-file-input
          name="firebase-upload"
          clearable
          show-size
          label="file"
          @update:modelValue="firebaseSetFile"
        ></v-file-input>
        <v-text-field
          autocomplete="off"
          type="text"
          clearable
          label="filename"
          v-model="firebaseFileName$"
        ></v-text-field>
        <v-btn
          @click="firebaseRmFile"
          type="button"
          block
          color="secondary"
          variant="outlined"
        >
          firebase.rm
        </v-btn>
        <v-btn type="submit" block color="primary" variant="outlined">
          firebase.upload
        </v-btn>
      </form>
    </v-sheet>
    <v-sheet>
      <form noValidate @submit.prevent="onStorageDowload">
        <v-container fluid>
          <v-row no-gutters>
            <v-col sm="8">
              <v-text-field
                autocomplete="off"
                type="text"
                clearable
                label="download fileID"
                v-model="dlFileID"
              ></v-text-field>
            </v-col>
            <v-col sm="4" class="pa-1">
              <v-btn type="submit" block color="primary" variant="outlined"
                >download</v-btn
              >
            </v-col>
          </v-row>
        </v-container>
      </form>
    </v-sheet>
    <v-sheet>
      <form noValidate @submit.prevent="onStorageRemove">
        <v-container fluid>
          <v-row no-gutters>
            <v-col sm="8">
              <v-text-field
                autocomplete="off"
                type="text"
                clearable
                label="delete fileID"
                v-model="rmFileID"
              ></v-text-field>
            </v-col>
            <v-col sm="4" class="pa-1">
              <v-btn type="submit" block color="primary" variant="outlined"
                >delete</v-btn
              >
            </v-col>
          </v-row>
        </v-container>
      </form>
    </v-sheet>
    <v-sheet>
      <form noValidate @submit.prevent="onStoragePublicUrl">
        <v-container fluid>
          <v-row no-gutters>
            <v-col sm="8">
              <v-text-field
                autocomplete="off"
                type="text"
                clearable
                label="get fileID url"
                v-model="fileIdUrl"
              ></v-text-field>
            </v-col>
            <v-col sm="4" class="pa-1">
              <v-btn type="submit" block color="primary" variant="outlined"
                >url</v-btn
              >
            </v-col>
          </v-row>
        </v-container>
      </form>
    </v-sheet>
    <v-sheet>
      <form noValidate @submit.prevent>
        <v-container fluid>
          <v-row no-gutters>
            <v-col sm="3">
              <v-text-field
                autocomplete="off"
                type="text"
                clearable
                label="topicID to like"
                v-model="likeTopicID"
              ></v-text-field>
            </v-col>
            <v-col sm="3">
              <p class="ma-1 pa-1">likes# {{ likes.likeCount }}</p>
            </v-col>
            <v-col sm="3" class="pa-1">
              <v-btn
                @click="onLike"
                type="button"
                block
                color="secondary"
                variant="outlined"
                >like</v-btn
              >
            </v-col>
            <v-col sm="3" class="pa-1">
              <v-btn
                @click="onUnlike"
                type="button"
                block
                color="secondary"
                variant="outlined"
                >unlike</v-btn
              >
            </v-col>
          </v-row>
        </v-container>
      </form>
    </v-sheet>
    <v-sheet>
      <form noValidate @submit.prevent>
        <v-container fluid>
          <v-row no-gutters>
            <v-col sm="6">
              <v-text-field
                autocomplete="off"
                type="text"
                clearable
                label="comment | commentTopicID"
                v-model="cmt$"
              ></v-text-field>
            </v-col>
            <v-col sm="3" class="pa-1">
              <v-btn
                @click="addComment"
                type="button"
                block
                color="secondary"
                variant="outlined"
                >cmt add</v-btn
              >
            </v-col>
            <v-col sm="3" class="pa-1">
              <v-btn
                @click="rmComment"
                type="button"
                block
                color="secondary"
                variant="outlined"
                >cmt rm</v-btn
              >
            </v-col>
          </v-row>
        </v-container>
      </form>
    </v-sheet>
    <v-sheet>
      <pre>
        {{
          JSON.stringify(
            {
              "firebase/storage.error": firebaseStorage.error.value,
              "firebase/storage.uploadProgress": Math.ceil(
                firebaseStorage.uploadProgess.value * 100
              ),
              "firebase/storage.tempUrls": tempUrls$,
              "firebase/storage.tempFiles": tempFiles$,
              "firebase/storage.nodes": firebaseStorage.nodes.value,
              comments: cmts$.ls.value,
              files: storage.files.value,
              messages: messages.ls.value,
              error: auth.error,
              processing: auth.processing,
              user: auth.user,
              token: auth.token,
              session: auth.session,
              "session.data": session.data.value,
              x: varX,
              variables: variables.ls.value,
            },
            null,
            2
          )
        }}
      </pre>
    </v-sheet>
  </v-container>
</template>

<style scoped></style>
