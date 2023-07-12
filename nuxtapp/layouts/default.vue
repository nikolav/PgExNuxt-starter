<script setup lang="ts">
import { mdiWeatherSunny, mdiWeatherNight } from "@mdi/js";

import pageLinks from "@/assets/page-links.json";

const { THEME_DARK, THEME_LIGHT } = useAppConfig();

const theme = useState("theme");
const themeToggle = () => {
  theme.value = theme.value !== THEME_DARK ? THEME_DARK : THEME_LIGHT;
};
const iconSwitchColorMode = computed(() =>
  theme.value !== THEME_DARK ? mdiWeatherNight : mdiWeatherSunny
);

const toggleRail = useToggleFlag(true);
const toggleDrawerNav = useToggleFlag();
const iconDrawerToggle = computed(
  () => `$${toggleRail.isActive.value ? "iconChevronLeft" : "iconChevronRight"}`
);

// @eos
</script>

<template>
  <section class="ma-0 pa-0">
    <VAppBar>
      <VSpacer />

      <NuxtLink
        external
        to="https://github.com/nikolav/PgExNuxt-starter/tree/nikolavrs/nuxtapp"
        target="_blank"
      >
        <VBtn variant="plain" icon color="secondary">
          <VIcon icon="$iconGithub" />
        </VBtn>
      </NuxtLink>
      <VBtn @click="themeToggle" icon variant="text">
        <VIcon :icon="iconSwitchColorMode" />
      </VBtn>
      <VBtn @click="toggleDrawerNav.on" icon variant="text">
        <VIcon icon="$menu" />
      </VBtn>
    </VAppBar>

    <VFooter app class="pa-2 pa-md-4"> </VFooter>

    <VNavigationDrawer
      :rail="toggleRail.isActive.value"
      v-model="toggleDrawerNav.isActive.value"
      location="right"
      color="surface-darken-2"
      temporary
    >
      <VListItem class="ps-1 pt-2">
        <template #prepend>
          <div class="fill-height d-flex justify-center align-center">
            <VBtn
              icon
              variant="text"
              color="text-primary"
              @click.stop="toggleRail"
            >
              <VIcon :icon="iconDrawerToggle" />
            </VBtn>
          </div>
        </template>
      </VListItem>
      <VList class="ms-n1 mt-1">
        <VListItem
          v-for="{ to, title, avatar } in pageLinks"
          :key="to"
          :to="to"
          class="group/li"
        >
          <template #prepend>
            <strong
              class="opacity-70 group-hover/li:opacity-100 text-[1.33rem] d-flex fill-height justify-center align-center"
              >{{ avatar }}</strong
            >
          </template>
          <VListItemTitle class="ms-6">{{ title }}</VListItemTitle>
        </VListItem>
      </VList>
    </VNavigationDrawer>

    <VMain class="mt-1 ps-2">
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
