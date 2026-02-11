# useCsv

A composable for CSV parsing, creating, and downloading. Uses PapaParse for RFC 4180-compliant handling of quoted fields, commas in values, and edge cases.

## Basic Usage

### Parse String

```vue
<script setup lang="ts">
import { useCsv } from "@baklavue/composables";

const { parse } = useCsv();

const result = parse("name,age\nAlice,30\nBob,25", { header: true });
console.log(result.data); // [{ name: "Alice", age: "30" }, { name: "Bob", age: "25" }]
</script>
```

### Parse File

```vue
<template>
  <input type="file" accept=".csv" @change="handleFileUpload" />
</template>

<script setup lang="ts">
import { useCsv } from "@baklavue/composables";

const { parseFile } = useCsv();

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
import { useCsv } from "@baklavue/composables";

const { create } = useCsv();

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
import { useCsv } from "@baklavue/composables";

const { download } = useCsv();

const data = [
  { name: "Alice", age: 30 },
  { name: "Bob", age: 25 },
];

const exportData = () => {
  download(data, "export.csv");
};
</script>
```

## Methods

### parse

Parses a CSV string synchronously. Returns `{ data, errors, meta }`.

```typescript
parse(csv: string, options?: CsvParseOptions): ParseResult<unknown>
```

### parseFile

Parses a File or Blob asynchronously. Returns a Promise with the parse result.

```typescript
parseFile(file: File, options?: CsvParseOptions): Promise<ParseResult<unknown>>
```

### create

Creates a CSV string from an array of objects, array of arrays, or `{ fields, data }` object.

```typescript
create(data: CsvData, options?: CsvCreateOptions): string
```

### download

Creates a CSV string and triggers a browser download. Adds UTF-8 BOM for Excel compatibility with non-ASCII characters.

```typescript
download(data: CsvData, filename?: string, options?: CsvCreateOptions): void
```

## Options

### CsvParseOptions

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `delimiter` | `string` | auto-detect | Delimiter character |
| `header` | `boolean` | `false` | If true, first row is header (returns array of objects) |
| `dynamicTyping` | `boolean` | `false` | Convert numbers and booleans to their types |
| `skipEmptyLines` | `boolean \| "greedy"` | `false` | Skip empty lines; `"greedy"` also skips whitespace-only lines |

### CsvCreateOptions

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `delimiter` | `string` | `","` | Delimiter character |
| `header` | `boolean` | `true` | Include header row |
| `columns` | `string[]` | — | Column order for array of objects |
| `escapeFormulae` | `boolean` | `false` | Escape leading `=`, `+`, `-`, `@` to prevent CSV injection |

## CsvData Types

Accepted by `create` and `download`:

- **Array of objects:** `Record<string, unknown>[]` — keys become header row
- **Array of arrays:** `unknown[][]` — no header unless `header: true` with explicit `columns`
- **Explicit fields + data:** `{ fields: string[]; data: unknown[][] }` — for custom column order

## Examples

### With Dynamic Typing

```vue
<script setup lang="ts">
import { useCsv } from "@baklavue/composables";

const { parse } = useCsv();

const result = parse("name,age\nAlice,30\nBob,25", {
  header: true,
  dynamicTyping: true,
});
// result.data[0].age is number 30, not string "30"
</script>
```

### Custom Delimiter

```vue
<script setup lang="ts">
import { useCsv } from "@baklavue/composables";

const { parse, create } = useCsv();

// Parse tab-separated
const result = parse("name\tage\nAlice\t30", { delimiter: "\t", header: true });

// Create with semicolon delimiter
const csv = create([{ name: "Alice", age: 30 }], { delimiter: ";" });
</script>
```

### With Formulae Escaping

```vue
<script setup lang="ts">
import { useCsv } from "@baklavue/composables";

const { download } = useCsv();

// User-provided data may contain =SUM(...) etc. — escape to prevent CSV injection
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
  useCsv,
  type CsvData,
  type CsvParseOptions,
  type CsvCreateOptions,
  type ParseResult,
  type ParseError,
  type ParseMeta,
} from "@baklavue/composables";

const { parse, parseFile, create, download } = useCsv();

// Parse result with typed data
const result = parse("name,age\nAlice,30", { header: true, dynamicTyping: true });
const typedData = result.data as { name: string; age: number }[];
```
