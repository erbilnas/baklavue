<script setup lang="ts">
import { BvSelect } from '@baklavue/ui'
import { ref } from 'vue'

const emit = defineEmits<{
  logEvent: [message: string]
}>()

const select1 = ref('')
const select2 = ref('')
const select3 = ref([])

const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
  { value: 'option4', label: 'Option 4' },
]

const handleChange = (id: string, value: string | string[] | null) => {
  emit('logEvent', `Select "${id}" changed to ${Array.isArray(value) ? value.join(', ') : value || 'empty'}`)
}
</script>

<template>
  <section class="component-demo">
    <h2>Select Component</h2>

    <div class="select-category">
      <h3>Select Examples</h3>
      <div class="select-list">
        <div class="select-item">
          <BvSelect
            v-model="select1"
            label="Single Select"
            placeholder="Choose an option"
            :options="options"
            @change="() => handleChange('select1', select1)"
          />
        </div>
        <div class="select-item">
          <BvSelect
            v-model="select2"
            label="Required Select"
            :options="options"
            :required="true"
            @change="() => handleChange('select2', select2)"
          />
        </div>
        <div class="select-item">
          <BvSelect
            v-model="select3"
            label="Multiple Select"
            :options="options"
            :multiple="true"
            @change="() => handleChange('select3', select3)"
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

.select-category {
  margin-bottom: 2rem;
  padding: 1.25rem;
  border: 1px solid #f3f4f6;
  border-radius: 8px;
  background: #fafafa;
}

.select-category h3 {
  margin-bottom: 1rem;
  color: #374151;
  font-size: 1.125rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.select-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.select-item {
  width: 100%;
  max-width: 300px;
}
</style>
