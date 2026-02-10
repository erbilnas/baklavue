# Accordion

A Vue wrapper for Baklava's `bl-accordion` and `bl-accordion-group` components for collapsible content sections. The Accordion component can work in two modes: as a single accordion item or as a group wrapper for multiple accordions.

## Single Accordion

Use the Accordion component without the `multiple` prop to create a single collapsible section.

### Basic Single Accordion

<div class="component-demo">

<BvAccordion caption="What is BaklaVue?">
  <p style="color:black">
    BaklaVue is a comprehensive Vue 3 wrapper library for the Trendyol Baklava
    Design System. It provides Vue-friendly APIs with full TypeScript support.
  </p>
</BvAccordion>

</div>

```vue
<template>
  <BvAccordion caption="What is BaklaVue?">
    <p>
      BaklaVue is a comprehensive Vue 3 wrapper library for the Trendyol Baklava
      Design System. It provides Vue-friendly APIs with full TypeScript support.
    </p>
  </BvAccordion>
</template>

<script setup>
import { BvAccordion } from "@baklavue/ui";
</script>
```

### With Icon

Add an icon to the accordion header using the `icon` prop.

<div class="component-demo">

<BvAccordion caption="Settings" icon="settings">
  <p style="color:black">Configure your application settings here.</p>
</BvAccordion>

</div>

```vue
<template>
  <BvAccordion caption="Settings" icon="settings">
    <p>Configure your application settings here.</p>
  </BvAccordion>
</template>

<script setup>
import { BvAccordion } from "@baklavue/ui";
</script>
```

### Disabled State

Disable an accordion to prevent user interaction.

<div class="component-demo">

<BvAccordion caption="Disabled Accordion" :disabled="true">
  <p>This content cannot be accessed.</p>
</BvAccordion>

</div>

```vue
<template>
  <BvAccordion caption="Disabled Accordion" :disabled="true" />
</template>

<script setup>
import { BvAccordion } from "@baklavue/ui";
</script>
```

## Accordion Group

Use the Accordion component with the `multiple` and `items` props to create a group of accordions. When `multiple` is `false` (default), only one accordion can be open at a time. When `multiple` is `true`, multiple accordions can be open simultaneously. Content for each item is provided via the `#item` scoped slot.

### Basic Items Example

<div class="component-demo">

<BvAccordion :multiple="false" :items="[
{ caption: 'What is BaklaVue?', content: 'BaklaVue is a comprehensive Vue 3 wrapper library for the Trendyol Baklava Design System. It provides Vue-friendly APIs with full TypeScript support.' },
{ caption: 'How do I install BaklaVue?', content: 'Install BaklaVue using your preferred package manager: bun add @baklavue/ui @baklavue/composables' },
{ caption: 'Is BaklaVue free to use?', content: 'Yes, BaklaVue is open source and free to use in your projects.' },
{ caption: 'Does BaklaVue support TypeScript?', content: 'Yes, BaklaVue is built with TypeScript and provides comprehensive type definitions for all components, props, events, and composables.' }
]">
  <template #item="{ item }">
    <p style="color: black">{{ item.content }}</p>
  </template>
</BvAccordion>

</div>

```vue
<template>
  <BvAccordion :multiple="false" :items="faqItems">
    <template #item="{ item }">
      <p>{{ item.content }}</p>
    </template>
  </BvAccordion>
</template>

<script setup>
import { BvAccordion } from "@baklavue/ui";

const faqItems = [
  {
    caption: "What is BaklaVue?",
    content:
      "BaklaVue is a comprehensive Vue 3 wrapper library for the Trendyol Baklava Design System. It provides Vue-friendly APIs with full TypeScript support.",
  },
  {
    caption: "How do I install BaklaVue?",
    content:
      "Install BaklaVue using your preferred package manager: bun add @baklavue/ui @baklavue/composables",
  },
  {
    caption: "Is BaklaVue free to use?",
    content: "Yes, BaklaVue is open source and free to use in your projects.",
  },
  {
    caption: "Does BaklaVue support TypeScript?",
    content:
      "Yes, BaklaVue is built with TypeScript and provides comprehensive type definitions for all components, props, events, and composables.",
  },
];
</script>
```

### Multiple Open with Items

<div class="component-demo">

