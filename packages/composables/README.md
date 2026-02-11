# @baklavue/composables

A collection of Vue 3 composables for seamless integration with Baklava UI components. This package provides convenient utilities and hooks to enhance your Vue applications with Baklava's design system.

## 🚀 Features

- **Vue 3 Composition API**: Built with modern Vue 3 composables
- **TypeScript Support**: Full TypeScript support with proper type definitions
- **Baklava Integration**: Seamlessly works with Baklava UI components
- **Lightweight**: Minimal bundle size with no unnecessary dependencies
- **Tree-shakable**: Only import what you need

## 📦 Installation

```bash
# Using npm
npm install @baklavue/composables

# Using yarn
yarn add @baklavue/composables

# Using pnpm
pnpm add @baklavue/composables

# Using bun
bun add @baklavue/composables
```

## 🔧 Prerequisites

- Vue 3.x
- TypeScript 5.9.2+ (peer dependency)
- Baklava UI components installed in your project

## 📚 Available Composables

### `useCsv`

A composable for CSV parsing, creating, and downloading. Uses PapaParse for RFC 4180-compliant handling of quoted fields, commas in values, and edge cases.

#### Basic Usage

```vue
<script setup lang="ts">
import { useCsv } from "@baklavue/composables";

const { parse, parseFile, create, download } = useCsv();

// Parse CSV string
const result = parse("name,age\nAlice,30\nBob,25", { header: true });
console.log(result.data); // [{ name: "Alice", age: "30" }, ...]

// Parse file (async)
const handleFileUpload = async (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    const fileResult = await parseFile(file, { header: true });
    console.log(fileResult.data);
  }
};

// Create CSV from array of objects
const csv = create(
  [
    { name: "Alice", age: 30 },
    { name: "Bob", age: 25 },
  ]
);

// Download CSV file
const exportData = () => {
  download(
    [{ name: "Alice", age: 30 }, { name: "Bob", age: 25 }],
    "export.csv"
  );
};
</script>
```

#### API Reference

The `useCsv` composable returns an object with the following methods:

##### `parse(csv: string, options?: CsvParseOptions)`

Parses a CSV string and returns `{ data, errors, meta }`. Synchronous.

##### `parseFile(file: File, options?: CsvParseOptions)`

Parses a File or Blob asynchronously. Returns `Promise<ParseResult>`.

##### `create(data: CsvData, options?: CsvCreateOptions)`

Creates a CSV string from an array of objects, array of arrays, or `{ fields, data }` object.

##### `download(data: CsvData, filename?: string, options?: CsvCreateOptions)`

Creates a CSV string and triggers a browser download. Adds UTF-8 BOM for Excel compatibility.

#### Options

**CsvParseOptions:**

- `delimiter` – Delimiter character (default: auto-detect)
- `header` – If true, first row is header (returns array of objects)
- `dynamicTyping` – If true, numbers and booleans are converted
- `skipEmptyLines` – Skip empty lines (`true` or `'greedy'`)

**CsvCreateOptions:**

- `delimiter` – Delimiter character (default: comma)
- `header` – Include header row (default: true)
- `columns` – Column order for array of objects
- `escapeFormulae` – Escape leading `=`, `+`, `-`, `@` to prevent CSV injection

### `useNotification`

A composable for managing Baklava notification system with a simple and intuitive API.

#### Basic Usage

```vue
<template>
  <div>
    <button @click="showSuccess">Show Success</button>
    <button @click="showError">Show Error</button>
    <button @click="showWarning">Show Warning</button>
    <button @click="showInfo">Show Info</button>

    <!-- Required: Add the notification element to your template -->
    <bl-notification />
  </div>
</template>

<script setup lang="ts">
import { useNotification } from "@baklavue/composables";

const { success, error, warning, info } = useNotification();

const showSuccess = () => {
  success({
    caption: "Success!",
    description: "Operation completed successfully.",
    duration: 5,
  });
};

const showError = () => {
  error({
    caption: "Error!",
    description: "Something went wrong. Please try again.",
    duration: 8,
  });
};

const showWarning = () => {
  warning({
    caption: "Warning!",
    description: "Please review your input before proceeding.",
    duration: 6,
  });
};

const showInfo = () => {
  info({
    caption: "Information",
    description: "Here is some useful information for you.",
    duration: 4,
  });
};
</script>
```

