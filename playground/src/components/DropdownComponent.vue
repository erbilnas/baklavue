<script setup lang="ts">
import { BvDropdown, BvButton } from '@baklavue/ui'
import { ref } from 'vue'

const emit = defineEmits<{
  logEvent: [message: string]
}>()

const dropdown1Open = ref(false)
const dropdown2Open = ref(false)

const handleOpen = (id: string) => {
  emit('logEvent', `Dropdown "${id}" opened`)
}

const handleClose = (id: string) => {
  emit('logEvent', `Dropdown "${id}" closed`)
  if (id === 'dropdown1') dropdown1Open.value = false
  if (id === 'dropdown2') dropdown2Open.value = false
}

const handleSelect = (id: string) => {
  emit('logEvent', `Dropdown "${id}" item selected`)
}
</script>

<template>
  <section class="component-demo">
    <h2>Dropdown Component</h2>

    <div class="dropdown-category">
      <h3>Dropdown Examples</h3>
      <div class="dropdown-list">
        <div class="dropdown-item">
          <BvDropdown
            v-model:open="dropdown1Open"
            @open="() => handleOpen('dropdown1')"
            @close="() => handleClose('dropdown1')"
            @select="() => handleSelect('dropdown1')"
          >
            <template #trigger>
              <BvButton>Open Dropdown</BvButton>
            </template>
            <template #content>
              <div style="padding: 1rem; background: white; border-radius: 4px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                <p>Dropdown content</p>
                <p>Item 1</p>
                <p>Item 2</p>
                <p>Item 3</p>
              </div>
            </template>
          </BvDropdown>
        </div>

        <div class="dropdown-item">
          <BvDropdown
            v-model:open="dropdown2Open"
            placement="bottom-end"
            @open="() => handleOpen('dropdown2')"
            @close="() => handleClose('dropdown2')"
            @select="() => handleSelect('dropdown2')"
          >
            <template #trigger>
              <BvButton variant="secondary">Another Dropdown</BvButton>
            </template>
            <template #content>
              <div style="padding: 1rem; background: white; border-radius: 4px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                <p>Different placement</p>
              </div>
            </template>
          </BvDropdown>
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

.dropdown-category {
  margin-bottom: 2rem;
  padding: 1.25rem;
  border: 1px solid #f3f4f6;
  border-radius: 8px;
  background: #fafafa;
}

.dropdown-category h3 {
  margin-bottom: 1rem;
  color: #374151;
  font-size: 1.125rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.dropdown-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 1rem;
}
</style>
