<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { loadBaklavaResources } from "../utils/loadBaklavaResources";
import type { DrawerProps } from "./drawer.types";

const props = withDefaults(defineProps<DrawerProps>(), {
  open: false,
  placement: undefined,
  closable: undefined,
  backdrop: undefined,
});

const emit = defineEmits<{
  "update:open": [open: boolean];
  close: [];
  open: [];
}>();

const drawerRef = ref<HTMLElement | null>(null);

watch(
  () => props.open,
  (newValue) => {
    if (drawerRef.value) {
      const blDrawer = drawerRef.value as any;
      if (newValue && !blDrawer.open) {
        blDrawer.open();
      } else if (!newValue && blDrawer.open) {
        blDrawer.close();
      }
    }
  },
  { immediate: true }
);

const handleClose = () => {
  emit("update:open", false);
  emit("close");
};

const handleOpen = () => {
  emit("update:open", true);
  emit("open");
};

onMounted(() => {
  loadBaklavaResources();

  if (drawerRef.value) {
    const blDrawer = drawerRef.value as any;
    if (props.open && !blDrawer.open) {
      blDrawer.open();
    } else if (!props.open && blDrawer.open) {
      blDrawer.close();
    }
  }
});

defineExpose({
  open: () => {
    if (drawerRef.value) {
      (drawerRef.value as any).open();
    }
  },
  close: () => {
    if (drawerRef.value) {
      (drawerRef.value as any).close();
    }
  },
});
</script>

<template>
  <bl-drawer
    ref="drawerRef"
    v-bind="{
      ...props,
      open: props.open === true ? true : undefined,
      closable: props.closable === true ? true : undefined,
      backdrop: props.backdrop === true ? true : undefined,
    }"
    @bl-close="handleClose"
    @bl-open="handleOpen"
  >
    <slot v-if="$slots['header']" name="header" />
    <slot />
    <slot v-if="$slots['footer']" name="footer" />
  </bl-drawer>
</template>
