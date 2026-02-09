<script setup lang="ts">
import { BvAlert, BvButton } from '@baklavue/ui'
import { ref } from 'vue'
import type { BaklavaIcon } from '@trendyol/baklava-icons'

const emit = defineEmits<{
  logEvent: [message: string]
}>()

// Alert states
const infoAlertClosed = ref(false)
const successAlertClosed = ref(false)
const warningAlertClosed = ref(false)
const dangerAlertClosed = ref(false)
const closableAlertClosed = ref(false)

// Alert configurations
const alertVariants = [
  {
    variant: 'info' as const,
    caption: 'Information',
    description: 'This is an informational alert message.',
    icon: 'info' as BaklavaIcon,
  },
  {
    variant: 'success' as const,
    caption: 'Success',
    description: 'Operation completed successfully!',
    icon: 'check_fill' as BaklavaIcon,
  },
  {
    variant: 'warning' as const,
    caption: 'Warning',
    description: 'Please review this warning message carefully.',
    icon: 'warning' as BaklavaIcon,
  },
  {
    variant: 'danger' as const,
    caption: 'Error',
    description: 'An error occurred. Please try again.',
    icon: 'close_fill' as BaklavaIcon,
  },
]

const handleAlertClose = (alertId: string) => {
  emit('logEvent', `Alert "${alertId}" closed`)
  
  if (alertId === 'info') infoAlertClosed.value = true
  if (alertId === 'success') successAlertClosed.value = true
  if (alertId === 'warning') warningAlertClosed.value = true
  if (alertId === 'danger') dangerAlertClosed.value = true
  if (alertId === 'closable') closableAlertClosed.value = true
}

const resetAlert = (alertId: string) => {
  if (alertId === 'info') infoAlertClosed.value = false
  if (alertId === 'success') successAlertClosed.value = false
  if (alertId === 'warning') warningAlertClosed.value = false
  if (alertId === 'danger') dangerAlertClosed.value = false
  if (alertId === 'closable') closableAlertClosed.value = false
  
  emit('logEvent', `Alert "${alertId}" reset`)
}
</script>

<template>
  <section class="component-demo">
    <h2>Alert Component</h2>

    <!-- Variants Section -->
    <div class="alert-category">
      <h3>Variants</h3>
      <div class="alert-list">
        <div class="alert-item">
          <BvAlert
            v-if="!infoAlertClosed"
            variant="info"
            caption="Information Alert"
            description="This is an informational alert message."
            @close="() => handleAlertClose('info')"
          />
          <BvButton v-if="infoAlertClosed" @click="() => resetAlert('info')" size="small">
            Reset Info Alert
          </BvButton>
        </div>

        <div class="alert-item">
          <BvAlert
            v-if="!successAlertClosed"
            variant="success"
            caption="Success Alert"
            description="Operation completed successfully!"
            @close="() => handleAlertClose('success')"
          />
          <BvButton v-if="successAlertClosed" @click="() => resetAlert('success')" size="small">
            Reset Success Alert
          </BvButton>
        </div>

        <div class="alert-item">
          <BvAlert
            v-if="!warningAlertClosed"
            variant="warning"
            caption="Warning Alert"
            description="Please review this warning message carefully."
            @close="() => handleAlertClose('warning')"
          />
          <BvButton v-if="warningAlertClosed" @click="() => resetAlert('warning')" size="small">
            Reset Warning Alert
          </BvButton>
        </div>

        <div class="alert-item">
          <BvAlert
            v-if="!dangerAlertClosed"
            variant="danger"
            caption="Error Alert"
            description="An error occurred. Please try again."
            @close="() => handleAlertClose('danger')"
          />
          <BvButton v-if="dangerAlertClosed" @click="() => resetAlert('danger')" size="small">
            Reset Danger Alert
          </BvButton>
        </div>
      </div>
    </div>

    <!-- Closable Section -->
    <div class="alert-category">
      <h3>Closable Alerts</h3>
      <div class="alert-list">
        <div class="alert-item">
          <BvAlert
            v-if="!closableAlertClosed"
            variant="info"
            caption="Closable Alert"
            description="This alert can be closed by clicking the close button."
            :closable="true"
            @close="() => handleAlertClose('closable')"
          />
          <BvButton v-if="closableAlertClosed" @click="() => resetAlert('closable')" size="small">
            Reset Closable Alert
          </BvButton>
        </div>
      </div>
    </div>

    <!-- With Icons Section -->
    <div class="alert-category">
      <h3>With Custom Icons</h3>
      <div class="alert-list">
        <div class="alert-item">
          <BvAlert
            variant="info"
            caption="Custom Icon Alert"
            description="This alert uses a custom icon."
            :icon="'star'"
          />
        </div>
      </div>
    </div>

    <!-- With Slots Section -->
    <div class="alert-category">
      <h3>With Slots</h3>
      <div class="alert-list">
        <div class="alert-item">
          <BvAlert variant="info" :closable="true">
            <template #caption>
              <strong>Custom Caption Slot</strong>
            </template>
            <p>This alert uses slots for custom content.</p>
            <template #action>
              <BvButton size="small" variant="secondary">Action</BvButton>
            </template>
          </BvAlert>
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

.alert-category {
  margin-bottom: 2rem;
  padding: 1.25rem;
  border: 1px solid #f3f4f6;
  border-radius: 8px;
  background: #fafafa;
}

.alert-category:last-child {
  margin-bottom: 0;
}

.alert-category h3 {
  margin-bottom: 1rem;
  color: #374151;
  font-size: 1.125rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.alert-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.alert-item {
  width: 100%;
}

.alert-item p {
  margin: 0.5rem 0;
  color: #6b7280;
  line-height: 1.6;
}
</style>
