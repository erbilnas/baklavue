<script setup lang="ts">
import { BvSpinner } from '@baklavue/ui'

const emit = defineEmits<{
  logEvent: [message: string]
}>()
</script>

<template>
  <section class="component-demo">
    <h2>Spinner Component</h2>

    <div class="spinner-category">
      <h3>Spinner Examples</h3>
      <div class="spinner-list">
        <div class="spinner-item">
          <BvSpinner size="small" />
          <span class="spinner-label">Small</span>
        </div>
        <div class="spinner-item">
          <BvSpinner size="medium" />
          <span class="spinner-label">Medium</span>
        </div>
        <div class="spinner-item">
          <BvSpinner size="large" />
          <span class="spinner-label">Large</span>
        </div>
      </div>
    </div>

    <div class="spinner-category">
      <h3>Spinner with Label</h3>
      <div class="spinner-list">
        <div class="spinner-item">
          <BvSpinner label="Loading..." />
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

.spinner-category {
  margin-bottom: 2rem;
  padding: 1.25rem;
  border: 1px solid #f3f4f6;
  border-radius: 8px;
  background: #fafafa;
}

.spinner-category:last-child {
  margin-bottom: 0;
}

.spinner-category h3 {
  margin-bottom: 1rem;
  color: #374151;
  font-size: 1.125rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.spinner-list {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  align-items: center;
}

.spinner-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.spinner-label {
  color: #6b7280;
  font-size: 0.875rem;
}
</style>
