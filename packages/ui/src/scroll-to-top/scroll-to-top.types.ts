import type { ButtonSize, ButtonVariant } from "@trendyol/baklava/dist/components/button/bl-button";

/**
 * Position of the scroll-to-top button.
 */
export type ScrollToTopPosition =
  | "bottom-right"
  | "bottom-left"
  | "top-right"
  | "top-left";

export interface ScrollToTopProps {
  /**
   * Scroll threshold in pixels. Button becomes visible when user scrolls past this.
   * @default 300
   */
  threshold?: number;

  /**
   * Fixed position of the button.
   * @default "bottom-right"
   */
  position?: ScrollToTopPosition;

  /**
   * Accessible label for screen readers.
   * @default "Scroll to top"
   */
  label?: string;

  /**
   * Button size.
   * @default "medium"
   */
  size?: ButtonSize;

  /**
   * Button variant.
   * @default "primary"
   */
  variant?: ButtonVariant;
}
