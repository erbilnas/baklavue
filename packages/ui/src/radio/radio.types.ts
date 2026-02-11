/**
 * Properties for a single radio item when used in group mode.
 *
 * @interface RadioItem
 */
export interface RadioItem {
  /**
   * The value of the radio (used for v-model in group mode).
   */
  value: string | number;

  /**
   * The label text displayed next to the radio.
   */
  label?: string;

  /**
   * Whether the radio is disabled.
   *
   * @default false
   */
  disabled?: boolean;

  /**
   * The name attribute for the radio group.
   */
  name?: string;

  /**
   * Additional custom data for use in the #item scoped slot.
   */
  [key: string]: unknown;
}

/**
 * Props for the Radio component.
 *
 * When `items` prop is provided, the component acts as a radio group wrapper.
 * Otherwise, it acts as a single radio option.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/radio
 */
export interface RadioProps {
  /**
   * Selected value (single mode or group mode).
   * Use v-model for two-way binding.
   * - Single mode: used with value prop for comparison
   * - Group mode: the selected item's value
   */
  modelValue?: string | number;

  /**
   * This radio option's value. Used for v-model comparison and form submission.
   * Only used when component is in single radio mode.
   */
  value?: string | number;

  /**
   * Name attribute for the radio group. All radios in the same group must share the same name.
   * Only used when component is in single radio mode.
   */
  name?: string;

  /**
   * Label text displayed next to the radio. Can be overridden by the default slot.
   * Only used when component is in single radio mode.
   */
  label?: string;

  /**
   * Boolean to explicitly control checked state.
   * When provided, overrides modelValue === value logic.
   * Only used when component is in single radio mode.
   */
  checked?: boolean;

  /**
   * Whether the radio is disabled.
   * Only used when component is in single radio mode.
   */
  disabled?: boolean;

  /**
   * Whether the radio group is required (for form validation).
   * Used in group mode on bl-radio-group.
   */
  required?: boolean;

  /**
   * Array of radio items to render when in group mode.
   * Each item will be rendered as a bl-radio element inside bl-radio-group.
   * Only used when component is in group mode.
   */
  items?: RadioItem[];
}
