<script setup lang="ts">
/**
 * Tag Component
 *
 * A Vue UI kit component for Baklava's `bl-tag` web component for displaying tags or labels.
 * Supports selectable and removable (closable) variants, sizes, and icons.
 *
 * @component
 * @example
 * ```vue
 * <!-- Basic usage -->
 * <template>
 *   <BvTag>Label</BvTag>
 * </template>
 * ```
 *
 * @example
 * ```vue
 * <!-- Closable tag -->
 * <template>
 *   <BvTag closable @close="removeTag">Removable</BvTag>
 * </template>
 * ```
 *
 * @example
 * ```vue
 * <!-- With icon -->
 * <template>
 *   <BvTag icon="info">With icon</BvTag>
 * </template>
 * ```
 */
import { onMounted } from "vue";
import { loadBaklavaResources } from "../utils/loadBaklavaResources";
import type { TagProps } from "./tag.types";

const props = withDefaults(defineProps<TagProps>(), {
  variant: undefined,
  size: undefined,
  closable: undefined,
  icon: undefined,
});

const emit = defineEmits<{
  /**
   * Emitted when the close button is clicked (removable/closable variant only).
   */
  close: [];
  /**
   * Emitted when a selectable tag is clicked. Payload contains the new selected state.
   */
  "update:selected": [selected: boolean];
}>();

/**
 * Handles bl-tag-click. For removable variant, emit 'close'. For selectable, emit 'update:selected'.
 */
const handleTagClick = (event: CustomEvent<{ value: string | null; selected: boolean }>) => {
  if (props.closable) {
    emit("close");
  } else if (props.variant === "selectable" && event.detail) {
    emit("update:selected", event.detail.selected);
  }
};

onMounted(() => {
  loadBaklavaResources();
});
</script>

<template>
  <bl-tag
    v-bind="{
      ...props,
      variant: props.closable ? 'removable' : props.variant,
      closable: undefined,
    }"
    @bl-tag-click="handleTagClick"
  >
    <slot v-if="$slots['icon']" name="icon" />
    <slot />
  </bl-tag>
</template>
