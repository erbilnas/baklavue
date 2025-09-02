<script setup lang="ts">
import { useNotification } from '@baklavue/composables'
import { BvButton, BvNotification } from '@baklavue/ui'
import type { BaklavaIcon } from '@trendyol/baklava-icons'

const notification = useNotification()

// Define notification types with their configurations
const notificationTypes = [
  {
    type: 'success' as const,
    caption: 'Başarılı',
    description: 'İşlem başarıyla tamamlandı.',
    variant: 'primary' as const,
    kind: 'success' as const,
    icon: 'check_fill' as BaklavaIcon,
  },
  {
    type: 'error' as const,
    caption: 'Hata',
    description: 'Bir hata oluştu.',
    variant: 'primary' as const,
    kind: 'danger' as const,
    icon: 'close_fill' as BaklavaIcon,
  },
  {
    type: 'warning' as const,
    caption: 'Uyarı',
    description: 'Dikkat edilmesi gereken bir durum var.',
    variant: 'primary' as const,
    icon: 'warning' as BaklavaIcon,
  },
  {
    type: 'info' as const,
    caption: 'Bilgi',
    description: 'Bilgilendirme mesajı.',
    variant: 'secondary' as const,
    kind: 'neutral' as const,
    icon: 'info' as BaklavaIcon,
  },
]

// Handle notification click
const handleNotificationClick = (
  type: 'success' | 'error' | 'warning' | 'info',
  caption: string,
  description: string,
) => {
  notification[type]({ caption, description })
}
</script>

<template>
  <section class="component-demo">
    <h2>Notification Component</h2>

    <!-- Notification Types Section -->
    <div class="notification-category">
      <h3>Types</h3>
      <ul class="button-list">
        <li v-for="item in notificationTypes" :key="item.type">
          <BvButton
            :variant="item.variant"
            :kind="item.kind"
            :icon="item.icon"
            @click="handleNotificationClick(item.type, item.caption, item.description)"
          >
            {{ item.caption }}
          </BvButton>
        </li>
      </ul>
    </div>

    <BvNotification />
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

.notification-category {
  margin-bottom: 2rem;
  padding: 1.25rem;
  border: 1px solid #f3f4f6;
  border-radius: 8px;
  background: #fafafa;
}

.notification-category:last-child {
  margin-bottom: 0;
}

.notification-category h3 {
  margin-bottom: 1rem;
  color: #374151;
  font-size: 1.125rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.button-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.button-list li {
  display: flex;
  align-items: center;
}

.demo-info {
  padding: 1rem;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  color: #6b7280;
  font-size: 0.875rem;
  line-height: 1.5;
}

.demo-info p {
  margin: 0;
}

.component-display {
  padding: 1rem;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  min-height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
