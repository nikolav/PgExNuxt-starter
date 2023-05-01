<script setup lang="ts">
import { mdiWeatherSunny, mdiWeatherNight } from "@mdi/js";

const { THEME_DARK, THEME_LIGHT } = useAppConfig();

const theme = useState("theme");
const themeToggle = () => {
  theme.value = theme.value !== THEME_DARK ? THEME_DARK : THEME_LIGHT;
};
const iconSwitchColorMode = computed(() =>
  theme.value !== THEME_DARK ? mdiWeatherSunny : mdiWeatherNight
);
// @links
const links = [
  {
    to: "/",
    title: "home",
  },
  {
    to: "/test",
    title: "test",
  },
  {
    to: "/about",
    title: "about",
  },
  {
    to: "/docs",
    title: "docs",
  },
  {
    to: "/demo",
    title: "demo",
  },
];
</script>

<template>
  <section class="ma-0 pa-0">
    <v-navigation-drawer width="92" color="grey-darken-2" permanent>
      <v-list>
        <v-list-item v-for="{ to, title } in links" :key="title">
          <NuxtLink :to="to">{{ title }}</NuxtLink>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar>
      <v-spacer></v-spacer>

      <v-btn @click="themeToggle">
        <v-icon :icon="iconSwitchColorMode" />
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
  </section>
</template>
