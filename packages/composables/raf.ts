import { onUnmounted, ref } from "vue";

export interface UseRafFnOptions {
  /** Start the loop immediately. Default: true */
  immediate?: boolean;
  /** Max FPS. Default: undefined (no limit) */
  fpsLimit?: number;
}

export interface RafCallbackArgs {
  /** Time elapsed since last frame in ms */
  delta: number;
  /** High-res timestamp */
  timestamp: number;
}

/**
 * Composable that calls a function on every requestAnimationFrame.
 * Returns pause and resume controls. Useful for animation loops, smooth updates.
 *
 * @example
 * ```ts
 * const { pause, resume } = useRafFn(({ delta }) => {
 *   position.value += velocity * (delta / 1000);
 * });
 *
 * // Pause when tab is hidden
 * document.addEventListener("visibilitychange", () => {
 *   document.hidden ? pause() : resume();
 * });
 * ```
 *
 * @param callback - Function called each frame with delta and timestamp
 * @param options - Options for immediate start and FPS limit
 * @returns Object with pause, resume, isActive
 */
export function useRafFn(
  callback: (args: RafCallbackArgs) => void,
  options: UseRafFnOptions = {},
): { pause: () => void; resume: () => void; isActive: ReturnType<typeof ref<boolean>> } {
  const { immediate = true, fpsLimit } = options;
  const isActive = ref(false);
  let rafId: number | null = null;
  let lastTime = 0;

  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  const run = (timestamp: number) => {
    if (!isActive.value) return;

    const delta = lastTime ? timestamp - lastTime : 0;
    lastTime = timestamp;

    callback({ delta, timestamp });

    if (fpsLimit && fpsLimit > 0) {
      const minInterval = 1000 / fpsLimit;
      const elapsed = delta;
      if (elapsed >= minInterval) {
        rafId = window.requestAnimationFrame(run);
      } else {
        timeoutId = setTimeout(() => {
          rafId = window.requestAnimationFrame(run);
          timeoutId = null;
        }, minInterval - elapsed);
      }
    } else {
      rafId = window.requestAnimationFrame(run);
    }
  };

  const pause = () => {
    isActive.value = false;
    if (rafId !== null) {
      window.cancelAnimationFrame(rafId);
      rafId = null;
    }
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
    lastTime = 0;
  };

  const resume = () => {
    if (isActive.value) return;
    isActive.value = true;
    lastTime = 0;
    rafId = window.requestAnimationFrame(run);
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
