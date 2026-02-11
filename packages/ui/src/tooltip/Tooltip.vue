<script setup lang="ts">
/**
 * Tooltip Component
 *
 * A Vue wrapper for Baklava's `bl-tooltip` web component for displaying contextual
 * information on hover or focus. The trigger is provided via the default slot;
 * content can be set via the `content` prop or the `#content` slot.
 *
 * @component
 * @example
 * ```vue
 * <!-- Basic usage -->
 * <template>
 *   <BvTooltip content="This is a tooltip">
 *     <BvButton>Hover me</BvButton>
 *   </BvTooltip>
 * </template>
 * ```
 *
 * @example
 * ```vue
 * <!-- With placement -->
 * <template>
 *   <BvTooltip content="Tooltip" placement="bottom">
 *     <span>Trigger</span>
 *   </BvTooltip>
 * </template>
 * ```
 */
import { computed, onMounted } from "vue";
import { loadBaklavaResources } from "../utils/loadBaklavaResources";
import type { TooltipProps } from "./tooltip.types";

const props = withDefaults(defineProps<TooltipProps>(), {
  content: undefined,
  placement: undefined,
  trigger: undefined,
  disabled: undefined,
  delay: undefined,
});

const emit = defineEmits<{
  /**
   * Emitted when the tooltip is shown.
   */
  show: [];
  /**
   * Emitted when the tooltip is hidden.
   */
  hide: [];
}>();

// bl-tooltip only supports placement and target. Do not pass trigger (read-only),
// content, disabled, or delay as they are not supported and cause errors.
const tooltipProps = computed(() => {
  const bind: Record<string, unknown> = {};
  if (props.placement !== undefined) bind.placement = props.placement;
  if (props.target !== undefined) bind.target = props.target;
  return bind;
});

onMounted(() => {
  loadBaklavaResources();
});
</script>

<template>
  <bl-tooltip
    v-if="!props.disabled"
    v-bind="tooltipProps"
    @bl-tooltip-show="emit('show')"
    @bl-tooltip-hide="emit('hide')"
  >
    <div slot="tooltip-trigger">
      <slot />
    </div>
    <slot v-if="$slots['content']" name="content" />
    <span v-else-if="content">{{ content }}</span>
  </bl-tooltip>
  <slot v-else />
</template>
