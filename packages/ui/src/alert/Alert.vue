<script setup lang="ts">
/**
 * Alert Component
 *
 * A Vue wrapper for Baklava's `bl-alert` web component.
 * Displays contextual feedback messages with variants (info, success, warning, danger).
 *
 * @component
 * @example
 * ```vue
 * <!-- Basic alert -->
 * <template>
 *   <BvAlert variant="info" description="This is an informational message" />
 * </template>
 * ```
 *
 * @example
 * ```vue
 * <!-- Closable alert with controlled state -->
 * <template>
 *   <BvAlert
 *     variant="warning"
 *     caption="Warning"
 *     closable
 *     :closed="isClosed"
 *     @close="isClosed = true"
 *   >
 *     <p>You can close this alert.</p>
 *   </BvAlert>
 * </template>
 * ```
 *
 * @example
 * ```vue
 * <!-- Programmatic control via ref -->
 * <template>
 *   <BvAlert ref="alertRef" variant="success" closable>
 *     <p>Content</p>
 *   </BvAlert>
 *   <button @click="alertRef?.close()">Close</button>
 * </template>
 * ```
 */
import { nextTick, onMounted, ref, watch } from "vue";
import { loadBaklavaResources } from "../utils/loadBaklavaResources";
import type { AlertProps, BlAlertElement } from "./alert.types";

/**
 * Component props with default values.
 */
const props = withDefaults(defineProps<AlertProps>(), {
  variant: "info",
  description: undefined,
  icon: undefined,
  closable: false,
  caption: undefined,
  closed: false,
});

const emit = defineEmits<{
  /**
   * Emitted when the close button is clicked (only when closable is true).
   */
  close: [];
}>();

/**
 * Reference to the underlying bl-alert element.
 */
const alertRef = ref<HTMLElement | null>(null);

/**
 * Safely casts an HTMLElement to BlAlertElement.
 *
 * @param el - The element to cast.
 * @returns The element typed as BlAlertElement, or null.
 */
function asBlAlert(el: HTMLElement | null): BlAlertElement | null {
  return el as BlAlertElement | null;
}

/**
 * Waits for the bl-alert custom element to be defined.
 * Used when Baklava script loads asynchronously.
 */
async function waitForBlAlert(): Promise<void> {
  if (!customElements.get("bl-alert")) {
    await customElements.whenDefined("bl-alert");
  }
}

/**
 * Syncs the `closed` prop state with the underlying bl-alert web component.
 * Calls open() or close() on the element when prop and element state differ.
 *
 * @param el - The bl-alert element to sync.
 */
function syncWithBlAlert(el: HTMLElement): void {
  const blAlert = asBlAlert(el);
  if (!blAlert || typeof blAlert.close !== "function" || typeof blAlert.open !== "function") {
    return;
  }
  if (props.closed && !blAlert.closed) {
    blAlert.close();
  } else if (!props.closed && blAlert.closed) {
    blAlert.open();
  }
}

/**
 * Calls open or close on the bl-alert element when available.
 *
 * @param method - The method to call ("open" or "close").
 */
function callBlAlertMethod(method: "open" | "close"): void {
  const el = asBlAlert(alertRef.value);
  if (el && typeof el[method] === "function") {
    el[method]!();
  }
}

/**
 * Watches for changes to the closed prop and syncs with the web component.
 */
watch(
  () => props.closed,
  () => {
    if (alertRef.value) {
      syncWithBlAlert(alertRef.value);
    }
  },
);

/**
 * Handles the bl-close event from the underlying web component.
 * Forwards it to the component's emit.
 */
function handleClose(): void {
  emit("close");
}

/**
 * Lifecycle hook: Component mounted.
 *
 * Loads Baklava resources, waits for bl-alert to be defined,
 * then syncs the initial closed state with the web component.
 */
onMounted(async () => {
  loadBaklavaResources();

  await nextTick();
  await waitForBlAlert();

  if (alertRef.value) {
    syncWithBlAlert(alertRef.value);
  }
});

/**
 * Exposed methods for programmatic control of the alert.
 */
defineExpose({
  /**
   * Opens the alert programmatically.
   *
   * @public
   */
  open: async (): Promise<void> => {
    await nextTick();
    callBlAlertMethod("open");
  },

  /**
   * Closes the alert programmatically.
   *
   * @public
   */
  close: async (): Promise<void> => {
    await nextTick();
    callBlAlertMethod("close");
  },
});
</script>

<template>
  <bl-alert
    ref="alertRef"
    v-bind="{
      ...props,
      closable: props.closable === true ? true : undefined,
      closed: props.closed,
    }"
    @bl-close="handleClose"
  >
    <slot v-if="$slots['caption']" name="caption" />
    <slot v-if="$slots['default']" />
    <slot v-if="$slots['action']" name="action" />
  </bl-alert>
</template>
