import { onUnmounted, ref } from "vue";

/**
 * Composable for a pausable interval.
 * Returns functions to pause and resume, plus a reactive isActive ref.
 * Useful for polling, countdown timers, auto-refresh.
 *
 * @example
 * ```ts
 * const { pause, resume, isActive } = useIntervalFn(() => {
 *   fetchLatestData();
 * }, 5000);
 *
 * // Pause when tab is hidden
 * document.addEventListener("visibilitychange", () => {
 *   document.hidden ? pause() : resume();
 * });
 * ```
 *
 * @param callback - Function to execute on each tick
 * @param interval - Interval in milliseconds
 * @param options - Options: immediate (run on start, default true)
 * @returns Object with pause, resume, isActive
 */
export function useIntervalFn(
  callback: () => void,
  interval: number,
  options: { immediate?: boolean } = {},
): { pause: () => void; resume: () => void; isActive: ReturnType<typeof ref<boolean>> } {
  const { immediate = true } = options;
  const isActive = ref(false);
  let intervalId: ReturnType<typeof setInterval> | null = null;

  const pause = () => {
    if (intervalId !== null) {
      clearInterval(intervalId);
      intervalId = null;
    }
    isActive.value = false;
  };

  const resume = () => {
    if (intervalId !== null) return;
    isActive.value = true;
    if (immediate) {
      callback();
    }
    intervalId = setInterval(callback, interval);
  };

  if (immediate) {
    resume();
  }

  onUnmounted(pause);

  return {
    pause,
    resume,
    isActive,
  };
}

/**
 * Composable for a cancellable timeout.
 * Returns functions to run and cancel, plus a reactive isPending ref.
 * Useful for delayed execution, one-shot timers.
 *
 * @example
 * ```ts
 * const { run, cancel, isPending } = useTimeoutFn(() => {
 *   showNotification("Saved!");
 * }, 2000);
 *
 * const handleSave = () => {
 *   saveData();
 *   run();
 * };
 * ```
 *
 * @param callback - Function to execute after delay
 * @param delay - Delay in milliseconds
 * @returns Object with run, cancel, isPending
 */
export function useTimeoutFn(
  callback: () => void,
  delay: number,
): { run: () => void; cancel: () => void; isPending: ReturnType<typeof ref<boolean>> } {
  const isPending = ref(false);
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  const cancel = () => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
    isPending.value = false;
  };

  const run = () => {
    cancel();
    isPending.value = true;
    timeoutId = setTimeout(() => {
      callback();
      timeoutId = null;
      isPending.value = false;
    }, delay);
  };

  onUnmounted(cancel);

  return {
    run,
    cancel,
    isPending,
  };
}
