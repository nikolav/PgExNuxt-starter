<script setup lang="ts">
import { mdiWeatherSunny, mdiWeatherNight } from "@mdi/js";

const { THEME_DARK, THEME_LIGHT } = useAppConfig();

const theme = useState("theme");
const iconSwitchColorMode = computed(() =>
  theme.value === THEME_LIGHT ? mdiWeatherSunny : mdiWeatherNight
);
const themeSwitch = () => {
  theme.value = theme.value !== THEME_DARK ? THEME_DARK : THEME_LIGHT;
};
</script>

<template>
  <section class="ma-0 pa-0">
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
        <v-list-item>
          <NuxtLink to="/docs">docs</NuxtLink>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar>
      <v-spacer></v-spacer>

      <v-btn @click="themeSwitch">
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
