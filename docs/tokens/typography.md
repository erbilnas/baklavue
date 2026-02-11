# Typography

Baklava typography tokens control font family, sizes, and weights.

## Live Preview

<div class="component-demo">

<TokenTypographyDemo />

</div>

## Reference

### Font Family

| Token | CSS Variable | Default |
| ----- | ----------- | ------- |
| fontFamily | `--bl-font-family` | "Rubik Variable", sans-serif |

### Font Sizes

| Token | CSS Variable | Default |
| ----- | ----------- | ------- |
| 2xs | `--bl-font-size-2xs` | 0.5rem |
| xs | `--bl-font-size-xs` | 0.625rem |
| s | `--bl-font-size-s` | 0.75rem |
| m | `--bl-font-size-m` | 0.875rem |
| l | `--bl-font-size-l` | 1rem |
| xl | `--bl-font-size-xl` | 1.25rem |
| 2xl | `--bl-font-size-2xl` | 1.5rem |
| 3xl | `--bl-font-size-3xl` | 1.75rem |
| 4xl | `--bl-font-size-4xl` | 2rem |
| 5xl | `--bl-font-size-5xl` | 3rem |
| 6xl | `--bl-font-size-6xl` | 4rem |

### Font Weights

| Token | CSS Variable | Default |
| ----- | ----------- | ------- |
| light | `--bl-font-weight-light` | 300 |
| regular | `--bl-font-weight-regular` | 400 |
| medium | `--bl-font-weight-medium` | 500 |
| semibold | `--bl-font-weight-semibold` | 600 |
| bold | `--bl-font-weight-bold` | 700 |

## Usage

```vue
<script setup>
import { useBaklavaTheme } from "@baklavue/composables";

useBaklavaTheme().applyTheme({
  typography: {
    fontFamily: "'Inter', sans-serif",
    fontSize: { s: "0.75rem", m: "0.875rem", l: "1rem" },
  },
});
</script>
```
