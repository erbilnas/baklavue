<script setup lang="ts">
/**
 * Accordion Component
 *
 * A Vue wrapper for Baklava's `bl-accordion` and `bl-accordion-group` web components.
 * Can be used as either a single accordion or as a group wrapper for multiple accordions.
 *
 * @component
 * @example
 * ```vue
 * <!-- Single accordion -->
 * <template>
 *   <Accordion :open="isOpen" @toggle="isOpen = $event" caption="Section Title">
 *     <p>Accordion content goes here</p>
 *   </Accordion>
 * </template>
 * ```
 *
 * @example
 * ```vue
 * <!-- Accordion group - only one open at a time -->
 * <template>
 *   <Accordion :multiple="false">
 *     <Accordion :open="open1" @toggle="open1 = $event" caption="Question 1">
 *       Answer 1
 *     </Accordion>
 *     <Accordion :open="open2" @toggle="open2 = $event" caption="Question 2">
 *       Answer 2
 *     </Accordion>
 *   </Accordion>
 * </template>
 * ```
 *
 * @example
 * ```vue
 * <!-- Accordion group - multiple can be open -->
 * <template>
 *   <Accordion :multiple="true">
 *     <Accordion :open="open1" @toggle="open1 = $event" caption="Section 1">
 *       Content 1
 *     </Accordion>
 *     <Accordion :open="open2" @toggle="open2 = $event" caption="Section 2">
 *       Content 2
 *     </Accordion>
 *   </Accordion>
 * </template>
 * ```
 */
import { computed, onMounted, ref, watch } from "vue";
import { loadBaklavaResources } from "../utils/loadBaklavaResources";
import type { AccordionProps } from "./accordion.types";

/**
 * Component props with default values.
 */
const props = withDefaults(defineProps<AccordionProps>(), {
  open: false,
  caption: undefined,
  icon: undefined,
  disabled: false,
  animationDuration: undefined,
  multiple: undefined,
});

/**
 * Component events.
 */
const emit = defineEmits<{
  /**
   * Emitted when the accordion is toggled (opened or closed).
   * Only used when component is in single accordion mode.
   *
   * @param {boolean} open - The new open state of the accordion.
   */
  toggle: [open: boolean];
}>();

/**
 * Reference to the underlying web component element.
 */
const accordionRef = ref<HTMLElement | null>(null);

/**
 * Determines if the component should act as a group wrapper.
 * When `multiple` prop is explicitly provided (even if false), it acts as a group.
 */
const isGroupMode = computed(() => props.multiple !== undefined);

/**
 * Watches for changes to the `open` prop and syncs with the web component.
 * Only applies when in single accordion mode.
 *
 * When the prop changes, it calls the appropriate expand/collapse method
 * on the underlying web component.
 */
watch(
  () => props.open,
  (newValue) => {
    if (!isGroupMode.value && accordionRef.value) {
      const blAccordion = accordionRef.value as any;
      if (newValue && !blAccordion.open) {
        blAccordion.expand();
      } else if (!newValue && blAccordion.open) {
        blAccordion.collapse();
      }
    }
  },
  { immediate: true },
);

/**
 * Handles the toggle event from the underlying web component.
 * Only used when component is in single accordion mode.
 *
 * @param {CustomEvent<boolean>} event - The toggle event from bl-accordion.
 */
const handleToggle = (event: CustomEvent<boolean>): void => {
  if (!isGroupMode.value) {
    const isOpen = event.detail;
    emit("toggle", isOpen);
  }
};

/**
 * Lifecycle hook: Component mounted.
 *
 * Loads Baklava resources and syncs the initial open state with the web component
 * (only when in single accordion mode).
 */
onMounted(() => {
  loadBaklavaResources();

  // Sync initial state (only for single accordion mode)
  if (!isGroupMode.value && accordionRef.value) {
    const blAccordion = accordionRef.value as any;
    if (props.open && !blAccordion.open) {
      blAccordion.expand();
    } else if (!props.open && blAccordion.open) {
      blAccordion.collapse();
    }
  }
});

/**
 * Exposed methods for programmatic control of the accordion.
 * Only available when component is in single accordion mode.
 */
defineExpose({
  /**
   * Expands the accordion programmatically.
   *
   * @public
   */
  expand: (): void => {
    if (!isGroupMode.value && accordionRef.value) {
      (accordionRef.value as any).expand();
    }
  },

  /**
   * Collapses the accordion programmatically.
   *
   * @public
   */
  collapse: (): void => {
    if (!isGroupMode.value && accordionRef.value) {
      (accordionRef.value as any).collapse();
    }
  },
});
</script>

<template>
  <!-- Group mode: render as bl-accordion-group -->
  <!-- Render bl-accordion for each item in props.items -->
  <bl-accordion-group
    v-if="isGroupMode"
    :multiple="props.multiple === true ? true : undefined"
  >
    <bl-accordion
      v-for="(item, index) in props.items"
      :key="index"
      v-bind="{
        open: item.open === true ? true : undefined,
        caption: item.caption,
        icon: item.icon,
        disabled: item.disabled === true ? true : undefined,
        animationDuration: item.animationDuration,
      }"
    >
      <template v-if="item.content">
        <component
          v-if="typeof item.content === 'function'"
          :is="item.content"
        />
        <template v-else>{{ item.content }}</template>
      </template>
    </bl-accordion>
    <slot />
  </bl-accordion-group>

  <!-- Single accordion mode: render as bl-accordion -->
  <bl-accordion
    v-else
    ref="accordionRef"
    v-bind="{
      open: props.open === true ? true : undefined,
      caption: props.caption,
      icon: props.icon,
      disabled: props.disabled === true ? true : undefined,
      animationDuration: props.animationDuration,
    }"
    @bl-toggle="handleToggle"
  >
    <slot />
  </bl-accordion>
</template>
