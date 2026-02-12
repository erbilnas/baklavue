/**
 * Configuration for a single step in the stepper.
 */
export interface StepperStep {
  /** Step label */
  label: string;
  /** Optional step description */
  description?: string;
  /** Whether the step is completed */
  completed?: boolean;
  /** Whether the step has an error state */
  error?: boolean;
  /** Whether the step is disabled */
  disabled?: boolean;
}

/**
 * Props for the Stepper component.
 */
export interface StepperProps {
  /** Current step index (0-based). Use with v-model:currentStep */
  currentStep?: number;
  /** Array of step configurations */
  steps?: StepperStep[];
  /** Layout direction (horizontal, vertical) */
  orientation?: string;
  /** Whether to show step labels */
  showLabels?: boolean;
}
