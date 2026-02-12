<script setup>
import { computed, ref } from "vue";
import { BvBadge, BvButton } from "@baklavue/ui";

const primary = ref("#41B883");
const primaryHighlight = ref("#3aa876");
const primaryContrast = ref("#e7f9ef");
const success = ref("#0bc15c");
const successContrast = ref("#e7f9ef");
const danger = ref("#ff5043");
const dangerContrast = ref("#ffeeec");

const previewStyle = computed(() => ({
  "--bl-color-primary": primary.value,
  "--bl-color-primary-highlight": primaryHighlight.value,
  "--bl-color-primary-contrast": primaryContrast.value,
  "--bl-color-success": success.value,
  "--bl-color-success-contrast": successContrast.value,
  "--bl-color-danger": danger.value,
  "--bl-color-danger-contrast": dangerContrast.value,
}));
</script>

<template>
  <div class="token-colors-demo">
    <div class="controls">
      <div class="control">
        <label>Primary</label>
        <div class="input-row">
          <input v-model="primary" type="color" />
          <input v-model="primary" type="text" class="text-input" />
        </div>
      </div>
      <div class="control">
        <label>Success</label>
        <div class="input-row">
          <input v-model="success" type="color" />
          <input v-model="success" type="text" class="text-input" />
        </div>
      </div>
      <div class="control">
        <label>Danger</label>
        <div class="input-row">
          <input v-model="danger" type="color" />
          <input v-model="danger" type="text" class="text-input" />
        </div>
      </div>
    </div>
    <div class="preview" :style="previewStyle">
      <div class="preview-row">
        <BvButton variant="primary">Primary Button</BvButton>
        <div class="badge-success">
          <BvBadge>Success</BvBadge>
        </div>
        <div class="badge-danger">
          <BvBadge>Danger</BvBadge>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.token-colors-demo {
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

.input-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.input-row input[type="color"] {
  width: 2rem;
  height: 1.5rem;
  padding: 0;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  cursor: pointer;
}

.text-input {
  width: 6rem;
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

.badge-success {
  --bl-badge-bg-color: var(--bl-color-success-contrast);
  --bl-badge-color: var(--bl-color-success);
}

.badge-danger {
  --bl-badge-bg-color: var(--bl-color-danger-contrast);
  --bl-badge-color: var(--bl-color-danger);
}
</style>
