export interface StepperProps {
  currentStep?: number;
  steps?: Array<{ label: string; completed?: boolean; disabled?: boolean }>;
  orientation?: string;
  showLabels?: boolean;
}
