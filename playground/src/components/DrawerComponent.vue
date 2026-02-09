<script setup lang="ts">
import { BvDrawer, BvButton } from '@baklavue/ui'
import { ref } from 'vue'

const emit = defineEmits<{
  logEvent: [message: string]
}>()

const drawer1Open = ref(false)
const drawer2Open = ref(false)

const handleOpen = (id: string) => {
  emit('logEvent', `Drawer "${id}" opened`)
}

const handleClose = (id: string) => {
  emit('logEvent', `Drawer "${id}" closed`)
  if (id === 'drawer1') drawer1Open.value = false
  if (id === 'drawer2') drawer2Open.value = false
}
</script>

<template>
  <section class="component-demo">
    <h2>Drawer Component</h2>

    <div class="drawer-category">
      <h3>Drawer Examples</h3>
      <div class="drawer-list">
        <div class="drawer-item">
          <BvButton @click="drawer1Open = true">Open Left Drawer</BvButton>
          <BvDrawer
            v-model:open="drawer1Open"
            placement="left"
            @open="() => handleOpen('drawer1')"
            @close="() => handleClose('drawer1')"
          >
            <template #header>
              <h3>Drawer Title</h3>
            </template>
            <p>This is a drawer from the left side.</p>
            <template #footer>
              <BvButton @click="drawer1Open = false">Close</BvButton>
            </template>
          </BvDrawer>
        </div>

        <div class="drawer-item">
          <BvButton @click="drawer2Open = true">Open Right Drawer</BvButton>
          <BvDrawer
            v-model:open="drawer2Open"
            placement="right"
            :closable="true"
            @open="() => handleOpen('drawer2')"
            @close="() => handleClose('drawer2')"
          >
            <p>This drawer opens from the right side.</p>
          </BvDrawer>
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

.drawer-category {
  margin-bottom: 2rem;
  padding: 1.25rem;
  border: 1px solid #f3f4f6;
  border-radius: 8px;
  background: #fafafa;
}

.drawer-category h3 {
  margin-bottom: 1rem;
  color: #374151;
  font-size: 1.125rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.drawer-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.drawer-item {
  display: flex;
  align-items: center;
  gap: 1rem;
}
</style>
