<script setup>
import { ref } from "vue";
import { BvAlert, BvButton } from "@baklavue/ui";

const isClosed = ref(false);

const handleClose = () => {
  isClosed.value = true;
};

const showAgain = () => {
  isClosed.value = false;
};
</script>

<template>
  <div>
    <BvAlert
      v-if="!isClosed"
      variant="info"
      description="This alert can be closed"
      closable
      @close="handleClose"
    />
    <div v-else class="closable-feedback">
      <span>Alert closed! </span>
      <BvButton variant="tertiary" size="small" @click="showAgain">
        Show again
      </BvButton>
    </div>
  </div>
</template>

<style scoped>
.closable-feedback {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
}
</style>
