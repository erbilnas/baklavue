<script setup lang="ts">
/**
 * Drawer Component
 *
 * A Vue wrapper for Baklava's `bl-drawer` web component.
 * Provides a side drawer for supplemental content with support for caption,
 * embedded iframe content, external link, and programmable width.
 *
 * @component
 * @example
 * ```vue
 * <!-- Basic usage -->
 * <template>
 *   <BvButton @click="showDrawer = true">Open Drawer</BvButton>
 *   <BvDrawer v-model:open="showDrawer">
 *     <p>Drawer content goes here.</p>
 *   </BvDrawer>
 * </template>
 * ```
 *
 * @example
 * ```vue
 * <!-- With caption -->
 * <template>
 *   <BvDrawer v-model:open="showDrawer" caption="Drawer Title">
 *     <p>Content with title.</p>
 *   </BvDrawer>
 * </template>
 * ```
 *
 * @example
 * ```vue
 * <!-- With embed URL (iframe) -->
 * <template>
 *   <BvDrawer v-model:open="showDrawer" embed-url="https://example.com" />
 * </template>
 * ```
 *
 * @example
 * ```vue
 * <!-- With width -->
 * <template>
 *   <BvDrawer v-model:open="showDrawer" width="large" caption="Wide Drawer">
 *     <p>Wider drawer content.</p>
 *   </BvDrawer>
 * </template>
 * ```
 *
 * @example
 * ```vue
 * <!-- Programmatic control via ref -->
 * <template>
 *   <BvButton @click="drawerRef?.open()">Open</BvButton>
 *   <BvButton @click="drawerRef?.close()">Close</BvButton>
 *   <BvDrawer ref="drawerRef" caption="Programmatic">
 *     <p>Opened and closed via ref methods.</p>
 *   </BvDrawer>
 * </template>
 * ```
 */
import { computed, onMounted, ref, watch } from "vue";
import { loadBaklavaResources } from "../utils/loadBaklavaResources";
import type { DrawerProps } from "./drawer.types";

const WIDTH_TO_PX: Record<string, string> = {
  small: "320px",
  medium: "424px",
  large: "560px",
};

const props = withDefaults(defineProps<DrawerProps>(), {
  open: false,
  caption: undefined,
  embedUrl: undefined,
  externalLink: undefined,
  width: undefined,
});

const emit = defineEmits<{
  /** Emitted when visibility changes. Use for two-way binding. */
  "update:open": [open: boolean];
  /** Emitted when the drawer is opened. */
  open: [];
  /** Emitted when the drawer is closed. */
  close: [];
}>();

/** Reference to the underlying bl-drawer element. */
const drawerRef = ref<HTMLElement | null>(null);

/** Computed width for bl-drawer. Maps small/medium/large to px or passes CSS value. */
const drawerWidth = computed(() => {
  if (!props.width) return undefined;
  const key = props.width.toLowerCase();
  return WIDTH_TO_PX[key] ?? props.width;
});

/** Handles bl-drawer-open event. Syncs state and emits. */
const handleOpen = () => {
  emit("update:open", true);
  emit("open");
};

/** Handles bl-drawer-close event. Syncs state and emits. */
const handleClose = () => {
  emit("update:open", false);
  emit("close");
};

/** Syncs props.open to the bl-drawer element's open property. */
function getBlDrawer(el: HTMLElement | null): { open: boolean } | null {
  return el as unknown as { open: boolean } | null;
}

watch(
  () => props.open,
  (newValue) => {
    const blDrawer = getBlDrawer(drawerRef.value);
    if (blDrawer && blDrawer.open !== newValue) {
      blDrawer.open = newValue;
    }
  },
  { immediate: true },
);

onMounted(() => {
  loadBaklavaResources();

  const blDrawer = getBlDrawer(drawerRef.value);
  if (blDrawer && blDrawer.open !== props.open) {
    blDrawer.open = props.open;
  }
});

defineExpose({
  /** Opens the drawer programmatically. */
  open: () => {
    const blDrawer = getBlDrawer(drawerRef.value);
    if (blDrawer) blDrawer.open = true;
  },
  /** Closes the drawer programmatically. */
  close: () => {
    const blDrawer = getBlDrawer(drawerRef.value);
    if (blDrawer) blDrawer.open = false;
  },
});
</script>

<template>
  <bl-drawer
    ref="drawerRef"
    :open="open"
    :caption="caption"
    :embed-url="embedUrl"
    :external-link="externalLink"
    :width="drawerWidth"
    @bl-drawer-open="handleOpen"
    @bl-drawer-close="handleClose"
  >
    <slot />
  </bl-drawer>
</template>
