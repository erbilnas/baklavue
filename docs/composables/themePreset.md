# useThemePreset

A composable to persist and apply Baklava theme preset across sessions. Combines `useBaklavaTheme` and `useLocalStorage`. Re-applies theme when preset changes.

## Basic Usage

```vue
<template>
  <BvSelect v-model="preset" :options="presetOptions" />
</template>

<script setup>
import { BvSelect } from "@baklavue/ui";
import { useThemePreset } from "@baklavue/composables";

const { preset, setPreset, applyTheme } = useThemePreset();

const presetOptions = [
  { value: "vue", text: "Vue" },
  { value: "default", text: "Default" },
];
</script>
```

## Options

```vue
<script setup>
import { useThemePreset } from "@baklavue/composables";

const { preset, setPreset, applyTheme } = useThemePreset({
  storageKey: "theme-preset",
  defaultPreset: "vue",
});
</script>
```

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `storageKey` | `string` | `"theme-preset"` | localStorage key |
| `defaultPreset` | `"vue" \| "default"` | `"vue"` | Default when no stored value exists |

## API

### Return Value

| Property | Type | Description |
| --- | --- | --- |
| `preset` | `Ref<BaklavaThemePreset>` | Current preset (persisted) |
| `setPreset` | `(value: BaklavaThemePreset) => void` | Set preset and re-apply |
| `applyTheme` | `() => void` | Manually re-apply current preset |

## TypeScript Support

```typescript
import {
  useThemePreset,
  type UseThemePresetOptions,
} from "@baklavue/composables";

const { preset, setPreset } = useThemePreset({ defaultPreset: "default" });
```
