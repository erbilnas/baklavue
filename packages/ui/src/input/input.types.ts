import type { BaklavaIcon } from "@trendyol/baklava-icons";
import type {
  InputSize,
  InputType,
} from "@trendyol/baklava/dist/components/input/bl-input";

/**
 * Input mode hint for virtual keyboards.
 *
 * @typedef InputMode
 */
type InputMode =
  | "none"
  | "text"
  | "decimal"
  | "numeric"
  | "tel"
  | "search"
  | "email"
  | "url";

/**
 * Props for the Input component.
 *
 * A Vue UI kit component for Baklava's bl-input web component with full v-model support
 * and TypeScript types.
 *
 * @interface InputProps
 */
export interface InputProps {
  /**
   * Input value (v-model).
   */
  modelValue?: string | number | null;

  /**
   * Input name attribute for form submission.
   */
  name?: string;

  /**
   * Input type (text, email, password, number, date, time, etc.).
   *
   * @default "text"
   */
  type?: InputType;

  /**
   * Input label displayed above or beside the input.
   */
  label?: string;

  /**
   * Placeholder text when the input is empty.
   */
  placeholder?: string;

  /**
   * Whether the input is required for form validation.
   */
  required?: boolean;

  /**
   * Minimum character length for validation.
   */
  minlength?: number;

  /**
   * Maximum character length for validation.
   */
  maxlength?: number;

  /**
   * Minimum value for number/date inputs.
   */
  min?: number | string;

  /**
   * Maximum value for number/date inputs.
   */
  max?: number | string;

  /**
   * RegExp pattern for validation.
   */
  pattern?: string;

  /**
   * Step value for number inputs.
   */
  step?: number;

  /**
   * Autocomplete attribute for the input.
   */
  autocomplete?: string;

  /**
   * Input mode hint for virtual keyboards.
   */
  inputmode?: InputMode;

  /**
   * Whether the input should receive focus on mount.
   */
  autofocus?: boolean;

  /**
   * Baklava icon name to display in the input.
   */
  icon?: BaklavaIcon;

  /**
   * Input size (small, medium, large).
   *
   * @default "medium"
   */
  size?: InputSize;

  /**
   * Whether the input is disabled.
   */
  disabled?: boolean;

  /**
   * Whether the input is readonly.
   */
  readonly?: boolean;

  /**
   * Whether the label has fixed position.
   *
   * @default true
   */
  labelFixed?: boolean;

  /**
   * Error message text displayed when validation fails.
   */
  invalidText?: string;

  /**
   * Helper text displayed below the input.
   */
  helpText?: string;

  /**
   * Whether to show loading indicator.
   */
  loading?: boolean;

  /**
   * Suffix text displayed in the icon slot.
   */
  suffixText?: string;
}
