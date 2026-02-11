# Banner

A full-width banner displayed at the top of a page to inform users about important information.

## Basic

Use the `title` prop for a simple banner message.

<div class="component-demo">

<BannerBasicDemo />

</div>

```vue
<template>
  <BvBanner title="This is a banner with an important message." />
</template>

<script setup>
import { BvBanner } from "@baklavue/ui";
</script>
```

## With Icon

Add an icon next to the title using the `icon` prop.

<div class="component-demo">

<BannerWithIconDemo />

</div>

```vue
<template>
  <BvBanner icon="info" title="This is a banner with an icon." />
</template>

<script setup>
import { BvBanner } from "@baklavue/ui";
</script>
```

## Color Variants

Use the `color` prop to change the banner color. Supports primary, success, danger, warning, info, and neutral.

<div class="component-demo" style="display: flex; flex-direction: column; gap: 0.5rem;">

<BannerColorsDemo />

</div>

```vue
<template>
  <BvBanner color="primary" title="Primary banner" />
  <BvBanner color="success" title="Success banner" />
  <BvBanner color="info" icon="info" title="Info banner" />
  <BvBanner color="warning" icon="warning" title="Warning banner" />
  <BvBanner color="danger" icon="danger" title="Danger banner" />
  <BvBanner color="neutral" title="Neutral banner" />
</template>

<script setup>
import { BvBanner } from "@baklavue/ui";
</script>
```

## Closable

Display a close button using the `close` prop. Listen to the `close` event when the user dismisses the banner. Use the `id` prop to persist the dismissed state in localStorage across page reloads.

<div class="component-demo">

<BannerClosableDemo />

</div>

```vue
<template>
  <BvBanner
    id="example"
    title="This is a closable banner."
    close
    @close="handleClose"
  />
</template>

<script setup>
import { BvBanner } from "@baklavue/ui";

const handleClose = () => {
  console.log("Banner closed");
};
</script>
```

## With Actions

Use the `actions` prop to add action buttons to the banner.

<div class="component-demo">

<BannerWithActionsDemo />

</div>

```vue
<template>
  <BvBanner title="This is a banner with actions." :actions="actions" />
</template>

<script setup>
import { ref } from "vue";
import { BvBanner } from "@baklavue/ui";

const actions = ref([
  {
    label: "Action 1",
    variant: "tertiary",
    onClick: () => console.log("Action 1"),
  },
  {
    label: "Action 2",
    variant: "tertiary",
    trailingIcon: "arrow_right",
    onClick: () => console.log("Action 2"),
  },
]);
</script>
```

## As Link

Pass the `to` prop to make the banner a link. Useful for announcements that link to more information.

<div class="component-demo">

<BannerLinkDemo />

</div>

```vue
<template>
  <BvBanner
    to="https://example.com"
    target="_blank"
    title="Learn more about our announcement"
    color="primary"
  />
</template>

<script setup>
import { BvBanner } from "@baklavue/ui";
</script>
```

## Usage in App Layout

Use the Banner at the top of your app layout or main template.

```vue
<template>
  <div class="app">
    <BvBanner
      icon="info"
      title="Important announcement: Check out our new features!"
      close
      id="announcement-2024"
    />
    <header>...</header>
    <main>...</main>
  </div>
</template>

<script setup>
import { BvBanner } from "@baklavue/ui";
</script>
```

## Props

| Prop        | Type             | Default     | Description                                                       |
| ----------- | ---------------- | ----------- | ----------------------------------------------------------------- |
| `title`     | `string`         | -           | Banner message text                                               |
| `icon`      | `BaklavaIcon`    | -           | Icon name displayed next to the title                             |
| `color`     | `BannerColor`    | `'primary'` | Color variant (primary, success, danger, warning, info, neutral)  |
| `close`     | `boolean`        | `false`     | Show close button                                                 |
| `closeIcon` | `BaklavaIcon`    | `'close'`   | Icon for the close button                                         |
| `id`        | `string`         | -           | Unique ID for localStorage persistence (stores as `banner-${id}`) |
| `to`        | `string`         | -           | Makes the banner a link (href)                                    |
| `target`    | `string`         | -           | Link target (e.g. `_blank`)                                       |
| `actions`   | `BannerAction[]` | -           | Action buttons (label, variant, onClick, icon, trailingIcon)      |

## Events

| Event   | Payload | Description                              |
| ------- | ------- | ---------------------------------------- |
| `close` | `void`  | Emitted when the close button is clicked |

## Slots

| Slot      | Props | Description                     |
| --------- | ----- | ------------------------------- |
| `leading` | -     | Custom content before the title |
| `title`   | -     | Override title content          |
| `actions` | -     | Custom action buttons           |
| `close`   | -     | Custom close button             |

## Types

```typescript
import type { BannerProps, BannerColor, BannerAction } from "@baklavue/ui";

const props: BannerProps = {
  title: "Banner message",
  icon: "info",
  color: "primary",
  close: false,
  actions: [{ label: "Learn more", variant: "tertiary", onClick: () => {} }],
};
```

## Usage Notes

- **localStorage persistence**: When `id` is set and `close` is true, the dismissed state is stored in localStorage as `banner-${id}`. The banner will not show again until the user clears storage or the key is removed.

- **Link mode**: When `to` is provided, the banner content becomes a link. Action buttons inside the banner will not trigger navigation (clicks are stopped).

- **Accessibility**: The component uses `role="banner"` and includes an accessible close button label.
