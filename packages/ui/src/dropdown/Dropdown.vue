<script setup lang="ts">
/**
 * Dropdown Component
 *
 * A Vue wrapper for Baklava's `bl-dropdown`, `bl-dropdown-group`, and `bl-dropdown-item`
 * web components. Can be used in two modes: slot mode (custom content via slots) or items
 * mode (declarative menu items with optional grouping).
 *
 * @component
 * @example
 * ```vue
 * <!-- Basic usage with label and items -->
 * <template>
 *   <BvDropdown label="Actions" :items="menuItems">
 *     <template #item="{ item }">
 *       {{ item.caption }}
 *     </template>
 *   </BvDropdown>
 * </template>
 * ```
 *
 * @example
 * ```vue
 * <!-- Items mode with groups -->
 * <template>
 *   <BvDropdown label="Menu" :items="groupedItems">
 *     <template #item="{ item }">
 *       {{ item.caption }}
 *     </template>
 *   </BvDropdown>
 * </template>
 * ```
 *
 * @example
 * ```vue
 * <!-- Programmatic control via ref -->
 * <template>
 *   <BvButton @click="dropdownRef?.open()">Open</BvButton>
 *   <BvButton @click="dropdownRef?.close()">Close</BvButton>
 *   <BvDropdown ref="dropdownRef" label="Menu" :items="items">
 *     <template #item="{ item }">{{ item.caption }}</template>
 *   </BvDropdown>
 * </template>
 * ```
 */
import { computed, onMounted, ref, watch } from "vue";
import { loadBaklavaResources } from "../utils/loadBaklavaResources";
import type { DropdownItem, DropdownProps } from "./dropdown.types";

const props = withDefaults(defineProps<DropdownProps>(), {
  open: false,
  placement: undefined,
  disabled: false,
  trigger: undefined,
  label: "Menu",
  variant: undefined,
  kind: undefined,
  size: undefined,
  icon: undefined,
  items: undefined,
});

const emit = defineEmits<{
  /** Emitted when visibility changes. Use for two-way binding. */
  "update:open": [open: boolean];
  /** Emitted when the dropdown is opened. */
  open: [];
  /** Emitted when the dropdown is closed. */
  close: [];
  /** Emitted when a dropdown item is clicked (from bl-dropdown-item-click). */
  select: [event: CustomEvent];
}>();

/** Reference to the underlying bl-dropdown element. */
const dropdownRef = ref<HTMLElement | null>(null);

/** Determines if the component is in items mode (using items prop). */
const isItemsMode = computed(
  () => Array.isArray(props.items) && props.items.length > 0,
);

/** Groups items by groupCaption for rendering bl-dropdown-group. */
const groupedItems = computed(() => {
  if (!props.items) return [];
  const groups = new Map<
    string | undefined,
    { item: DropdownItem; index: number }[]
  >();
  props.items.forEach((item, index) => {
    const key = item.groupCaption ?? undefined;
    const list = groups.get(key) ?? [];
    list.push({ item, index });
    groups.set(key, list);
  });
  return Array.from(groups.entries()).map(([groupCaption, entries]) => ({
    groupCaption: groupCaption || undefined,
    entries,
  }));
});

/** Handles bl-dropdown-open event. Syncs state and emits. */
const handleOpen = () => {
  emit("update:open", true);
  emit("open");
};

/** Handles bl-dropdown-close event. Syncs state and emits. */
const handleClose = () => {
  emit("update:open", false);
  emit("close");
};

/** Handles bl-dropdown-item-click from items. Bubbles as select event. */
const handleItemClick = (event: CustomEvent) => {
  emit("select", event);
};

type BlDropdownElement = {
  opened?: boolean;
  open: () => void;
  close: () => void;
};

function getBlDropdown(el: HTMLElement | null): BlDropdownElement | null {
  return el as unknown as BlDropdownElement | null;
}

/** Syncs props.open to the bl-dropdown element. */
watch(
  () => props.open,
  (newValue) => {
    const blDropdown = getBlDropdown(dropdownRef.value);
    if (blDropdown) {
      if (newValue && !blDropdown.opened) {
        blDropdown.open();
      } else if (!newValue && blDropdown.opened) {
        blDropdown.close();
      }
    }
  },
  { immediate: true },
);

onMounted(() => {
  loadBaklavaResources();

  const blDropdown = getBlDropdown(dropdownRef.value);
  if (blDropdown && blDropdown.opened !== props.open) {
    if (props.open) {
      blDropdown.open();
    } else {
      blDropdown.close();
    }
  }
});

defineExpose({
  /** Opens the dropdown programmatically. */
  open: () => {
    getBlDropdown(dropdownRef.value)?.open();
  },
  /** Closes the dropdown programmatically. */
  close: () => {
    getBlDropdown(dropdownRef.value)?.close();
  },
  /** Toggles the dropdown open/closed state. */
  toggle: () => {
    const blDropdown = getBlDropdown(dropdownRef.value);
    if (blDropdown) {
      if (blDropdown.opened) {
        blDropdown.close();
      } else {
        blDropdown.open();
      }
    }
  },
});
</script>

<template>
  <bl-dropdown
    ref="dropdownRef"
    v-bind="{
      label: props.label,
      variant: props.variant,
      kind: props.kind,
      size: props.size,
      icon: props.icon,
      disabled: props.disabled === true ? true : undefined,
    }"
    @bl-dropdown-open="handleOpen"
    @bl-dropdown-close="handleClose"
  >
    <!-- Items mode: render bl-dropdown-group and bl-dropdown-item -->
    <template v-if="isItemsMode">
      <template v-for="(group, gi) in groupedItems" :key="gi">
        <bl-dropdown-group
          v-if="group.groupCaption"
          :caption="group.groupCaption"
        >
          <bl-dropdown-item
            v-for="(entry, ii) in group.entries"
            :key="`${gi}-${ii}`"
            :icon="entry.item.icon"
            :disabled="entry.item.disabled === true"
            @bl-dropdown-item-click="handleItemClick"
          >
            <slot name="item" :item="entry.item" :index="entry.index">
              {{ entry.item.caption }}
            </slot>
          </bl-dropdown-item>
        </bl-dropdown-group>
        <template v-else>
          <bl-dropdown-item
            v-for="(entry, ii) in group.entries"
            :key="`${gi}-${ii}`"
            :icon="entry.item.icon"
            :disabled="entry.item.disabled === true"
            @bl-dropdown-item-click="handleItemClick"
          >
            <slot name="item" :item="entry.item" :index="entry.index">
              {{ entry.item.caption }}
            </slot>
          </bl-dropdown-item>
        </template>
      </template>
    </template>
    <!-- Slot mode: default slot for custom content -->
    <slot v-else />
  </bl-dropdown>
</template>
