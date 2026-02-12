/** Textarea size */
export type TextareaSize = "small" | "medium" | "large";

export interface TextareaProps {
  /** Textarea value (use with v-model) */
  modelValue?: string | null;
  /** Label text */
  label?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Number of visible rows */
  rows?: number;
  /** Maximum character length */
  maxlength?: number;
  /** Minimum character length */
  minlength?: number;
  /** Disabled state */
  disabled?: boolean;
  /** Required field */
  required?: boolean;
  /** Readonly state */
  readonly?: boolean;
  /** Help text below the textarea */
  helpText?: string;
  /** Custom error/invalid message */
  invalidText?: string;
  /** Enable character counter */
  characterCounter?: boolean;
  /** Enable auto-expand up to maxRows */
  expand?: boolean;
  /** Max rows when expand is true */
  maxRows?: number;
  /** Textarea size */
  size?: TextareaSize;
  /** Name attribute for forms */
  name?: string;
}
