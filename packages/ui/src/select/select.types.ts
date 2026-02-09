export interface SelectProps {
  modelValue?: string | string[] | null;
  options?: Array<{ value: string; label: string; disabled?: boolean }>;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  multiple?: boolean;
  size?: string;
}
