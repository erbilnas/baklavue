# Image

Performance-focused image component with lazy loading, skeleton placeholder, and error handling. Prevents CLS (Cumulative Layout Shift) by reserving space with width/height.

## Basic Usage

<div class="component-demo">

<ImageBasicDemo />

</div>

```vue
<template>
  <BvImage
    src="/photo.jpg"
    alt="Photo description"
    width="200px"
    height="120px"
  />
</template>

<script setup>
import { BvImage } from "@baklavue/ui";
</script>
```

## Lazy Loading with Placeholder

Images use `loading="lazy"` by default. When `placeholder="skeleton"`, a skeleton loader is shown until the image loads.

<div class="component-demo">

<ImageLazyDemo />

</div>

```vue
<template>
  <BvImage
    src="/photo.jpg"
    alt="Photo"
    width="200px"
    height="120px"
    loading="lazy"
    placeholder="skeleton"
  />
</template>

<script setup>
import { BvImage } from "@baklavue/ui";
</script>
```

## Responsive Images

Use `srcset` and `sizes` for responsive image delivery.

```vue
<template>
  <BvImage
    src="/photo-800.jpg"
    srcset="/photo-400.jpg 400w, /photo-800.jpg 800w, /photo-1200.jpg 1200w"
    sizes="(max-width: 600px) 100vw, 50vw"
    alt="Responsive photo"
    width="100%"
    height="auto"
  />
</template>

<script setup>
import { BvImage } from "@baklavue/ui";
</script>
```

## Error Fallback

Provide a `fallback` slot when the image fails to load. Without it, a default gray placeholder is shown.

```vue
<template>
  <BvImage
    src="/broken-url.jpg"
    alt="Broken image"
    width="200px"
    height="120px"
    @error="handleError"
  >
    <template #fallback>
      <div style="padding: 1rem; text-align: center; color: #666;">
        Failed to load image
      </div>
    </template>
  </BvImage>
</template>

<script setup>
import { BvImage } from "@baklavue/ui";

function handleError() {
  console.error("Image failed to load");
}
</script>
```

## Props

| Prop          | Type                 | Default     | Description                                    |
| ------------- | -------------------- | ----------- | ---------------------------------------------- |
| `src`         | `string`             | required    | Image URL                                      |
| `alt`         | `string`             | required    | Accessible description                         |
| `width`       | `string`             | `"100%"`    | CSS width (recommended to prevent CLS)          |
| `height`      | `string`             | `"auto"`    | CSS height                                     |
| `loading`     | `"lazy" \| "eager"`  | `"lazy"`    | Native loading behavior                        |
| `placeholder` | `"skeleton" \| "none"` | `"skeleton"` | Placeholder while loading                    |
| `objectFit`   | `string`             | `"cover"`   | CSS object-fit                                 |
| `srcset`      | `string`             | -           | Responsive image sources                       |
| `sizes`       | `string`             | -           | Sizes attribute for srcset                     |

## Events

| Event   | Payload  | Description                          |
| ------- | -------- | ------------------------------------ |
| `load`  | `Event`  | Emitted when the image has loaded    |
| `error` | `Event`  | Emitted when the image fails to load |

## Slots

| Slot          | Description                                  |
| ------------- | -------------------------------------------- |
| `placeholder` | Custom placeholder (overrides skeleton)       |
| `fallback`    | Content when image fails to load              |

## Types

```typescript
import type { ImageProps, ImageLoading, ImagePlaceholder } from "@baklavue/ui";

type ImageLoading = "lazy" | "eager";
type ImagePlaceholder = "skeleton" | "none";

interface ImageProps {
  src: string;
  alt: string;
  width?: string;
  height?: string;
  loading?: ImageLoading;
  placeholder?: ImagePlaceholder;
  objectFit?: string;
  srcset?: string;
  sizes?: string;
}
```

## Usage Notes

- **CLS prevention**: Always provide `width` and `height` (or at least width with aspect-ratio) to avoid layout shift when images load.

- **Lazy loading**: Uses native `loading="lazy"` for deferred loading of offscreen images. No extra dependencies.

- **Placeholder**: The skeleton uses the same design tokens as `BvSkeleton` for consistent styling.
