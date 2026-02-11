# Theme & Layout Composables

## useBaklavaTheme

[useBaklavaTheme](/composables/theme) · `import { useBaklavaTheme } from "@baklavue/composables"`

Overwrite Baklava design system colors by injecting CSS variables.

```typescript
const { applyTheme } = useBaklavaTheme();

// Vue preset
applyTheme({ preset: "vue" });

// Custom preset (CSS variable map)
applyTheme({
  preset: {
    "--bl-color-primary": "#ea4c89",
    "--bl-color-primary-highlight": "#d6427a",
  },
});

// Custom colors (shorthand)
applyTheme({
  colors: { primary: "#41B883", primaryHighlight: "#3aa876" },
});
```

**ApplyThemeOptions:**

| Key      | Type                                             | Description               |
| -------- | ------------------------------------------------ | ------------------------- |
| `preset` | `"vue" \| "default" \| BaklavaThemePresetRecord` | Built-in or custom preset |
| `colors` | `Partial<BaklavaThemeColors>`                    | Override specific tokens  |

**BaklavaThemeColors:** `primary`, `primaryHighlight`, `primaryContrast`, `success`, `successHighlight`, `successContrast`, `danger`, `warning`, `info`, `neutralDarkest`, `neutralDarker`, `neutralDark`, `neutralLight`, `neutralLighter`, `neutralLightest`, `neutralFull`

## useColorScheme

[useColorScheme](/composables/colorScheme) · `import { useColorScheme } from "@baklavue/composables"`

Light/dark/system color scheme with persistence. Supports `prefers-color-scheme`, optional attribute on document, and localStorage.

```typescript
const { scheme, isDark, setScheme } = useColorScheme();
setScheme("dark");
```

**Options:** `storageKey`, `attribute`, `selector`, `defaultScheme`

## useThemePreset

[useThemePreset](/composables/themePreset) · `import { useThemePreset } from "@baklavue/composables"`

Persist and apply Baklava theme preset across sessions. Combines useBaklavaTheme and useLocalStorage.

```typescript
const { preset, setPreset, applyTheme } = useThemePreset();
setPreset("vue");
```

**Options:** `storageKey`, `defaultPreset`

## usePagination

[usePagination](/composables/pagination) · `import { usePagination } from "@baklavue/composables"`

Pagination state for BvPagination and BvTable.

```typescript
const {
  currentPage,
  pageSize,
  totalItems,
  totalPages,
  setPage,
  setPageSize,
  slice,
} = usePagination({ totalItems: 100, pageSize: 10 });
```
