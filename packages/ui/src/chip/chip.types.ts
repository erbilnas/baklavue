/**
 * Chip color variant.
 */
export type ChipColor =
  | "primary"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "neutral";

/**
 * Chip size variant.
 */
export type ChipSize = "xs" | "sm" | "md" | "lg";

/**
 * Chip position relative to wrapped element.
 */
export type ChipPosition =
  | "top-right"
  | "bottom-right"
  | "top-left"
  | "bottom-left";

/**
 * Props for the Chip component.
 */
export interface ChipProps {
  /**
   * Display text or number inside the chip.
   */
  text?: string | number;

  /**
   * Color variant.
   *
   * @default "primary"
   */
  color?: ChipColor;

  /**
   * Size variant.
   *
   * @default "md"
   */
  size?: ChipSize;

  /**
   * Position of the chip relative to the wrapped element.
   *
   * @default "top-right"
   */
  position?: ChipPosition;

  /**
   * When true, keep the chip inside the component for rounded elements (e.g. avatar).
   *
   * @default false
   */
  inset?: boolean;

  /**
   * When true, render the chip inline without wrapping content.
   * Use with inset for standalone badges.
   *
   * @default false
   */
  standalone?: boolean;

  /**
   * When false, hide the chip.
   *
   * @default true
   */
  show?: boolean;
}
