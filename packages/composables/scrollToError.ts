import { onUnmounted } from "vue";

/**
 * Focusable element selectors for finding form controls.
 * Includes native inputs and Baklava custom components.
 */
const FOCUSABLE_SELECTORS =
  "input, select, textarea, button, bl-select, bl-input";

const DEFAULT_ANNOUNCE_MESSAGE =
  "Validation error. Please fix the highlighted field.";

/**
 * Options for customizing scroll-to-error behavior.
 */
export interface ScrollToErrorOptions {
  /** Scroll behavior. Default: `'smooth'` */
  scrollBehavior?: ScrollBehavior;
  /** Vertical scroll position. Default: `'center'` */
  block?: ScrollLogicalPosition;
  /** CSS class to apply for highlight effect. Default: `'error-shine'` */
  shineClass?: string;
  /** Duration in ms to keep the shine class. Use `0` to disable. Default: `2500` */
  shineDuration?: number;
  /** Whether to attempt focusing the first focusable element. Default: `true` */
  focus?: boolean;
  /** Delay in ms before focus attempt. Default: `300` */
  focusDelay?: number;
  /** Scroll container (selector or element) for forms inside modals/drawers. When provided, scrolls this container instead of the viewport. */
  scrollContainer?: string | HTMLElement | null;
  /** Screen reader announcement. `true` = default message, `string` = custom message, `false` = no announcement. Default: `true` */
  announce?: boolean | string;
  /** Offset in pixels for fixed headers (e.g. `{ top: 80 }`). */
  scrollOffset?: { top?: number; left?: number };
}

/** Options passed when creating the composable. */
export interface UseScrollToErrorOptions {
  /** Default options applied to every scrollToError call. Call-time options override these. */
  defaultOptions?: ScrollToErrorOptions;
}

/** Target that can be resolved to an HTMLElement: selector, element, or object with scrollTarget. */
export type ScrollToErrorTarget =
  | string
  | HTMLElement
  | { scrollTarget: string };

/** Result of scrollToError. */
export interface ScrollToErrorResult {
  /** Whether the target was found and scrolled to. */
  success: boolean;
}

/**
 * Resolves the target to an HTMLElement.
 *
 * @param target - CSS selector, HTMLElement, or object with scrollTarget
 * @returns The resolved element or null if not found
 */
function resolveTarget(target: ScrollToErrorTarget): HTMLElement | null {
  if (typeof document === "undefined") return null;

  if (typeof target === "string") {
    const el = document.querySelector(target);
    return el instanceof HTMLElement ? el : null;
  }

  if (target instanceof HTMLElement) {
    return target;
  }

  if (target && typeof target === "object" && "scrollTarget" in target) {
    const selector = target.scrollTarget;
    if (!selector || typeof selector !== "string") return null;
    const el = document.querySelector(selector);
    return el instanceof HTMLElement ? el : null;
  }

  return null;
}

/**
 * Resolves scrollContainer option to HTMLElement or null.
 */
function resolveScrollContainer(
  scrollContainer: string | HTMLElement | null | undefined,
): HTMLElement | null {
  if (scrollContainer == null || scrollContainer === undefined) return null;
  if (scrollContainer instanceof HTMLElement) return scrollContainer;
  if (typeof scrollContainer === "string") {
    const el = document.querySelector(scrollContainer);
    return el instanceof HTMLElement ? el : null;
  }
  return null;
}

/**
 * Scrolls a container so the element is visible.
 */
function scrollContainerToElement(
  container: HTMLElement,
  element: HTMLElement,
  options: {
    block?: ScrollLogicalPosition;
    scrollBehavior?: ScrollBehavior;
    scrollOffset?: { top?: number; left?: number };
  },
): void {
  const offsetTop = options.scrollOffset?.top ?? 0;

  const elementRect = element.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();

  const elementTopInContainer =
    elementRect.top - containerRect.top + container.scrollTop;
  const containerHeight = container.clientHeight;
  const elementHeight = element.offsetHeight;

  let targetScrollTop = container.scrollTop;

  switch (options.block) {
    case "start":
      targetScrollTop = elementTopInContainer - offsetTop;
      break;
    case "center":
      targetScrollTop =
        elementTopInContainer -
        containerHeight / 2 +
        elementHeight / 2 -
        offsetTop;
      break;
    case "end":
      targetScrollTop =
        elementTopInContainer - containerHeight + elementHeight + offsetTop;
      break;
    case "nearest":
      if (elementRect.top < containerRect.top) {
        targetScrollTop =
          container.scrollTop +
          (elementRect.top - containerRect.top) -
          offsetTop;
      } else if (elementRect.bottom > containerRect.bottom) {
        targetScrollTop =
          container.scrollTop +
          (elementRect.bottom - containerRect.bottom) +
          offsetTop;
      }
      break;
    default:
      targetScrollTop =
        elementTopInContainer -
        containerHeight / 2 +
        elementHeight / 2 -
        offsetTop;
  }

  container.scrollTo({
    top: Math.max(0, targetScrollTop),
    behavior: options.scrollBehavior ?? "smooth",
  });
}

