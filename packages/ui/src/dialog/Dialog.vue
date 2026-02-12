<script setup lang="ts">
/**
 * Dialog Component
 *
 * A Vue UI kit component for Baklava's `bl-dialog` web component.
 * Provides a modal overlay for confirmations, forms, and important content
 * with support for header and footer slots, controllable visibility, and programmatic open/close.
 *
 * @component
 * @example
 * ```vue
 * <!-- Basic usage with v-model -->
 * <template>
 *   <BvButton @click="showDialog = true">Open Dialog</BvButton>
 *   <BvDialog v-model:open="showDialog" caption="Dialog Title">
 *     <p>Dialog content goes here.</p>
 *   </BvDialog>
 * </template>
 * ```
 *
 * @example
 * ```vue
 * <!-- With header and footer slots -->
 * <template>
 *   <BvDialog v-model:open="showDialog" caption="Confirm Action">
 *     <p>Are you sure you want to proceed?</p>
 *     <template #footer>
 *       <BvButton variant="tertiary" @click="showDialog = false">Cancel</BvButton>
 *       <BvButton variant="primary" @click="showDialog = false">Confirm</BvButton>
 *     </template>
 *   </BvDialog>
 * </template>
 * ```
 *
 * @example
 * ```vue
 * <!-- Closable with backdrop control -->
 * <template>
 *   <BvDialog v-model:open="showDialog" caption="Closable" :closable="true" :backdrop="true">
 *     <p>This dialog has a close button and backdrop click.</p>
 *   </BvDialog>
 * </template>
 * ```
 *
 * @example
 * ```vue
 * <!-- Programmatic control via ref -->
 * <template>
 *   <BvButton @click="dialogRef?.open()">Open</BvButton>
 *   <BvButton @click="dialogRef?.close()">Close</BvButton>
 *   <BvDialog ref="dialogRef" caption="Programmatic">
 *     <p>Opened and closed via ref methods.</p>
 *   </BvDialog>
 * </template>
 * ```
 */
import { computed, onMounted, ref, watch } from "vue";
import { loadBaklavaResources } from "../utils/loadBaklavaResources";
import type { DialogProps } from "./dialog.types";

const SIZE_TO_WIDTH: Record<string, string> = {
  small: "320px",
  medium: "424px",
  large: "560px",
};

const props = withDefaults(defineProps<DialogProps>(), {
  open: false,
  caption: undefined,
  closable: undefined,
  backdrop: undefined,
  size: undefined,
});

const emit = defineEmits<{
  /** Emitted when visibility changes. Use for two-way binding. */
  "update:open": [open: boolean];
  /** Emitted when the dialog is opened. */
  open: [];
  /** Emitted when the dialog is closed. */
  close: [];
}>();

/** Reference to the underlying bl-dialog element. */
const dialogRef = ref<HTMLElement | null>(null);

/** Computed style for dialog width based on size prop. */
const dialogStyle = computed(() => {
  if (!props.size) return undefined;
  const width = SIZE_TO_WIDTH[props.size.toLowerCase()] ?? props.size;
  return { "--bl-dialog-width": width };
});

/** Handles bl-dialog-open event. Syncs state and emits. */
const handleOpen = () => {
  emit("update:open", true);
  emit("open");
};

/** Handles bl-dialog-close event. Syncs state and emits. */
const handleClose = () => {
  emit("update:open", false);
  emit("close");
};

/**
 * Handles bl-dialog-request-close event. Prevents closing when closable or backdrop
 * is explicitly set to false for the given close source.
 */
const handleRequestClose = (
  e: CustomEvent<{ source: "close-button" | "keyboard" | "backdrop" }>,
) => {
  if (props.closable === false && e.detail.source === "close-button") {
    e.preventDefault();
  }
  if (props.backdrop === false && e.detail.source === "backdrop") {
    e.preventDefault();
  }
};

/** Syncs props.open to the bl-dialog element's open property. */
function getBlDialog(el: HTMLElement | null): { open: boolean } | null {
  return el as unknown as { open: boolean } | null;
}

watch(
  () => props.open,
  (newValue) => {
    const blDialog = getBlDialog(dialogRef.value);
    if (blDialog && blDialog.open !== newValue) {
      blDialog.open = newValue;
    }
  },
  { immediate: true },
);

onMounted(() => {
  loadBaklavaResources();

  const blDialog = getBlDialog(dialogRef.value);
  if (blDialog && blDialog.open !== props.open) {
    blDialog.open = props.open;
  }
});

defineExpose({
  /** Opens the dialog programmatically. */
  open: () => {
    const blDialog = getBlDialog(dialogRef.value);
    if (blDialog) blDialog.open = true;
  },
  /** Closes the dialog programmatically. */
  close: () => {
    const blDialog = getBlDialog(dialogRef.value);
    if (blDialog) blDialog.open = false;
  },
});
</script>

<template>
  <bl-dialog
    ref="dialogRef"
    :open="open"
    :caption="caption"
    :style="dialogStyle"
    @bl-dialog-open="handleOpen"
    @bl-dialog-close="handleClose"
    @bl-dialog-request-close="handleRequestClose"
  >
    <div>
      <slot v-if="$slots['header']" name="header" />
      <slot />
    </div>
    <div v-if="$slots['footer']" slot="secondary-action">
      <slot name="footer" />
    </div>
  </bl-dialog>
</template>
