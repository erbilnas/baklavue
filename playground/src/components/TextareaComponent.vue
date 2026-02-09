<script setup lang="ts">
import { BvTextarea } from '@baklavue/ui'
import { ref } from 'vue'

const emit = defineEmits<{
  logEvent: [message: string]
}>()

const textarea1 = ref('')
const textarea2 = ref('')
const textarea3 = ref('')

const handleChange = (id: string, value: string | null) => {
  emit('logEvent', `Textarea "${id}" changed: ${value?.substring(0, 20) || 'empty'}...`)
}
</script>

<template>
  <section class="component-demo">
    <h2>Textarea Component</h2>

    <div class="textarea-category">
      <h3>Textarea Examples</h3>
      <div class="textarea-list">
        <div class="textarea-item">
          <BvTextarea
            v-model="textarea1"
            label="Basic Textarea"
            placeholder="Enter text here..."
            @change="() => handleChange('textarea1', textarea1)"
          />
        </div>
        <div class="textarea-item">
          <BvTextarea
            v-model="textarea2"
            label="Required Textarea"
            :required="true"
            :rows="5"
            @change="() => handleChange('textarea2', textarea2)"
          />
        </div>
        <div class="textarea-item">
          <BvTextarea
            v-model="textarea3"
            label="Disabled Textarea"
            :disabled="true"
            placeholder="This is disabled"
            @change="() => handleChange('textarea3', textarea3)"
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

.textarea-category {
  margin-bottom: 2rem;
  padding: 1.25rem;
  border: 1px solid #f3f4f6;
  border-radius: 8px;
  background: #fafafa;
}

.textarea-category h3 {
  margin-bottom: 1rem;
  color: #374151;
  font-size: 1.125rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.textarea-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.textarea-item {
  width: 100%;
  max-width: 500px;
}
</style>
