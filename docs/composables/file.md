# useFile

A composable for file parsing, creating, and downloading. Supports CSV, TSV, JSON, and Excel (.xlsx, .xls) formats with streaming, Zod validation, transforms, and preview. Accepts `File` or `Blob` for `parseFile`, `preview`, and `parseStream`. Uses PapaParse for RFC 4180-compliant CSV/TSV and SheetJS for Excel.

## Basic Usage

### Parse String

```vue
<script setup lang="ts">
import { useFile } from "@baklavue/composables";

const { parse } = useFile();

const result = parse("name,age\nAlice,30\nBob,25", { format: "csv", header: true });
console.log(result.data); // [{ name: "Alice", age: "30" }, { name: "Bob", age: "25" }]
</script>
```

### Parse File

```vue
<template>
  <input type="file" accept=".csv,.tsv,.json,.xlsx,.xls" @change="handleFileUpload" />
</template>

<script setup lang="ts">
import { useFile } from "@baklavue/composables";

const { parseFile } = useFile();

const handleFileUpload = async (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    const result = await parseFile(file, { header: true });
    console.log(result.data);
  }
};
</script>
```

### Create CSV

```vue
<script setup lang="ts">
import { useFile } from "@baklavue/composables";

const { create } = useFile();

const csv = create([
  { name: "Alice", age: 30 },
  { name: "Bob", age: 25 },
]);
// Result: "name,age\nAlice,30\nBob,25"
</script>
```

### Download CSV

```vue
<template>
  <button @click="exportData">Export CSV</button>
</template>

<script setup lang="ts">
import { useFile } from "@baklavue/composables";

const { download } = useFile();

const data = [
  { name: "Alice", age: 30 },
  { name: "Bob", age: 25 },
];

const exportData = () => {
  download(data, "export.csv");
};
</script>
```

## Supported Formats

| Format | Parse | Create | Notes |
| --- | --- | --- | --- |
| CSV | Yes | Yes | RFC 4180, PapaParse |
| TSV | Yes | Yes | Tab-delimited, PapaParse |
| JSON | Yes | Yes | Built-in `JSON.parse` / `JSON.stringify` |
| Excel (.xlsx, .xls) | Yes | Yes | SheetJS; parse via `parseFile` only (binary format) |

Format is auto-detected from file extension when using `parseFile` or `preview`. For `Blob` (without filename), format is inferred from `blob.type` when possible; otherwise specify `format` in options.

**Limitations:** `parse()` and `parseStream` do not support Excel; use `parseFile()` instead.

## Methods

### parse

Parses a string synchronously. Returns `{ data, errors, meta }` (and `validationError` if Zod schema fails).

```typescript
parse<T>(content: string, options?: FileParseOptions<T>): ParseResult<T> & { validationError?: z.ZodError }
```

### parseFile

Parses a File or Blob asynchronously. Format auto-detected from filename (File) or `blob.type` (Blob) when omitted.

```typescript
parseFile<T>(file: File | Blob, options?: FileParseOptions<T>): Promise<ParseResult<T> & { validationError?: z.ZodError }>
```

### parseStream

Chunked parsing for large CSV/TSV files. Use `step` or `chunk` callbacks. Returns `{ abort }` to stop parsing. Does not support Excel; throws if format is xlsx/xls.

```typescript
parseStream(file: File | Blob, options: {
  format?: "csv" | "tsv";
  step?: (result: ParseResult<unknown>, parser: Parser) => void;
  chunk?: (result: ParseResult<unknown>, parser: Parser) => void;
  transform?: (row: unknown) => unknown | null;
  complete?: () => void;
  error?: (err: Error) => void;
  // ...header, dynamicTyping, skipEmptyLines
}): { abort: () => void }
```

### preview

Parses only the first N rows. Useful for quick inspection of large files.

```typescript
preview<T>(file: File | Blob, options?: { rows?: number; format?: FileFormat; ... }): Promise<PreviewResult<T>>
```

### create

Creates a string from data. Supports CSV, TSV, JSON, and Excel (returns base64 for Excel).

```typescript
create(data: FileData, options?: FileCreateOptions): string
```

### download

Creates a string and triggers a browser download. Adds UTF-8 BOM for CSV/TSV (Excel compatibility).

```typescript
download(data: FileData, filename?: string, options?: FileCreateOptions): void
```

## Options

