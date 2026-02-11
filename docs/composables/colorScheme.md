# useColorScheme

A composable for light/dark/system color scheme with persistence. Supports `prefers-color-scheme` for system preference, optional attribute on document, and localStorage persistence.

## Basic Usage

```vue
<template>
  <BvButton @click="toggleScheme">
    {{ isDark ? "Light" : "Dark" }} mode
  </BvButton>
</template>

<script setup>
import { BvButton } from "@baklavue/ui";
import { useColorScheme } from "@baklavue/composables";

const { scheme, isDark, setScheme } = useColorScheme();

function toggleScheme() {
  setScheme(isDark.value ? "light" : "dark");
}
</script>
```

## System Preference

Use `"system"` to follow the OS preference:

```vue
<script setup>
import { useColorScheme } from "@baklavue/composables";

const { scheme, setScheme } = useColorScheme();

// Follow system
setScheme("system");
</script>
```

## Options

```vue
<script setup>
import { useColorScheme } from "@baklavue/composables";

const { scheme, isDark, setScheme } = useColorScheme({
  storageKey: "app-color-scheme",
  attribute: "data-theme",
  selector: "html",
  defaultScheme: "system",
});
</script>
```

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `storageKey` | `string \| false` | `"color-scheme"` | localStorage key. Set to `false` to disable persistence |
| `attribute` | `"data-theme" \| "class"` | `"data-theme"` | Attribute to set on `document.documentElement` |
| `selector` | `string` | `"html"` | Selector for the element to apply the attribute |
| `defaultScheme` | `"light" \| "dark" \| "system"` | `"system"` | Default when no stored value exists |

## With `attribute: "class"`

When using `attribute: "class"`, the composable adds `dark` class for dark mode and removes it for light:

```vue
<script setup>
import { useColorScheme } from "@baklavue/composables";

useColorScheme({ attribute: "class" });
</script>

<template>
  <div class="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
    Content
  </div>
</template>
```

## API

### Return Value

| Property | Type | Description |
| --- | --- | --- |
| `scheme` | `Ref<"light" \| "dark" \| "system">` | Current scheme choice |
| `isDark` | `Ref<boolean>` | `true` when dark mode is active |
| `setScheme` | `(value: ColorScheme) => void` | Set scheme and persist |

### ColorScheme

```typescript
type ColorScheme = "light" | "dark" | "system";
```

## TypeScript Support

```typescript
import {
  useColorScheme,
  type ColorScheme,
  type UseColorSchemeOptions,
} from "@baklavue/composables";

const { scheme, isDark, setScheme } = useColorScheme({
  storageKey: "my-app-theme",
  defaultScheme: "system",
});
```
