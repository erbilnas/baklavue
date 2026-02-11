# Stepper

A Vue wrapper for Baklava's `bl-stepper` web component for step indicators. Displays progress through a sequence of steps. Use the `steps` prop for declarative configuration or the default slot for custom step content.

## Basic Usage

<div class="component-demo">

<StepperBasicDemo />

</div>

```vue
<template>
  <div>
    <p>Current step: {{ currentStep + 1 }}</p>
    <BvStepper v-model:current-step="currentStep" :steps="steps" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { BvStepper } from "@baklavue/ui";

const currentStep = ref(0);
const steps = [{ label: "Step 1" }, { label: "Step 2" }, { label: "Step 3" }];
</script>
```

## With Steps Prop

Use the `steps` prop with objects to define labels, completed state, and disabled state for each step.

<div class="component-demo">

<StepperWithStepsDemo />

</div>

```vue
<template>
  <BvStepper v-model:current-step="currentStep" :steps="steps" />
</template>

<script setup>
import { ref } from "vue";
import { BvStepper } from "@baklavue/ui";

const currentStep = ref(1);
const steps = [
  { label: "Account", completed: true },
  { label: "Profile", completed: false },
  { label: "Preferences", completed: false },
  { label: "Review", completed: false },
];
</script>
```

## With Descriptions

Add optional descriptions to each step for additional context.

<div class="component-demo">

<StepperDescriptionDemo />

</div>

```vue
<template>
  <BvStepper v-model:current-step="currentStep" :steps="steps" />
</template>

<script setup>
import { ref } from "vue";
import { BvStepper } from "@baklavue/ui";

const currentStep = ref(1);
const steps = [
  { label: "Account", description: "Create your account" },
  { label: "Profile", description: "Add your details" },
  { label: "Preferences", description: "Set your preferences" },
  { label: "Review", description: "Review and submit" },
];
</script>
```

## Disabled Steps

Disable specific steps to prevent users from navigating to them. Disabled steps are not clickable.

<div class="component-demo">

<StepperDisabledDemo />

</div>

```vue
<template>
  <BvStepper v-model:current-step="currentStep" :steps="steps" />
</template>

<script setup>
import { ref } from "vue";
import { BvStepper } from "@baklavue/ui";

const currentStep = ref(1);
const steps = [
  { label: "Step 1" },
  { label: "Step 2", disabled: true },
  { label: "Step 3" },
  { label: "Step 4", disabled: true },
];
</script>
```

## Error State

Mark a step with an error state to indicate validation failures or issues that need attention.

<div class="component-demo">

<StepperErrorDemo />

</div>

```vue
<template>
  <BvStepper v-model:current-step="currentStep" :steps="steps" />
</template>

<script setup>
import { ref } from "vue";
import { BvStepper } from "@baklavue/ui";

const currentStep = ref(1);
const steps = [
  { label: "Account", description: "Account created" },
  { label: "Validation", description: "Please fix errors", error: true },
  { label: "Review", description: "Final review" },
];
</script>
```

## Without Labels

Hide step labels to show only the step indicators (dots). Useful for compact layouts.

<div class="component-demo">

<StepperNoLabelsDemo />

</div>

```vue
<template>
  <BvStepper v-model:current-step="currentStep" :steps="steps" :show-labels="false" />
</template>

<script setup>
import { ref } from "vue";
import { BvStepper } from "@baklavue/ui";

const currentStep = ref(1);
const steps = [
  { label: "Step 1" },
  { label: "Step 2" },
  { label: "Step 3" },
  { label: "Step 4" },
];
</script>
```

## Step Change Event

Listen to the `step-change` event to react when the user selects a different step.

<div class="component-demo">

<StepperChangeEventDemo />

</div>

