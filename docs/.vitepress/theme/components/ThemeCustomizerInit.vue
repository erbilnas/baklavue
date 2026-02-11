<script setup>
import { useThemeCustomizer } from "../composables/useThemeCustomizer";

// Initialize theme on mount - composable applies saved preferences
useThemeCustomizer();
</script>

<template>
  <span style="display: none" aria-hidden="true" />
</template>
