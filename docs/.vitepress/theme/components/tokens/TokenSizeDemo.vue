<script setup>
import { computed, ref } from "vue";
import { BvButton } from "@baklavue/ui";

const sizeM = ref("1rem");
const sizeL = ref("1.25rem");

const previewStyle = computed(() => ({
  "--bl-size-m": sizeM.value,
  "--bl-size-l": sizeL.value,
}));
</script>

<template>
  <div class="token-size-demo">
    <div class="controls">
      <div class="control">
        <label>Size M</label>
        <input v-model="sizeM" type="text" class="text-input" placeholder="1rem" />
      </div>
      <div class="control">
        <label>Size L</label>
        <input v-model="sizeL" type="text" class="text-input" placeholder="1.25rem" />
      </div>
    </div>
    <div class="preview" :style="previewStyle">
      <div class="preview-row">
        <BvButton variant="primary" size="small">Small</BvButton>
        <BvButton variant="primary" size="medium">Medium</BvButton>
        <BvButton variant="primary" size="large">Large</BvButton>
      </div>
      <div class="spacer-demo">
        <div class="spacer" style="width: var(--bl-size-m); height: var(--bl-size-m)"></div>
        <span>Size M block</span>
      </div>
      <div class="spacer-demo">
        <div class="spacer" style="width: var(--bl-size-l); height: var(--bl-size-l)"></div>
        <span>Size L block</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.token-size-demo {
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

.spacer-demo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-top: 0.75rem;
}

.spacer {
  background: var(--bl-color-primary);
  opacity: 0.5;
  border-radius: 4px;
}

.spacer-demo span {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
}
</style>
