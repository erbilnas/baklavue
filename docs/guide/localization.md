# Localization

Baklava (the underlying design system) has built-in localization support via [lit-localize](https://lit.dev/docs/localization/). It reads the `lang` attribute from the `<html>` element and uses a mutation observer to dynamically update localized components when the language changes. This includes components like Datepicker (month names, weekday labels) and Pagination (Previous/Next labels).

## Setup

Initialize localization by calling `init()` from Baklava's localization module in your app entry point (e.g., `main.ts` or `App.vue`):

```typescript
import { init } from "@trendyol/baklava/dist/localization.js";

// Call before or when your app loads
init();
```

If you load Baklava via CDN (as BaklaVue does by default), ensure the localization init runs after Baklava scripts have loaded. For example:

```vue
<script setup>
import { onMounted } from "vue";
import { loadBaklavaResources } from "@baklavue/ui";

onMounted(async () => {
  loadBaklavaResources();
  // Wait for Baklava to load, then init localization
  const { init } = await import(
    "@trendyol/baklava/dist/localization.js"
  );
  await init();
});
</script>
```

## Setting the Locale

Baklava reads the `lang` attribute from the root `<html>` element. To change the locale:

**Option 1: Set in your HTML**

```html
<html lang="tr">
```

**Option 2: Set programmatically**

```typescript
document.documentElement.lang = "tr";
```

When `lang` changes, Baklava's mutation observer automatically updates all localized components. No page reload is required.

## Supported Locales

Baklava supports the following locales (see [Baklava translations](https://github.com/Trendyol/baklava/tree/next/translations)):

| Code | Language  |
| ---- | --------- |
| `en` | English   |
| `tr` | Turkish   |
| `ar` | Arabic    |
| `ro` | Romanian  |

If no `lang` attribute is set, Baklava defaults to English.

## Live Example

Use the locale switcher below to see the Datepicker and Pagination update in real time. Notice how month names and weekday labels change when you switch from English to Turkish or Arabic.

<div class="component-demo">

<LocalizationDemo />

</div>

```vue
<template>
  <div>
    <div class="locale-buttons">
      <BvButton
        v-for="loc in locales"
        :key="loc.code"
        :variant="currentLocale === loc.code ? 'primary' : 'secondary'"
        size="small"
        @click="setLocale(loc.code)"
      >
        {{ loc.label }}
      </BvButton>
    </div>
    <BvDatepicker v-model="date" label="Select date" placeholder="Pick a date" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { BvButton, BvDatepicker } from "@baklavue/ui";

const date = ref("");
const currentLocale = ref("en");

const locales = [
  { code: "en", label: "English" },
  { code: "tr", label: "Türkçe" },
  { code: "ar", label: "العربية" },
  { code: "ro", label: "Română" },
];

function setLocale(code) {
  document.documentElement.lang = code;
  currentLocale.value = code;
  // For Arabic, consider also: document.documentElement.dir = "rtl";
}
</script>
```

## RTL Support

For Arabic (`ar`) and other right-to-left languages, set the `dir` attribute on the document for proper layout:

```typescript
document.documentElement.lang = "ar";
document.documentElement.dir = "rtl";
```

Baklava has [built-in RTL support](https://baklava.design) using CSS logical properties. When switching back to LTR languages, reset `dir`:

```typescript
document.documentElement.dir = "ltr";
```

## Contributing Translations

To add new translations or improve existing ones, submit a pull request to the [Baklava repository](https://github.com/Trendyol/baklava). Translations live in the [translations](https://github.com/Trendyol/baklava/tree/next/translations) folder.
