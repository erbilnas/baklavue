<script setup lang="ts">
import { BvButton } from '@baklavue/ui'
import { ref } from 'vue'

const buttonLoading = ref(false)

const emit = defineEmits<{
  logEvent: [message: string]
}>()

// Button configurations
const buttonVariants = [
  { variant: 'primary' as const, label: 'Default Button', message: 'Clicked: Default Button' },
  { variant: 'secondary' as const, label: 'Secondary', message: 'Clicked: Secondary Button' },
  { variant: 'tertiary' as const, label: 'Tertiary', message: 'Clicked: Tertiary Button' },
]

const buttonKinds = [
  { kind: 'default' as const, label: 'Default' },
  { kind: 'neutral' as const, label: 'Neutral' },
  { kind: 'danger' as const, label: 'Danger' },
  { kind: 'success' as const, label: 'Success' },
  {
    kind: 'custom' as const,
    label: 'Custom',
    customClass: { color: 'red', highlightColor: 'blue' },
  },
]

const buttonSizes = [
  { size: 'small' as const, label: 'Small' },
  { size: 'medium' as const, label: 'Medium' },
  { size: 'large' as const, label: 'Large' },
]

const handleLoadingToggle = () => {
  buttonLoading.value = true
  emit('logEvent', 'Toggled loading state')
}
</script>

<template>
  <section class="component-demo">
    <h2>Button Component</h2>

    <!-- Variants Section -->
    <div class="button-category">
      <h3>Variants</h3>
      <ul class="button-list">
        <li v-for="button in buttonVariants" :key="button.label">
          <BvButton :variant="button.variant" @click="() => emit('logEvent', button.message)">
            {{ button.label }}
          </BvButton>
        </li>
      </ul>
    </div>

    <!-- Kinds Section -->
    <div class="button-category">
      <h3>Kinds</h3>
      <ul class="button-list">
        <li v-for="button in buttonKinds" :key="button.label">
          <BvButton
            variant="primary"
            :kind="button.kind"
            size="medium"
            :custom-class="button.customClass"
          >
            {{ button.label }}
          </BvButton>
        </li>
      </ul>
    </div>

    <!-- Sizes Section -->
    <div class="button-category">
      <h3>Sizes</h3>
      <ul class="button-list">
        <li v-for="button in buttonSizes" :key="button.label">
          <BvButton :size="button.size">
            {{ button.label }}
          </BvButton>
        </li>
      </ul>
    </div>

    <!-- States Section -->
    <div class="button-category">
      <h3>States</h3>
      <ul class="button-list">
        <li>
          <BvButton :loading="buttonLoading" @click="handleLoadingToggle">
            {{ buttonLoading ? 'Loading...' : 'Toggle Loading' }}
          </BvButton>
        </li>
        <li>
          <BvButton disabled>Disabled</BvButton>
        </li>
        <li>
          <BvButton icon="alert">With Icon</BvButton>
        </li>
        <li>
          <BvButton icon="external_link" target="_blank" href="https://www.google.com">
            With Href
          </BvButton>
        </li>
      </ul>
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

.button-category {
  margin-bottom: 2rem;
  padding: 1.25rem;
  border: 1px solid #f3f4f6;
  border-radius: 8px;
  background: #fafafa;
}

.button-category:last-child {
  margin-bottom: 0;
}

.button-category h3 {
  margin-bottom: 1rem;
  color: #374151;
  font-size: 1.125rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.button-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.button-list li {
  display: flex;
  align-items: center;
}
</style>
