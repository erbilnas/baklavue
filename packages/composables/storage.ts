import { ref, watch } from "vue";

type StorageLike = Pick<Storage, "getItem" | "setItem" | "removeItem">;

function createStorageRef<T>(
  key: string,
  defaultValue: T,
  storage: StorageLike | null,
  serializer: { read: (raw: string) => T; write: (value: T) => string },
) {
  const init = (): T => {
    if (!storage) return defaultValue;
    try {
      const raw = storage.getItem(key);
      if (raw == null) return defaultValue;
      return serializer.read(raw) as T;
    } catch {
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
      } catch {
        // Ignore quota exceeded or other storage errors
      }
    },
    { deep: true },
  );

  return data;
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
 * @returns Ref that syncs with localStorage
 */
export const useLocalStorage = <T>(key: string, defaultValue: T) => {
  return createStorageRef(key, defaultValue, getStorage("localStorage"), defaultSerializer);
};

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
 * @returns Ref that syncs with sessionStorage
 */
export const useSessionStorage = <T>(key: string, defaultValue: T) => {
  return createStorageRef(key, defaultValue, getStorage("sessionStorage"), defaultSerializer);
};
