# Composables

BaklaVue provides Vue 3 composables to enhance your application functionality.

## Available Composables

- [useCsv](/composables/csv) - Parse, create, and download CSV files
- [useNotification](/composables/notification) - Programmatically manage notifications
- [useScrollToError](/composables/scrollToError) - Scroll to element with validation error
- [useBaklavaTheme](/composables/theme) - Overwrite Baklava colors (Vue preset or custom)
- [useDisclosure](/composables/disclosure) - Open/close state for Dialog, Drawer, Dropdown
- [usePagination](/composables/pagination) - Pagination state for tables and lists
- [useConfirmDialog](/composables/confirmDialog) - Confirm/cancel dialog flow
- [useClipboard](/composables/clipboard) - Copy text to clipboard
- [useBreakpoints](/composables/breakpoints) - Responsive breakpoints (isMobile, isTablet, isDesktop)
- [useLocalStorage](/composables/storage) - Reactive sync with localStorage
- [useSessionStorage](/composables/storage) - Reactive sync with sessionStorage
- [useDebounceFn / useDebouncedRef](/composables/debounce) - Debounce function or ref value
- [useThrottleFn / useThrottledRef](/composables/throttle) - Throttle function or ref value
- [useIntervalFn / useTimeoutFn](/composables/timer) - Pausable interval and cancellable timeout
- [useFetch](/composables/fetch) - Reactive fetch with loading/error/data
- [useIntersectionObserver](/composables/intersectionObserver) - Detect element visibility in viewport
- [useRafFn](/composables/raf) - Animation frame loop

## Usage Pattern

Composables follow Vue 3 Composition API patterns:

```vue
<script setup>
import { useNotification } from "@baklavue/composables";

const { success, error, warning, info } = useNotification();

// Use the composable methods
success({
  caption: "Success!",
  description: "Operation completed",
});
</script>
```

## Importing Composables

```typescript
import { useNotification } from "@baklavue/composables";
```

## TypeScript Support

All composables are fully typed:

```typescript
import type { ApplyThemeOptions } from "@baklavue/composables";
```

## Next Steps

- Explore individual composable documentation
- Check [API Reference](/api/reference) for detailed API
- See [Getting Started Guide](/guide/getting-started) for setup
