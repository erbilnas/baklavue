<script setup lang="ts">
import { BvSplitButton } from '@baklavue/ui'

const emit = defineEmits<{
  logEvent: [message: string]
}>()

const handleClick = (id: string) => {
  emit('logEvent', `Split Button "${id}" clicked`)
}

const handleDropdownClick = (id: string) => {
  emit('logEvent', `Split Button "${id}" dropdown clicked`)
}
</script>

<template>
  <section class="component-demo">
    <h2>Split Button Component</h2>

    <div class="split-button-category">
      <h3>Split Button Examples</h3>
      <div class="split-button-list">
        <div class="split-button-item">
          <BvSplitButton
            label="Primary Split"
            variant="primary"
            @click="() => handleClick('split1')"
            @dropdown-click="() => handleDropdownClick('split1')"
          >
            <template #dropdown-content>
              <div style="padding: 0.5rem;">
                <p>Dropdown Item 1</p>
                <p>Dropdown Item 2</p>
              </div>
            </template>
          </BvSplitButton>
        </div>
        <div class="split-button-item">
          <BvSplitButton
            label="Secondary Split"
            variant="secondary"
            @click="() => handleClick('split2')"
            @dropdown-click="() => handleDropdownClick('split2')"
          >
            <template #dropdown-content>
              <div style="padding: 0.5rem;">
                <p>More Options</p>
              </div>
            </template>
          </BvSplitButton>
        </div>
        <div class="split-button-item">
          <BvSplitButton
            label="Loading Split"
            :loading="true"
            @click="() => handleClick('split3')"
            @dropdown-click="() => handleDropdownClick('split3')"
          >
            <template #dropdown-content>
              <div style="padding: 0.5rem;">
                <p>Options</p>
              </div>
            </template>
          </BvSplitButton>
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

.split-button-category {
  margin-bottom: 2rem;
  padding: 1.25rem;
  border: 1px solid #f3f4f6;
  border-radius: 8px;
  background: #fafafa;
}

.split-button-category h3 {
  margin-bottom: 1rem;
  color: #374151;
  font-size: 1.125rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.split-button-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
}

.split-button-item {
  display: flex;
  align-items: center;
}
</style>
