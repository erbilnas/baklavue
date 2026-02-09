<script setup lang="ts">
import { BvTab } from '@baklavue/ui'
import { ref } from 'vue'

const emit = defineEmits<{
  logEvent: [message: string]
}>()

const activeTab1 = ref('tab1')
const activeTab2 = ref('tab2')

const tabs1 = [
  { label: 'Tab 1', value: 'tab1' },
  { label: 'Tab 2', value: 'tab2' },
  { label: 'Tab 3', value: 'tab3' },
]

const tabs2 = [
  { label: 'First', value: 'tab1' },
  { label: 'Second', value: 'tab2' },
  { label: 'Third', value: 'tab3' },
  { label: 'Disabled', value: 'tab4', disabled: true },
]

const handleTabChange = (id: string, tab: string) => {
  emit('logEvent', `Tab "${id}" changed to "${tab}"`)
  if (id === 'tabs1') activeTab1.value = tab
  if (id === 'tabs2') activeTab2.value = tab
}
</script>

<template>
  <section class="component-demo">
    <h2>Tab Component</h2>

    <div class="tab-category">
      <h3>Tab Examples</h3>
      <div class="tab-list">
        <div class="tab-item">
          <BvTab
            v-model:activeTab="activeTab1"
            :tabs="tabs1"
            @tab-change="(e) => handleTabChange('tabs1', (e.target as any)?.activeTab || activeTab1)"
          />
        </div>
        <div class="tab-item">
          <BvTab
            v-model:activeTab="activeTab2"
            :tabs="tabs2"
            variant="secondary"
            @tab-change="(e) => handleTabChange('tabs2', (e.target as any)?.activeTab || activeTab2)"
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

.tab-category {
  margin-bottom: 2rem;
  padding: 1.25rem;
  border: 1px solid #f3f4f6;
  border-radius: 8px;
  background: #fafafa;
}

.tab-category h3 {
  margin-bottom: 1rem;
  color: #374151;
  font-size: 1.125rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.tab-list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.tab-item {
  width: 100%;
}
</style>
