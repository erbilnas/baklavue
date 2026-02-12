# useSlug

A composable for converting a string to a URL-friendly slug. Useful for SEO-friendly URLs, filenames, and unique keys.

## Basic Usage

```vue
<script setup>
import { ref } from "vue";
import { useSlug } from "@baklavue/composables";

const title = ref("Hello World!");
const slug = useSlug(title);
// slug: "hello-world"
</script>
```

## With Options

```vue
<script setup>
import { useSlug } from "@baklavue/composables";

const slug = useSlug("My Project Name", { separator: "_" });
// slug: "my_project_name"
</script>
```

## API

### Options

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `separator` | `string` | `"-"` | Character to replace spaces/special chars |
| `lowercase` | `boolean` | `true` | Lowercase the result |

### Return Value

| Property | Type | Description |
| --- | --- | --- |
| (return) | `ComputedRef<string>` | URL-friendly slug |

### Behavior

- Trims whitespace
- Normalizes Unicode (NFD) and removes diacritics
- Replaces non-word chars with separator
- Collapses multiple separators
- Trims leading/trailing separators

## TypeScript Support

```typescript
import { useSlug, type UseSlugOptions } from "@baklavue/composables";

const slug = useSlug(titleRef, { separator: "_", lowercase: false });
```
