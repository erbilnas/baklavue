# Composables

BaklaVue provides Vue 3 composables to enhance your application functionality.

## Available Composables

### UI & Feedback

- [Notification](/composables/notification) (`useNotification`) - Programmatically manage notifications
- [Confirm Dialog](/composables/confirmDialog) (`useConfirmDialog`) - Confirm/cancel dialog flow
- [Disclosure](/composables/disclosure) (`useDisclosure`) - Open/close state for Dialog, Drawer, Dropdown
- [Stepper](/composables/stepper) (`useStepper`) - Multi-step wizard state for BvStepper
- [Scroll Visibility](/composables/scrollVisibility) (`useScrollVisibility`) - Scroll-based visibility for scroll-to-top and sticky UI
- [Scroll Lock](/composables/scrollLock) (`useScrollLock`) - Lock body scroll when modals/drawers are open
- [Alert](/composables/alert) (`useAlert`) - Programmatic show/hide for inline BvAlert
- [Loading](/composables/loading) (`useLoading`) - Generic loading state with optional delay
- [Focus Trap](/composables/focusTrap) (`useFocusTrap`) - Trap focus within modals/dialogs
- [Id](/composables/id) (`useId`) - Stable unique IDs for accessibility attributes

### Forms

- [Form Validation](/composables/formValidation) (`useZodForm`) - Form validation with Zod schemas
- [Form State](/composables/formState) (`useFormState`) - Form dirty and touched state without validation
- [Field Array](/composables/fieldArray) (`useFieldArray`) - Dynamic array fields for forms
- [Form Persistence](/composables/formPersistence) (`useFormPersistence`) - Auto-save form data to localStorage/sessionStorage
- [Stepper Form](/composables/stepperForm) (`useStepperForm`) - Multi-step form validation with useStepper
- [Scroll to Error](/composables/scrollToError) (`useScrollToError`) - Scroll to element with validation error

### Data & Utilities

- [CSV](/composables/csv) (`useCsv`) - Parse, create, and download CSV files
- [Clipboard](/composables/clipboard) (`useClipboard`) - Copy text to clipboard
- [Storage](/composables/storage) (`useLocalStorage` / `useSessionStorage`) - Reactive sync with localStorage/sessionStorage

### Performance

- [Debounce](/composables/debounce) (`useDebounceFn` / `useDebouncedRef`) - Debounce function or ref value
- [Throttle](/composables/throttle) (`useThrottleFn` / `useThrottledRef`) - Throttle function or ref value
- [Timer](/composables/timer) (`useIntervalFn` / `useTimeoutFn`) - Pausable interval and cancellable timeout
- [Request Animation Frame](/composables/raf) (`useRafFn`) - Animation frame loop

### Browser APIs

- [Breakpoints](/composables/breakpoints) (`useBreakpoints`) - Responsive breakpoints (isMobile, isTablet, isDesktop)
- [Intersection Observer](/composables/intersectionObserver) (`useIntersectionObserver`) - Detect element visibility in viewport

### Data Fetching

- [Fetch](/composables/fetch) (`useFetch`) - Reactive fetch with loading/error/data
- [Query](/composables/query) (`useQuery`) - Data fetching with caching, retries, and invalidation

### Theme & Layout

- [Theme](/composables/theme) (`useBaklavaTheme`) - Overwrite Baklava colors (Vue preset or custom)
- [Pagination](/composables/pagination) (`usePagination`) - Pagination state for tables and lists

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
