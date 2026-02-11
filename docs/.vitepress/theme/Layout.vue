<script setup>
import { useRoute } from "vitepress";
import Theme from "vitepress/theme";
import { computed, ref } from "vue";
import BaklavaVersionBadge from "./components/BaklavaVersionBadge.vue";
import ThemeCustomizerDrawer from "./components/ThemeCustomizerDrawer.vue";
import ThemeCustomizerInit from "./components/ThemeCustomizerInit.vue";
import ThemeCustomizerToggle from "./components/ThemeCustomizerToggle.vue";

const { Layout: ThemeLayout } = Theme;
const drawerOpen = ref(false);
const route = useRoute();
const isHomePage = computed(() => route.path === "/baklavue/");
</script>

<template>
  <ThemeLayout>
    <template #nav-bar-title-after>
      <BaklavaVersionBadge v-if="isHomePage" />
    </template>

    <template #nav-bar-content-after>
      <ThemeCustomizerToggle @click="drawerOpen = true" />
    </template>

    <template #layout-bottom>
      <ThemeCustomizerInit />
      <ThemeCustomizerDrawer :open="drawerOpen" @close="drawerOpen = false" />
    </template>
  </ThemeLayout>
</template>
