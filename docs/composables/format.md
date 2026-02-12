# useDateFormat & useNumberFormat

Composables for reactive, locale-aware date and number formatting using native `Intl.DateTimeFormat` and `Intl.NumberFormat`. No external date library required.

## useDateFormat

### Basic Usage

```vue
<template>
  <span>{{ formatted }}</span>
</template>

<script setup>
import { ref } from "vue";
import { useDateFormat } from "@baklavue/composables";

const date = ref(new Date());
const formatted = useDateFormat(date, { dateStyle: "medium" });
// "Feb 11, 2025"
</script>
```

### With Locale

```vue
<script setup>
import { useDateFormat } from "@baklavue/composables";

const formatted = useDateFormat(new Date(), {
  year: "numeric",
  month: "short",
  day: "numeric",
  locale: "tr-TR",
});
</script>
```

### API

| Argument | Type | Description |
| --- | --- | --- |
| `date` | `MaybeRefOrGetter<Date \| string \| number \| null \| undefined>` | Date to format |
| `options` | `UseDateFormatOptions` | Intl.DateTimeFormatOptions plus optional `locale` |

Returns: `ComputedRef<string>`

---

## useNumberFormat

### Basic Usage

```vue
<template>
  <span>{{ formatted }}</span>
</template>

<script setup>
import { ref } from "vue";
import { useNumberFormat } from "@baklavue/composables";

const price = ref(99.99);
const formatted = useNumberFormat(price, { style: "currency", currency: "USD" });
// "$99.99"
</script>
```

### Decimal Formatting

```vue
<script setup>
import { useNumberFormat } from "@baklavue/composables";

const count = ref(1234);
const formatted = useNumberFormat(count, {
  style: "decimal",
  minimumFractionDigits: 2,
  locale: "tr-TR",
});
</script>
```

### API

| Argument | Type | Description |
| --- | --- | --- |
| `value` | `MaybeRefOrGetter<number \| null \| undefined>` | Number to format |
| `options` | `UseNumberFormatOptions` | Intl.NumberFormatOptions plus optional `locale` |

Returns: `ComputedRef<string>`

---

## TypeScript Support

```typescript
import {
  useDateFormat,
  useNumberFormat,
  type UseDateFormatOptions,
  type UseNumberFormatOptions,
} from "@baklavue/composables";

const formatted = useDateFormat(dateRef, { dateStyle: "long" });
const price = useNumberFormat(priceRef, { style: "currency", currency: "EUR" });
```
