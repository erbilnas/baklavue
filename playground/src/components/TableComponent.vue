<script setup lang="ts">
import { BvTable } from '@baklavue/ui'

const emit = defineEmits<{
  logEvent: [message: string]
}>()

const tableData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User' },
]

const columns = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'email', label: 'Email', sortable: true },
  { key: 'role', label: 'Role', sortable: false },
]

const handleRowClick = (row: any) => {
  emit('logEvent', `Table row clicked: ${row.name}`)
}

const handleSort = () => {
  emit('logEvent', 'Table sorted')
}

const handleSelect = () => {
  emit('logEvent', 'Table row selected')
}
</script>

<template>
  <section class="component-demo">
    <h2>Table Component</h2>

    <div class="table-category">
      <h3>Table Examples</h3>
      <div class="table-list">
        <div class="table-item">
          <BvTable
            :data="tableData"
            :columns="columns"
            :sortable="true"
            @row-click="handleRowClick"
            @sort="handleSort"
          />
        </div>
        <div class="table-item">
          <BvTable
            :data="tableData"
            :columns="columns"
            :selectable="true"
            @select="handleSelect"
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

.table-category {
  margin-bottom: 2rem;
  padding: 1.25rem;
  border: 1px solid #f3f4f6;
  border-radius: 8px;
  background: #fafafa;
}

.table-category h3 {
  margin-bottom: 1rem;
  color: #374151;
  font-size: 1.125rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.table-list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.table-item {
  width: 100%;
  overflow-x: auto;
}
</style>