#### API Reference

The `useNotification` composable returns an object with the following methods:

##### `success(notification: NotificationProps)`

Shows a success notification with green styling.

##### `error(notification: NotificationProps)`

Shows an error notification with red styling.

##### `warning(notification: NotificationProps)`

Shows a warning notification with orange styling.

##### `info(notification: NotificationProps)`

Shows an info notification with blue styling.

#### Notification Props

All notification methods accept a `NotificationProps` object with the following properties:

```typescript
interface NotificationProps {
  caption?: string;    // Notification title
  description: string; // Notification message (required)
  duration?: number;  // Duration in seconds (optional)
  permanent?: boolean; // Prevent auto-close
  // ... other Baklava notification properties
}
```

#### Important Notes

- **Required DOM Element**: You must include `<bl-notification>` in your template for notifications to work
- **Auto-icon**: All notifications automatically include appropriate icons based on their variant
- **Duration**: If no duration is specified, notifications will use Baklava's default duration
- **Error Handling**: The composable includes built-in error handling and will warn if the notification element is not found

### `useScrollToError`

Scroll to an element with validation error. Scrolls into view, optionally applies a highlight effect, and focuses the first focusable control. Works with `input`, `select`, `textarea`, `bl-select`, `bl-input`.

```ts
const { scrollToError } = useScrollToError();
scrollToError('[data-field="tags"]');
scrollToError(validationError); // when error has scrollTarget
```

### `useBaklavaTheme`

Overwrite Baklava design system colors and tokens. Use the Vue preset, pass a custom preset object, or override specific colors, border radius, size, typography, or z-index.

```ts
const { applyTheme } = useBaklavaTheme();
applyTheme({ preset: 'vue' });
applyTheme({ colors: { primary: '#41B883' } });
```

### `useDisclosure`

Open/close state for Dialog, Drawer, Dropdown, Accordion, and Tooltip. Avoids repetitive `ref(false)`, `open()`, `close()`, `toggle()`.

```ts
const { isOpen, open, close, toggle } = useDisclosure(false);
// Use with v-model:open on BvDialog, BvDrawer, BvDropdown
```

### `usePagination`

Pagination state for tables and lists. Provides `currentPage`, `pageSize`, `totalItems`, `totalPages`, `offset`, `slice` helper.

```ts
const { currentPage, pageSize, totalItems, totalPages, setPage, setPageSize, slice } = usePagination({ totalItems: 100, pageSize: 10 });
```

### `useConfirmDialog`

Drive BvDialog for confirm/cancel flows. Returns a promise that resolves to `true` when confirmed, `false` when cancelled.

```ts
const { confirm, isOpen, caption, description, handleConfirm, handleCancel } = useConfirmDialog();
const ok = await confirm({ caption: "Delete?", description: "Sure?" });
```

### `useClipboard`

Copy text to clipboard. Integrates well with `useNotification`.

```ts
const { copy, copied } = useClipboard();
await copy("token");
```

### `useBreakpoints` / `useMediaQuery`

Responsive breakpoints. `useBreakpoints` provides `isMobile`, `isTablet`, `isDesktop`. `useMediaQuery` for custom queries.

```ts
const { isMobile, isTablet, isDesktop } = useBreakpoints();
const matches = useMediaQuery("(max-width: 768px)");
```

### `useLocalStorage` / `useSessionStorage`

Reactive sync with `localStorage` and `sessionStorage`. Works well with `useBaklavaTheme` and `usePagination` for persisting preferences.

