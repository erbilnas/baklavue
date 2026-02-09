<script setup lang="ts">
import { BvPagination } from '@baklavue/ui'
import { ref } from 'vue'

const emit = defineEmits<{
  logEvent: [message: string]
}>()

const currentPage1 = ref(1)
const currentPage2 = ref(1)

const handleChange = (id: string, page: number) => {
  emit('logEvent', `Pagination "${id}" changed to page ${page}`)
  if (id === 'pagination1') currentPage1.value = page
  if (id === 'pagination2') currentPage2.value = page
}
</script>

<template>
  <section class="component-demo">
    <h2>Pagination Component</h2>

    <div class="pagination-category">
      <h3>Pagination Examples</h3>
      <div class="pagination-list">
        <div class="pagination-item">
          <BvPagination
            v-model:currentPage="currentPage1"
            :totalPages="10"
            @change="(e) => handleChange('pagination1', (e.target as any)?.currentPage || currentPage1)"
          />
        </div>
        <div class="pagination-item">
          <BvPagination
            v-model:currentPage="currentPage2"
            :totalPages="5"
            :showFirstLast="true"
            :showPrevNext="true"
            @change="(e) => handleChange('pagination2', (e.target as any)?.currentPage || currentPage2)"
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

.pagination-category {
  margin-bottom: 2rem;
  padding: 1.25rem;
  border: 1px solid #f3f4f6;
  border-radius: 8px;
  background: #fafafa;
}

.pagination-category h3 {
  margin-bottom: 1rem;
  color: #374151;
  font-size: 1.125rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.pagination-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.pagination-item {
  display: flex;
  align-items: center;
}
</style>
