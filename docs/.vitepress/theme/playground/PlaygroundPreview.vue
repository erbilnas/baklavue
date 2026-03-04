<script setup lang="ts">
import { computed } from "vue";
import type { ComponentSchema } from "./schemas";
import { SLOT_CONTENT_KEYS } from "./schemas";

const props = defineProps<{
  schema: ComponentSchema;
  model: Record<string, unknown>;
}>();

const emit = defineEmits<{
  "update:model": [value: Record<string, unknown>];
}>();

function updateModel(updates: Record<string, unknown>) {
  emit("update:model", { ...props.model, ...updates });
}

/** Props to pass to the component (excludes slot content keys) */
const componentProps = computed(() => {
  const slotKey = SLOT_CONTENT_KEYS[props.schema.id];
  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(props.model)) {
    if (key !== slotKey) {
      result[key] = value;
    }
  }
  return result;
});

/** Slot content for Badge, Tag, etc. */
const slotContent = computed(() => {
  const slotKey = SLOT_CONTENT_KEYS[props.schema.id];
  if (!slotKey) return null;
  return props.model[slotKey] ?? "";
});
</script>

<template>
  <div class="playground-preview component-demo">
    <!-- Input: v-model -->
    <BvInput
      v-if="schema.id === 'input'"
      v-bind="componentProps"
      :model-value="model.modelValue"
      @update:model-value="(v) => updateModel({ modelValue: v })"
    />

    <!-- Switch: v-model:checked -->
    <BvSwitch
      v-else-if="schema.id === 'switch'"
      v-bind="componentProps"
      :checked="model.checked"
      @update:checked="(v) => updateModel({ checked: v })"
    />

    <!-- Checkbox: v-model -->
    <BvCheckbox
      v-else-if="schema.id === 'checkbox'"
      v-bind="componentProps"
      :model-value="model.modelValue"
      @update:model-value="(v) => updateModel({ modelValue: v })"
    />

    <!-- File Upload: v-model -->
    <BvFileUpload
      v-else-if="schema.id === 'file-upload'"
      v-bind="componentProps"
      :model-value="model.modelValue"
      @update:model-value="(v) => updateModel({ modelValue: v })"
    />

    <!-- Textarea: v-model -->
    <BvTextarea
      v-else-if="schema.id === 'textarea'"
      v-bind="componentProps"
      :model-value="model.modelValue"
      @update:model-value="(v) => updateModel({ modelValue: v })"
    />

    <!-- Radio: v-model -->
    <BvRadio
      v-else-if="schema.id === 'radio'"
      v-bind="componentProps"
      :model-value="model.modelValue"
      @update:model-value="(v) => updateModel({ modelValue: v })"
    />

    <!-- Select: v-model -->
    <BvSelect
      v-else-if="schema.id === 'select'"
      v-bind="componentProps"
      :model-value="model.modelValue"
      @update:model-value="(v) => updateModel({ modelValue: v })"
    />

    <!-- Pagination: v-model:currentPage -->
    <BvPagination
      v-else-if="schema.id === 'pagination'"
      v-bind="componentProps"
      :current-page="model.currentPage"
      @update:current-page="(v) => updateModel({ currentPage: v })"
    />

    <!-- Datepicker: v-model -->
    <BvDatepicker
      v-else-if="schema.id === 'datepicker'"
      v-bind="componentProps"
      :model-value="model.modelValue"
      @update:model-value="(v) => updateModel({ modelValue: v })"
    />

    <!-- Dialog: v-model:open -->
    <BvDialog
      v-else-if="schema.id === 'dialog'"
      v-bind="componentProps"
      :open="model.open"
      @update:open="(v) => updateModel({ open: v })"
    >
      <template v-if="slotContent">{{ slotContent }}</template>
    </BvDialog>

    <!-- Drawer: v-model:open -->
    <BvDrawer
      v-else-if="schema.id === 'drawer'"
      v-bind="componentProps"
      :open="model.open"
      @update:open="(v) => updateModel({ open: v })"
    >
      <template v-if="slotContent">{{ slotContent }}</template>
    </BvDrawer>

    <!-- Stepper: v-model:currentStep -->
    <BvStepper
      v-else-if="schema.id === 'stepper'"
      v-bind="componentProps"
      :current-step="model.currentStep"
      @update:current-step="(v) => updateModel({ currentStep: v })"
    />

    <!-- Tab: v-model:activeTab -->
    <BvTab
      v-else-if="schema.id === 'tab'"
      v-bind="componentProps"
      :active-tab="model.activeTab"
      @update:active-tab="(v) => updateModel({ activeTab: v })"
    />

    <!-- Other components: no v-model -->
    <component
      v-else
      :is="schema.component"
      v-bind="componentProps"
    >
      <template v-if="slotContent !== null">
        {{ slotContent }}
      </template>
    </component>
  </div>
</template>
