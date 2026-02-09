<script setup lang="ts">
import { BvIcon } from '@baklavue/ui'
import type { BaklavaIcon } from '@trendyol/baklava-icons'

const emit = defineEmits<{
  logEvent: [message: string]
}>()

const icons: BaklavaIcon[] = [
  'info',
  'check_fill',
  'close_fill',
  'warning',
  'star',
  'heart',
  'search',
  'arrow_right',
  'arrow_left',
]
</script>

<template>
  <section class="component-demo">
    <h2>Icon Component</h2>

    <div class="icon-category">
      <h3>Icon Examples</h3>
      <div class="icon-list">
        <div v-for="icon in icons" :key="icon" class="icon-item">
          <BvIcon :name="icon" />
          <span class="icon-label">{{ icon }}</span>
        </div>
      </div>
    </div>

    <div class="icon-category">
      <h3>Icon Sizes</h3>
      <div class="icon-list">
        <div class="icon-item">
          <BvIcon name="star" size="small" />
          <span class="icon-label">Small</span>
        </div>
        <div class="icon-item">
          <BvIcon name="star" size="medium" />
          <span class="icon-label">Medium</span>
        </div>
        <div class="icon-item">
          <BvIcon name="star" size="large" />
          <span class="icon-label">Large</span>
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

.icon-category {
  margin-bottom: 2rem;
  padding: 1.25rem;
  border: 1px solid #f3f4f6;
  border-radius: 8px;
  background: #fafafa;
}

.icon-category:last-child {
  margin-bottom: 0;
}

.icon-category h3 {
  margin-bottom: 1rem;
  color: #374151;
  font-size: 1.125rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.icon-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  align-items: center;
}

.icon-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.icon-label {
  color: #6b7280;
  font-size: 0.75rem;
  text-align: center;
}
</style>
