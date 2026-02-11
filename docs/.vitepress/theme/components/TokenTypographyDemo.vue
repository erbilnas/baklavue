<script setup>
import { computed, ref } from "vue";
import { BvButton } from "@baklavue/ui";

const fontFamily = ref('"Rubik Variable", sans-serif');
const fontSizeM = ref("0.875rem");
const fontSizeL = ref("1rem");

const previewStyle = computed(() => ({
  "--bl-font-family": fontFamily.value,
  "--bl-font-size-m": fontSizeM.value,
  "--bl-font-size-l": fontSizeL.value,
}));
</script>

<template>
  <div class="token-typography-demo">
    <div class="controls">
      <div class="control control-wide">
        <label>Font family</label>
        <input v-model="fontFamily" type="text" class="text-input" placeholder='"Inter", sans-serif' />
      </div>
      <div class="control">
        <label>Font size M</label>
        <input v-model="fontSizeM" type="text" class="text-input" placeholder="0.875rem" />
      </div>
      <div class="control">
        <label>Font size L</label>
        <input v-model="fontSizeL" type="text" class="text-input" placeholder="1rem" />
      </div>
    </div>
    <div class="preview" :style="previewStyle">
      <p class="sample-title" style="font: var(--bl-font-title-1-medium)">Title Text</p>
      <p class="sample-body" style="font: var(--bl-font-body-text-2-regular)">
        Body text using Baklava typography tokens. The font family, size, and weight are controlled by design tokens.
      </p>
      <BvButton variant="primary">Button</BvButton>
    </div>
  </div>
</template>

<style scoped>
.token-typography-demo {
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

.control-wide {
  flex: 1;
  min-width: 12rem;
}

.control label {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
}

.text-input {
  width: 100%;
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  font-family: monospace;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
}

.control:not(.control-wide) .text-input {
  width: 8rem;
}

.preview {
  padding: 1.5rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
}

.sample-title {
  margin: 0 0 0.5rem;
  color: var(--vp-c-text-1);
}

.sample-body {
  margin: 0 0 1rem;
  color: var(--vp-c-text-2);
  max-width: 32rem;
}
</style>
