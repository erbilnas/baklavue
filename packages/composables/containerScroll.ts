import { onUnmounted, ref, watch, type Ref } from "vue";

export interface UseContainerScrollOptions {
  /** Use passive scroll listener. Default: true */
  passive?: boolean;
}

function getScrollPosition(el: Element): { scrollTop: number; scrollLeft: number } {
  return {
    scrollTop: el.scrollTop,
    scrollLeft: el.scrollLeft,
  };
}

/**
 * Composable for reactive scroll position inside a scrollable container.
 * Uses scroll event with RAF throttling. Useful for virtual lists, custom scroll UIs,
 * and horizontal scroll indicators.
 *
 * @example
 * ```ts
 * const container = ref<HTMLElement | null>(null);
 * const { scrollTop, scrollLeft } = useContainerScroll(container);
 *
 * // Show shadow when scrolled
 * const showLeftShadow = computed(() => scrollLeft.value > 0);
 * ```
 *
 * @param target - Ref to the scrollable element
 * @param options - Optional: passive
 * @returns Object with scrollTop and scrollLeft refs
 */
export function useContainerScroll(
  target: Ref<Element | null | undefined>,
  options: UseContainerScrollOptions = {},
): { scrollTop: Ref<number>; scrollLeft: Ref<number> } {
  const { passive = true } = options;

  const scrollTop = ref(0);
  const scrollLeft = ref(0);

  let rafId: number | null = null;
  let scrollEl: Element | null = null;

  const update = (el: Element) => {
    const pos = getScrollPosition(el);
    scrollTop.value = pos.scrollTop;
    scrollLeft.value = pos.scrollLeft;
  };

  const handleScroll = () => {
    if (rafId !== null || !scrollEl) return;
    rafId = requestAnimationFrame(() => {
      if (scrollEl) update(scrollEl);
      rafId = null;
    });
  };

  const attach = (el: Element) => {
    scrollEl = el;
    update(el);
    el.addEventListener("scroll", handleScroll, { passive });
  };

  const detach = (el: Element) => {
    el.removeEventListener("scroll", handleScroll);
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
    scrollEl = null;
    scrollTop.value = 0;
    scrollLeft.value = 0;
  };

  watch(
    target,
    (el, oldEl) => {
      if (oldEl) detach(oldEl);
      if (el) attach(el);
    },
    { immediate: true },
  );

  onUnmounted(() => {
    const el = target.value;
    if (el) detach(el);
  });

  return {
    scrollTop,
    scrollLeft,
  };
}