<BvAccordion :multiple="true" :items="[
  { caption: 'Getting Started', content: 'Learn the basics of BaklaVue and how to set up your project.', open: true },
  { caption: 'Components', content: 'Explore all available components in the BaklaVue library.' },
  { caption: 'Composables', content: 'Discover powerful composables for common functionality.' }
]">
  <template #item="{ item }">
    <p style="color: black">{{ item.content }}</p>
  </template>
</BvAccordion>

</div>

```vue
<template>
  <BvAccordion :multiple="true" :items="sections">
    <template #item="{ item }">
      <p>{{ item.content }}</p>
    </template>
  </BvAccordion>
</template>

<script setup>
import { BvAccordion } from "@baklavue/ui";

const sections = [
  {
    caption: "Getting Started",
    content: "Learn the basics of BaklaVue and how to set up your project.",
    open: true,
  },
  {
    caption: "Components",
    content: "Explore all available components in the BaklaVue library.",
  },
  {
    caption: "Composables",
    content: "Discover powerful composables for common functionality.",
  },
];
</script>
```

### Items with Icons

<div class="component-demo">

<BvAccordion :multiple="false" :items="[
  { caption: 'Dashboard', icon: 'dashboard', content: 'View your dashboard with key metrics and insights.' },
  { caption: 'Settings', icon: 'settings', content: 'Configure your application settings and preferences.' },
  { caption: 'Profile', icon: 'user', content: 'Manage your profile information and account details.' }
]">
  <template #item="{ item }">
    <p style="color: black">{{ item.content }}</p>
  </template>
</BvAccordion>

</div>

```vue
<template>
  <BvAccordion :multiple="false" :items="menuItems">
    <template #item="{ item }">
      <p>{{ item.content }}</p>
    </template>
  </BvAccordion>
</template>

<script setup>
import { BvAccordion } from "@baklavue/ui";

const menuItems = [
  {
    caption: "Dashboard",
    icon: "dashboard",
    content: "View your dashboard with key metrics and insights.",
  },
  {
    caption: "Settings",
    icon: "settings",
    content: "Configure your application settings and preferences.",
  },
  {
    caption: "Profile",
    icon: "user",
    content: "Manage your profile information and account details.",
  },
];
</script>
```

### Dynamic Items from API

<div class="component-demo">

<DynamicItemsDemo />

</div>

```vue
<template>
  <div>
    <div v-if="loading">Loading...</div>
    <BvAccordion v-else :multiple="true" :items="accordionItems">
      <template #item="{ item }">
        <p>{{ item.content }}</p>
      </template>
    </BvAccordion>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { BvAccordion } from "@baklavue/ui";

const loading = ref(true);
const apiData = ref([]);

const accordionItems = computed(() => {
  return apiData.value.map((item) => ({
    caption: item.title,
    content: item.description,
    icon: item.icon,
    disabled: item.disabled,
  }));
});

onMounted(async () => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000));
  apiData.value = [
    { title: "Item 1", description: "Description 1", icon: "info" },
    { title: "Item 2", description: "Description 2", icon: "help" },
    { title: "Item 3", description: "Description 3", disabled: true },
  ];
  loading.value = false;
});
</script>
```

### Custom Content with #item Slot

Use the `#item` scoped slot to customize the content of each accordion. The slot receives `{ item, index }` and lets you render complex markup (e.g. code blocks, lists).

<div class="component-demo">

<SlotsAccordionDemo :multiple="false" />

</div>

```vue
<template>
  <BvAccordion :multiple="false" :items="items">
    <template #item="{ item }">
      <p>{{ item.content }}</p>
    </template>
  </BvAccordion>
</template>

<script setup>
import { BvAccordion } from "@baklavue/ui";

const items = [
  { caption: "Question 1", content: "Answer to question 1 goes here." },
  { caption: "Question 2", content: "Answer to question 2 goes here." },
  { caption: "Question 3", content: "Answer to question 3 goes here." },
];
</script>
```

## Complete Examples

### FAQ Section with Items Prop

A complete FAQ section using the `items` prop with the `#item` slot:

<div class="component-demo">

