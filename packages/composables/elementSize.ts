import { onMounted, onUnmounted, ref, watch, type Ref } from "vue";

export interface UseElementSizeOptions {
  /** Initial width when no element is observed. Default: 0 */
  initialWidth?: number;
  /** Initial height when no element is observed. Default: 0 */
  initialHeight?: number;
}

/**
 * Composable for reactive element width and height using ResizeObserver.
 * Useful for layout calculations, charts, responsive containers, and
 * dynamic sizing based on element dimensions.
 *
 * @example
 * ```ts
 * const target = ref<HTMLElement | null>(null);
 * const { width, height } = useElementSize(target);
 *
 * // Use in template
 * <div ref="target">Content</div>
 * <p>Width: {{ width }}px, Height: {{ height }}px</p>
 * ```
 *
 * @param target - Ref to the element to observe
 * @param options - Optional: initialWidth, initialHeight
 * @returns Object with width and height refs
 */
export function useElementSize(
  target: Ref<Element | null | undefined>,
  options: UseElementSizeOptions = {},
): { width: Ref<number>; height: Ref<number> } {
  const { initialWidth = 0, initialHeight = 0 } = options;

  const width = ref(initialWidth);
  const height = ref(initialHeight);

  let observer: ResizeObserver | null = null;

  const observe = (el: Element) => {
    if (observer) observer.observe(el);
  };

  const unobserve = (el: Element) => {
    if (observer) {
      observer.unobserve(el);
    }
  };

  onMounted(() => {
    if (typeof window === "undefined") return;

    observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        const rect = entry.contentRect;
        width.value = rect.width;
        height.value = rect.height;
      }
    });

    const el = target.value;
    if (el) {
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
      } else {
        width.value = initialWidth;
        height.value = initialHeight;
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

  return {
    width,
    height,
  };
}
