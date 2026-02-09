<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { loadBaklavaResources } from "../utils/loadBaklavaResources";
import type { DropdownProps } from "./dropdown.types";

const props = withDefaults(defineProps<DropdownProps>(), {
  open: false,
  placement: undefined,
  disabled: undefined,
  trigger: undefined,
});

const emit = defineEmits<{
  "update:open": [open: boolean];
  open: [];
  close: [];
  select: [event: CustomEvent];
}>();

const dropdownRef = ref<HTMLElement | null>(null);

watch(
  () => props.open,
  (newValue) => {
    if (dropdownRef.value) {
      const blDropdown = dropdownRef.value as any;
      if (newValue && !blDropdown.open) {
        blDropdown.open();
      } else if (!newValue && blDropdown.open) {
        blDropdown.close();
      }
    }
  },
  { immediate: true }
);

const handleOpen = () => {
  emit("update:open", true);
  emit("open");
};

const handleClose = () => {
  emit("update:open", false);
  emit("close");
};

const handleSelect = (event: CustomEvent) => {
  emit("select", event);
};

onMounted(() => {
  loadBaklavaResources();

  if (dropdownRef.value) {
    const blDropdown = dropdownRef.value as any;
    if (props.open && !blDropdown.open) {
      blDropdown.open();
    } else if (!props.open && blDropdown.open) {
      blDropdown.close();
    }
  }
});

defineExpose({
  open: () => {
    if (dropdownRef.value) {
      (dropdownRef.value as any).open();
    }
  },
  close: () => {
    if (dropdownRef.value) {
      (dropdownRef.value as any).close();
    }
  },
  toggle: () => {
    if (dropdownRef.value) {
      (dropdownRef.value as any).toggle();
    }
  },
});
</script>

<template>
  <bl-dropdown
    ref="dropdownRef"
    v-bind="{
      ...props,
      open: props.open === true ? true : undefined,
      disabled: props.disabled === true ? true : undefined,
    }"
    @bl-open="handleOpen"
    @bl-close="handleClose"
    @bl-select="handleSelect"
  >
    <slot v-if="$slots['trigger']" name="trigger" />
    <slot v-if="$slots['content']" name="content" />
    <slot />
  </bl-dropdown>
</template>