<div>
  <h2 style="color: black; margin-bottom: 1rem">Frequently Asked Questions</h2>
  <BvAccordion :multiple="false" :items="[
    { caption: 'What is BaklaVue?', content: 'BaklaVue is a comprehensive Vue 3 wrapper library for the Trendyol Baklava Design System. It provides Vue-friendly APIs with full TypeScript support.' },
    { caption: 'How do I install BaklaVue?', content: 'Install BaklaVue using your preferred package manager:' },
    { caption: 'Is BaklaVue free to use?', content: 'Yes, BaklaVue is open source and free to use in your projects.' },
    { caption: 'Does BaklaVue support TypeScript?', content: 'Yes, BaklaVue is built with TypeScript and provides comprehensive type definitions for all components, props, events, and composables.' }
  ]">
    <template #item="{ item }">
      <p style="color: black">{{ item.content }}</p>
    </template>
  </BvAccordion>
</div>

</div>

```vue
<template>
  <div>
    <h2>Frequently Asked Questions</h2>
    <BvAccordion :multiple="false" :items="faqItems">
      <template #item="{ item }">
        <p>{{ item.content }}</p>
      </template>
    </BvAccordion>
  </div>
</template>

<script setup>
import { BvAccordion } from "@baklavue/ui";

const faqItems = [
  {
    caption: "What is BaklaVue?",
    content:
      "BaklaVue is a comprehensive Vue 3 wrapper library for the Trendyol Baklava Design System. It provides Vue-friendly APIs with full TypeScript support.",
  },
  {
    caption: "How do I install BaklaVue?",
    content: "Install BaklaVue using your preferred package manager:",
  },
  {
    caption: "Is BaklaVue free to use?",
    content: "Yes, BaklaVue is open source and free to use in your projects.",
  },
  {
    caption: "Does BaklaVue support TypeScript?",
    content:
      "Yes, BaklaVue is built with TypeScript and provides comprehensive type definitions for all components, props, events, and composables.",
  },
];
</script>
```

### FAQ Section with Complex Content (Code Blocks)

Use the `#item` slot for items that need custom markup like code blocks:

<div class="component-demo">

<FaqSlotsDemo />

</div>

```vue
<template>
  <div>
    <h2>Frequently Asked Questions</h2>
    <BvAccordion :multiple="false" :items="faqItems">
      <template #item="{ item }">
        <div v-if="item.code">
          <p>{{ item.content }}</p>
          <pre><code>{{ item.code }}</code></pre>
        </div>
        <p v-else>{{ item.content }}</p>
      </template>
    </BvAccordion>
  </div>
</template>

<script setup>
import { BvAccordion } from "@baklavue/ui";

const faqItems = [
  {
    caption: "What is BaklaVue?",
    content:
      "BaklaVue is a comprehensive Vue 3 wrapper library for the Trendyol Baklava Design System.",
  },
  {
    caption: "How do I install BaklaVue?",
    content: "Install BaklaVue using your preferred package manager:",
    code: "bun add @baklavue/ui @baklavue/composables",
  },
  {
    caption: "Is BaklaVue free to use?",
    content: "Yes, BaklaVue is open source and free to use in your projects.",
  },
];
</script>
```

## Programmatic Control

Access accordion methods programmatically using template refs (single accordion mode only).

<div class="component-demo">

<ProgrammaticControlDemo />

</div>

```vue
<template>
  <div>
    <div style="margin-bottom: 1rem; display: flex; gap: 0.5rem;">
      <BvButton @click="expandAccordion">Expand</BvButton>
      <BvButton @click="collapseAccordion">Collapse</BvButton>
    </div>
    <BvAccordion
      ref="accordionRef"
      :open="isOpen"
      @toggle="isOpen = $event"
      caption="Programmatically Controlled Accordion"
    >
      <p>This accordion can be controlled via buttons or programmatically.</p>
    </BvAccordion>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { BvAccordion, BvButton } from "@baklavue/ui";

const accordionRef = ref();
const isOpen = ref(false);

const expandAccordion = () => {
  accordionRef.value?.expand();
};

const collapseAccordion = () => {
  accordionRef.value?.collapse();
};
</script>
```

## Custom Animation Duration

Control the expand/collapse animation duration.

<div class="component-demo">

<CustomAnimationDemo />

</div>

```vue
<template>
  <BvAccordion
    caption="Slow Animation"
    :animation-duration="500"
    :open="isOpen"
    @toggle="isOpen = $event"
  >
    <p>This accordion has a slower animation (500ms).</p>
  </BvAccordion>
</template>

<script setup>
import { ref } from "vue";
import { BvAccordion } from "@baklavue/ui";

const isOpen = ref(false);
</script>
```

## Props

### Single Accordion Mode Props

When used as a single accordion (without `multiple` prop):

