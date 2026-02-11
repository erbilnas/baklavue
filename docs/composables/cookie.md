# useCookie

Reactive sync with `document.cookie`. Persists values in a cookie. Use for auth tokens, preferences that must be sent to the server, or when you need path/domain/expiry control. Cookies are sent with every request to matching paths.

Returns `{ value, get, set, remove }` for reactive and imperative cookie access.

## Basic usage

```vue
<script setup>
import { useCookie } from "@baklavue/composables";

const { value: token, get, set, remove } = useCookie("auth-token", "");
const { value: theme } = useCookie("theme", "vue", { path: "/", maxAge: 60 * 60 * 24 * 365 });

// Imperative API
set("new-token");
const current = get();  // read from cookie
remove();              // clear cookie
</script>
```

## Imperative API

| Method | Description |
| --- | --- |
| `value` | Reactive ref for `v-model` and template binding |
| `get()` | Read current value from cookie |
| `set(value)` | Write value to cookie |
| `remove()` | Delete cookie and reset to defaultValue |

## Cookie options

| Option | Type | Description |
| --- | --- | --- |
| `path` | `string` | Cookie path. Default: `'/'` |
| `domain` | `string` | Cookie domain |
| `maxAge` | `number` | Max age in seconds. Takes precedence over `expires` |
| `expires` | `Date` | Expiration date |
| `secure` | `boolean` | HTTPS only |
| `sameSite` | `'Strict' \| 'Lax' \| 'None'` | SameSite attribute |

`useCookie` also supports `mergeDefaults`, `serializer`, and `onError`.

## Options

```typescript
interface UseCookieOptions<T> {
  mergeDefaults?: boolean | ((storageValue: T, defaults: T) => T);
  serializer?: { read: (raw: string) => T; write: (value: T) => string };
  onError?: (error: unknown) => void;
  path?: string;
  domain?: string;
  maxAge?: number;
  expires?: Date;
  secure?: boolean;
  sameSite?: "Strict" | "Lax" | "None";
}
```

### mergeDefaults

When you add new properties to your default object, existing stored values won't have them. Enable `mergeDefaults: true` for a shallow merge:

```typescript
import { useCookie } from "@baklavue/composables";

const { value: prefs } = useCookie("prefs", { theme: "vue", compact: false }, {
  mergeDefaults: true,
  path: "/",
});
```

### Custom serializer

Store `Map`, `Set`, `Date`, or custom formats:

```typescript
import { useCookie } from "@baklavue/composables";

const { value: lastVisit } = useCookie("last-visit", new Date(), {
  serializer: {
    read: (v) => new Date(v),
    write: (v) => v.toISOString(),
  },
  path: "/",
});
```

### onError

Handle parse errors:

```typescript
const { value: prefs } = useCookie("prefs", {}, {
  onError: (e) => console.error("Cookie error:", e),
  path: "/",
});
```

## API

```typescript
useCookie<T>(key: string, defaultValue: T): UseCookieReturn<T>
useCookie<T>(key: string, defaultValue: T, options: UseCookieOptions<T>): UseCookieReturn<T>
```

```typescript
interface UseCookieReturn<T> {
  value: Ref<T>;
  get: () => T;
  set: (value: T) => void;
  remove: () => void;
}
```

| Parameter | Type | Description |
| --- | --- | --- |
| `key` | `string` | Cookie name |
| `defaultValue` | `T` | Default when cookie is missing or on SSR |
| `options` | `UseCookieOptions<T>` | Optional: mergeDefaults, serializer, onError, path, domain, maxAge, expires, secure, sameSite |

### Notes

- Values are JSON-serialized by default. Primitives, objects, and arrays are supported.
- On SSR, returns `defaultValue` (cookies are not available).
- Changes to the ref are written to the cookie (with `{ deep: true }` for objects).
- Cookies have a ~4KB size limit per cookie.

## TypeScript Support

```typescript
import { useCookie, type UseCookieOptions, type UseCookieReturn } from "@baklavue/composables";

const { value: token, set, remove } = useCookie("auth-token", "");
const { value: theme } = useCookie("theme", "vue", { path: "/", maxAge: 31536000 });
```
