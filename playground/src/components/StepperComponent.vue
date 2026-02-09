<script setup lang="ts">
import { BvStepper } from '@baklavue/ui'
import { ref } from 'vue'

const emit = defineEmits<{
  logEvent: [message: string]
}>()

const currentStep1 = ref(1)
const currentStep2 = ref(2)

const steps1 = [
  { label: 'Step 1', completed: true },
  { label: 'Step 2', completed: false },
  { label: 'Step 3', completed: false },
]

const steps2 = [
  { label: 'First', completed: true },
  { label: 'Second', completed: true },
  { label: 'Third', completed: false },
  { label: 'Fourth', completed: false },
]

const handleStepChange = (id: string, step: number) => {
  emit('logEvent', `Stepper "${id}" changed to step ${step}`)
  if (id === 'stepper1') currentStep1.value = step
  if (id === 'stepper2') currentStep2.value = step
}
</script>

<template>
  <section class="component-demo">
    <h2>Stepper Component</h2>

    <div class="stepper-category">
      <h3>Stepper Examples</h3>
      <div class="stepper-list">
        <div class="stepper-item">
          <BvStepper
            v-model:currentStep="currentStep1"
            :steps="steps1"
            @step-change="(e) => handleStepChange('stepper1', (e.target as any)?.currentStep || currentStep1)"
          />
        </div>
        <div class="stepper-item">
          <BvStepper
            v-model:currentStep="currentStep2"
            :steps="steps2"
            orientation="vertical"
            @step-change="(e) => handleStepChange('stepper2', (e.target as any)?.currentStep || currentStep2)"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="css" scoped>
.component-demo {
  margin-bottom: 2rem;
  padding: 1.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  background: #ffffff;
  box-shadow:
    0 1px 3px 0 rgba(0, 0, 0, 0.1),
    0 1px 2px 0 rgba(0, 0, 0, 0.06);
}

.component-demo h2 {
  margin-bottom: 1.5rem;
  color: #111827;
  font-size: 1.5rem;
  font-weight: 600;
  border-bottom: 2px solid #f3f4f6;
  padding-bottom: 0.75rem;
}

.stepper-category {
  margin-bottom: 2rem;
  padding: 1.25rem;
  border: 1px solid #f3f4f6;
  border-radius: 8px;
  background: #fafafa;
}

.stepper-category h3 {
  margin-bottom: 1rem;
  color: #374151;
  font-size: 1.125rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.stepper-list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.stepper-item {
  width: 100%;
}
</style>
