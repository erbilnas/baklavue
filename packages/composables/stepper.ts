import { computed, ref } from "vue";

/**
 * Step configuration for useStepper. Aligns with BvStepper's StepperStep.
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

export interface UseStepperOptions {
  /** Array of step configurations */
  steps: StepperStep[];
  /** Initial step index (0-based). Default: 0 */
  initialStep?: number;
}

export type StepVariant = "default" | "active" | "success" | "error";

/**
 * Composable for multi-step flow state. Use with BvStepper for wizards and form flows.
 *
 * @example
 * ```ts
 * const { currentStep, steps, next, prev, isFirst, isLast, stepVariant } = useStepper({
 *   steps: [
 *     { label: "Details" },
 *     { label: "Review" },
 *     { label: "Confirm" },
 *   ],
 * });
 *
 * <BvStepper v-model:current-step="currentStep" :steps="steps" />
 * ```
 *
 * @param options - Options: steps, initialStep
 * @returns Object with currentStep, steps, next, prev, goTo, setStepError, isFirst, isLast, canGoNext, canGoPrev, stepVariant
 */
export function useStepper(options: UseStepperOptions) {
  const { steps: initialSteps, initialStep = 0 } = options;
  const currentStep = ref(initialStep);
  const steps = ref<StepperStep[]>([...initialSteps]);

  const totalSteps = computed(() => steps.value.length);
  const isFirst = computed(() => currentStep.value <= 0);
  const isLast = computed(() => currentStep.value >= totalSteps.value - 1);

  const canGoNext = computed(() => {
    if (currentStep.value >= totalSteps.value - 1) return false;
    const nextStep = steps.value[currentStep.value + 1];
    return !nextStep?.disabled;
  });

  const canGoPrev = computed(() => {
    if (currentStep.value <= 0) return false;
    const prevStep = steps.value[currentStep.value - 1];
    return !prevStep?.disabled;
  });

  const next = () => {
    if (canGoNext.value) {
      currentStep.value = Math.min(currentStep.value + 1, totalSteps.value - 1);
    }
  };

  const prev = () => {
    if (canGoPrev.value) {
      currentStep.value = Math.max(currentStep.value - 1, 0);
    }
  };

  const goTo = (index: number) => {
    const i = Math.max(0, Math.min(index, totalSteps.value - 1));
    if (!steps.value[i]?.disabled) {
      currentStep.value = i;
    }
  };

  const setStepError = (index: number, hasError: boolean) => {
    const s = steps.value[index];
    if (s) {
      steps.value = steps.value.map((step, i) =>
        i === index ? { ...step, error: hasError } : step,
      );
    }
  };

  const stepVariant = (index: number): StepVariant => {
    const current = currentStep.value;
    const step = steps.value[index];
    if (step?.error) return "error";
    if (index < current) return "success";
    if (index === current) return "active";
    return "default";
  };

  return {
    currentStep,
    steps,
    next,
    prev,
    goTo,
    setStepError,
    isFirst,
    isLast,
    canGoNext,
    canGoPrev,
    stepVariant,
    totalSteps,
  };
}
