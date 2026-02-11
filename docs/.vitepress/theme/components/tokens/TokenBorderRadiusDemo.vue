<script setup>
import { computed, ref } from "vue";
import { BvButton } from "@baklavue/ui";

const radiusM = ref("0.5rem");
const radiusL = ref("0.75rem");

const previewStyle = computed(() => ({
  "--bl-border-radius-m": radiusM.value,
  "--bl-border-radius-l": radiusL.value,
}));
</script>

<template>
  <div class="token-radius-demo">
    <div class="controls">
      <div class="control">
        <label>Border radius M</label>
        <input v-model="radiusM" type="text" class="text-input" placeholder="0.5rem" />
      </div>
      <div class="control">
        <label>Border radius L</label>
        <input v-model="radiusL" type="text" class="text-input" placeholder="0.75rem" />
      </div>
    </div>
    <div class="preview" :style="previewStyle">
      <div class="preview-row">
        <BvButton variant="primary">Button</BvButton>
        <div class="sample-box">Sample box</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.token-radius-demo {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.controls {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.control {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.control label {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
}

.text-input {
  width: 8rem;
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  font-family: monospace;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
}

.preview {
  padding: 1.5rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
}

.preview-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem;
}

.sample-box {
  padding: 0.5rem 1rem;
  background: var(--bl-color-primary);
  color: var(--bl-color-primary-contrast);
  border-radius: var(--bl-border-radius-l);
  font-size: 0.875rem;
}
</style>
