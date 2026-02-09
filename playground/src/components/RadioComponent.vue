<script setup lang="ts">
import { BvRadio } from '@baklavue/ui'
import { ref } from 'vue'

const emit = defineEmits<{
  logEvent: [message: string]
}>()

const selectedRadio = ref('option1')

const handleChange = (value: string) => {
  emit('logEvent', `Radio changed to "${value}"`)
  selectedRadio.value = value
}
</script>

<template>
  <section class="component-demo">
    <h2>Radio Component</h2>

    <div class="radio-category">
      <h3>Radio Group Examples</h3>
      <div class="radio-list">
        <div class="radio-item">
          <BvRadio
            name="radio-group"
            value="option1"
            :checked="selectedRadio === 'option1'"
            label="Option 1"
            @change="() => handleChange('option1')"
          />
        </div>
        <div class="radio-item">
          <BvRadio
            name="radio-group"
            value="option2"
            :checked="selectedRadio === 'option2'"
            label="Option 2"
            @change="() => handleChange('option2')"
          />
        </div>
        <div class="radio-item">
          <BvRadio
            name="radio-group"
            value="option3"
            :checked="selectedRadio === 'option3'"
            label="Option 3"
            @change="() => handleChange('option3')"
          />
        </div>
        <div class="radio-item">
          <BvRadio
            name="radio-group"
            value="option4"
            :checked="selectedRadio === 'option4'"
            label="Disabled Option"
            :disabled="true"
            @change="() => handleChange('option4')"
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

.radio-category {
  margin-bottom: 2rem;
  padding: 1.25rem;
  border: 1px solid #f3f4f6;
  border-radius: 8px;
  background: #fafafa;
}

.radio-category h3 {
  margin-bottom: 1rem;
  color: #374151;
  font-size: 1.125rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.radio-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.radio-item {
  display: flex;
  align-items: center;
}
</style>
