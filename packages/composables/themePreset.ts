import { watch } from "vue";
import type { BaklavaThemePreset } from "./theme";
import { useBaklavaTheme } from "./theme";
import { useLocalStorage } from "./storage";

export interface UseThemePresetOptions {
  /**
   * localStorage key for persisting the preset choice.
   * @default "theme-preset"
   */
  storageKey?: string;
  /**
   * Default preset when no stored value exists.
   * @default "vue"
   */
  defaultPreset?: BaklavaThemePreset;
}

/**
 * Composable to persist and apply Baklava theme preset across sessions.
 * Combines useBaklavaTheme and useLocalStorage. Re-applies theme when preset changes.
 *
 * @example
 * ```ts
 * const { preset, setPreset, applyTheme } = useThemePreset();
 *
 * // User selects preset from dropdown
 * setPreset("default");
 *
 * // Manually re-apply (e.g. after hydration)
 * applyTheme();
 * ```
 *
 * @param options - Optional: storageKey, defaultPreset
 * @returns Object with preset ref, setPreset, and applyTheme
 */
export function useThemePreset(options: UseThemePresetOptions = {}) {
  const { storageKey = "theme-preset", defaultPreset = "vue" } = options;

  const preset = useLocalStorage<BaklavaThemePreset>(storageKey, defaultPreset);
  const { applyTheme: applyBaklavaTheme } = useBaklavaTheme();

  function applyTheme() {
    applyBaklavaTheme({ preset: preset.value });
  }

  watch(
    preset,
    (value) => {
      applyBaklavaTheme({ preset: value });
    },
    { immediate: true },
  );

  function setPreset(value: BaklavaThemePreset) {
    preset.value = value;
  }

  return {
    preset,
    setPreset,
    applyTheme,
  };
}
