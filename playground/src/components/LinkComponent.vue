<script setup lang="ts">
import { BvLink } from '@baklavue/ui'

const emit = defineEmits<{
  logEvent: [message: string]
}>()

const handleClick = (id: string) => {
  emit('logEvent', `Link "${id}" clicked`)
}
</script>

<template>
  <section class="component-demo">
    <h2>Link Component</h2>

    <div class="link-category">
      <h3>Link Examples</h3>
      <div class="link-list">
        <div class="link-item">
          <BvLink href="#" @click="() => handleClick('link1')">Basic Link</BvLink>
        </div>
        <div class="link-item">
          <BvLink href="#" variant="primary" @click="() => handleClick('link2')">Primary Link</BvLink>
        </div>
        <div class="link-item">
          <BvLink href="#" variant="secondary" @click="() => handleClick('link3')">Secondary Link</BvLink>
        </div>
        <div class="link-item">
          <BvLink href="#" :disabled="true" @click="() => handleClick('link4')">Disabled Link</BvLink>
        </div>
        <div class="link-item">
          <BvLink href="https://example.com" target="_blank" @click="() => handleClick('link5')">
            External Link
          </BvLink>
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

.link-category {
  margin-bottom: 2rem;
  padding: 1.25rem;
  border: 1px solid #f3f4f6;
  border-radius: 8px;
  background: #fafafa;
}

.link-category h3 {
  margin-bottom: 1rem;
  color: #374151;
  font-size: 1.125rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.link-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.link-item {
  display: flex;
  align-items: center;
}
</style>
