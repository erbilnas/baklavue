<script setup lang="ts">
import { BvDialog, BvButton } from '@baklavue/ui'
import { ref } from 'vue'

const emit = defineEmits<{
  logEvent: [message: string]
}>()

const dialog1Open = ref(false)
const dialog2Open = ref(false)

const handleOpen = (id: string) => {
  emit('logEvent', `Dialog "${id}" opened`)
}

const handleClose = (id: string) => {
  emit('logEvent', `Dialog "${id}" closed`)
  if (id === 'dialog1') dialog1Open.value = false
  if (id === 'dialog2') dialog2Open.value = false
}
</script>

<template>
  <section class="component-demo">
    <h2>Dialog Component</h2>

    <div class="dialog-category">
      <h3>Dialog Examples</h3>
      <div class="dialog-list">
        <div class="dialog-item">
          <BvButton @click="dialog1Open = true">Open Basic Dialog</BvButton>
          <BvDialog
            v-model:open="dialog1Open"
            @open="() => handleOpen('dialog1')"
            @close="() => handleClose('dialog1')"
          >
            <template #header>
              <h3>Dialog Title</h3>
            </template>
            <p>This is a basic dialog with header and content.</p>
            <template #footer>
              <BvButton @click="dialog1Open = false">Close</BvButton>
            </template>
          </BvDialog>
        </div>

        <div class="dialog-item">
          <BvButton @click="dialog2Open = true">Open Closable Dialog</BvButton>
          <BvDialog
            v-model:open="dialog2Open"
            :closable="true"
            @open="() => handleOpen('dialog2')"
            @close="() => handleClose('dialog2')"
          >
            <p>This dialog can be closed by clicking the X button or backdrop.</p>
          </BvDialog>
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

.dialog-category {
  margin-bottom: 2rem;
  padding: 1.25rem;
  border: 1px solid #f3f4f6;
  border-radius: 8px;
  background: #fafafa;
}

.dialog-category h3 {
  margin-bottom: 1rem;
  color: #374151;
  font-size: 1.125rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.dialog-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.dialog-item {
  display: flex;
  align-items: center;
  gap: 1rem;
}
</style>
