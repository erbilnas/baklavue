<script setup lang="ts">
import type { ComponentSchema, PropSchema } from "./schemas";

const props = defineProps<{
  schema: ComponentSchema;
  model: Record<string, unknown>;
  compact?: boolean;
}>();

const emit = defineEmits<{
  "update:model": [value: Record<string, unknown>];
}>();

function updateProp(key: string, value: unknown) {
  emit("update:model", { ...props.model, [key]: value });
}

function getPropValue(p: PropSchema): unknown {
  return props.model[p.key] ?? p.default;
}

function getPropDescription(p: PropSchema): string | undefined {
  return "description" in p ? (p as { description?: string }).description : undefined;
}

function getPropType(p: PropSchema): string {
  switch (p.type) {
    case "select":
      return "select";
    case "text":
      return "string";
    case "number":
      return "number";
    case "boolean":
      return "boolean";
    default:
      return "";
  }
}
</script>

<template>
  <div class="playground-controls" :class="{ 'playground-controls--compact': compact }">
    <div
      v-for="p in schema.props"
      :key="p.key"
      class="playground-control"
    >
      <label
        class="playground-control-label"
        :title="getPropDescription(p)"
      >
        <span class="playground-control-name">{{ p.key }}</span>
        <span class="playground-control-type">{{ getPropType(p) }}</span>
        <span
          v-if="getPropDescription(p)"
          class="playground-control-info"
          :title="getPropDescription(p)!"
        >
          i
        </span>
      </label>

      <!-- Select -->
      <select
        v-if="p.type === 'select'"
        :value="getPropValue(p)"
        class="playground-control-input"
        @change="updateProp(p.key, ($event.target as HTMLSelectElement).value)"
      >
        <option
          v-for="opt in p.options"
          :key="opt"
          :value="opt"
        >
          {{ opt }}
        </option>
      </select>

      <!-- Text -->
      <input
        v-else-if="p.type === 'text'"
        :value="getPropValue(p)"
        type="text"
        class="playground-control-input"
        @input="updateProp(p.key, ($event.target as HTMLInputElement).value)"
      />

      <!-- Number -->
      <input
        v-else-if="p.type === 'number'"
        :value="getPropValue(p)"
        type="number"
        class="playground-control-input"
        @input="updateProp(p.key, Number(($event.target as HTMLInputElement).value))"
      />

      <!-- Boolean -->
      <label
        v-else-if="p.type === 'boolean'"
        class="playground-control-checkbox"
      >
        <input
          type="checkbox"
          :checked="getPropValue(p)"
          @change="updateProp(p.key, ($event.target as HTMLInputElement).checked)"
        />
        <span>{{ getPropValue(p) ? "Yes" : "No" }}</span>
      </label>
    </div>
  </div>
</template>

<style scoped>
.playground-controls {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.playground-controls--compact {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1rem 1.5rem;
}

.playground-controls--compact .playground-control {
  gap: 0.375rem;
}

.playground-controls--compact .playground-control-label {
  font-size: 0.8125rem;
}

.playground-controls--compact .playground-control-input {
  padding: 0.5rem 0.625rem;
  font-size: 0.8125rem;
}

.playground-controls--compact .playground-control-checkbox {
  font-size: 0.8125rem;
}

.playground-controls--compact .playground-control-checkbox input {
  width: 1rem;
  height: 1rem;
}

.playground-control {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.playground-control-label {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--vp-c-text-1);
}

.playground-control-name {
  text-transform: capitalize;
}

.playground-control-type {
  font-size: 0.6875rem;
  font-weight: 400;
  color: var(--vp-c-text-3);
  font-family: var(--vp-font-mono);
}

.playground-control-type::before {
  content: "(";
}

.playground-control-type::after {
  content: ")";
}

.playground-control-info {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1rem;
  height: 1rem;
  font-size: 0.625rem;
  font-weight: 600;
  font-style: italic;
  color: var(--vp-c-text-3);
  background: var(--vp-c-bg-mute);
  border-radius: 4px;
  cursor: help;
}

.playground-control-input {
  padding: 0.5rem 0.625rem;
  font-size: 0.875rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236b7280' d='M2.5 4.5L6 8l3.5-3.5'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.5rem center;
  padding-inline-end: 1.75rem;
}

select.playground-control-input {
  cursor: pointer;
}

input.playground-control-input {
  background-image: none;
  padding-inline-end: 0.625rem;
}

.playground-control-input:focus {
  outline: none;
  border-color: var(--vp-c-brand-1);
}

.playground-control-checkbox {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  cursor: pointer;
}

.playground-control-checkbox input {
  width: 1rem;
  height: 1rem;
}
</style>
