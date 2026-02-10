import type { BaklavaIcon } from "@trendyol/baklava-icons";

/**
 * Properties for a single accordion item when used in group mode.
 *
 * @interface AccordionItem
 */
export interface AccordionItem {
  /**
   * Whether the accordion is open/expanded.
   *
   * @default false
   */
  open?: boolean;

  /**
   * The caption text displayed in the accordion header.
   */
  caption?: string;

  /**
   * Icon configuration for the accordion header.
   * Can be a boolean to show/hide default icon, or a specific BaklavaIcon.
   */
  icon?: boolean | BaklavaIcon;

  /**
   * Whether the accordion is disabled.
   *
   * @default false
   */
  disabled?: boolean;

  /**
   * Duration of the expand/collapse animation in milliseconds.
   *
   * @default 250
   */
  animationDuration?: number;

  /**
   * Additional custom data for use in the #item scoped slot.
   * Content is provided via the #item slot, not via a property.
   */
  [key: string]: unknown;
}

/**
 * Props for the Accordion component.
 *
 * When `multiple` prop is provided, the component acts as an accordion group wrapper.
 * Otherwise, it acts as a single accordion.
 *
 * @interface AccordionProps
 */
export interface AccordionProps {
  /**
   * Whether the accordion is open/expanded.
   * Only used when component is in single accordion mode.
   *
   * @default false
   */
  open?: boolean;

  /**
   * The caption text displayed in the accordion header.
   * Only used when component is in single accordion mode.
   */
  caption?: string;

  /**
   * Icon configuration for the accordion header.
   * Can be a boolean to show/hide default icon, or a specific BaklavaIcon.
   * Only used when component is in single accordion mode.
   */
  icon?: boolean | BaklavaIcon;

  /**
   * Whether the accordion is disabled.
   * Only used when component is in single accordion mode.
   *
   * @default false
   */
  disabled?: boolean;

  /**
   * Duration of the expand/collapse animation in milliseconds.
   * Only used when component is in single accordion mode.
   *
   * @default 250
   */
  animationDuration?: number;

  /**
   * Allow multiple accordions to be open at once.
   * When this prop is provided, the component acts as an accordion group wrapper.
   * When not provided, the component acts as a single accordion.
   *
   * @default false (when used as group)
   */
  multiple?: boolean;

  /**
   * Array of accordion items to render when in group mode.
   * Each item will be rendered as a bl-accordion element.
   * Only used when component is in group mode.
   */
  items?: AccordionItem[];
}
