<script setup lang="ts">
import { BvTag } from '@baklavue/ui'
import { ref } from 'vue'

const emit = defineEmits<{
  logEvent: [message: string]
}>()

const tag1Visible = ref(true)
const tag2Visible = ref(true)

const handleClose = (id: string) => {
  emit('logEvent', `Tag "${id}" closed`)
  if (id === 'tag1') tag1Visible.value = false
  if (id === 'tag2') tag2Visible.value = false
}
</script>

<template>
  <section class="component-demo">
    <h2>Tag Component</h2>

    <div class="tag-category">
      <h3>Tag Examples</h3>
      <div class="tag-list">
        <div class="tag-item">
          <BvTag variant="primary">Primary Tag</BvTag>
        </div>
        <div class="tag-item">
          <BvTag variant="secondary">Secondary Tag</BvTag>
        </div>
        <div class="tag-item">
          <BvTag variant="success">Success Tag</BvTag>
        </div>
        <div class="tag-item">
          <BvTag variant="warning">Warning Tag</BvTag>
        </div>
        <div class="tag-item">
          <BvTag variant="danger">Danger Tag</BvTag>
        </div>
      </div>
    </div>

    <div class="tag-category">
      <h3>Closable Tags</h3>
      <div class="tag-list">
        <div v-if="tag1Visible" class="tag-item">
          <BvTag :closable="true" @close="() => handleClose('tag1')">Closable Tag</BvTag>
        </div>
        <div v-if="tag2Visible" class="tag-item">
          <BvTag variant="primary" :closable="true" @close="() => handleClose('tag2')">
            Primary Closable
          </BvTag>
        </div>
      </div>
    </div>

    <div class="tag-category">
      <h3>Tag Sizes</h3>
      <div class="tag-list">
        <div class="tag-item">
          <BvTag size="small">Small Tag</BvTag>
        </div>
        <div class="tag-item">
          <BvTag size="medium">Medium Tag</BvTag>
        </div>
        <div class="tag-item">
          <BvTag size="large">Large Tag</BvTag>
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

.tag-category {
  margin-bottom: 2rem;
  padding: 1.25rem;
  border: 1px solid #f3f4f6;
  border-radius: 8px;
  background: #fafafa;
}

.tag-category:last-child {
  margin-bottom: 0;
}

.tag-category h3 {
  margin-bottom: 1rem;
  color: #374151;
  font-size: 1.125rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
}

.tag-item {
  display: flex;
  align-items: center;
}
</style>
