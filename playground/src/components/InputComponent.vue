<script setup lang="ts">
import { BvInput } from '@baklavue/ui'
import type { InputType } from '@trendyol/baklava/dist/components/input/bl-input'
import { ref } from 'vue'

const inputValue = ref('')
const emailValue = ref('')
const passwordValue = ref('')
const numberValue = ref('')
const searchValue = ref('')
const requiredValue = ref('')
const disabledValue = ref('Disabled Input')
const readonlyValue = ref('Read-only Input')

// Additional refs for features
const helpTextValue = ref('')
const suffixValue = ref('')
const loadingValue = ref('')
const maxLengthValue = ref('')

// Additional refs for sizes
const smallValue = ref('Small')
const mediumValue = ref('Medium')
const largeValue = ref('Large')

const emit = defineEmits<{
  logEvent: [message: string]
}>()

// Input types examples
const inputTypes = [
  { type: 'text' as const, label: 'Text Input', value: inputValue, placeholder: 'Enter text...' },
  {
    type: 'email' as const,
    label: 'Email Input',
    value: emailValue,
    placeholder: 'Enter email...',
  },
  {
    type: 'password' as const,
    label: 'Password Input',
    value: passwordValue,
    placeholder: 'Enter password...',
  },
  {
    type: 'number' as const,
    label: 'Number Input',
    value: numberValue,
    placeholder: 'Enter number...',
    min: 0,
    max: 100,
  },
  { type: 'search' as const, label: 'Search Input', value: searchValue, placeholder: 'Search...' },
]

// Input sizes
const inputSizes = [
  { size: 'small' as const, label: 'Small Input', value: smallValue },
  { size: 'medium' as const, label: 'Medium Input', value: mediumValue },
  { size: 'large' as const, label: 'Large Input', value: largeValue },
]

// Input states
const inputStates = [
  {
    label: 'Required Input',
    value: requiredValue,
    required: true,
    invalidText: 'This field is required',
    placeholder: 'Required field...',
  },
  {
    label: 'Disabled Input',
    value: disabledValue,
    disabled: true,
  },
  {
    label: 'Read-only Input',
    value: readonlyValue,
    readonly: true,
  },
]

// Input with features
const inputFeatures = [
  {
    label: 'Input with Help Text',
    value: helpTextValue,
    helpText: 'This is helpful information about the input field',
    placeholder: 'Type something...',
  },
  {
    label: 'Input with Suffix',
    value: suffixValue,
    suffixText: '$',
    placeholder: 'Enter amount...',
  },
  {
    label: 'Input with Loading',
    value: loadingValue,
    loading: true,
    placeholder: 'Loading state...',
    type: 'search',
  },
  {
    label: 'Input with Max Length',
    value: maxLengthValue,
    maxlength: 20,
    placeholder: 'Max 20 characters...',
  },
]
</script>

<template>
  <section class="component-demo">
    <h2>Input Component</h2>

    <!-- Input Types Section -->
    <div class="input-category">
      <h3>Types</h3>
      <div class="input-grid">
        <div v-for="input in inputTypes" :key="input.label" class="input-item">
          <label class="input-label">{{ input.label }}</label>
          <BvInput
            v-model="input.value.value"
            :type="input.type"
            :placeholder="input.placeholder"
            :min="input.min"
            :max="input.max"
            @focus="() => emit('logEvent', `${input.label} focused`)"
            @blur="() => emit('logEvent', `${input.label} blurred`)"
          />
          <div class="input-value">Value: {{ input.value }}</div>
        </div>
      </div>
    </div>

    <!-- Input Sizes Section -->
    <div class="input-category">
      <h3>Sizes</h3>
      <div class="input-grid">
        <div v-for="input in inputSizes" :key="input.label" class="input-item">
          <label class="input-label">{{ input.label }}</label>
          <BvInput v-model="input.value.value" :size="input.size" placeholder="Size example..." />
        </div>
      </div>
    </div>

    <!-- Input States Section -->
    <div class="input-category">
      <h3>States</h3>
      <div class="input-grid">
        <div v-for="input in inputStates" :key="input.label" class="input-item">
          <label class="input-label">{{ input.label }}</label>
          <BvInput
            v-model="input.value.value"
            :required="input.required"
            :disabled="input.disabled"
            :readonly="input.readonly"
            :invalid-text="input.invalidText"
            :placeholder="input.placeholder"
          />
        </div>
      </div>
    </div>

    <!-- Input Features Section -->
    <div class="input-category">
      <h3>Features</h3>
      <div class="input-grid">
        <div v-for="input in inputFeatures" :key="input.label" class="input-item">
          <label class="input-label">{{ input.label }}</label>
          <BvInput
            v-model="input.value.value"
            :help-text="input.helpText"
            :suffix-text="input.suffixText"
            :loading="input.loading"
            :maxlength="input.maxlength"
            :placeholder="input.placeholder"
            :type="input.type as InputType"
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

.input-category {
  margin-bottom: 2rem;
  padding: 1.25rem;
  border: 1px solid #f3f4f6;
  border-radius: 8px;
  background: #fafafa;
}

.input-category:last-child {
  margin-bottom: 0;
}

.input-category h3 {
  margin-bottom: 1rem;
  color: #374151;
  font-size: 1.125rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.input-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.input-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.input-label {
  color: #374151;
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 0.25rem;
}

.input-value {
  color: #6b7280;
  font-size: 0.75rem;
  font-weight: 500;
  background: #f9fafb;
  padding: 0.375rem 0.5rem;
  border-radius: 4px;
  border: 1px solid #e5e7eb;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
}

@media (max-width: 768px) {
  .input-grid {
    grid-template-columns: 1fr;
  }

  .input-category {
    padding: 1rem;
  }
}
</style>
