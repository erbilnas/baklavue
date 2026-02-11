import { onMounted, onScopeDispose, ref, watch } from "vue";

export type ColorScheme = "light" | "dark" | "system";

export interface UseColorSchemeOptions {
  /**
   * localStorage key for persisting the scheme choice.
   * Set to false to disable persistence.
   * @default "color-scheme"
   */
  storageKey?: string | false;
  /**
   * Attribute to set on the target element (e.g. "data-theme" or "class").
   * When "class", uses value "dark" for dark mode and removes it for light.
   * @default "data-theme"
   */
  attribute?: "data-theme" | "class";
  /**
   * Selector for the element to apply the attribute.
   * @default "html"
   */
  selector?: string;
  /**
   * Default scheme when no stored value exists.
   * @default "system"
   */
  defaultScheme?: ColorScheme;
}

function getSystemPrefersDark(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function applyToDocument(
  element: Element,
  attribute: "data-theme" | "class",
  isDark: boolean,
): void {
  if (attribute === "data-theme") {
    element.setAttribute("data-theme", isDark ? "dark" : "light");
  } else {
    if (isDark) {
      element.classList.add("dark");
    } else {
      element.classList.remove("dark");
    }
  }
}

/**
 * Composable for light/dark/system color scheme with persistence.
 * Supports prefers-color-scheme for "system", optional attribute on document,
 * and localStorage persistence.
 *
 * @example
 * ```ts
 * const { scheme, isDark, setScheme } = useColorScheme();
 *
 * // Toggle between light/dark
 * setScheme(isDark.value ? "light" : "dark");
 *
 * // Use system preference
 * setScheme("system");
 * ```
 *
 * @param options - Optional: storageKey, attribute, selector, defaultScheme
 * @returns Object with scheme, isDark, setScheme
 */
export function useColorScheme(options: UseColorSchemeOptions = {}) {
  const {
    storageKey = "color-scheme",
    attribute = "data-theme",
    selector = "html",
    defaultScheme = "system",
  } = options;

  const scheme = ref<ColorScheme>(defaultScheme);
  const isDark = ref(false);

  if (storageKey && typeof window !== "undefined") {
    try {
      const stored = localStorage.getItem(storageKey);
      if (
        stored === "light" ||
        stored === "dark" ||
        stored === "system"
      ) {
        scheme.value = stored;
      }
    } catch {
      // ignore
    }
  }

  function syncIsDark() {
    if (scheme.value === "light") {
      isDark.value = false;
    } else if (scheme.value === "dark") {
      isDark.value = true;
    } else {
      isDark.value = getSystemPrefersDark();
    }
  }

  function syncAttribute() {
    if (typeof document === "undefined") return;
    const el = document.querySelector(selector);
    if (!el) return;
    applyToDocument(el, attribute, isDark.value);
  }

  function setScheme(value: ColorScheme) {
    scheme.value = value;
    if (storageKey) {
      try {
        localStorage.setItem(storageKey, value);
      } catch {
        // ignore
      }
    }
  }

  syncIsDark();

  watch(scheme, () => {
    syncIsDark();
    syncAttribute();
  });

  watch(isDark, () => {
    syncAttribute();
  });

  onMounted(() => {
    syncIsDark();
    syncAttribute();

    if (scheme.value === "system" && typeof window !== "undefined") {
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      const handler = () => {
        syncIsDark();
        syncAttribute();
      };
      mq.addEventListener("change", handler);
      onScopeDispose(() => mq.removeEventListener("change", handler));
    }
  });

  return {
    scheme,
    isDark,
    setScheme,
  };
}
