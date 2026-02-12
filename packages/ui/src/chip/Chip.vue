<script setup lang="ts">
/**
 * Chip Component
 *
 * A wrapper that displays a badge/indicator (text or number) positioned on top of another element.
 * Similar to Nuxt UI's UChip. Used for notification counts, status indicators, and standalone badges.
 *
 * @component
 * @example
 * ```vue
 * <template>
 *   <BvChip :text="5">
 *     <BvButton icon="mail" />
 *   </BvChip>
 * </template>
 * ```
 */
import { computed, onMounted } from "vue";
import { loadBaklavaResources } from "../utils/loadBaklavaResources";
import type { ChipProps } from "./chip.types";

const props = withDefaults(defineProps<ChipProps>(), {
  text: undefined,
  color: "primary",
  size: "md",
  position: "top-right",
  inset: false,
  standalone: false,
  show: true,
});

const colorStyles = computed(() => {
  const colorMap: Record<string, { backgroundColor: string; color: string }> = {
    primary: {
      backgroundColor: "var(--bl-color-primary)",
      color: "var(--bl-color-primary-contrast, #fff)",
    },
    success: {
      backgroundColor: "var(--bl-color-success)",
      color: "var(--bl-color-success-contrast, #fff)",
    },
    danger: {
      backgroundColor: "var(--bl-color-danger)",
      color: "var(--bl-color-danger-contrast, #fff)",
    },
    warning: {
      backgroundColor: "var(--bl-color-warning)",
      color: "var(--bl-color-warning-contrast, #fff)",
    },
    info: {
      backgroundColor: "var(--bl-color-info)",
      color: "var(--bl-color-info-contrast, #fff)",
    },
    neutral: {
      backgroundColor: "var(--bl-color-neutral-darkest)",
      color: "var(--bl-color-neutral-full, #fff)",
    },
  };
  return colorMap[props.color] ?? colorMap["primary"];
});

const sizeClass = computed(() => `bv-chip__badge--${props.size}`);

onMounted(() => {
  loadBaklavaResources();
});
</script>

<template>
  <template v-if="standalone">
    <span
      v-if="show"
      class="bv-chip bv-chip--standalone"
      :class="sizeClass"
      :style="colorStyles"
    >
      <slot name="content">
        {{ text }}
      </slot>
    </span>
  </template>
  <div v-else class="bv-chip" :class="{ 'bv-chip--has-content': $slots['default'] }">
    <slot />
    <span
      v-if="show"
      class="bv-chip__badge"
      :class="[sizeClass, `bv-chip__badge--${position}`, { 'bv-chip__badge--inset': inset }]"
      :style="colorStyles"
    >
      <slot name="content">
        {{ text }}
      </slot>
    </span>
  </div>
</template>

<style scoped>
.bv-chip {
  position: relative;
  display: inline-flex;
}

.bv-chip--standalone {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  font-weight: 600;
  white-space: nowrap;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.bv-chip--has-content .bv-chip__badge {
  position: absolute;
}

.bv-chip__badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 1.25em;
  border-radius: 9999px;
  font-weight: 600;
  white-space: nowrap;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

/* Position: top-right (default) */
.bv-chip__badge--top-right {
  top: 0;
  right: 0;
  transform: translate(50%, -50%);
}

.bv-chip__badge--top-right.bv-chip__badge--inset {
  top: 2px;
  right: 2px;
  transform: translate(50%, -50%);
}

/* Position: bottom-right */
.bv-chip__badge--bottom-right {
  top: 100%;
  right: 0;
  transform: translate(50%, 50%);
}

.bv-chip__badge--bottom-right.bv-chip__badge--inset {
  top: calc(100% - 2px);
  right: 2px;
  transform: translate(50%, 50%);
}

/* Position: top-left */
.bv-chip__badge--top-left {
  top: 0;
  left: 0;
  transform: translate(-50%, -50%);
}

.bv-chip__badge--top-left.bv-chip__badge--inset {
  top: 2px;
  left: 2px;
  transform: translate(-50%, -50%);
}

/* Position: bottom-left */
.bv-chip__badge--bottom-left {
  top: 100%;
  left: 0;
  transform: translate(-50%, 50%);
}

.bv-chip__badge--bottom-left.bv-chip__badge--inset {
  top: calc(100% - 2px);
  left: 2px;
  transform: translate(-50%, 50%);
}

/* Size variants */
.bv-chip__badge--xs {
  font-size: 0.625rem;
  padding: 0 0.25rem;
  min-width: 1em;
  height: 1em;
}

.bv-chip__badge--sm {
  font-size: 0.6875rem;
  padding: 0 0.3125rem;
  min-width: 1.125em;
  height: 1.125em;
}

.bv-chip__badge--md {
  font-size: 0.75rem;
  padding: 0 0.375rem;
  min-width: 1.25em;
  height: 1.25em;
}

.bv-chip__badge--lg {
  font-size: 0.875rem;
  padding: 0 0.5rem;
  min-width: 1.5em;
  height: 1.5em;
}

/* Standalone size classes */
.bv-chip--standalone.bv-chip__badge--xs {
  font-size: 0.625rem;
  padding: 0 0.25rem;
  min-width: 1em;
  height: 1em;
}

.bv-chip--standalone.bv-chip__badge--sm {
  font-size: 0.6875rem;
  padding: 0 0.3125rem;
  min-width: 1.125em;
  height: 1.125em;
}

.bv-chip--standalone.bv-chip__badge--md {
  font-size: 0.75rem;
  padding: 0 0.375rem;
  min-width: 1.25em;
  height: 1.25em;
}

.bv-chip--standalone.bv-chip__badge--lg {
  font-size: 0.875rem;
  padding: 0 0.5rem;
  min-width: 1.5em;
  height: 1.5em;
}
</style>
