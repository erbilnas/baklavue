# Design Tokens

BaklaVue uses the [Baklava Design System](https://baklava.design) tokens. You can customize them via `useBaklavaTheme().applyTheme()` for a consistent, branded look.

## Token Categories

| Category | Description | Docs |
| -------- | ----------- | ---- |
| [Colors](/tokens/colors) | Primary, semantic, and neutral colors | [Colors →](/tokens/colors) |
| [Border Radius](/tokens/border-radius) | Corner roundness for components | [Border Radius →](/tokens/border-radius) |
| [Size & Spacing](/tokens/size-spacing) | Sizes and spacing scale | [Size & Spacing →](/tokens/size-spacing) |
| [Typography](/tokens/typography) | Font family, size, and weight | [Typography →](/tokens/typography) |
| [Z-Index](/tokens/z-index) | Layering for overlays and dialogs | [Z-Index →](/tokens/z-index) |

## Quick Example

```vue
<script setup>
import { useBaklavaTheme } from "@baklavue/composables";

useBaklavaTheme().applyTheme({
  preset: "vue",
  borderRadius: { m: "0.5rem" },
  typography: { fontFamily: "'Inter', sans-serif" },
});
</script>
```

See [useBaklavaTheme](/composables/theme) for the full API.