| Prop                | Type                     | Default     | Description                                                                   |
| ------------------- | ------------------------ | ----------- | ----------------------------------------------------------------------------- |
| `open`              | `boolean`                | `false`     | Whether the accordion is open/expanded                                        |
| `caption`           | `string`                 | `undefined` | The caption text displayed in the accordion header                            |
| `icon`              | `boolean \| BaklavaIcon` | `undefined` | Icon configuration - boolean to show/hide default icon, or specific icon name |
| `disabled`          | `boolean`                | `false`     | Whether the accordion is disabled                                             |
| `animationDuration` | `number`                 | `250`       | Duration of the expand/collapse animation in milliseconds                     |

### Group Mode Props

When used as an accordion group (with `multiple` prop):

| Prop       | Type              | Default     | Description                                                                              |
| ---------- | ----------------- | ----------- | ---------------------------------------------------------------------------------------- |
| `multiple` | `boolean`         | `false`     | Allow multiple accordions to be open at once                                             |
| `items`    | `AccordionItem[]` | `undefined` | Array of accordion items to render. Each item will be rendered as a bl-accordion element |

### AccordionItem Interface

When using the `items` prop, each item should follow the `AccordionItem` interface. Items include all bl-accordion props; content is provided via the `#item` scoped slot.

| Property            | Type                     | Default     | Description                                                                       |
| ------------------- | ------------------------ | ----------- | --------------------------------------------------------------------------------- |
| `open`              | `boolean`                | `false`     | Whether the accordion is open/expanded                                            |
| `caption`           | `string`                 | `undefined` | The caption text displayed in the accordion header                                |
| `icon`              | `boolean \| BaklavaIcon` | `undefined` | Icon configuration - boolean to show/hide default icon, or specific icon name     |
| `disabled`          | `boolean`                | `false`     | Whether the accordion is disabled                                                 |
| `animationDuration` | `number`                 | `250`       | Duration of the expand/collapse animation in milliseconds                         |

Items may include additional custom data for use in the `#item` slot (e.g. `content`, `description`, `code`).

## Events

### Single Accordion Mode Events

When used as a single accordion:

| Event    | Payload   | Description                                                               |
| -------- | --------- | ------------------------------------------------------------------------- |
| `toggle` | `boolean` | Emitted when the accordion is toggled. The payload is the new open state. |

## Methods

### Single Accordion Mode Methods

When used as a single accordion, you can access these methods via template refs:

| Method       | Description                              |
| ------------ | ---------------------------------------- |
| `expand()`   | Expands the accordion programmatically   |
| `collapse()` | Collapses the accordion programmatically |

## Slots

| Slot      | Props              | Description                                                                 |
| --------- | ------------------ | --------------------------------------------------------------------------- |
| `default` | -                  | Content displayed when accordion is expanded (single accordion mode only)   |
| `item`    | `{ item, index }`  | Scoped slot for each accordion item content in group mode                   |

## Types

```typescript
import type { AccordionProps, AccordionItem } from "@baklavue/ui";

interface AccordionItem {
  open?: boolean;
  caption?: string;
  icon?: boolean | BaklavaIcon;
  disabled?: boolean;
  animationDuration?: number;
  [key: string]: unknown; // Additional custom data for #item slot
}

interface AccordionProps {
  // Single accordion mode props
  open?: boolean;
  caption?: string;
  icon?: boolean | BaklavaIcon;
  disabled?: boolean;
  animationDuration?: number;

  // Group mode props
  multiple?: boolean;
  items?: AccordionItem[];
}
```

## Usage Notes

- **Single vs Group Mode**: The component automatically switches between single accordion mode and group mode based on whether the `multiple` prop is provided. When `multiple` is `undefined`, it acts as a single accordion. When `multiple` is provided (even if `false`), it acts as a group wrapper using the `items` prop.

- **Items Prop Required**: In group mode, accordions are rendered from the `items` prop. There is no default slot for nested accordion children. Content for each item is provided via the `#item` scoped slot.

- **State Management**: With the `items` prop, you can control the initial `open` state directly in the items array. In group mode, the underlying `bl-accordion-group` manages which accordions are open.

- **Accessibility**: The component follows Baklava's accessibility guidelines and includes proper ARIA attributes for screen readers.

- **Styling**: The component uses Baklava's default styling. Custom styling can be applied through CSS variables or by overriding the component styles.
