<script setup lang="ts">
/**
 * Skeleton Component
 *
 * Animated placeholder for content loading states.
 * Displays a shimmer effect with configurable variants.
 *
 * @component
 * @example
 * ```vue
 * <template>
 *   <BvSkeleton />
 * </template>
 * ```
 *
 * @example
 * ```vue
 * <template>
 *   <BvSkeleton variant="text" :count="3" />
 * </template>
 * ```
 */
import { computed, onMounted } from "vue";
import { loadBaklavaResources } from "../utils/loadBaklavaResources";
import type { SkeletonProps } from "./skeleton.types";

const props = withDefaults(defineProps<SkeletonProps>(), {
  variant: "rectangle",
  width: undefined,
  height: undefined,
  count: 1,
});

const effectiveWidth = computed(() => {
  if (props.width) return props.width;
  if (props.variant === "circle") return "40px";
  return "100%";
});

const effectiveHeight = computed(() => {
  if (props.height) return props.height;
  if (props.variant === "circle") return "40px";
  return "1rem";
});


onMounted(() => {
  loadBaklavaResources();
});
</script>

<template>
  <div
    class="skeleton-wrapper"
    :class="`skeleton-wrapper--${props.variant}`"
    role="status"
    aria-label="Loading"
  >
    <div
      v-for="n in count"
      :key="n"
      class="skeleton"
      :class="['skeleton--' + props.variant]"
      :style="{
        width: effectiveWidth,
        height: effectiveHeight,
      }"
    />
  </div>
</template>

<style scoped>
.skeleton-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.skeleton {
  background: var(--bl-color-neutral-light, #e5e7eb);
  border-radius: var(--bl-border-radius-s, 0.25rem);
  position: relative;
  overflow: hidden;
}

.skeleton::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.4) 50%,
    transparent 100%
  );
  animation: skeleton-shimmer 1.5s ease-in-out infinite;
}

.skeleton--circle {
  border-radius: var(--bl-border-radius-circle, 50%);
}

.skeleton--text {
  height: 1rem;
}

@keyframes skeleton-shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}
</style>
