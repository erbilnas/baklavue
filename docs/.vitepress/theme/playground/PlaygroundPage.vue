<script setup lang="ts">
import { ref, computed, watch } from "vue";
import {
  PLAYGROUND_SCHEMAS,
  getSchemaById,
  getDefaultProps,
  getComponentDocsLink,
  type ComponentSchema,
} from "./schemas";
import PlaygroundControls from "./PlaygroundControls.vue";
import PlaygroundPreview from "./PlaygroundPreview.vue";
import PlaygroundCode from "./PlaygroundCode.vue";

const selectedId = ref<string>(PLAYGROUND_SCHEMAS[0]?.id ?? "button");
const model = ref<Record<string, unknown>>({});
const copied = ref(false);

const schema = computed<ComponentSchema | undefined>(() =>
  getSchemaById(selectedId.value),
);

const docsLink = computed(() =>
  schema.value ? getComponentDocsLink(schema.value) : "",
);

const componentCount = PLAYGROUND_SCHEMAS.length;

function initModel(s: ComponentSchema) {
  model.value = { ...getDefaultProps(s) };
}

watch(
  selectedId,
  (id) => {
    const s = getSchemaById(id);
    if (s) initModel(s);
  },
  { immediate: true },
);

function handleUpdateModel(value: Record<string, unknown>) {
  model.value = value;
}

function handleReset() {
  if (schema.value) initModel(schema.value);
}

function handleCopy() {
  copied.value = true;
  setTimeout(() => {
    copied.value = false;
  }, 2000);
}
</script>

<template>
  <div class="playground-page">
    <p class="playground-intro">
      Explore Baklavue components live. Change props below to see updates instantly.
      Copy the generated code to use in your project.
    </p>

    <div class="playground-toolbar">
      <select
        v-model="selectedId"
        class="playground-selector"
        :aria-label="`Select component (${componentCount} available)`"
      >
        <option
          v-for="s in PLAYGROUND_SCHEMAS"
          :key="s.id"
          :value="s.id"
        >
          {{ s.name }}
        </option>
      </select>
      <span class="playground-component-count">{{ componentCount }} components</span>
    </div>

    <template v-if="schema">
      <div class="playground-props-section">
        <div class="playground-props-header">
          <h3 class="playground-props-title">Props</h3>
          <button
            type="button"
            class="playground-reset-btn"
            @click="handleReset"
          >
            Reset to defaults
          </button>
        </div>
        <PlaygroundControls
          :schema="schema"
          :model="model"
          compact
          @update:model="handleUpdateModel"
        />
      </div>
      <div class="playground-preview-section">
        <div class="playground-preview-header">
          <h3 class="playground-preview-title">{{ schema.name }}</h3>
          <a
            v-if="docsLink"
            :href="docsLink"
            class="playground-docs-link"
          >
            View docs →
          </a>
        </div>
        <PlaygroundPreview
          :schema="schema"
          :model="model"
          @update:model="handleUpdateModel"
        />
      </div>

      <div class="playground-code-section">
        <PlaygroundCode
          :schema="schema"
          :model="model"
          :copied="copied"
          @copy="handleCopy"
        />
      </div>
    </template>
  </div>
</template>

<style scoped>
.playground-page {
  padding: 1rem 0;
}

.playground-intro {
  margin: 0 0 1rem;
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

.playground-toolbar {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  font-size: 0.8125rem;
}

.playground-component-count {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
}

.playground-props-section {
  margin-bottom: 1.5rem;
  padding: 1.25rem 1.5rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
}

.playground-props-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.playground-props-title {
  margin: 0;
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.playground-reset-btn {
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background: transparent;
  color: var(--vp-c-text-2);
  cursor: pointer;
}

.playground-reset-btn:hover {
  background: var(--vp-c-bg-mute);
  color: var(--vp-c-text-1);
}

.playground-preview-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.playground-preview-title {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.playground-docs-link {
  font-size: 0.8125rem;
  color: var(--vp-c-brand-1);
  text-decoration: none;
}

.playground-docs-link:hover {
  text-decoration: underline;
}

.playground-selector {
  padding: 0.375rem 0.625rem;
  font-size: 0.8125rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
}

.playground-preview-section {
  margin-bottom: 1.5rem;
  padding: 2rem;
  min-height: 360px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
}

.playground-preview-section :deep(.playground-preview) {
  min-height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0;
  background: transparent;
  border: none;
}

.playground-code-section {
  margin-top: 0;
}

@media (max-width: 768px) {
  .playground-props-section {
    padding: 1rem;
  }

  .playground-preview-section {
    min-height: 280px;
    padding: 1.5rem;
  }
}
</style>
