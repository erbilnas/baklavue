# Size & Spacing

Baklava size tokens define a consistent scale for spacing, padding, and dimensions.

## Live Preview

<div class="component-demo">

<TokenSizeDemo />

</div>

## Reference

| Token | CSS Variable | Default |
| ----- | ----------- | ------- |
| 4xs | `--bl-size-4xs` | 0.125rem |
| 3xs | `--bl-size-3xs` | 0.25rem |
| 2xs | `--bl-size-2xs` | 0.5rem |
| xs | `--bl-size-xs` | 0.75rem |
| s | `--bl-size-s` | 0.875rem |
| m | `--bl-size-m` | 1rem |
| l | `--bl-size-l` | 1.25rem |
| xl | `--bl-size-xl` | 1.5rem |
| 2xl | `--bl-size-2xl` | 2rem |
| 3xl | `--bl-size-3xl` | 2.5rem |
| 4xl | `--bl-size-4xl` | 3rem |
| 5xl | `--bl-size-5xl` | 4rem |
| 6xl | `--bl-size-6xl` | 5rem |

## Usage

```vue
<script setup>
import { useBaklavaTheme } from "@baklavue/composables";

useBaklavaTheme().applyTheme({
  size: {
    s: "0.875rem",
    m: "1rem",
    l: "1.25rem",
  },
});
</script>
```
