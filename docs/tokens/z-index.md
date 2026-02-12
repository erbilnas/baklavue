# Z-Index

Baklava z-index tokens define the stacking order for overlays, dialogs, and tooltips.

## Reference

| Token | CSS Variable | Default |
| ----- | ----------- | ------- |
| deep | `--bl-index-deep` | -1 |
| base | `--bl-index-base` | 1 |
| popover | `--bl-index-popover` | 100 |
| tooltip | `--bl-index-tooltip` | 200 |
| sticky | `--bl-index-sticky` | 300 |
| overlay | `--bl-index-overlay` | 400 |
| dialog | `--bl-index-dialog` | 500 |
| notification | `--bl-index-notification` | 600 |

## Usage

Override z-index when you need custom layering:

```vue
<script setup>
import { useBaklavaTheme } from "@baklavue/composables";

useBaklavaTheme().applyTheme({
  zIndex: {
    dialog: 1000,
    notification: 1100,
  },
});
</script>
```
