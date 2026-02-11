/**
 * Properties for a single checkbox item when used in group mode.
 *
 * @interface CheckboxItem
 */
export interface CheckboxItem {
  /**
   * The value of the checkbox (used for v-model in group mode).
   */
  value: string | number;

  /**
   * The label text displayed next to the checkbox.
   */
  label?: string;

  /**
   * Whether the checkbox is checked.
   *
   * @default false
   */
  checked?: boolean;

  /**
   * Whether the checkbox is disabled.
   *
   * @default false
   */
  disabled?: boolean;

  /**
   * Whether the checkbox is in indeterminate state.
   *
   * @default false
   */
  indeterminate?: boolean;

  /**
   * The name attribute for the checkbox.
   */
  name?: string;

  /**
   * Additional custom data for use in the #item scoped slot.
   */
  [key: string]: unknown;
}

/**
 * Props for the Checkbox component.
 *
 * When `items` prop is provided, the component acts as a checkbox group container.
 * Otherwise, it acts as a single checkbox.
 *
 * @interface CheckboxProps
 */
export interface CheckboxProps {
  /**
   * Checked state (single mode) or selected values array (group mode).
   * Use v-model for two-way binding.
   * - Single mode: boolean
   * - Group mode: (string | number)[]
   */
  modelValue?: boolean | (string | number)[];

  /**
   * Whether the checkbox is disabled.
   * Only used when component is in single checkbox mode.
   *
   * @default false
   */
  disabled?: boolean;

  /**
   * Whether the checkbox is in indeterminate state.
   * Only used when component is in single checkbox mode.
   *
   * @default false
   */
  indeterminate?: boolean;

  /**
   * The value of the checkbox (for form submission).
   * Only used when component is in single checkbox mode.
   */
  value?: string | number;

  /**
   * The name attribute for the checkbox.
   * Only used when component is in single checkbox mode.
   */
  name?: string;

  /**
   * The label text displayed next to the checkbox.
   * Only used when component is in single checkbox mode.
   * Can be overridden by default slot content.
   */
  label?: string;

  /**
   * Array of checkbox items to render when in group mode.
   * Each item will be rendered as a bl-checkbox element inside bl-checkbox-group.
   * Only used when component is in group mode.
   */
  items?: CheckboxItem[];

}
