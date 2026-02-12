<script setup lang="ts">
/**
 * Banner Component
 *
 * A full-width banner displayed at the top of a page to inform users about important information.
 * Similar to Nuxt UI's UBanner. Supports title, icon, color variants, closable state with optional
 * localStorage persistence, action buttons, and link mode.
 *
 * @component
 * @example
 * ```vue
 * <template>
 *   <BvBanner title="This is an important message" />
 * </template>
 * ```
 */
import { computed, onMounted, ref } from "vue";
import BvButton from "../button/Button.vue";
import BvIcon from "../icon/Icon.vue";
import BvLink from "../link/Link.vue";
import { loadBaklavaResources } from "../utils/loadBaklavaResources";
import type { BannerAction, BannerProps } from "./banner.types";

const STORAGE_PREFIX = "banner-";

const props = withDefaults(defineProps<BannerProps>(), {
  title: undefined,
  icon: undefined,
  color: "primary",
  close: false,
  closeIcon: "close",
  id: undefined,
  to: undefined,
  target: undefined,
  actions: undefined,
});

const emit = defineEmits<{
  /** Emitted when the close button is clicked */
  close: [];
}>();

const isDismissed = ref(false);

function getStorageKey(): string | null {
  if (!props.id || typeof props.id !== "string") return null;
  const sanitized = props.id.replace(/[^a-zA-Z0-9_-]/g, "");
  return sanitized ? `${STORAGE_PREFIX}${sanitized}` : null;
}

function checkDismissed(): void {
  const key = getStorageKey();
  if (!key || !props.close || typeof window === "undefined") return;
  try {
    const stored = localStorage.getItem(key);
    if (stored === "true") {
      isDismissed.value = true;
    }
  } catch {
    /* ignore */
  }
}

function handleClose(e?: Event): void {
  e?.preventDefault();
  e?.stopPropagation();
  const key = getStorageKey();
  if (key && typeof window !== "undefined") {
    try {
      localStorage.setItem(key, "true");
    } catch {
      /* ignore */
    }
  }
  isDismissed.value = true;
  emit("close");
}

function handleActionClick(action: BannerAction): void {
  action.onClick?.();
}

const colorStyles = computed(() => {
  const colorMap: Record<string, { bg: string; text: string }> = {
    primary: {
      bg: "var(--bl-color-primary)",
      text: "var(--bl-color-primary-contrast, #fff)",
    },
    success: {
      bg: "var(--bl-color-success)",
      text: "var(--bl-color-success-contrast, #fff)",
    },
    danger: {
      bg: "var(--bl-color-danger)",
      text: "var(--bl-color-danger-contrast, #fff)",
    },
    warning: {
      bg: "var(--bl-color-warning)",
      text: "var(--bl-color-warning-contrast, #fff)",
    },
    info: {
      bg: "var(--bl-color-info)",
      text: "var(--bl-color-info-contrast, #fff)",
    },
    neutral: {
      bg: "var(--bl-color-neutral-darkest)",
      text: "var(--bl-color-neutral-full, #fff)",
    },
  };
  const c = colorMap[props.color] ?? colorMap["primary"];
  return {
    backgroundColor: c.bg,
    color: c.text,
  };
});

onMounted(() => {
  loadBaklavaResources();
  checkDismissed();
});
</script>

<template>
  <div v-if="!isDismissed" class="bv-banner" :style="colorStyles" role="banner">
    <component
      :is="to ? BvLink : 'div'"
      v-bind="to ? { href: to, target } : {}"
      class="bv-banner__inner"
      :class="{ 'bv-banner__inner--link': !!to }"
    >
      <div class="bv-banner__content">
        <slot name="leading">
          <BvIcon v-if="icon" :name="icon" class="bv-banner__icon" />
        </slot>
        <div class="bv-banner__title">
          <slot name="title">
            {{ title }}
          </slot>
        </div>
        <div
          v-if="actions?.length || $slots['actions']"
          class="bv-banner__actions"
          @click.stop
        >
          <slot name="actions">
            <template v-for="(action, idx) in actions" :key="idx">
              <BvButton
                v-if="action"
                :variant="action.variant ?? 'tertiary'"
                :label="action.label"
                :icon="action.icon ?? action.trailingIcon"
                size="small"
                class="bv-banner__action-btn"
                @click="handleActionClick(action)"
              />
            </template>
          </slot>
        </div>
      </div>
    </component>
    <div v-if="close" class="bv-banner__close">
      <slot name="close">
        <button
          type="button"
          class="bv-banner__close-btn"
          :aria-label="'Close banner'"
          @click="handleClose"
        >
          <BvIcon :name="closeIcon" :color="colorStyles.color" />
        </button>
      </slot>
    </div>
  </div>
</template>

<style scoped>
.bv-banner {
  position: relative;
  z-index: 50;
  width: 100%;
  min-height: 3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0 1rem;
  transition: background-color 0.2s ease;
}

.bv-banner__inner {
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: inherit;
}

.bv-banner__inner--link:hover {
  opacity: 0.95;
}

.bv-banner__content {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  min-width: 0;
  flex: 1;
}

.bv-banner__icon {
  flex-shrink: 0;
  width: 1.25rem;
  height: 1.25rem;
  pointer-events: none;
}

.bv-banner__title {
  flex: 1;
  min-width: 0;
  font-size: 0.875rem;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.bv-banner__actions {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  flex-shrink: 0;
}

.bv-banner__action-btn {
  --bl-color-primary: currentColor;
  --bl-color-primary-contrast: currentColor;
}

.bv-banner__close {
  flex-shrink: 0;
}

.bv-banner__close-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem;
  margin: 0 -0.25rem;
  background: transparent;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  color: inherit;
}

.bv-banner__close-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

.bv-banner__close-btn:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 2px;
}
</style>
