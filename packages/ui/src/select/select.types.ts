/**
 * Size variants for the Select component.
 * @see {@link https://baklavastyle.trendyol.com/components/select | Baklava Select}
 */
export type SelectSize = "small" | "medium" | "large";

/**
 * Option shape for the Select component's `options` prop.
 * Each option can have a value, display label, and optional disabled state.
 */
export interface SelectOption {
  /** The value submitted with the form or bound via v-model */
  value: string;
  /** The label displayed to the user */
  label: string;
  /** Whether the option is disabled */
  disabled?: boolean;
}

/**
 * Props for the Select Vue wrapper component.
 * Wraps Baklava's `bl-select` web component with v-model support.
 */
export interface SelectProps {
  /** Selected value(s) - use with v-model. Single value or array when multiple. */
  modelValue?: string | string[] | null;
  /** Array of options for programmatic option rendering. Alternative to default slot. */
  options?: SelectOption[];
  /** Label displayed above or as placeholder for the select */
  label?: string;
  /** Placeholder text when no value is selected */
  placeholder?: string;
  /** Select name attribute for form submission */
  name?: string;
  /** Whether the select is required (shows error state when empty) */
  required?: boolean;
  /** Whether the select is disabled */
  disabled?: boolean;
  /** Whether multiple options can be selected */
  multiple?: boolean;
  /** Size of the select: small, medium, or large */
  size?: SelectSize;
  /** Whether the selected value can be cleared */
  clearable?: boolean;
  /** Help text displayed below the select */
  helpText?: string;
  /** Custom error message for validation */
  customInvalidText?: string;
  /** Enable search/filter for options in the dropdown */
  searchBar?: boolean;
  /** Placeholder text for the search input */
  searchBarPlaceholder?: string;
}
