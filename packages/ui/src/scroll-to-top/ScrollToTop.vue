<script setup lang="ts">
/**
 * ScrollToTop Component
 *
 * A floating button that appears when the user scrolls past a threshold.
 * Clicking it scrolls smoothly to the top of the page.
 *
 * @component
 * @example
 * ```vue
 * <template>
 *   <BvScrollToTop />
 * </template>
 * ```
 */
import { onMounted, onUnmounted, ref } from "vue";
import BvButton from "../button/Button.vue";
import { loadBaklavaResources } from "../utils/loadBaklavaResources";
import type { ScrollToTopProps } from "./scroll-to-top.types";

const props = withDefaults(defineProps<ScrollToTopProps>(), {
  threshold: 300,
  position: "bottom-right",
  label: "Scroll to top",
  size: "medium",
  variant: "primary",
});

const emit = defineEmits<{
  click: [];
}>();

const isVisible = ref(false);
let rafId: number | null = null;

const checkVisibility = () => {
  isVisible.value = window.scrollY > props.threshold;
};

const handleScroll = () => {
  if (rafId !== null) return;
  rafId = requestAnimationFrame(() => {
    checkVisibility();
    rafId = null;
  });
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
  emit("click");
};

const positionClasses: Record<
  NonNullable<ScrollToTopProps["position"]>,
  string
> = {
  "bottom-right": "scroll-to-top--bottom-right",
  "bottom-left": "scroll-to-top--bottom-left",
  "top-right": "scroll-to-top--top-right",
  "top-left": "scroll-to-top--top-left",
};

onMounted(() => {
  loadBaklavaResources();
  checkVisibility();
  window.addEventListener("scroll", handleScroll, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
  if (rafId !== null) cancelAnimationFrame(rafId);
});
</script>

<template>
  <Transition name="scroll-to-top-fade">
    <div
      v-show="isVisible"
      :class="['scroll-to-top', positionClasses[position]]"
      role="complementary"
      aria-label="Scroll to top"
    >
      <BvButton
        :variant="variant"
        :size="size"
        :label="label"
        icon="arrow_up"
        @click="scrollToTop"
      >
        <template #default></template>
      </BvButton>
    </div>
  </Transition>
</template>

<style scoped>
.scroll-to-top {
  position: fixed;
  z-index: 1000;
}

.scroll-to-top--bottom-right {
  bottom: 1.5rem;
  right: 1.5rem;
}

.scroll-to-top--bottom-left {
  bottom: 1.5rem;
  left: 1.5rem;
}

.scroll-to-top--top-right {
  top: 1.5rem;
  right: 1.5rem;
}

.scroll-to-top--top-left {
  top: 1.5rem;
  left: 1.5rem;
}

.scroll-to-top-fade-enter-active,
.scroll-to-top-fade-leave-active {
  transition: opacity 0.2s ease;
}
.scroll-to-top-fade-enter-from,
.scroll-to-top-fade-leave-to {
  opacity: 0;
}
</style>
