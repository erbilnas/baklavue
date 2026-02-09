<script setup lang="ts">
import { BvCheckbox } from '@baklavue/ui'
import { ref } from 'vue'

const emit = defineEmits<{
  logEvent: [message: string]
}>()

const checkbox1 = ref(false)
const checkbox2 = ref(true)
const checkbox3 = ref(false)
const checkbox4 = ref(false)

const handleChange = (id: string, checked: boolean) => {
  emit('logEvent', `Checkbox "${id}" changed to ${checked}`)
}
</script>

<template>
  <section class="component-demo">
    <h2>Checkbox Component</h2>

    <div class="checkbox-category">
      <h3>Basic Checkboxes</h3>
      <div class="checkbox-list">
        <div class="checkbox-item">
          <BvCheckbox
            v-model:checked="checkbox1"
            label="Unchecked checkbox"
            @change="() => handleChange('checkbox1', checkbox1)"
          />
        </div>
        <div class="checkbox-item">
          <BvCheckbox
            v-model:checked="checkbox2"
            label="Checked checkbox"
            @change="() => handleChange('checkbox2', checkbox2)"
          />
        </div>
        <div class="checkbox-item">
          <BvCheckbox
            v-model:checked="checkbox3"
            label="Indeterminate checkbox"
            :indeterminate="true"
            @change="() => handleChange('checkbox3', checkbox3)"
          />
        </div>
        <div class="checkbox-item">
          <BvCheckbox
            v-model:checked="checkbox4"
            label="Disabled checkbox"
            :disabled="true"
            @change="() => handleChange('checkbox4', checkbox4)"
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

.checkbox-category {
  margin-bottom: 2rem;
  padding: 1.25rem;
  border: 1px solid #f3f4f6;
  border-radius: 8px;
  background: #fafafa;
}

.checkbox-category h3 {
  margin-bottom: 1rem;
  color: #374151;
  font-size: 1.125rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.checkbox-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.checkbox-item {
  display: flex;
  align-items: center;
}
</style>
