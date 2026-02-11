# useStepper

A composable for multi-step flow state. Use with BvStepper for wizards and form flows.

## Basic Usage

```vue
<template>
  <div>
    <BvStepper v-model:current-step="currentStep" :steps="steps" />
    <div>
      <BvButton v-if="!isFirst" @click="prev">Previous</BvButton>
      <BvButton v-if="!isLast" @click="next">Next</BvButton>
    </div>
  </div>
</template>

<script setup>
import { BvButton, BvStepper } from "@baklavue/ui";
import { useStepper } from "@baklavue/composables";

const {
  currentStep,
  steps,
  next,
  prev,
  isFirst,
  isLast,
} = useStepper({
  steps: [
    { label: "Details" },
    { label: "Review" },
    { label: "Confirm" },
  ],
});
</script>
```

## With Step Validation

```vue
<script setup>
import { useStepper } from "@baklavue/composables";

const {
  currentStep,
  steps,
  next,
  setStepError,
} = useStepper({
  steps: [
    { label: "Details" },
    { label: "Review" },
  ],
});

const validateAndNext = () => {
  const valid = validateCurrentStep();
  if (!valid) {
    setStepError(currentStep.value, true);
  } else {
    setStepError(currentStep.value, false);
    next();
  }
};
</script>
```

## API

### Return Value

| Property | Type | Description |
| --- | --- | --- |
| `currentStep` | `Ref<number>` | Current step index (0-based) |
| `steps` | `Ref<StepperStep[]>` | Step configurations |
| `next` | `() => void` | Go to next step |
| `prev` | `() => void` | Go to previous step |
| `goTo` | `(index: number) => void` | Go to specific step |
| `setStepError` | `(index: number, hasError: boolean) => void` | Set error state for step |
| `isFirst` | `ComputedRef<boolean>` | True on first step |
| `isLast` | `ComputedRef<boolean>` | True on last step |
| `canGoNext` | `ComputedRef<boolean>` | True if can advance |
| `canGoPrev` | `ComputedRef<boolean>` | True if can go back |
| `stepVariant` | `(index: number) => StepVariant` | Get variant for step (default, active, success, error) |
| `totalSteps` | `ComputedRef<number>` | Total number of steps |

### Options

```typescript
interface UseStepperOptions {
  steps: StepperStep[];
  initialStep?: number; // default: 0
}

interface StepperStep {
  label: string;
  description?: string;
  completed?: boolean;
  error?: boolean;
  disabled?: boolean;
}
```

## TypeScript Support

```typescript
import {
  useStepper,
  type UseStepperOptions,
  type StepperStep,
} from "@baklavue/composables";

const { currentStep, next } = useStepper({
  steps: [{ label: "Step 1" }, { label: "Step 2" }],
});
```
