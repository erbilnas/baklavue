<script setup lang="ts">
import { computed } from "vue";
import {
  FONT_PRESETS,
  NEUTRAL_PRESETS,
  PRIMARY_PRESETS,
  RADIUS_PRESETS,
  isValidHex,
  useThemeCustomizer,
} from "../composables/useThemeCustomizer";

const props = defineProps<{
  open: boolean;
}>();

const emit = defineEmits<{
  close: [];
}>();

const {
  primary,
  neutral,
  radius,
  font,
  colorMode,
  customPrimaryColor,
  customFontFamily,
} = useThemeCustomizer();

const hasCustomPrimary = computed(
  () => !!customPrimaryColor.value && isValidHex(customPrimaryColor.value),
);

function close() {
  emit("close");
}

function selectPresetColor(id: string) {
  primary.value = id;
  customPrimaryColor.value = "";
}
</script>

<template>
  <Teleport to="body">
    <Transition name="overlay">
      <div
        v-if="open"
        class="theme-customizer-overlay"
        @click.self="close"
        role="presentation"
      >
        <aside
          class="theme-customizer-drawer"
          role="dialog"
          aria-label="Theme customizer"
        >
          <header class="theme-customizer-header">
            <div class="theme-customizer-header-inner">
              <div class="theme-customizer-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <circle cx="12" cy="12" r="3" />
                  <path d="M12 1v2" />
                  <path d="M12 21v2" />
                  <path d="M4.22 4.22l1.42 1.42" />
                  <path d="M18.36 18.36l1.42 1.42" />
                  <path d="M1 12h2" />
                  <path d="M21 12h2" />
                  <path d="M4.22 19.78l1.42-1.42" />
                  <path d="M18.36 5.64l1.42-1.42" />
                </svg>
              </div>
              <div>
                <h2 class="theme-customizer-title">Theme Customizer</h2>
                <p class="theme-customizer-subtitle">
                  Customize colors, typography & more
                </p>
              </div>
            </div>
            <button
              type="button"
              class="theme-customizer-close"
              aria-label="Close"
              @click="close"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </header>

          <div class="theme-customizer-content">
            <!-- Primary Color -->
            <section class="theme-customizer-section">
              <div class="theme-customizer-section-header">
                <label class="theme-customizer-label">Primary Color</label>
                <span class="theme-customizer-info" title="Primary accent color"
                  >ⓘ</span
                >
              </div>
              <div class="theme-customizer-swatches">
                <button
                  v-for="p in PRIMARY_PRESETS"
                  :key="p.id"
                  type="button"
                  class="theme-customizer-swatch"
                  :class="{ active: primary === p.id && !hasCustomPrimary }"
                  :title="p.label"
                  @click="selectPresetColor(p.id)"
                >
                  <span class="swatch-dot" :style="{ background: p.primary }" />
                  <span class="swatch-label">{{ p.label }}</span>
                </button>
              </div>
              <div class="theme-customizer-custom-row">
                <div class="theme-customizer-input-group">
                  <input
                    :value="customPrimaryColor || '#41b883'"
                    type="color"
                    class="theme-customizer-color-input"
                    title="Pick custom color"
                    @input="
                      customPrimaryColor = ($event.target as HTMLInputElement)
                        .value
                    "
                  />
                  <input
                    v-model="customPrimaryColor"
                    type="text"
                    class="theme-customizer-text-input"
                    placeholder="#hex or pick"
                    maxlength="7"
                  />
                </div>
                <span
                  v-if="customPrimaryColor && !isValidHex(customPrimaryColor)"
                  class="theme-customizer-hint theme-customizer-hint--error"
                >
                  Invalid hex
                </span>
              </div>
            </section>

            <!-- Neutral Color -->
            <section class="theme-customizer-section">
              <div class="theme-customizer-section-header">
                <label class="theme-customizer-label">Neutral</label>
                <span class="theme-customizer-info" title="Neutral gray tones"
                  >ⓘ</span
                >
              </div>
              <div
                class="theme-customizer-swatches theme-customizer-swatches--compact"
              >
                <button
                  v-for="n in NEUTRAL_PRESETS"
                  :key="n.id"
                  type="button"
                  class="theme-customizer-swatch"
                  :class="{ active: neutral === n.id }"
                  :title="n.label"
                  @click="neutral = n.id"
                >
                  <span
                    class="swatch-dot"
                    :style="{ background: n.neutralDarkest }"
                  />
                  <span class="swatch-label">{{ n.label }}</span>
                </button>
              </div>
            </section>

            <!-- Radius -->
            <section class="theme-customizer-section">
              <div class="theme-customizer-section-header">
                <label class="theme-customizer-label">Radius</label>
                <span class="theme-customizer-info" title="Border radius"
                  >ⓘ</span
                >
              </div>
              <div class="theme-customizer-buttons">
                <button
                  v-for="r in RADIUS_PRESETS"
                  :key="r.id"
                  type="button"
                  class="theme-customizer-btn"
                  :class="{ active: radius === r.id }"
                  @click="radius = r.id"
                >
                  {{ r.label }}
                </button>
              </div>
            </section>

            <!-- Font -->
            <section class="theme-customizer-section">
              <div class="theme-customizer-section-header">
                <label class="theme-customizer-label">Font</label>
                <span class="theme-customizer-info" title="Typography">ⓘ</span>
              </div>
              <select v-model="font" class="theme-customizer-select">
                <option v-for="f in FONT_PRESETS" :key="f.id" :value="f.id">
                  {{ f.label }}
                </option>
              </select>
              <div class="theme-customizer-custom-row">
                <input
                  v-model="customFontFamily"
                  type="text"
                  class="theme-customizer-text-input theme-customizer-text-input--full"
                  placeholder="Custom CSS: e.g. 'Georgia', serif or 'JetBrains Mono', monospace"
                />
              </div>
            </section>

            <!-- Color Mode -->
            <section class="theme-customizer-section">
              <div class="theme-customizer-section-header">
                <label class="theme-customizer-label">Color Mode</label>
                <span
                  class="theme-customizer-info"
                  title="Light, dark, or system"
                  >ⓘ</span
                >
              </div>
              <div
                class="theme-customizer-buttons theme-customizer-buttons--mode"
              >
                <button
                  type="button"
                  class="theme-customizer-btn theme-customizer-btn--icon"
                  :class="{ active: colorMode === 'system' }"
                  title="System"
                  @click="colorMode = 'system'"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <rect width="14" height="10" x="5" y="2" rx="2" />
                    <path d="M12 18v4" />
                    <path d="M8 22h8" />
                  </svg>
                  <span>System</span>
                </button>
                <button
                  type="button"
                  class="theme-customizer-btn theme-customizer-btn--icon"
                  :class="{ active: colorMode === 'light' }"
                  title="Light"
                  @click="colorMode = 'light'"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2v2" />
                    <path d="M12 20v2" />
                    <path d="m4.93 4.93 1.41 1.41" />
                    <path d="m17.66 17.66 1.41 1.41" />
                    <path d="M2 12h2" />
                    <path d="M20 12h2" />
                    <path d="m6.34 17.66-1.41 1.41" />
                    <path d="m19.07 4.93-1.41 1.41" />
                  </svg>
                  <span>Light</span>
                </button>
                <button
                  type="button"
                  class="theme-customizer-btn theme-customizer-btn--icon"
                  :class="{ active: colorMode === 'dark' }"
                  title="Dark"
                  @click="colorMode = 'dark'"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                  </svg>
                  <span>Dark</span>
                </button>
              </div>
            </section>
          </div>
        </aside>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.theme-customizer-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: color-mix(in srgb, var(--vp-c-text-1) 12%, transparent);
}

