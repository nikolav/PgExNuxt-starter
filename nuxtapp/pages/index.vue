<script setup lang="ts">
import { mdiAccount } from "@mdi/js";
import { useDisplay } from "vuetify";
import { useStoreAuth } from "@/store";
// @@
const { name: screenSizeName } = useDisplay();
const icon = ref(mdiAccount);

const auth = useStoreAuth();
const login = () => auth.authenticate({ email: "admin@nikolav.rs", password: "122333" });
const logout = () => auth.logout();

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
        :prepend-icon="icon"
        color="secondary"
        variant="outlined"
        @click="logout"
      >
        logout
      </v-btn>
    </v-btn-group>
    <v-sheet>
      <pre>
        {{ 
          JSON.stringify({
            error: auth.error, 
            processing: auth.processing, 
            user: auth.user, 
            token: auth.token, 
            session: auth.session, 
          }, null, 2)
        }}
      </pre>
    </v-sheet>
  </v-container>
</template>

<style scoped>

</style>
