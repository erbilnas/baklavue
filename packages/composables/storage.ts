import { onScopeDispose, ref, watch, type Ref } from "vue";

type StorageLike = Pick<Storage, "getItem" | "setItem" | "removeItem">;

export interface UseStorageOptions<T> {
  /** Merge default with stored value when both are objects. Default: false */
  mergeDefaults?: boolean | ((storageValue: T, defaults: T) => T);
  /** Listen to storage events for cross-tab sync. Default: true for localStorage, false for sessionStorage */
  listenToStorageChanges?: boolean;
  /** Custom serializer. Default: JSON */
  serializer?: { read: (raw: string) => T; write: (value: T) => string };
  /** Error callback. Default: silent */
  onError?: (error: unknown) => void;
}

const defaultSerializer = {
  read: (raw: string) => {
    try {
      return JSON.parse(raw) as unknown;
    } catch {
      return raw;
    }
  },
  write: (value: unknown) => JSON.stringify(value),
};

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return (
    value != null &&
    typeof value === "object" &&
    !Array.isArray(value) &&
    Object.getPrototypeOf(value) === Object.prototype
  );
}

function mergeWithDefaults<T>(
  storageValue: T,
  defaultValue: T,
  mergeDefaults: UseStorageOptions<T>["mergeDefaults"],
): T {
  if (mergeDefaults === undefined || mergeDefaults === false) {
    return storageValue;
  }
  if (typeof mergeDefaults === "function") {
    return mergeDefaults(storageValue, defaultValue);
  }
  if (mergeDefaults === true && isPlainObject(storageValue) && isPlainObject(defaultValue)) {
    return { ...defaultValue, ...storageValue } as T;
  }
  return storageValue;
}

function createStorageRef<T>(
  key: string,
  defaultValue: T,
  storage: StorageLike | null,
  storageType: "localStorage" | "sessionStorage",
  options: UseStorageOptions<T> = {},
): Ref<T> {
  const {
    mergeDefaults,
    listenToStorageChanges = storageType === "localStorage",
    serializer = defaultSerializer as { read: (raw: string) => T; write: (value: T) => string },
    onError,
  } = options;

  const handleError = (err: unknown) => {
    onError?.(err);
  };

  const init = (): T => {
    if (!storage) return defaultValue;
    try {
      const raw = storage.getItem(key);
      if (raw == null) return defaultValue;
      const stored = serializer.read(raw) as T;
      return mergeWithDefaults(stored, defaultValue, mergeDefaults);
    } catch (err) {
      handleError(err);
      return defaultValue;
    }
  };

  const data = ref<T>(init());

  watch(
    data,
    (value) => {
      if (!storage) return;
      try {
        if (value === undefined || value === null) {
          storage.removeItem(key);
        } else {
          storage.setItem(key, serializer.write(value));
        }
      } catch (err) {
        handleError(err);
      }
    },
    { deep: true },
  );

  if (storage && listenToStorageChanges && typeof window !== "undefined") {
    const handleStorage = (e: StorageEvent) => {
      if (e.key !== key || e.storageArea !== storage) return;
      try {
        if (e.newValue == null) {
          data.value = defaultValue;
        } else {
          const stored = serializer.read(e.newValue) as T;
          data.value = mergeWithDefaults(stored, defaultValue, mergeDefaults);
        }
      } catch (err) {
        handleError(err);
      }
    };
    window.addEventListener("storage", handleStorage);
    onScopeDispose(() => window.removeEventListener("storage", handleStorage));
  }

  return data as Ref<T>;
}

function getStorage(type: "localStorage" | "sessionStorage"): StorageLike | null {
  if (typeof window === "undefined") return null;
  try {
    return window[type];
  } catch {
    return null;
  }
}

/**
 * Composable for reactive sync with localStorage.
 * Persists the value across sessions. Works well with useBaklavaTheme and usePagination
 * for persisting theme, table page size, etc.
 *
 * @example
 * ```ts
 * const pageSize = useLocalStorage("table-page-size", 10);
 * const theme = useLocalStorage("theme", "vue");
 * ```
 *
 * @param key - Storage key
 * @param defaultValue - Default value when key is missing or on SSR
 * @param options - Optional: mergeDefaults, listenToStorageChanges, serializer, onError
 * @returns Ref that syncs with localStorage
 */
export function useLocalStorage<T>(key: string, defaultValue: T): Ref<T>;
export function useLocalStorage<T>(
  key: string,
  defaultValue: T,
  options: UseStorageOptions<T>,
): Ref<T>;
export function useLocalStorage<T>(
  key: string,
  defaultValue: T,
  options?: UseStorageOptions<T>,
): Ref<T> {
  return createStorageRef(
    key,
    defaultValue,
    getStorage("localStorage"),
    "localStorage",
    options ?? {},
  );
}

/**
 * Composable for reactive sync with sessionStorage.
 * Persists the value for the current tab/session only.
 *
 * @example
 * ```ts
 * const draft = useSessionStorage("form-draft", null);
 * ```
 *
 * @param key - Storage key
 * @param defaultValue - Default value when key is missing or on SSR
 * @param options - Optional: mergeDefaults, listenToStorageChanges, serializer, onError
 * @returns Ref that syncs with sessionStorage
 */
export function useSessionStorage<T>(key: string, defaultValue: T): Ref<T>;
export function useSessionStorage<T>(
  key: string,
  defaultValue: T,
  options: UseStorageOptions<T>,
): Ref<T>;
export function useSessionStorage<T>(
  key: string,
  defaultValue: T,
  options?: UseStorageOptions<T>,
): Ref<T> {
  return createStorageRef(
    key,
    defaultValue,
    getStorage("sessionStorage"),
    "sessionStorage",
    options ?? {},
  );
}
