# Link

A Vue wrapper for Baklava's `bl-link` component for navigation links. Supports inline (text within content) and standalone (button-like) variants with full TypeScript support.

## Basic Usage

<div class="component-demo">

<LinkBasicDemo />

</div>

```vue
<template>
  <BvLink href="/about">About</BvLink>
</template>

<script setup>
import { BvLink } from "@baklavue/ui";
</script>
```

## Variants

The Link component supports two variants: `inline` (default) for text within content, and `standalone` for button-like links.

### Inline Variant

Use the inline variant for links within paragraphs or other text content.

<div class="component-demo">

<LinkInlineDemo />

</div>

```vue
<template>
  <p>
    Visit our <BvLink href="/docs">documentation</BvLink> for more information.
  </p>
</template>

<script setup>
import { BvLink } from "@baklavue/ui";
</script>
```

### Standalone Variant

Use the standalone variant for prominent, button-like links.

<div class="component-demo">

<LinkStandaloneDemo />

</div>

```vue
<template>
  <BvLink href="/signup" variant="standalone">Sign up</BvLink>
</template>

<script setup>
import { BvLink } from "@baklavue/ui";
</script>
```

## Sizes

When using the standalone variant, the `size` prop controls the link size. Accepts `"small"`, `"medium"` (default), or `"large"`.

<div class="component-demo" style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap">

<LinkSizesDemo />

</div>

```vue
<template>
  <BvLink href="/" variant="standalone" size="small">Small</BvLink>
  <BvLink href="/" variant="standalone" size="medium">Medium</BvLink>
  <BvLink href="/" variant="standalone" size="large">Large</BvLink>
</template>

<script setup>
import { BvLink } from "@baklavue/ui";
</script>
```

## Kind

When using the standalone variant, the `kind` prop controls the link style. Accepts `"primary"` (default) or `"neutral"`.

<div class="component-demo" style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap">

<BvLink href="/" variant="standalone" kind="primary">Primary</BvLink>
<BvLink href="/" variant="standalone" kind="neutral">Neutral</BvLink>

</div>

```vue
<template>
  <BvLink href="/" variant="standalone" kind="primary">Primary</BvLink>
  <BvLink href="/" variant="standalone" kind="neutral">Neutral</BvLink>
</template>

<script setup>
import { BvLink } from "@baklavue/ui";
</script>
```

## With Icon

Add an icon to the link using the `#icon` slot. The icon slot is typically used with the standalone variant.

<div class="component-demo">

<LinkWithIconDemo />

</div>

```vue
<template>
  <BvLink href="/settings" variant="standalone">
    <template #icon><BvIcon name="settings" /></template>
    Settings
  </BvLink>
</template>

<script setup>
import { BvLink, BvIcon } from "@baklavue/ui";
</script>
```

## Disabled State

Disable a link to prevent user interaction.

<div class="component-demo">

<LinkDisabledDemo />

</div>

```vue
<template>
  <BvLink href="/disabled" :disabled="true">Disabled link</BvLink>
</template>

<script setup>
import { BvLink } from "@baklavue/ui";
</script>
```

## External Links

Use the `target` and `rel` props for external links. Set `target="_blank"` to open in a new tab and `rel="noopener noreferrer"` for security.

<div class="component-demo">

<LinkExternalDemo />

</div>

```vue
<template>
  <BvLink
    href="https://github.com/erbilnas/baklavue"
    target="_blank"
    rel="noopener noreferrer"
  >
    Open GitHub
  </BvLink>
</template>

<script setup>
import { BvLink } from "@baklavue/ui";
</script>
```

## Props

| Prop             | Type        | Default     | Description                                                            |
| ---------------- | ----------- | ----------- | ---------------------------------------------------------------------- |
| `href`           | `string`    | `undefined` | URL that the hyperlink points to                                       |
| `target`         | `string`    | `undefined` | Where to display the linked URL (e.g. `"_self"`, `"_blank"`)         |
| `disabled`       | `boolean`   | `undefined` | Whether the link is disabled                                           |
| `variant`        | `LinkVariant` | `undefined` | Link variant - `"inline"` or `"standalone"`                           |
| `size`           | `LinkSize`  | `undefined` | Link size - only applies to standalone variant                         |
| `kind`           | `LinkKind`  | `undefined` | Link kind - only applies to standalone variant                        |
| `ariaLabel`      | `string`    | `undefined` | Aria label for accessibility                                           |
| `rel`            | `string`    | `undefined` | Relationship (e.g. `"noopener noreferrer"` for external links)         |
| `hreflang`       | `string`    | `undefined` | Language of the linked document                                        |
| `type`           | `string`    | `undefined` | MIME type of the linked document                                       |
| `referrerPolicy` | `string`    | `undefined` | Referrer policy for the link                                           |
| `download`       | `string`    | `undefined` | Whether to download the resource instead of navigating                 |
| `ping`           | `string`    | `undefined` | Ping URLs to be notified when following the link                      |

## Events

| Event   | Payload      | Description                    |
| ------- | ------------ | ------------------------------ |
| `click` | `CustomEvent` | Emitted when the link is clicked |

## Slots

| Slot      | Props | Description                                  |
| --------- | ----- | -------------------------------------------- |
| `default` | -     | Link text content                            |
| `icon`    | -     | Custom icon for non-standalone variants       |

## Types

```typescript
import type { LinkProps, LinkVariant, LinkSize, LinkKind } from "@baklavue/ui";

type LinkVariant = "inline" | "standalone";
type LinkSize = "small" | "medium" | "large";
type LinkKind = "primary" | "neutral";

interface LinkProps {
  href?: string;
  target?: string;
  disabled?: boolean;
  variant?: LinkVariant;
  size?: LinkSize;
  kind?: LinkKind;
  ariaLabel?: string;
  rel?: string;
  hreflang?: string;
  type?: string;
  referrerPolicy?: string;
  download?: string;
  ping?: string;
}
```

## Usage Notes

- **Inline vs Standalone**: Use `inline` (default) for links within text content. Use `standalone` for prominent, button-like links that stand alone.

- **Size and Kind**: The `size` and `kind` props only apply when `variant="standalone"`.

- **External Links**: When using `target="_blank"`, always add `rel="noopener noreferrer"` for security.

- **Accessibility**: Use the `ariaLabel` prop when the link text alone does not provide sufficient context for screen readers.

- **Styling**: The component uses Baklava's default styling. Custom styling can be applied through CSS variables: `--bl-link-color`, `--bl-link-hover-color`, `--bl-link-active-color`.
