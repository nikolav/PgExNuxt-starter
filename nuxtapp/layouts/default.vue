<script setup lang="ts">
import { mdiWeatherSunny, mdiWeatherNight } from "@mdi/js";

const theme = ref("light");
const icon = computed(() => theme.value === "light" ? mdiWeatherSunny : mdiWeatherNight);

const onClick = () => {
  theme.value = theme.value === "light" ? "dark" : "light";
}
</script>

<template>
  <section>
    <v-app :theme="theme">
      <v-navigation-drawer width="92" color="grey-darken-2" permanent>
        <v-list>
          <v-list-item>
            <NuxtLink to="/">home</NuxtLink>
          </v-list-item>
          <v-list-item>
            <NuxtLink to="/test">test</NuxtLink>
          </v-list-item>
          <v-list-item>
            <NuxtLink to="/about">about</NuxtLink>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-app-bar>
        <v-spacer></v-spacer>

        <v-btn @click="onClick">
          <v-icon :icon="icon"/>
        </v-btn>

      </v-app-bar>
      <v-main>
        <v-container>
          <slot>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Praesentium numquam minima incidunt sapiente. Officia, maiores.
              Deserunt sed, eos quis nostrum consequatur, aperiam tempora
              molestias delectus temporibus voluptates iste repellat non.
            </p>
          </slot>
        </v-container>
      </v-main>
    </v-app>
  </section>
</template>
