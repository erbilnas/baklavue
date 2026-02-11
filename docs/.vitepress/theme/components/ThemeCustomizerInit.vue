<script setup>
import { useRoute } from "vitepress";
import { useThemeCustomizer } from "../composables/useThemeCustomizer";
import { onMounted, watch } from "vue";

// Initialize theme on mount - composable applies saved preferences
const { applyCurrentTheme } = useThemeCustomizer();
const route = useRoute();

// Re-apply theme on route change (client-side navigation)
watch(
  () => route.path,
  () => {
    applyCurrentTheme();
    // Deferred re-apply: lazy-loaded route chunks may inject CSS after our apply
    requestAnimationFrame(() => {
      requestAnimationFrame(() => applyCurrentTheme());
    });
  },
);

onMounted(() => {
  applyCurrentTheme();
});
</script>

<template>
  <span style="display: none" aria-hidden="true" />
</template>
