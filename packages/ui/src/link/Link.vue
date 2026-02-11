<script setup lang="ts">
/**
 * Link Component
 *
 * A Vue wrapper for Baklava's `bl-link` web component for navigation links.
 * Supports inline (text within content) and standalone (button-like) variants with
 * full TypeScript support and HTML anchor attributes (href, target, rel, etc.).
 *
 * @component
 * @example
 * ```vue
 * <!-- Basic usage -->
 * <template>
 *   <BvLink href="/about">About</BvLink>
 * </template>
 * ```
 *
 * @example
 * ```vue
 * <!-- Inline variant (default) -->
 * <template>
 *   <p>Visit our <BvLink href="/docs">documentation</BvLink> for more info.</p>
 * </template>
 * ```
 *
 * @example
 * ```vue
 * <!-- Standalone variant with size -->
 * <template>
 *   <BvLink href="/signup" variant="standalone" size="large">
 *     Sign up
 *   </BvLink>
 * </template>
 * ```
 *
 * @example
 * ```vue
 * <!-- With icon slot -->
 * <template>
 *   <BvLink href="/settings" variant="standalone">
 *     <template #icon><BvIcon name="settings" /></template>
 *     Settings
 *   </BvLink>
 * </template>
 * ```
 *
 * @example
 * ```vue
 * <!-- External link with target -->
 * <template>
 *   <BvLink href="https://example.com" target="_blank" rel="noopener noreferrer">
 *     External site
 *   </BvLink>
 * </template>
 * ```
 *
 * @example
 * ```vue
 * <!-- Disabled state -->
 * <template>
 *   <BvLink href="/disabled" :disabled="true">Disabled link</BvLink>
 * </template>
 * ```
 */
import { computed, onMounted } from "vue";
import { loadBaklavaResources } from "../utils/loadBaklavaResources";
import type { LinkProps } from "./link.types";

const props = withDefaults(defineProps<LinkProps>(), {
  href: undefined,
  target: undefined,
  disabled: undefined,
  variant: undefined,
  size: undefined,
  kind: undefined,
  ariaLabel: undefined,
  rel: undefined,
  hreflang: undefined,
  type: undefined,
  referrerPolicy: undefined,
  download: undefined,
  ping: undefined,
});

const emit = defineEmits<{
  /** Emitted when the link is clicked. */
  click: [event: CustomEvent];
}>();

/** Props to pass to bl-link. When disabled, omit href so navigation is prevented. */
const linkBindings = computed(() => {
  const { disabled, href, ...rest } = props;
  return {
    ...rest,
    href: disabled ? undefined : href,
    "aria-disabled": disabled ? "true" : undefined,
    tabindex: disabled ? -1 : undefined,
  };
});

/** Prevents navigation and click when disabled. */
function handleClick(event: CustomEvent) {
  if (props.disabled) {
    event.preventDefault();
    event.stopPropagation();
    return;
  }
  emit("click", event);
}

onMounted(() => {
  loadBaklavaResources();
});
</script>

<template>
  <bl-link
    v-bind="linkBindings"
    :class="{ 'bv-link--disabled': disabled }"
    @bl-click="handleClick"
  >
    <slot v-if="$slots['icon']" name="icon" />
    <slot />
  </bl-link>
</template>

<style scoped>
.bv-link--disabled {
  pointer-events: none;
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