```vue
<template>
  <BvStepper
    v-model:current-step="currentStep"
    :steps="steps"
    @step-change="onStepChange"
  />
</template>

<script setup>
import { ref } from "vue";
import { BvStepper } from "@baklavue/ui";

const currentStep = ref(0);
const steps = [{ label: "Step 1" }, { label: "Step 2" }, { label: "Step 3" }];

const onStepChange = (event) => {
  const { activeStep, totalSteps } = event.detail || {};
  console.log(`Step ${activeStep + 1} of ${totalSteps} selected`);
};
</script>
```

## Form Wizard

Use the stepper with Back/Next buttons for a multi-step form or wizard flow.

<div class="component-demo">

<StepperFormWizardDemo />

</div>

```vue
<template>
  <div>
    <BvStepper v-model:current-step="currentStep" :steps="steps" />
    <div style="margin-top: 1.5rem;">
      <!-- Step content here -->
      <BvButton variant="tertiary" :disabled="currentStep === 0" @click="goBack">
        Back
      </BvButton>
      <BvButton variant="primary" @click="goNext">
        {{ currentStep === steps.length - 1 ? "Submit" : "Next" }}
      </BvButton>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { BvButton, BvStepper } from "@baklavue/ui";

const currentStep = ref(0);
const steps = [
  { label: "Personal", description: "Your details" },
  { label: "Address", description: "Where you live" },
  { label: "Confirm", description: "Review & submit" },
];

const goNext = () => {
  if (currentStep.value < steps.length - 1) currentStep.value++;
};

const goBack = () => {
  if (currentStep.value > 0) currentStep.value--;
};
</script>
```

## Orientation

Control the stepper layout with the `orientation` prop.

<div class="component-demo">

<StepperOrientationDemo />

</div>

```vue
<template>
  <div>
    <BvStepper
      v-model:current-step="currentStep"
      :steps="steps"
      orientation="horizontal"
    />
    <BvStepper
      v-model:current-step="currentStep"
      :steps="steps"
      orientation="vertical"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { BvStepper } from "@baklavue/ui";

const currentStep = ref(0);
const steps = [{ label: "Step 1" }, { label: "Step 2" }, { label: "Step 3" }];
</script>
```

## Props

| Prop          | Type                                                            | Default     | Description                                       |
| ------------- | --------------------------------------------------------------- | ----------- | ------------------------------------------------- |
| `currentStep` | `number`                                                        | `undefined` | Current step index (use with v-model:currentStep) |
| `steps`       | `Array<{ label, description?, completed?, error?, disabled? }>` | `undefined` | Array of step configurations                      |
| `orientation` | `string`                                                        | `undefined` | Layout direction (`horizontal`, `vertical`)       |
| `showLabels`  | `boolean`                                                       | `undefined` | Whether to show step labels                       |

## Events

| Event                | Payload       | Description                                     |
| -------------------- | ------------- | ----------------------------------------------- |
| `update:currentStep` | `number`      | Emitted when the current step changes (v-model) |
| `step-change`        | `CustomEvent` | Emitted when the user selects a different step  |

## Slots

| Slot      | Description                                           |
| --------- | ----------------------------------------------------- |
| `default` | Custom step content (use when not using `steps` prop) |

## Types

```typescript
import type { StepperProps } from "@baklavue/ui";

interface StepperStep {
  label: string;
  description?: string;
  completed?: boolean;
  error?: boolean;
  disabled?: boolean;
}

interface StepperProps {
  currentStep?: number;
  steps?: StepperStep[];
  orientation?: string;
  showLabels?: boolean;
}
```

## Usage Notes

- **v-model:currentStep**: Use `v-model:current-step` for two-way binding of the current step index.
- **Steps vs Slot**: When using the `steps` prop, steps are rendered as `bl-stepper-item` elements. Use the default slot for fully custom step markup.
- **Orientation**: The `orientation` prop maps to Baklava's `direction` attribute (`horizontal` | `vertical`).
- **Accessibility**: The component follows Baklava's accessibility guidelines for step navigation.
