# Pagination

A Vue wrapper for Baklava's `bl-pagination` component for page navigation.

## Basic Usage

```vue
<template>
  <Pagination
    v-model="currentPage"
    :total="100"
    :page-size="10"
    @change="handlePageChange"
  />
</template>

<script setup>
import { ref } from 'vue'
import { Pagination } from '@baklavue/ui'

const currentPage = ref(1)

const handlePageChange = (page: number) => {
  console.log('Page changed to:', page)
}
</script>
```

## Props

| Prop         | Type     | Default     | Description            |
| ------------ | -------- | ----------- | ---------------------- |
| `modelValue` | `number` | `undefined` | Current page (v-model) |
| `total`      | `number` | `undefined` | Total number of items  |
| `pageSize`   | `number` | `undefined` | Items per page         |

## Events

| Event               | Payload  | Description               |
| ------------------- | -------- | ------------------------- |
| `update:modelValue` | `number` | Emitted when page changes |
| `change`            | `number` | Emitted when page changes |
