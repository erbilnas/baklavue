<script setup>
import { BvImage } from "@baklavue/ui";
</script>

<template>
  <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
    <BvImage
      src="https://picsum.photos/200/120"
      alt="Sample image"
      width="200px"
      height="120px"
    />
    <BvImage
      src="https://picsum.photos/300/200"
      alt="Landscape"
      width="300px"
      height="200px"
      object-fit="contain"
    />
  </div>
</template>
