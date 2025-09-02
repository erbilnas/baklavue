import type { BaklavaIcon } from "@trendyol/baklava-icons";
import type {
  InputSize,
  InputType,
} from "@trendyol/baklava/dist/components/input/bl-input";

type InputMode =
  | "none"
  | "text"
  | "decimal"
  | "numeric"
  | "tel"
  | "search"
  | "email"
  | "url";

export interface InputProps {
  modelValue?: string | number | null;
  name?: string;
  type?: InputType;
  label?: string;
  placeholder?: string;
  required?: boolean;
  minlength?: number;
  maxlength?: number;
  min?: number | string;
  max?: number | string;
  pattern?: string;
  step?: number;
  autocomplete?: string;
  inputmode?: InputMode;
  autofocus?: boolean;
  icon?: BaklavaIcon;
  size?: InputSize;
  disabled?: boolean;
  readonly?: boolean;
  labelFixed?: boolean;
  invalidText?: string;
  helpText?: string;
  loading?: boolean;
  suffixText?: string;
}
