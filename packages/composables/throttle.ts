import { onUnmounted, ref, watch, type Ref } from "vue";

/**
 * Composable that returns a throttled version of a function.
 * The function will be called at most once per specified interval.
 * Useful for scroll, resize, and mousemove handlers.
 *
 * @example
 * ```ts
 * const throttledHandler = useThrottleFn(() => {
 *   updateScrollPosition();
 * }, 100);
 *
 * window.addEventListener("scroll", throttledHandler);
 * ```
 *
 * @param fn - Function to throttle
 * @param delay - Minimum interval in milliseconds (default: 200)
 * @param options - Options for leading/trailing edge (default: both true)
 * @returns Throttled function
 */
export function useThrottleFn<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay = 200,
  options: { leading?: boolean; trailing?: boolean } = {},
): (...args: Parameters<T>) => void {
  const { leading = true, trailing = true } = options;
  let lastCall = 0;
  let trailingTimeoutId: ReturnType<typeof setTimeout> | null = null;
  let lastArgs: Parameters<T> | null = null;

  const invoke = (args: Parameters<T>) => {
    lastCall = Date.now();
    lastArgs = null;
    fn(...args);
  };

  const throttled = (...args: Parameters<T>) => {
    const now = Date.now();
    const elapsed = now - lastCall;
    const inCooldown = elapsed < delay;

    if (!inCooldown) {
      if (trailingTimeoutId !== null) {
        clearTimeout(trailingTimeoutId);
        trailingTimeoutId = null;
      }
      lastArgs = null;
      if (leading) {
        invoke(args);
      } else {
        lastCall = now;
      }
    } else if (trailing) {
      lastArgs = args;
      if (trailingTimeoutId === null) {
        trailingTimeoutId = setTimeout(() => {
          if (lastArgs !== null) {
            invoke(lastArgs);
          }
          trailingTimeoutId = null;
          lastArgs = null;
        }, delay - elapsed);
      }
    }
  };

  onUnmounted(() => {
    if (trailingTimeoutId !== null) {
      clearTimeout(trailingTimeoutId);
    }
  });

  return throttled;
}

/**
 * Composable that returns a throttled ref.
 * The ref value updates at most once per specified interval.
 * Useful for scroll position, resize dimensions.
 *
 * @example
 * ```ts
 * const scrollY = ref(0);
 * const throttledScrollY = useThrottledRef(scrollY, 100);
 *
 * window.addEventListener("scroll", () => { scrollY.value = window.scrollY; });
 * ```
 *
 * @param value - Ref to throttle
 * @param delay - Minimum interval in milliseconds (default: 200)
 * @returns Ref with throttled value
 */
export function useThrottledRef<T>(value: Ref<T>, delay = 200): Ref<T> {
  const throttled = ref(value.value) as Ref<T>;
  let lastUpdate = 0;
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  watch(value, (newVal) => {
    const now = Date.now();
    const elapsed = now - lastUpdate;

    if (elapsed >= delay || lastUpdate === 0) {
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
      throttled.value = newVal;
      lastUpdate = now;
    } else if (timeoutId === null) {
      timeoutId = setTimeout(() => {
        throttled.value = value.value;
        lastUpdate = Date.now();
        timeoutId = null;
      }, delay - elapsed);
    }
  });

  onUnmounted(() => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }
  });

  return throttled;
}
