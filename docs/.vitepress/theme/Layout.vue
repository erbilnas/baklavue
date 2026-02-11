<script setup>
import { useRoute } from "vitepress";
import Theme from "vitepress/theme";
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import AnnouncementBanner from "./components/theme/AnnouncementBanner.vue";
import BaklavaVersionBadge from "./components/theme/BaklavaVersionBadge.vue";
import ThemeCustomizerDrawer from "./components/theme/ThemeCustomizerDrawer.vue";
import ThemeCustomizerInit from "./components/theme/ThemeCustomizerInit.vue";
import ThemeCustomizerToggle from "./components/theme/ThemeCustomizerToggle.vue";

const { Layout: ThemeLayout } = Theme;
const drawerOpen = ref(false);
const route = useRoute();
const isHomePage = computed(() => route.path === "/baklavue/");

function openDrawerFromHash() {
  if (
    typeof window !== "undefined" &&
    window.location.hash === "#theme-customizer"
  ) {
    drawerOpen.value = true;
  }
}

function clearHashOnClose() {
  if (
    typeof window !== "undefined" &&
    window.location.hash === "#theme-customizer"
  ) {
    history.replaceState(null, "", window.location.pathname);
  }
}

onMounted(() => {
  openDrawerFromHash();
  window.addEventListener("hashchange", openDrawerFromHash);
});
onUnmounted(() => {
  window.removeEventListener("hashchange", openDrawerFromHash);
});
watch(
  () => route.path,
  () => openDrawerFromHash(),
);
watch(drawerOpen, (open) => {
  if (!open) clearHashOnClose();
});
</script>

<template>
  <ThemeLayout>
    <template #home-hero-before>
      <AnnouncementBanner />
    </template>

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
