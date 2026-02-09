<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { loadBaklavaResources } from "../utils/loadBaklavaResources";
import type { DialogProps } from "./dialog.types";

const props = withDefaults(defineProps<DialogProps>(), {
  open: false,
  closable: undefined,
  backdrop: undefined,
  size: undefined,
});

const emit = defineEmits<{
  "update:open": [open: boolean];
  close: [];
  open: [];
}>();

const dialogRef = ref<HTMLElement | null>(null);

watch(
  () => props.open,
  (newValue) => {
    if (dialogRef.value) {
      const blDialog = dialogRef.value as any;
      if (newValue && !blDialog.open) {
        blDialog.open();
      } else if (!newValue && blDialog.open) {
        blDialog.close();
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

  if (dialogRef.value) {
    const blDialog = dialogRef.value as any;
    if (props.open && !blDialog.open) {
      blDialog.open();
    } else if (!props.open && blDialog.open) {
      blDialog.close();
    }
  }
});

defineExpose({
  open: () => {
    if (dialogRef.value) {
      (dialogRef.value as any).open();
    }
  },
  close: () => {
    if (dialogRef.value) {
      (dialogRef.value as any).close();
    }
  },
});
</script>

<template>
  <bl-dialog
    ref="dialogRef"
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
  </bl-dialog>
</template>
