/**
 * Props for the Switch component.
 */
export interface SwitchProps {
  /** Checked state. Use with v-model:checked */
  checked?: boolean;
  /** Whether the switch is disabled */
  disabled?: boolean;
  /** Label for the switch */
  label?: string;
  /** Switch size (small, medium, large) */
  size?: string;
}
