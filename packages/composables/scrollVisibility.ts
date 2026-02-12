import { onMounted, onUnmounted, ref } from "vue";

export interface UseScrollVisibilityOptions {
  /** Scroll threshold in pixels. isVisible is true when scroll exceeds this. Default: 300 */
  threshold?: number;
}

/**
 * Composable for scroll-based visibility. Detects when scroll position exceeds a threshold.
 * RAF-throttled for performance. Use with BvScrollToTop or custom scroll-to-top / sticky UI.
 *
 * @example
 * ```ts
 * const { isVisible, scrollY, scrollToTop } = useScrollVisibility({ threshold: 300 });
 *
 * // Show floating button when scrolled past 300px
 * <BvButton v-if="isVisible" @click="scrollToTop">Scroll to top</BvButton>
 * ```
 *
 * @param options - Options: threshold (default 300)
 * @returns Object with isVisible, scrollY, scrollToTop
 */
export function useScrollVisibility(options: UseScrollVisibilityOptions = {}) {
  const { threshold = 300 } = options;
  const isVisible = ref(false);
  const scrollY = ref(0);

  let rafId: number | null = null;

  const update = () => {
    if (typeof window === "undefined") return;
    scrollY.value = window.scrollY;
    isVisible.value = window.scrollY > threshold;
  };

  const handleScroll = () => {
    if (rafId !== null) return;
    rafId = requestAnimationFrame(() => {
      update();
      rafId = null;
    });
  };

  const scrollToTop = () => {
    if (typeof window === "undefined") return;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  onMounted(() => {
    if (typeof window === "undefined") return;
    update();
    window.addEventListener("scroll", handleScroll, { passive: true });
  });

  onUnmounted(() => {
    if (typeof window === "undefined") return;
    window.removeEventListener("scroll", handleScroll);
    if (rafId !== null) cancelAnimationFrame(rafId);
  });

  return {
    isVisible,
    scrollY,
    scrollToTop,
  };
}
