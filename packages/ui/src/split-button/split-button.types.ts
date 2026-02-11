import type { BaklavaIcon } from "@trendyol/baklava-icons";

/**
 * Props for the SplitButton component.
 */
export interface SplitButtonProps {
  /** Button variant (primary, secondary) */
  variant?: string;
  /** Button size (small, medium, large) */
  size?: string;
  /** Whether the main button is disabled */
  disabled?: boolean;
  /** Loading state of the main button */
  loading?: boolean;
  /** Button label */
  label?: string;
  /** Icon name for the main button */
  icon?: BaklavaIcon;
}
