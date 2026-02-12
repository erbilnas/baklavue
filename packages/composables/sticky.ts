import { onUnmounted, ref, watch, type Ref } from "vue";

export interface UseStickyOptions {
  /**
   * Threshold in pixels. isSticky is true when element top is at or above this.
   * @default 0
   */
  threshold?: number;
  /** Scroll container. Default: window (document) */
  scrollTarget?: Ref<Element | null | undefined>;
}

/**
 * Composable to detect when a sticky element is "stuck" at the top of the viewport.
 * Uses scroll position and getBoundingClientRect. The target should have
 * position: sticky and top: 0 (or similar).
 *
 * @example
 * ```ts
 * const header = ref<HTMLElement | null>(null);
 * const { isSticky } = useSticky(header);
 *
 * // Add shadow when header is stuck
 * <header ref="header" :class="{ 'shadow': isSticky }">
 * ```
 *
 * @param target - Ref to the sticky element
 * @param options - Optional: threshold, scrollTarget
 * @returns Object with isSticky ref
 */
export function useSticky(
  target: Ref<Element | null | undefined>,
  options: UseStickyOptions = {},
): { isSticky: Ref<boolean> } {
  const { threshold = 0 } = options;

  const isSticky = ref(false);

  let rafId: number | null = null;
  let scrollEl: Element | Window | null = null;
  let targetEl: Element | null = null;

  const update = () => {
    if (!targetEl || typeof window === "undefined") return;
    const rect = targetEl.getBoundingClientRect();
    isSticky.value = rect.top <= threshold;
  };

  const handleScroll = () => {
    if (rafId !== null) return;
    rafId = requestAnimationFrame(() => {
      update();
      rafId = null;
    });
  };

  const attach = (el: Element, scrollTarget?: Element | null) => {
    targetEl = el;
    scrollEl = scrollTarget ?? typeof window !== "undefined" ? window : null;

    if (scrollEl) {
      update();
      scrollEl.addEventListener("scroll", handleScroll, { passive: true });
    }
  };

  const detach = () => {
    if (scrollEl) {
      scrollEl.removeEventListener("scroll", handleScroll);
    }
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
    scrollEl = null;
    targetEl = null;
    isSticky.value = false;
  };

  watch(
    [target, () => options.scrollTarget?.value],
    ([el, scrollTarget]) => {
      detach();
      if (el) {
        attach(el, scrollTarget ?? null);
      }
    },
    { immediate: true },
  );

  onUnmounted(() => {
    detach();
  });

  return {
    isSticky,
  };
}