/**
 * Finds the first focusable element within the given element.
 * Prefers inner input/select/textarea for custom components like bl-select.
 *
 * @param element - Container element to search within
 * @returns The focusable element or null
 */
function findFocusable(element: HTMLElement): HTMLElement | null {
  const focusable = element.querySelector(FOCUSABLE_SELECTORS);
  if (!(focusable instanceof HTMLElement)) return null;

  // Prefer inner input/select/textarea for custom components
  const innerInput = focusable.querySelector("input, select, textarea");
  if (innerInput instanceof HTMLElement) {
    return innerInput;
  }
  return focusable;
}

/**
 * Announces a message to screen readers via aria-live.
 */
function announceToScreenReader(message: string): void {
  if (typeof document === "undefined") return;

  const id = "scroll-to-error-announcer";
  let announcer = document.getElementById(id);

  if (!announcer) {
    announcer = document.createElement("div");
    announcer.id = id;
    announcer.setAttribute("aria-live", "polite");
    announcer.setAttribute("aria-atomic", "true");
    Object.assign(announcer.style, {
      position: "absolute",
      width: "1px",
      height: "1px",
      padding: "0",
      margin: "-1px",
      overflow: "hidden",
      clip: "rect(0, 0, 0, 0)",
      whiteSpace: "nowrap",
      border: "0",
    });
    document.body.appendChild(announcer);
  }

  announcer.textContent = "";
  announcer.textContent = message;
}

/**
 * Composable for scrolling to an element with validation error.
 * Scrolls into view, optionally applies a highlight effect, and focuses the first focusable control.
 *
 * @example
 * ```ts
 * const { scrollToError } = useScrollToError();
 *
 * // From validation error object
 * scrollToError(validationError);
 *
 * // Direct selector
 * scrollToError('[data-field="tags"]');
 *
 * // With custom options
 * scrollToError('[data-field="tags"]', { shineClass: 'my-shine', shineDuration: 1500 });
 *
 * // With default options for modals
 * const { scrollToError } = useScrollToError({
 *   defaultOptions: { scrollContainer: '[data-dialog-body]' }
 * });
 * ```
 */
export const useScrollToError = (
  composableOptions: UseScrollToErrorOptions = {},
) => {
  const defaultOpts = composableOptions.defaultOptions ?? {};
  const timeouts: ReturnType<typeof setTimeout>[] = [];

  onUnmounted(() => {
    timeouts.forEach(clearTimeout);
    timeouts.length = 0;
  });

  /**
   * Scrolls to the target element and optionally applies highlight and focus.
   *
   * @param target - CSS selector, HTMLElement, or object with scrollTarget (e.g. validation error)
   * @param options - Optional overrides for scroll, shine, and focus behavior
   * @returns Object with success indicating whether the target was found and scrolled to
   */
  const scrollToError = (
    target: ScrollToErrorTarget,
    options?: ScrollToErrorOptions,
  ): ScrollToErrorResult => {
    if (typeof document === "undefined") {
      return { success: false };
    }

    const element = resolveTarget(target);
    if (!element) {
      return { success: false };
    }

    const merged = { ...defaultOpts, ...options };
    const {
      scrollBehavior = "smooth",
      block = "center",
      shineClass = "error-shine",
      shineDuration = 2500,
      focus = true,
      focusDelay = 300,
      scrollContainer,
      announce: announceOpt = true,
      scrollOffset,
    } = merged;

    const container = resolveScrollContainer(scrollContainer);

    if (container && container.contains(element)) {
      scrollContainerToElement(container, element, {
        block,
        scrollBehavior,
        scrollOffset,
      });
    } else {
      if (scrollOffset?.top != null || scrollOffset?.left != null) {
        const origScrollMargin = element.style.scrollMargin;
        const top = scrollOffset?.top ?? 0;
        const left = scrollOffset?.left ?? 0;
        element.style.scrollMargin = `${top}px 0 0 ${left}px`;
        element.scrollIntoView({ behavior: scrollBehavior, block });
        element.style.scrollMargin = origScrollMargin;
      } else {
        element.scrollIntoView({ behavior: scrollBehavior, block });
      }
    }

    // Apply shine effect
    let targetElement: HTMLElement | null = null;
    const formControl =
      element.closest(".bl-form-control, [class*='bl-']") || element;
    targetElement = formControl instanceof HTMLElement ? formControl : element;

    if (targetElement && shineClass && shineDuration > 0) {
      targetElement.classList.add(shineClass);
      const t = setTimeout(() => {
        targetElement?.classList.remove(shineClass);
      }, shineDuration);
      timeouts.push(t);
    }

    // Focus the first focusable element
    if (focus && element instanceof HTMLElement) {
      const focusableElement = findFocusable(element);
      if (focusableElement) {
        const t = setTimeout(() => {
          focusableElement.focus();
        }, focusDelay);
        timeouts.push(t);
      }
    }

    // Announce to screen reader
    if (announceOpt) {
      const message =
        typeof announceOpt === "string"
          ? announceOpt
          : DEFAULT_ANNOUNCE_MESSAGE;
      announceToScreenReader(message);
    }

    return { success: true };
  };

  return {
    scrollToError,
  };
};