.overlay-enter-active,
.overlay-leave-active {
  transition: opacity 0.2s ease;
}
.overlay-enter-from,
.overlay-leave-to {
  opacity: 0;
}
.overlay-enter-active .theme-customizer-drawer,
.overlay-leave-active .theme-customizer-drawer {
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}
.overlay-enter-from .theme-customizer-drawer,
.overlay-leave-to .theme-customizer-drawer {
  transform: translateX(100%);
}

.theme-customizer-drawer {
  position: absolute;
  top: 0;
  right: 0;
  width: min(360px, 92vw);
  height: 100%;
  background: var(--vp-c-bg);
  border-left: 1px solid var(--vp-c-divider);
  box-shadow: -8px 0 32px
    color-mix(in srgb, var(--vp-c-text-1) 15%, transparent);
  display: flex;
  flex-direction: column;
}

.theme-customizer-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid var(--vp-c-divider);
  background: linear-gradient(
    180deg,
    color-mix(in srgb, var(--vp-c-brand-1) 6%, var(--vp-c-bg)) 0%,
    var(--vp-c-bg) 100%
  );
}

.theme-customizer-header-inner {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.theme-customizer-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 10px;
  background: color-mix(in srgb, var(--vp-c-brand-1) 14%, transparent);
  color: var(--vp-c-brand-1);
}

