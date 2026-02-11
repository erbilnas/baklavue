<script setup>
import { ref } from "vue";
import { BvBanner, BvButton } from "@baklavue/ui";

const isClosed = ref(false);

const handleClose = () => {
  isClosed.value = true;
};

const showAgain = () => {
  isClosed.value = false;
  if (typeof window !== "undefined") {
    try {
      localStorage.removeItem("banner-demo-closable");
    } catch {
      /* ignore */
    }
  }
};
</script>

<template>
  <div>
    <BvBanner
      v-if="!isClosed"
      id="demo-closable"
      title="This is a closable banner."
      close
      @close="handleClose"
    />
    <div
      v-else
      class="banner-closable-feedback"
    >
      <span>Banner closed! </span>
      <BvButton
        variant="tertiary"
        size="small"
        @click="showAgain"
      >
        Show again
      </BvButton>
    </div>
  </div>
</template>

<style scoped>
.banner-closable-feedback {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
}
</style>
