<script setup lang="ts">
import { ref } from 'vue'
import ButtonComponent from './components/ButtonComponent.vue'
import InputComponent from './components/InputComponent.vue'
import NotificationComponent from './components/NotificationComponent.vue'

const events = ref<string[]>([])

const logEvent = (message: string) => {
  const timestamp = new Date().toLocaleTimeString()

  events.value.unshift(`[${timestamp}] ${message}`)
}
</script>

<template>
  <main class="playground">
    <div class="content">
      <ButtonComponent @log-event="logEvent" />

      <InputComponent @log-event="logEvent" />

      <NotificationComponent />
    </div>

    <aside class="events-sidebar">
      <h2>Events</h2>

      <ul class="event-list">
        <li v-if="!events.length" class="event-empty">No events yet</li>
        <li v-for="(msg, idx) in events" :key="idx">{{ msg }}</li>
      </ul>
    </aside>
  </main>
</template>

<style lang="css" scoped>
.playground {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;
}

.content {
  flex: 1;
}

.event-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.event-empty {
  color: #9ca3af;
  font-style: italic;
  text-align: center;
  padding: 1rem;
}

.events-sidebar {
  width: 320px;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 1.5rem;
  position: sticky;
  top: 1rem;
  max-height: calc(100vh - 2rem);
  overflow: auto;
  background: #ffffff;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.events-sidebar h2 {
  margin-bottom: 1rem;
  color: #111827;
  font-size: 1.25rem;
  font-weight: 600;
  border-bottom: 2px solid #f3f4f6;
  padding-bottom: 0.5rem;
}
</style>
