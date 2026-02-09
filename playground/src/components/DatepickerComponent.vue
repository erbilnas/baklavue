<script setup lang="ts">
import { BvDatepicker } from '@baklavue/ui'
import { ref } from 'vue'

const emit = defineEmits<{
  logEvent: [message: string]
}>()

const date1 = ref('')
const date2 = ref('')
const date3 = ref('')

const handleChange = (id: string, value: string | null) => {
  emit('logEvent', `Datepicker "${id}" changed to ${value || 'empty'}`)
}
</script>

<template>
  <section class="component-demo">
    <h2>Datepicker Component</h2>

    <div class="datepicker-category">
      <h3>Basic Datepickers</h3>
      <div class="datepicker-list">
        <div class="datepicker-item">
          <BvDatepicker
            v-model="date1"
            label="Select Date"
            placeholder="Choose a date"
            @change="() => handleChange('date1', date1)"
          />
        </div>
        <div class="datepicker-item">
          <BvDatepicker
            v-model="date2"
            label="Required Date"
            :required="true"
            @change="() => handleChange('date2', date2)"
          />
        </div>
        <div class="datepicker-item">
          <BvDatepicker
            v-model="date3"
            label="Disabled Datepicker"
            :disabled="true"
            @change="() => handleChange('date3', date3)"
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

.datepicker-category {
  margin-bottom: 2rem;
  padding: 1.25rem;
  border: 1px solid #f3f4f6;
  border-radius: 8px;
  background: #fafafa;
}

.datepicker-category h3 {
  margin-bottom: 1rem;
  color: #374151;
  font-size: 1.125rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.datepicker-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.datepicker-item {
  width: 100%;
  max-width: 300px;
}
</style>
