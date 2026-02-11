# useStepperForm

A composable for multi-step form flows with per-step validation. Use with [useStepper](/composables/stepper) and [useZodForm](/composables/formValidation) to validate before advancing to the next step.

## Basic Usage

```vue
<script setup lang="ts">
import { useStepper, useStepperForm } from "@baklavue/composables";
import { useZodForm } from "@baklavue/composables";
import { ref } from "vue";
import { z } from "zod";

const form = ref({ email: "", name: "", address: "" });
const schema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
  address: z.string().min(1),
});

const stepper = useStepper({
  steps: [{ label: "Contact" }, { label: "Address" }],
});

const formValidation = useZodForm(schema, form);
const { nextWithValidation, hasStepError } = useStepperForm(stepper, {
  stepFields: (i) => (i === 0 ? ["email", "name"] : ["address"]),
});

const onNext = () => nextWithValidation(formValidation.validate);
</script>

<template>
  <BvStepper v-model:current-step="stepper.currentStep" :steps="stepper.steps" />
  <form @submit.prevent="onNext">
    <!-- Step 0: email, name -->
    <template v-if="stepper.currentStep.value === 0">
      <BvInput v-model="form.email" :invalid-text="formValidation.getError('email')" />
      <BvInput v-model="form.name" :invalid-text="formValidation.getError('name')" />
    </template>
    <!-- Step 1: address -->
    <template v-else>
      <BvInput v-model="form.address" :invalid-text="formValidation.getError('address')" />
    </template>
    <BvButton type="submit">Next</BvButton>
  </form>
</template>
```

## API

### Parameters

```typescript
useStepperForm(stepper, options?)
```

| Parameter | Type | Description |
| --- | --- | --- |
| `stepper` | `StepperLike` | Return value from useStepper |
| `options` | `UseStepperFormOptions` | Optional: `{ stepFields?: (stepIndex) => string[] }` |

### Return Value

| Property | Type | Description |
| --- | --- | --- |
| `hasStepError` | `() => boolean` | Whether the current step has validation errors |
| `nextWithValidation` | `(validate: () => Promise<FormErrors \| null>) => Promise<boolean>` | Validates, advances if valid, sets step error if invalid. Returns `true` if advanced |

### stepFields

When provided, `stepFields(stepIndex)` returns the field paths for that step. Validation errors are filtered to these paths to determine if the current step has errors. If omitted, any validation error marks the current step as having an error.

This is useful when you have a single schema for the whole form but want to show step-specific error indicators on the stepper.
