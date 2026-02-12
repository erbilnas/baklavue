import type { BaklavaIcon } from "@trendyol/baklava-icons";

/**
 * Props for the Icon component.
 * Wraps Baklava's bl-icon web component with Vue-friendly props.
 */
export interface IconProps {
  /**
   * Icon name from Baklava icons set.
   * @see https://baklava.trendyol.com for available icons.
   */
  name?: BaklavaIcon;

  /**
   * Icon size as a CSS value (e.g. `"24px"`, `"1.5rem"`).
   * Maps to the `font-size` CSS property on bl-icon.
   */
  size?: string;

  /**
   * Icon color as a CSS value (e.g. `"#0066cc"`, `"red"`, `"currentColor"`).
   * Maps to the `color` CSS property on bl-icon.
   */
  color?: string;
}
