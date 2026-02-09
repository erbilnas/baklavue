<script setup lang="ts">
import { BvBadge } from '@baklavue/ui'
import type { BaklavaIcon } from '@trendyol/baklava-icons'

const emit = defineEmits<{
  logEvent: [message: string]
}>()

// Badge configurations
const badgeSizes = [
  { size: 'small' as const, label: 'Small Badge' },
  { size: 'medium' as const, label: 'Medium Badge' },
  { size: 'large' as const, label: 'Large Badge' },
]

const badgeIcons = [
  { icon: 'check_fill' as BaklavaIcon, label: 'Check Icon' },
  { icon: 'alert' as BaklavaIcon, label: 'Alert Icon' },
  { icon: 'info' as BaklavaIcon, label: 'Info Icon' },
  { icon: 'star' as BaklavaIcon, label: 'Star Icon' },
]

const badgeExamples = [
  { text: 'New', size: 'small' as const },
  { text: 'Sale', size: 'medium' as const },
  { text: 'Featured', size: 'large' as const },
  { text: '5', size: 'small' as const },
  { text: '99+', size: 'medium' as const },
]
</script>

<template>
  <section class="component-demo">
    <h2>Badge Component</h2>

    <!-- Basic Examples Section -->
    <div class="badge-category">
      <h3>Basic Badges</h3>
      <div class="badge-list">
        <div v-for="example in badgeExamples" :key="example.text" class="badge-item">
          <BvBadge :size="example.size">
            {{ example.text }}
          </BvBadge>
        </div>
      </div>
    </div>

    <!-- Sizes Section -->
    <div class="badge-category">
      <h3>Sizes</h3>
      <div class="badge-list">
        <div v-for="badge in badgeSizes" :key="badge.size" class="badge-item">
          <div class="badge-label">{{ badge.label }}</div>
          <BvBadge :size="badge.size">Badge</BvBadge>
        </div>
      </div>
    </div>

    <!-- With Icons Section -->
    <div class="badge-category">
      <h3>With Icons</h3>
      <div class="badge-list">
        <div v-for="badge in badgeIcons" :key="badge.icon" class="badge-item">
          <div class="badge-label">{{ badge.label }}</div>
          <BvBadge :icon="badge.icon" size="medium">Badge</BvBadge>
        </div>
      </div>
    </div>

    <!-- Usage Examples Section -->
    <div class="badge-category">
      <h3>Usage Examples</h3>
      <div class="badge-examples">
        <div class="example-item">
          <div class="example-label">Notification Badge:</div>
          <div class="example-content">
            <span>Messages</span>
            <BvBadge size="small">3</BvBadge>
          </div>
        </div>

        <div class="example-item">
          <div class="example-label">Status Badge:</div>
          <div class="example-content">
            <span>Order Status</span>
            <BvBadge size="medium" icon="check_fill">Completed</BvBadge>
          </div>
        </div>

        <div class="example-item">
          <div class="example-label">Category Badge:</div>
          <div class="example-content">
            <span>Product</span>
            <BvBadge size="small">New</BvBadge>
            <BvBadge size="small">Sale</BvBadge>
          </div>
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

.badge-category {
  margin-bottom: 2rem;
  padding: 1.25rem;
  border: 1px solid #f3f4f6;
  border-radius: 8px;
  background: #fafafa;
}

.badge-category:last-child {
  margin-bottom: 0;
}

.badge-category h3 {
  margin-bottom: 1rem;
  color: #374151;
  font-size: 1.125rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.badge-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
}

.badge-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.badge-label {
  color: #6b7280;
  font-size: 0.875rem;
  min-width: 120px;
}

.badge-examples {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.example-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.example-label {
  color: #6b7280;
  font-size: 0.875rem;
  font-weight: 500;
}

.example-content {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
}

.example-content span {
  color: #111827;
  font-size: 0.875rem;
}
</style>
