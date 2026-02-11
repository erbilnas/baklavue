import type { BaklavaIcon } from "@trendyol/baklava-icons";
import type {
  ButtonKind,
  ButtonSize,
  ButtonVariant,
} from "@trendyol/baklava/dist/components/button/bl-button";

/**
 * Properties for a dropdown item when used in items mode.
 *
 * @interface DropdownItem
 */
export interface DropdownItem {
  /**
   * The caption text displayed for the item.
   */
  caption?: string;

  /**
   * Icon name for the item. Shows icon with bl-icon component.
   */
  icon?: BaklavaIcon;

  /**
   * Whether the item is disabled.
   *
   * @default false
   */
  disabled?: boolean;

  /**
   * Optional group caption. Items with the same groupCaption are rendered
   * inside a bl-dropdown-group with that caption.
   */
  groupCaption?: string;

  /**
   * Additional custom data for use in the #item scoped slot.
   */
  [key: string]: unknown;
}

/**
 * Props for the Dropdown component.
 *
 * When `items` prop is provided, the component acts in items mode using
 * bl-dropdown-group and bl-dropdown-item. Otherwise, it uses slots for
 * trigger and content.
 *
 * @interface DropdownProps
 */
export interface DropdownProps {
  /**
   * Whether the dropdown is open.
   *
   * @default false
   */
  open?: boolean;

  /**
   * Placement of the dropdown popover relative to the trigger.
   * Maps to bl-popover placement.
   */
  placement?: string;

  /**
   * Whether the dropdown trigger is disabled.
   *
   * @default false
   */
  disabled?: boolean;

  /**
   * Reserved for custom trigger configuration.
   */
  trigger?: string;

  /**
   * Label for the built-in dropdown button.
   * Used when in items mode or when not using trigger slot.
   */
  label?: string;

  /**
   * Button variant for the built-in dropdown button.
   */
  variant?: ButtonVariant;

  /**
   * Button kind for the built-in dropdown button.
   */
  kind?: ButtonKind;

  /**
   * Button size for the built-in dropdown button.
   */
  size?: ButtonSize;

  /**
   * Icon name for the built-in dropdown button.
   */
  icon?: string;

  /**
   * Array of dropdown items to render when in items mode.
   * Each item will be rendered as a bl-dropdown-item (optionally grouped
   * via bl-dropdown-group). Content for each item is provided via the #item slot.
   */
  items?: DropdownItem[];
}
