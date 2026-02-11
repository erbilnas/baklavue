<script setup lang="ts">
/**
 * Notification Component
 *
 * A Vue UI kit component for Baklava's `bl-notification` web component for toast notifications.
 * Place this component once in your app (typically at root or layout level). Notifications
 * are triggered programmatically via the `useNotification` composable.
 *
 * @component
 * @example
 * ```vue
 * <!-- Basic usage: place in app root -->
 * <template>
 *   <div>
 *     <RouterView />
 *     <BvNotification />
 *   </div>
 * </template>
 * ```
 *
 * @example
 * ```vue
 * <!-- With useNotification composable -->
 * <template>
 *   <div>
 *     <BvButton @click="showSuccess">Show Success</BvButton>
 *     <BvNotification />
 *   </div>
 * </template>
 * ```
 */
import { onMounted } from "vue";
import { loadBaklavaResources } from "../utils/loadBaklavaResources";
import type { NotificationProps } from "./notification.types";

/**
 * Component props with default values.
 */
const props = withDefaults(defineProps<NotificationProps>(), {
  duration: 7,
  noAnimation: false,
});

/**
 * Lifecycle hook: Component mounted.
 * Loads Baklava resources required for the web component.
 */
onMounted(() => {
  loadBaklavaResources();
});
</script>

<template>
  <bl-notification v-bind="props" />
</template>

<style lang="css" scoped></style>
