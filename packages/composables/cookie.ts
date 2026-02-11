import { ref, watch, type Ref } from "vue";

type StorageLike = Pick<Storage, "getItem" | "setItem" | "removeItem">;

/** Cookie attributes when setting. */
export interface UseCookieOptions<T> {
  /** Merge default with stored value when both are objects. Default: false */
  mergeDefaults?: boolean | ((storageValue: T, defaults: T) => T);
  /** Custom serializer. Default: JSON */
  serializer?: { read: (raw: string) => T; write: (value: T) => string };
  /** Error callback. Default: silent */
  onError?: (error: unknown) => void;
  /** Cookie path. Default: '/' */
  path?: string;
  /** Cookie domain */
  domain?: string;
  /** Max age in seconds. Takes precedence over expires. */
  maxAge?: number;
  /** Expiration date. Ignored if maxAge is set. */
  expires?: Date;
  /** Secure flag (HTTPS only) */
  secure?: boolean;
  /** SameSite attribute */
  sameSite?: "Strict" | "Lax" | "None";
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
  mergeDefaults: UseCookieOptions<T>["mergeDefaults"],
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

function getCookieStorage(cookieOptions: {
  path?: string;
  domain?: string;
  maxAge?: number;
  expires?: Date;
  secure?: boolean;
  sameSite?: "Strict" | "Lax" | "None";
}): StorageLike | null {
  if (typeof document === "undefined") return null;
  const { path = "/", domain, maxAge, expires, secure, sameSite } = cookieOptions;

  const buildCookieString = (key: string, value: string) => {
    const encoded = encodeURIComponent(value);
    const parts = [`${key}=${encoded}`, `path=${path}`];
    if (domain) parts.push(`domain=${domain}`);
    if (maxAge != null) parts.push(`max-age=${maxAge}`);
    else if (expires) parts.push(`expires=${expires.toUTCString()}`);
    if (secure) parts.push("secure");
    if (sameSite) parts.push(`samesite=${sameSite}`);
    return parts.join("; ");
  };

  return {
    getItem(key: string): string | null {
      const cookies = document.cookie.split("; ");
      for (const cookie of cookies) {
        const eq = cookie.indexOf("=");
        if (eq === -1) continue;
        const name = decodeURIComponent(cookie.slice(0, eq));
        if (name === key) {
          return decodeURIComponent(cookie.slice(eq + 1));
        }
      }
      return null;
    },
    setItem(key: string, value: string): void {
      document.cookie = buildCookieString(key, value);
    },
    removeItem(key: string): void {
      const parts = [`${key}=`, `path=${path}`, "max-age=0"];
      if (domain) parts.push(`domain=${domain}`);
      document.cookie = parts.join("; ");
    },
  };
}

export interface UseCookieReturn<T> {
  /** Reactive ref that syncs with the cookie */
  value: Ref<T>;
  /** Read current value from cookie */
  get: () => T;
  /** Write value to cookie */
  set: (value: T) => void;
  /** Remove cookie and reset to defaultValue */
  remove: () => void;
}

/**
 * Composable for reactive sync with document.cookie.
 * Persists the value in a cookie. Useful for auth tokens, preferences that must
 * be sent to the server, or values that need path/domain/expiry control.
 *
 * @example
 * ```ts
 * const { value: token, set, remove } = useCookie("auth-token", "");
 * set("new-token");
 * remove();
 * ```
 *
 * @example
 * ```ts
 * const { value: theme } = useCookie("theme", "vue", { path: "/", maxAge: 60 * 60 * 24 * 365 });
 * ```
 *
 * @param key - Cookie name
 * @param defaultValue - Default value when cookie is missing or on SSR
 * @param options - Optional: mergeDefaults, serializer, onError, path, domain, maxAge, expires, secure, sameSite
 * @returns Object with value ref, get, set, remove
 */
export function useCookie<T>(key: string, defaultValue: T): UseCookieReturn<T>;
export function useCookie<T>(key: string, defaultValue: T, options: UseCookieOptions<T>): UseCookieReturn<T>;
export function useCookie<T>(
  key: string,
  defaultValue: T,
  options?: UseCookieOptions<T>,
): UseCookieReturn<T> {
  const opts = options ?? {};
  const {
    path,
    domain,
    maxAge,
    expires,
    secure,
    sameSite,
    mergeDefaults,
    serializer = defaultSerializer as { read: (raw: string) => T; write: (value: T) => string },
    onError,
  } = opts;

  const handleError = (err: unknown) => {
    onError?.(err);
  };

  const storage = getCookieStorage({ path, domain, maxAge, expires, secure, sameSite });

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

  const value = ref<T>(init());

  watch(
    value,
    (val) => {
      if (!storage) return;
      try {
        if (val === undefined || val === null) {
          storage.removeItem(key);
        } else {
          storage.setItem(key, serializer.write(val));
        }
      } catch (err) {
        handleError(err);
      }
    },
    { deep: true },
  );

  return {
    value: value as Ref<T>,
    get: () => {
      if (!storage) return value.value;
      try {
        const raw = storage.getItem(key);
        if (raw == null) return defaultValue;
        const stored = serializer.read(raw) as T;
        return mergeWithDefaults(stored, defaultValue, mergeDefaults);
      } catch (err) {
        handleError(err);
        return value.value;
      }
    },
    set: (val: T) => {
      value.value = val;
    },
    remove: () => {
      if (storage) {
        try {
          storage.removeItem(key);
        } catch (err) {
          handleError(err);
        }
      }
      value.value = defaultValue;
    },
  };
}
