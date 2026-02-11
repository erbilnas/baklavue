# Browser APIs Composables

## useBreakpoints / useMediaQuery

[useBreakpoints](/composables/breakpoints) · `import { useBreakpoints, useMediaQuery } from "@baklavue/composables"`

Responsive breakpoints. `useBreakpoints` returns `isMobile`, `isTablet`, `isDesktop`. `useMediaQuery` for custom queries.

```typescript
const { isMobile, isTablet, isDesktop } = useBreakpoints();
const matches = useMediaQuery("(max-width: 768px)");
const { width, height } = useWindowSize();
```

## useElementSize

[useElementSize](/composables/elementSize) · `import { useElementSize } from "@baklavue/composables"`

Reactive element width and height using ResizeObserver.

```typescript
const target = ref<HTMLElement | null>(null);
const { width, height } = useElementSize(target);
```

## useContainerScroll

[useContainerScroll](/composables/containerScroll) · `import { useContainerScroll } from "@baklavue/composables"`

Reactive scroll position inside a scrollable container. RAF-throttled.

```typescript
const container = ref<HTMLElement | null>(null);
const { scrollTop, scrollLeft } = useContainerScroll(container);
```

## useSticky

[useSticky](/composables/sticky) · `import { useSticky } from "@baklavue/composables"`

Detect when a sticky element is stuck at the top of the viewport.

```typescript
const header = ref<HTMLElement | null>(null);
const { isSticky } = useSticky(header);
```

**Options:** `threshold`, `scrollTarget`

## useIntersectionObserver

[useIntersectionObserver](/composables/intersectionObserver) · `import { useIntersectionObserver } from "@baklavue/composables"`

Detects when a target element enters or leaves the viewport. Lazy loading, scroll animations.

```typescript
const isVisible = useIntersectionObserver(target, { threshold: 0.5 });
```
