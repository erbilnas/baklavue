import {
  isRef,
  onUnmounted,
  toValue,
  watch,
  type MaybeRefOrGetter,
  type Ref,
} from "vue";
import { useDebounceFn } from "./debounce";
import { useLocalStorage, useSessionStorage } from "./storage";

type StorageType = "localStorage" | "sessionStorage";

function safeClone<T>(val: T): T {
  try {
    if (typeof structuredClone === "function") {
      return structuredClone(val) as T;
    }
  } catch {
    /* structuredClone fails on proxies */
  }
  return JSON.parse(JSON.stringify(val)) as T;
}

export interface UseFormPersistenceOptions {
  /** Storage type. Default: 'localStorage' */
  storage?: StorageType;
  /** Debounce writes in ms. 0 = no debounce. Default: 300 */
  debounce?: number;
}

/**
 * Composable for auto-saving form data to localStorage or sessionStorage.
 * Useful for long forms, drafts, or preventing data loss on accidental navigation.
 *
 * @example
 * ```ts
 * const form = ref({ email: '', message: '' });
 * useFormPersistence('contact-draft', form);
 *
 * // With options
 * useFormPersistence('wizard-draft', form, {
 *   storage: 'sessionStorage',
 *   debounce: 500,
 * });
 * ```
 *
 * @param key - Storage key
 * @param data - Form data (ref, reactive, or getter)
 * @param options - Optional: storage, debounce
 * @returns clear - Call to remove persisted data
 */
export function useFormPersistence<T>(
  key: string,
  data: MaybeRefOrGetter<T>,
  options: UseFormPersistenceOptions = {},
): {
  clear: () => void;
} {
  const { storage = "localStorage", debounce: debounceMs = 300 } = options;

  const storageRef =
    storage === "localStorage"
      ? useLocalStorage<T | null>(key, null)
      : useSessionStorage<T | null>(key, null);

  const dataVal = () => toValue(data);
  const initial = dataVal();

  if (initial != null && storageRef.value == null) {
    storageRef.value = safeClone(initial);
  } else if (storageRef.value != null && isRef(data)) {
    (data as Ref<T>).value = safeClone(storageRef.value);
  }

  const persist = () => {
    const val = dataVal();
    if (val != null) {
      storageRef.value = safeClone(val);
    }
  };

  const debouncedPersist =
    debounceMs > 0 ? useDebounceFn(persist, debounceMs) : persist;

  const stopWatch = watch(
    () => toValue(data),
    debouncedPersist,
    { deep: true },
  );

  const clear = () => {
    storageRef.value = null;
  };

  onUnmounted(() => {
    stopWatch();
  });

  return { clear };
}
