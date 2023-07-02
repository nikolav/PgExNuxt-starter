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
    title: "🏡 Početak",
  },
  {
    to: "/o-meni",
    title: "🧑🏻 O meni",
  },
  {
    to: "/kontakt",
    title: "💬 Kontakt",
  },
  {
    to: "/blog",
    title: "🧾 Blog",
  },
  {
    to: "/demo",
    title: "🚧 .Demo",
  },
];
</script>

<template>
  <section class="ma-0 pa-0">
    <VNavigationDrawer
      location="right"
      min-width="122"
      color="grey-darken-2"
      permanent
    >
      <VList>
        <VListItem v-for="{ to, title } in links" :key="title">
          <NuxtLink :to="to">{{ title }}</NuxtLink>
        </VListItem>
      </VList>
    </VNavigationDrawer>
    <VAppBar>
      <VSpacer />

      <VBtn @click="themeToggle" icon>
        <VIcon :icon="iconSwitchColorMode" />
      </VBtn>
    </VAppBar>
    <VMain class="mt-2">
      <slot>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Praesentium
          numquam minima incidunt sapiente. Officia, maiores. Deserunt sed, eos
          quis nostrum consequatur, aperiam tempora molestias delectus
          temporibus voluptates iste repellat non.
        </p>
      </slot>
    </VMain>
  </section>
</template>
