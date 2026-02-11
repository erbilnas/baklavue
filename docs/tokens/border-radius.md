# Border Radius

Baklava border radius tokens control the roundness of component corners.

## Live Preview

<div class="component-demo">

<TokenBorderRadiusDemo />

</div>

## Reference

| Token | CSS Variable | Default |
| ----- | ----------- | ------- |
| xs | `--bl-border-radius-xs` | 0.125rem |
| s | `--bl-border-radius-s` | 0.25rem |
| m | `--bl-border-radius-m` | 0.375rem |
| l | `--bl-border-radius-l` | 0.5rem |
| pill | `--bl-border-radius-pill` | 62.438rem |
| circle | `--bl-border-radius-circle` | 50% |

## Usage

```vue
<script setup>
import { useBaklavaTheme } from "@baklavue/composables";

useBaklavaTheme().applyTheme({
  borderRadius: {
    s: "0.5rem",
    m: "0.75rem",
    l: "1rem",
  },
});
</script>
```