.theme-customizer-title {
  margin: 0;
  font-size: 1.0625rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  letter-spacing: -0.02em;
}

.theme-customizer-subtitle {
  margin: 0.125rem 0 0;
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
}

.theme-customizer-close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  padding: 0;
  border: none;
  border-radius: 8px;
  background: transparent;
  color: var(--vp-c-text-2);
  cursor: pointer;
  transition:
    background 0.2s,
    color 0.2s;
}

.theme-customizer-close:hover {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
}

.theme-customizer-content {
  flex: 1;
  overflow-y: auto;
  padding: 1.25rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
}

.theme-customizer-section {
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
}

.theme-customizer-section-header {
  display: flex;
  align-items: center;
  gap: 0.35rem;
}

.theme-customizer-label {
  font-size: 0.6875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--vp-c-text-2);
}

.theme-customizer-info {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
  cursor: help;
  opacity: 0.8;
}

.theme-customizer-swatches {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
}

.theme-customizer-swatches--compact {
  grid-template-columns: repeat(5, 1fr);
}

.theme-customizer-swatch {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.35rem;
  padding: 0.5rem 0.25rem;
  border: 1.5px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  font-size: 0.625rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.theme-customizer-swatch:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-text-1);
  background: color-mix(in srgb, var(--vp-c-brand-1) 6%, var(--vp-c-bg-soft));
}

.theme-customizer-swatch.active {
  border-color: var(--vp-c-brand-1);
  background: color-mix(in srgb, var(--vp-c-brand-1) 14%, transparent);
  color: var(--vp-c-text-1);
  box-shadow: 0 0 0 1px var(--vp-c-brand-1);
}

.swatch-dot {
  width: 1.125rem;
  height: 1.125rem;
  border-radius: 50%;
  background: currentColor;
  box-shadow: 0 1px 2px color-mix(in srgb, black 15%, transparent);
}

.swatch-label {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}

.theme-customizer-custom-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.25rem;
}

.theme-customizer-input-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex: 1;
}

.theme-customizer-color-input {
  width: 2.25rem;
  height: 2.25rem;
  padding: 2px;
  border: 1.5px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  cursor: pointer;
  flex-shrink: 0;
}

.theme-customizer-color-input::-webkit-color-swatch-wrapper {
  padding: 2px;
}

.theme-customizer-color-input::-webkit-color-swatch {
  border-radius: 4px;
  border: none;
}

.theme-customizer-text-input {
  flex: 1;
  min-width: 0;
  padding: 0.5rem 0.75rem;
  border: 1.5px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  font-size: 0.8125rem;
  font-family: ui-monospace, monospace;
  transition:
    border-color 0.2s,
    box-shadow 0.2s;
}

.theme-customizer-text-input:focus {
  outline: none;
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 0 0 2px color-mix(in srgb, var(--vp-c-brand-1) 25%, transparent);
}

.theme-customizer-text-input::placeholder {
  color: var(--vp-c-text-3);
}

.theme-customizer-text-input--full {
  width: 100%;
}

.theme-customizer-hint {
  font-size: 0.6875rem;
  color: var(--vp-c-text-3);
}

.theme-customizer-hint--error {
  color: var(--vp-c-danger-1, #ef4444);
}

.theme-customizer-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.theme-customizer-buttons--mode {
  gap: 0.375rem;
}

.theme-customizer-btn {
  padding: 0.4rem 0.8rem;
  border: 1.5px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.theme-customizer-btn:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-text-1);
  background: color-mix(in srgb, var(--vp-c-brand-1) 6%, var(--vp-c-bg-soft));
}

.theme-customizer-btn.active {
  border-color: var(--vp-c-brand-1);
  background: color-mix(in srgb, var(--vp-c-brand-1) 14%, transparent);
  color: var(--vp-c-text-1);
}

.theme-customizer-btn--icon {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.theme-customizer-select {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1.5px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  font-size: 0.875rem;
  cursor: pointer;
  transition: border-color 0.2s;
}

.theme-customizer-select:focus {
  outline: none;
  border-color: var(--vp-c-brand-1);
}
</style>
