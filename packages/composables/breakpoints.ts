import { onMounted, onUnmounted, ref } from "vue";

/**
 * Default breakpoint values (in pixels).
 * Mobile: < 768px, Tablet: 768-1023px, Desktop: >= 1024px
 */
export interface BreakpointOptions {
  /** Max width for mobile (exclusive). Default: 768 */
  mobile?: number;
  /** Max width for tablet (exclusive). Default: 1024 */
  tablet?: number;
}

/**
 * Composable for responsive breakpoints.
 * Uses matchMedia to reactively detect viewport size.
 * Useful for switching layouts (e.g. Drawer vs Dialog on mobile).
 *
 * @example
 * ```ts
 * const { isMobile, isTablet, isDesktop } = useBreakpoints();
 *
 * // Show drawer on mobile, dialog on desktop
 * const useDrawer = isMobile;
 * ```
 *
 * @param options - Optional breakpoint thresholds (default: 768, 1024)
 * @returns Reactive isMobile, isTablet, isDesktop refs
 */
export const useBreakpoints = (options: BreakpointOptions = {}) => {
  const mobileMax = options.mobile ?? 768;
  const tabletMax = options.tablet ?? 1024;

  const isMobile = ref(false);
  const isTablet = ref(false);
  const isDesktop = ref(false);

  const update = () => {
    if (typeof window === "undefined") return;

    const width = window.innerWidth;
    isMobile.value = width < mobileMax;
    isTablet.value = width >= mobileMax && width < tabletMax;
    isDesktop.value = width >= tabletMax;
  };

  onMounted(() => {
    update();
    window.addEventListener("resize", update);
  });

  onUnmounted(() => {
    window.removeEventListener("resize", update);
  });

  return {
    isMobile,
    isTablet,
    isDesktop,
  };
};

/**
 * Composable for a single media query.
 * Returns a ref that is true when the query matches.
 *
 * @example
 * ```ts
 * const matches = useMediaQuery("(max-width: 768px)");
 * ```
 *
 * @param query - Media query string (e.g. "(max-width: 768px)")
 * @returns Ref that is true when the query matches
 */
export const useMediaQuery = (query: string) => {
  const matches = ref(false);

  onMounted(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia(query);
    matches.value = mediaQuery.matches;

    const handler = (e: MediaQueryListEvent) => {
      matches.value = e.matches;
    };
    mediaQuery.addEventListener("change", handler);

    onUnmounted(() => {
      mediaQuery.removeEventListener("change", handler);
    });
  });

  return matches;
};