### FileParseOptions

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `format` | `'csv' \| 'tsv' \| 'json' \| 'xlsx' \| 'xls'` | `'csv'` | File format |
| `delimiter` | `string` | auto (CSV) or `\t` (TSV) | Delimiter character |
| `header` | `boolean` | `false` | First row is header (returns array of objects) |
| `dynamicTyping` | `boolean` | `false` | Convert numbers and booleans to their types |
| `skipEmptyLines` | `boolean \| "greedy"` | `false` | Skip empty lines |
| `schema` | `z.ZodType` | — | Zod schema for validation |
| `transform` | `(row) => row \| null` | — | Transform each row; return `null` to skip |

### FileCreateOptions

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `format` | `'csv' \| 'tsv' \| 'json' \| 'xlsx' \| 'xls'` | `'csv'` | Output format |
| `delimiter` | `string` | `","` or `"\t"` | Delimiter character |
| `header` | `boolean` | `true` | Include header row |
| `columns` | `string[]` | — | Column order for array of objects |
| `escapeFormulae` | `boolean` | `false` | Escape leading `=`, `+`, `-`, `@` to prevent CSV injection |

## FileData Types

Accepted by `create` and `download`:

- **Array of objects:** `Record<string, unknown>[]` — keys become header row
- **Array of arrays:** `unknown[][]` — no header unless `header: true` with explicit `columns`
- **Explicit fields + data:** `{ fields: string[]; data: unknown[][] }` — for custom column order

## Examples

### Multi-Format (JSON, TSV, Excel)

```vue
<script setup lang="ts">
import { useFile } from "@baklavue/composables";

const { parse, parseFile, create, download } = useFile();

// Parse JSON
const jsonResult = parse('[{"a":1},{"a":2}]', { format: "json" });

// Parse TSV
const tsvResult = parse("name\tage\nAlice\t30", { format: "tsv", header: true });

// Parse Excel file (use parseFile, not parse)
const excelResult = await parseFile(file, { format: "xlsx", header: true });

// Create and download Excel
const data = [{ name: "Alice", age: 30 }];
download(data, "export.xlsx", { format: "xlsx" });
</script>
```

### With Blob

```vue
<script setup lang="ts">
import { useFile } from "@baklavue/composables";

const { parseFile } = useFile();

// Parse from Blob (e.g. from fetch response)
const response = await fetch("/api/export.csv");
const blob = await response.blob();
const result = await parseFile(blob, { format: "csv", header: true });
</script>
```

### With Zod Validation

```vue
<script setup lang="ts">
import { useFile } from "@baklavue/composables";
import { z } from "zod";

const schema = z.array(z.object({ name: z.string(), age: z.number() }));
const { parseFile } = useFile();

const result = await parseFile(file, {
  format: "csv",
  header: true,
  dynamicTyping: true,
  schema,
});

if (result.validationError) {
  console.error("Validation failed:", result.validationError);
} else {
  console.log(result.data); // Typed as { name: string; age: number }[]
}
</script>
```

### With Transform

```vue
<script setup lang="ts">
import { useFile } from "@baklavue/composables";

const { parse } = useFile();

const result = parse("name,age\nAlice,30\nBob,25", {
  format: "csv",
  header: true,
  dynamicTyping: true,
  transform: (row) => {
    const r = row as { age: number };
    return r.age >= 18 ? { ...r, adult: true } : null;
  },
});
// Only rows with age >= 18, with adult: true added
</script>
```

### Preview First Rows

```vue
<script setup lang="ts">
import { useFile } from "@baklavue/composables";

const { preview } = useFile();

const { data, truncated } = await preview(file, { rows: 10 });
console.log("First 10 rows:", data);
if (truncated) console.log("File has more rows");
</script>
```

### Streaming Large Files

```vue
<script setup lang="ts">
import { useFile } from "@baklavue/composables";

const { parseStream } = useFile();

const { abort } = parseStream(file, {
  format: "csv",
  header: true,
  step: (result, parser) => {
    const row = result.data?.[0];
    if (row) processRow(row);
  },
  complete: () => console.log("Done"),
});

// Call abort() to stop parsing
</script>
```

### With Formulae Escaping

```vue
<script setup lang="ts">
import { useFile } from "@baklavue/composables";

const { download } = useFile();

download(
  [{ formula: "=SUM(A1:A10)", value: 100 }],
  "export.csv",
  { escapeFormulae: true }
);
</script>
```

## TypeScript Support

```typescript
import {
  useFile,
  type FileData,
  type FileParseOptions,
  type FileCreateOptions,
  type ParseResult,
  type ParseError,
  type ParseMeta,
  type PreviewResult,
} from "@baklavue/composables";

const { parse, parseFile, create, download } = useFile();

// Typed parse
const result = parse<{ name: string; age: number }>(
  "name,age\nAlice,30",
  { format: "csv", header: true, dynamicTyping: true }
);
```
