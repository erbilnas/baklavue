<script setup>
import { useRouter } from "vitepress";

const router = useRouter();

const bannerActions = [
  {
    label: "Changelog",
    onClick: () => router.go("/baklavue/changelog"),
  },
];
</script>

<template>
  <BvBanner
    id="baklavue-1.0"
    title="BaklaVue 1.0 is out! 🎉 Explore new components, improved docs, and a stable API."
    color="primary"
    close
    :actions="bannerActions"
  />
</template>
