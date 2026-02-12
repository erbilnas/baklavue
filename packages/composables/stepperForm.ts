import type { FormErrors } from "./formValidation";
import type { StepperStep } from "./stepper";
import type { Ref } from "vue";

export interface UseStepperFormOptions {
  /** Field paths per step index. Used to filter validation errors to the current step. */
  stepFields?: (stepIndex: number) => string[];
}

export interface UseStepperFormContext {
  /** Whether the current step has validation errors */
  hasStepError: () => boolean;
  /** Validate current step and advance only if valid */
  nextWithValidation: (
    validate: () => Promise<FormErrors | null>,
  ) => Promise<boolean>;
}

export type StepperLike = {
  currentStep: Ref<number>;
  steps: Ref<StepperStep[]>;
  next: () => void;
  setStepError: (index: number, hasError: boolean) => void;
};

/**
 * Composable for multi-step form flows with per-step validation.
 * Use with useStepper and useZodForm to validate before advancing.
 *
 * @example
 * ```ts
 * const stepper = useStepper({ steps: [{ label: 'Step 1' }, { label: 'Step 2' }] });
 * const form = useZodForm(schema, formData);
 * const { nextWithValidation, hasStepError } = useStepperForm(stepper, {
 *   stepFields: (i) => (i === 0 ? ['email', 'name'] : ['address']),
 * });
 *
 * const onNext = () => nextWithValidation(form.validate);
 * ```
 *
 * @param stepper - Return value from useStepper
 * @param options - Optional: stepFields to map step index to field paths
 * @returns nextWithValidation, hasStepError
 */
export function useStepperForm(
  stepper: StepperLike,
  options: UseStepperFormOptions = {},
): UseStepperFormContext {
  const { stepFields } = options;

  const hasStepError = (): boolean => {
    const idx = stepper.currentStep.value;
    const step = stepper.steps.value[idx];
    return !!step?.error;
  };

  const nextWithValidation = async (
    validate: () => Promise<FormErrors | null>,
  ): Promise<boolean> => {
    const idx = stepper.currentStep.value;
    const errors = await validate();
    if (!errors) {
      stepper.setStepError(idx, false);
      stepper.next();
      return true;
    }
    if (stepFields) {
      const paths = stepFields(idx);
      const stepErrors = paths.some((p) => p in errors);
      stepper.setStepError(idx, stepErrors);
    } else {
      stepper.setStepError(idx, true);
    }
    return false;
  };

  return {
    hasStepError,
    nextWithValidation,
  };
}
