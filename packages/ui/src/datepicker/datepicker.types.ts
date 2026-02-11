import type { InputSize } from "@trendyol/baklava/dist/components/input/bl-input";

/**
 * Calendar selection type.
 * - single: One date selection
 * - multiple: Multiple dates selection
 * - range: Date range selection (start and end)
 */
export type DatepickerType = "single" | "multiple" | "range";

/**
 * Props for the BvDatepicker component.
 *
 * @see BvDatepicker
 */
export interface DatepickerProps {
  /** Selected date(s) (v-model). For single: ISO string. For multiple: string[]. For range: [start, end]. */
  modelValue?: string | string[] | [string, string] | null;
  /** Selection mode: single date, multiple dates, or date range */
  type?: DatepickerType;
  /** Datepicker input label */
  label?: string;
  /** Placeholder text when no date is selected */
  placeholder?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Minimum selectable date, ISO format YYYY-MM-DD */
  min?: string;
  /** Maximum selectable date, ISO format YYYY-MM-DD */
  max?: string;
  /** Required field for form validation */
  required?: boolean;
  /** Input size (small, medium, large) */
  size?: InputSize;
  /** Makes the label fixed positioned */
  labelFixed?: boolean;
  /** Help text displayed below the input */
  helpText?: string;
}
