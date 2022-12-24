<script setup lang="ts">
import { mdiAccount } from "@mdi/js";
import { useDisplay } from "vuetify";
import { useStoreAuth } from "@/store";
import { find, get } from "@/utils";
import { IVariable } from "@/types";

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
const putSession = () => session.put({x: Math.random()});
const clearSession = () => session.clear();

// @@messages
const messages = useApiMessages();
const messageAdd = () => messages.post(`message --${Math.random()}`);

</script>

<template>
  <v-container class="bg-stone-200 p-1 min-h-[128px]">
    <h4>{{ screenSizeName }}</h4>
    <v-btn-group>
      <v-btn
        size="small"
        :prepend-icon="icon"
        color="secondary"
        variant="outlined"
        @click="login"
      >
        login
      </v-btn>
      <v-btn
        size="small"
        color="secondary"
        variant="outlined"
        @click="logout"
      >
        logout
      </v-btn>
      <v-btn size="small" color="secondary" variant="outlined" @click="putVar">
        put var
      </v-btn>
      <v-btn size="small" color="secondary" variant="outlined" @click="dropVar">
        drop var
      </v-btn>
      <v-btn size="small" color="secondary" variant="outlined" @click="putSession">
        sess.put
      </v-btn>
      <v-btn size="small" color="secondary" variant="outlined" @click="clearSession">
        sess clear
      </v-btn>
      <v-btn size="small" color="secondary" variant="outlined" @click="messageAdd">
        message add
      </v-btn>
    </v-btn-group>
    <v-sheet>
      <pre>
        {{
          JSON.stringify(
            {
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
