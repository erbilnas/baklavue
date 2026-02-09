<script setup lang="ts">
import { BvSwitch } from '@baklavue/ui'
import { ref } from 'vue'

const emit = defineEmits<{
  logEvent: [message: string]
}>()

const switch1 = ref(false)
const switch2 = ref(true)
const switch3 = ref(false)

const handleChange = (id: string, checked: boolean) => {
  emit('logEvent', `Switch "${id}" changed to ${checked}`)
}
</script>

<template>
  <section class="component-demo">
    <h2>Switch Component</h2>

    <div class="switch-category">
      <h3>Switch Examples</h3>
      <div class="switch-list">
        <div class="switch-item">
          <BvSwitch
            v-model:checked="switch1"
            label="Unchecked Switch"
            @change="() => handleChange('switch1', switch1)"
          />
        </div>
        <div class="switch-item">
          <BvSwitch
            v-model:checked="switch2"
            label="Checked Switch"
            @change="() => handleChange('switch2', switch2)"
          />
        </div>
        <div class="switch-item">
          <BvSwitch
            v-model:checked="switch3"
            label="Disabled Switch"
            :disabled="true"
            @change="() => handleChange('switch3', switch3)"
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

.switch-category {
  margin-bottom: 2rem;
  padding: 1.25rem;
  border: 1px solid #f3f4f6;
  border-radius: 8px;
  background: #fafafa;
}

.switch-category h3 {
  margin-bottom: 1rem;
  color: #374151;
  font-size: 1.125rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.switch-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.switch-item {
  display: flex;
  align-items: center;
}
</style>