```ts
const pageSize = useLocalStorage("table-page-size", 10);
const draft = useSessionStorage("form-draft", null);
```

### `useDebounceFn` / `useDebouncedRef`

Debounce function execution or ref value. `useDebounceFn` returns a debounced function. `useDebouncedRef` returns a ref that updates after the delay. Useful for search inputs, autocomplete.

```ts
const debouncedSearch = useDebounceFn((q: string) => fetchResults(q), 300);
const searchQuery = ref("");
const debouncedQuery = useDebouncedRef(searchQuery, 300);
```

### `useThrottleFn` / `useThrottledRef`

Throttle function execution or ref value. Useful for scroll, resize, mousemove handlers.

```ts
const throttledHandler = useThrottleFn(() => updateScroll(), 100);
const throttledScrollY = useThrottledRef(scrollY, 100);
```

### `useIntervalFn` / `useTimeoutFn`

Pausable interval and cancellable timeout. `useIntervalFn` returns `{ pause, resume, isActive }`. `useTimeoutFn` returns `{ run, cancel, isPending }`.

```ts
const { pause, resume } = useIntervalFn(() => fetchData(), 5000);
const { run, cancel } = useTimeoutFn(() => showToast("Saved!"), 2000);
```

### `useFetch`

Reactive fetch with loading/error/data. Supports abort, timeout, and manual execute.

```ts
const { data, error, isFetching, execute } = useFetch<User>(
  () => `https://api.example.com/users/${id.value}`,
  { immediate: true }
);
```

### `useIntersectionObserver`

Detects when a target element enters or leaves the viewport. Useful for lazy loading, scroll-triggered animations.

```ts
const target = ref<HTMLElement | null>(null);
const isVisible = useIntersectionObserver(target, { threshold: 0.5 });
```

### `useRafFn`

Calls a function on every requestAnimationFrame. Returns `{ pause, resume, isActive }`. Useful for animation loops.

```ts
const { pause, resume } = useRafFn(({ delta }) => {
  position.value += velocity * (delta / 1000);
});
```

## 🏗️ Project Structure

```
packages/composables/
├── index.ts              # Main export file
├── csv.ts                # CSV parsing, creating, and download composable
├── notification.ts       # Notification composable
├── scrollToError.ts      # Scroll to validation error composable
├── theme.ts              # Baklava theme composable
├── disclosure.ts         # Open/close state composable
├── pagination.ts         # Pagination state composable
├── confirmDialog.ts      # Confirm dialog composable
├── clipboard.ts          # Clipboard composable
├── breakpoints.ts        # Responsive breakpoints composable
├── storage.ts            # useLocalStorage, useSessionStorage composables
├── debounce.ts           # useDebounceFn, useDebouncedRef
├── throttle.ts           # useThrottleFn, useThrottledRef
├── timer.ts              # useIntervalFn, useTimeoutFn
├── fetch.ts              # useFetch composable
├── intersectionObserver.ts  # useIntersectionObserver
├── raf.ts                # useRafFn composable
├── package.json          # Package configuration
├── tsconfig.json         # TypeScript configuration
└── README.md             # This file
```

## 🔧 Development

### Prerequisites

- [Bun](https://bun.sh) (recommended) or Node.js
- TypeScript 5.9.2+

### Setup

```bash
# Install dependencies
bun install

# Run the package
bun run index.ts
```

### TypeScript Configuration

This package uses strict TypeScript configuration with:

- ESNext target and modules
- Strict type checking
- Bundler-friendly module resolution
- Unused variable/parameter detection

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is part of the Baklavue ecosystem. See the main project for license information.

## 🔗 Related Packages

- `@baklavue/ui` - Baklava UI components for Vue
- `@trendyol/baklava` - Core Baklava design system

## 📞 Support

For issues and questions:

- Check the [Baklava documentation](https://baklava.trendyol.com/)
- Open an issue in the project repository
- Review the examples in the playground directory
