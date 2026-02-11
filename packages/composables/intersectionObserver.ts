import { onMounted, onUnmounted, ref, watch, type Ref } from "vue";

export interface UseIntersectionObserverOptions {
  /** Root element for the observer. Default: null (viewport) */
  root?: Element | Document | null;
  /** Margin around root. Default: "0px" */
  rootMargin?: string;
  /** Threshold(s) 0-1. Default: 0 */
  threshold?: number | number[];
  /** Start observing immediately. Default: true */
  immediate?: boolean;
}

/**
 * Composable that detects when a target element enters or leaves the viewport.
 * Useful for lazy loading, scroll-triggered animations, "in view" detection.
 *
 * @example
 * ```ts
 * const target = ref<HTMLElement | null>(null);
 * const isVisible = useIntersectionObserver(target, {
 *   threshold: 0.5,
 * });
 *
 * // isVisible is true when at least 50% of the element is visible
 * ```
 *
 * @param target - Ref to the element to observe
 * @param options - IntersectionObserver options
 * @returns Ref that is true when target is visible
 */
export function useIntersectionObserver(
  target: Ref<Element | null | undefined>,
  options: UseIntersectionObserverOptions = {},
): Ref<boolean> {
  const {
    root = null,
    rootMargin = "0px",
    threshold = 0,
    immediate = true,
  } = options;

  const isVisible = ref(false);
  let observer: IntersectionObserver | null = null;

  const observe = (el: Element) => {
    if (observer) {
      observer.observe(el);
    }
  };

  const unobserve = (el: Element) => {
    if (observer) {
      observer.unobserve(el);
    }
  };

  onMounted(() => {
    if (typeof window === "undefined") return;

    observer = new IntersectionObserver(
      ([entry]) => {
        isVisible.value = entry?.isIntersecting ?? false;
      },
      {
        root,
        rootMargin,
        threshold,
      },
    );

    const el = target.value;
    if (el && immediate) {
      observe(el);
    }
  });

  watch(
    target,
    (el, oldEl) => {
      if (oldEl) {
        unobserve(oldEl);
      }
      if (el && observer) {
        observe(el);
      }
    },
    { immediate: true },
  );

  onUnmounted(() => {
    const el = target.value;
    if (el && observer) {
      observer.unobserve(el);
    }
    observer = null;
  });

  return isVisible;
}
