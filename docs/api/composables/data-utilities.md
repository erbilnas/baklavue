# Data & Utilities Composables

## useFile

[useFile](/composables/file) · `import { useFile } from "@baklavue/composables"`

Parse, create, and download CSV, TSV, JSON, and Excel (.xlsx, .xls) files. Accepts `File` or `Blob` for `parseFile`, `preview`, `parseStream`. Uses PapaParse for CSV/TSV and SheetJS for Excel. Supports streaming, Zod validation, transforms, and preview.

```typescript
const { parse, parseFile, parseStream, preview, create, download } = useFile();

// Parse string (sync)
const result = parse("name,age\nAlice,30", { format: "csv", header: true });

// Parse file (async), format auto-detected from filename
const result = await parseFile(file, { header: true });

// Preview first 10 rows
const { data, truncated } = await preview(file, { rows: 10 });

// Create CSV string
const csv = create([{ name: "Alice", age: 30 }]);

// Download CSV
download([{ name: "Alice", age: 30 }], "export.csv");
```

**FileParseOptions:** `format`, `delimiter`, `header`, `dynamicTyping`, `skipEmptyLines`, `schema`, `transform`

**FileCreateOptions:** `format`, `delimiter`, `header`, `columns`, `escapeFormulae`

## useClipboard

[useClipboard](/composables/clipboard) · `import { useClipboard, type UseClipboardOptions } from "@baklavue/composables"`

Copy text to clipboard. Supports `source`, `copiedDuring`, `legacy` fallback, and `isSupported`.

```typescript
const { copy, copied, isSupported } = useClipboard();
await copy("text");

const { copy: copyFromSource } = useClipboard({
  source: ref("default"),
  copiedDuring: 1500,
  legacy: true,
});
await copyFromSource();
```

## useLocalStorage / useSessionStorage

[useLocalStorage](/composables/storage) · [useSessionStorage](/composables/storage) · `import { useLocalStorage, useSessionStorage, type UseStorageOptions } from "@baklavue/composables"`

Reactive sync with localStorage and sessionStorage. Persist preferences across sessions (localStorage) or within the current tab (sessionStorage). Options: `mergeDefaults`, `listenToStorageChanges`, `serializer`, `onError`.

```typescript
const pageSize = useLocalStorage("table-page-size", 10);
const draft = useSessionStorage("form-draft", null);
const prefs = useLocalStorage("prefs", { theme: "vue", compact: false }, { mergeDefaults: true });
```

## useCookie

[useCookie](/composables/cookie) · `import { useCookie, type UseCookieOptions, type UseCookieReturn } from "@baklavue/composables"`

Reactive sync with document.cookie. Returns `{ value, get, set, remove }`. Persist values in cookies for server-side access. Options: `mergeDefaults`, `serializer`, `onError`, `path`, `domain`, `maxAge`, `expires`, `secure`, `sameSite`.

```typescript
const { value: token, set, remove } = useCookie("auth-token", "", { path: "/", maxAge: 86400 });
set("new-token");
remove();
```
