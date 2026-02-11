# Colors

Baklava color tokens control primary, semantic (success, danger, warning, info), and neutral colors.

## Live Preview

<div class="component-demo">

<TokenColorsDemo />

</div>

## Reference

| Token | CSS Variable | Default |
| ----- | ----------- | ------- |
| Primary | `--bl-color-primary` | #f27a1a |
| Primary Highlight | `--bl-color-primary-highlight` | #ef6114 |
| Primary Contrast | `--bl-color-primary-contrast` | #fef2e8 |
| Success | `--bl-color-success` | #0bc15c |
| Danger | `--bl-color-danger` | #ff5043 |
| Warning | `--bl-color-warning` | #ffb600 |
| Info | `--bl-color-info` | #5794ff |
| Neutral Darkest | `--bl-color-neutral-darkest` | #0f131a |
| Neutral Full | `--bl-color-neutral-full` | #fff |

## Usage

```vue
<script setup>
import { useBaklavaTheme } from "@baklavue/composables";

useBaklavaTheme().applyTheme({
  colors: {
    primary: "#41B883",
    primaryHighlight: "#3aa876",
    primaryContrast: "#e7f9ef",
  },
});
</script>
```

See [useBaklavaTheme](/composables/theme) for all color keys.
