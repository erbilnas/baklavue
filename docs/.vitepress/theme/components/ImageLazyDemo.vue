<script setup>
import { BvImage } from "@baklavue/ui";
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 1.5rem;">
    <p style="font-size: 0.875rem; color: var(--bl-color-neutral-darker);">
      Images below use lazy loading with skeleton placeholder. Scroll down to see them load.
    </p>
    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 1rem;">
      <BvImage
        src="https://picsum.photos/180/120?random=1"
        alt="Lazy loaded image 1"
        width="180px"
        height="120px"
      />
      <BvImage
        src="https://picsum.photos/180/120?random=2"
        alt="Lazy loaded image 2"
        width="180px"
        height="120px"
      />
      <BvImage
        src="https://picsum.photos/180/120?random=3"
        alt="Lazy loaded image 3"
        width="180px"
        height="120px"
      />
    </div>
  </div>
</template>
