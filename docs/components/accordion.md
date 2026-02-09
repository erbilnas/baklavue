# Accordion

A Vue wrapper for Baklava's `bl-accordion` and `bl-accordion-group` components for collapsible content sections. The Accordion component can work in two modes: as a single accordion item or as a group wrapper for multiple accordions.

## Single Accordion

Use the Accordion component without the `multiple` prop to create a single collapsible section.

### Basic Single Accordion

```vue
<template>
  <Accordion caption="What is BaklaVue?">
    <p>
      BaklaVue is a comprehensive Vue 3 wrapper library for the Trendyol Baklava
      Design System. It provides Vue-friendly APIs with full TypeScript support.
    </p>
  </Accordion>
</template>

<script setup>
import { Accordion } from "@baklavue/ui";
</script>
```

<Accordion caption="What is BaklaVue?">
  <p>
    BaklaVue is a comprehensive Vue 3 wrapper library for the Trendyol Baklava
    Design System. It provides Vue-friendly APIs with full TypeScript support.
  </p>
</Accordion>

### Controlled Single Accordion

Control the open/closed state programmatically using the `open` prop and `@toggle` event.

```vue
<template>
  <div>
    <Button @click="toggleAccordion">
      {{ isOpen ? "Close" : "Open" }} Accordion
    </Button>
    <Accordion
      :open="isOpen"
      @toggle="isOpen = $event"
      caption="Controlled Accordion"
    >
      <p>This accordion's state is controlled by the parent component.</p>
      <p>Current state: {{ isOpen ? "Open" : "Closed" }}</p>
    </Accordion>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Accordion, Button } from "@baklavue/ui";

const isOpen = ref(false);

const toggleAccordion = () => {
  isOpen.value = !isOpen.value;
};
</script>
```

### With Icon

Add an icon to the accordion header using the `icon` prop.

```vue
<template>
  <Accordion caption="Settings" icon="settings">
    <p>Configure your application settings here.</p>
  </Accordion>
</template>

<script setup>
import { Accordion } from "@baklavue/ui";
</script>
```

<Accordion caption="Settings" icon="settings">
  <p>Configure your application settings here.</p>
</Accordion>

### Disabled State

Disable an accordion to prevent user interaction.

```vue
<template>
  <Accordion caption="Disabled Accordion" :disabled="true">
    <p>This content cannot be accessed.</p>
  </Accordion>
</template>

<script setup>
import { Accordion } from "@baklavue/ui";
</script>
```

<Accordion caption="Disabled Accordion" :disabled="true">
  <p>This content cannot be accessed.</p>
</Accordion>

## Accordion Group

Use the Accordion component with the `multiple` prop to create a group of accordions. When `multiple` is `false` (default), only one accordion can be open at a time. When `multiple` is `true`, multiple accordions can be open simultaneously.

### Using Items Prop (Recommended)

The easiest way to create an accordion group is by using the `items` prop. This approach is ideal when you have data-driven accordions.

#### Basic Items Example

```vue
<template>
  <Accordion :multiple="false" :items="faqItems" />
</template>

<script setup>
import { Accordion } from "@baklavue/ui";

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

#### Multiple Open with Items

```vue
<template>
  <Accordion :multiple="true" :items="sections" />
</template>

<script setup>
import { Accordion } from "@baklavue/ui";

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

#### Items with Icons

```vue
<template>
  <Accordion :multiple="false" :items="menuItems" />
</template>

<script setup>
import { Accordion } from "@baklavue/ui";

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

#### Dynamic Items from API

```vue
<template>
  <div>
    <div v-if="loading">Loading...</div>
    <Accordion v-else :multiple="true" :items="accordionItems" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { Accordion } from "@baklavue/ui";

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

### Using Slots (Alternative)

You can also use slots to create accordion groups. This approach gives you more control over individual accordion content.

#### Single Open (Default)

By default, only one accordion in a group can be open at a time.

```vue
<template>
  <Accordion :multiple="false">
    <Accordion :open="open1" @toggle="open1 = $event" caption="Question 1">
      <p>Answer to question 1 goes here.</p>
    </Accordion>
    <Accordion :open="open2" @toggle="open2 = $event" caption="Question 2">
      <p>Answer to question 2 goes here.</p>
    </Accordion>
    <Accordion :open="open3" @toggle="open3 = $event" caption="Question 3">
      <p>Answer to question 3 goes here.</p>
    </Accordion>
  </Accordion>
</template>

<script setup>
import { ref } from "vue";
import { Accordion } from "@baklavue/ui";

const open1 = ref(false);
const open2 = ref(false);
const open3 = ref(false);
</script>
```

#### Multiple Open

Allow multiple accordions to be open at the same time by setting `multiple` to `true`.

```vue
<template>
  <Accordion :multiple="true">
    <Accordion :open="open1" @toggle="open1 = $event" caption="Section 1">
      <p>Content for section 1.</p>
    </Accordion>
    <Accordion :open="open2" @toggle="open2 = $event" caption="Section 2">
      <p>Content for section 2.</p>
    </Accordion>
    <Accordion :open="open3" @toggle="open3 = $event" caption="Section 3">
      <p>Content for section 3.</p>
    </Accordion>
  </Accordion>
</template>

<script setup>
import { ref } from "vue";
import { Accordion } from "@baklavue/ui";

const open1 = ref(false);
const open2 = ref(false);
const open3 = ref(false);
</script>
```

## Complete Examples

### FAQ Section with Items Prop

A complete FAQ section using the `items` prop:

```vue
<template>
  <div>
    <h2>Frequently Asked Questions</h2>
    <Accordion :multiple="false" :items="faqItems" />
  </div>
</template>

<script setup>
import { Accordion } from "@baklavue/ui";

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

### FAQ Section with Slots

The same FAQ section using slots for more complex content:

```vue
<template>
  <div>
    <h2>Frequently Asked Questions</h2>
    <Accordion :multiple="false">
      <Accordion
        :open="faq1"
        @toggle="faq1 = $event"
        caption="What is BaklaVue?"
      >
        <p>
          BaklaVue is a comprehensive Vue 3 wrapper library for the Trendyol
          Baklava Design System. It provides Vue-friendly APIs with full
          TypeScript support.
        </p>
      </Accordion>
      <Accordion
        :open="faq2"
        @toggle="faq2 = $event"
        caption="How do I install BaklaVue?"
      >
        <p>Install BaklaVue using your preferred package manager:</p>
        <pre><code>bun add @baklavue/ui @baklavue/composables</code></pre>
      </Accordion>
      <Accordion
        :open="faq3"
        @toggle="faq3 = $event"
        caption="Is BaklaVue free to use?"
      >
        <p>Yes, BaklaVue is open source and free to use in your projects.</p>
      </Accordion>
      <Accordion
        :open="faq4"
        @toggle="faq4 = $event"
        caption="Does BaklaVue support TypeScript?"
      >
        <p>
          Yes, BaklaVue is built with TypeScript and provides comprehensive type
          definitions for all components, props, events, and composables.
        </p>
      </Accordion>
    </Accordion>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Accordion } from "@baklavue/ui";

const faq1 = ref(false);
const faq2 = ref(false);
const faq3 = ref(false);
const faq4 = ref(false);
</script>
```

## Programmatic Control

Access accordion methods programmatically using template refs (single accordion mode only).

```vue
<template>
  <div>
    <div style="margin-bottom: 1rem; display: flex; gap: 0.5rem;">
      <Button @click="expandAccordion">Expand</Button>
      <Button @click="collapseAccordion">Collapse</Button>
    </div>
    <Accordion
      ref="accordionRef"
      :open="isOpen"
      @toggle="isOpen = $event"
      caption="Programmatically Controlled Accordion"
    >
      <p>This accordion can be controlled via buttons or programmatically.</p>
    </Accordion>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Accordion, Button } from "@baklavue/ui";

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

```vue
<template>
  <Accordion
    caption="Slow Animation"
    :animation-duration="500"
    :open="isOpen"
    @toggle="isOpen = $event"
  >
    <p>This accordion has a slower animation (500ms).</p>
  </Accordion>
</template>

<script setup>
import { ref } from "vue";
import { Accordion } from "@baklavue/ui";

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

When using the `items` prop, each item should follow the `AccordionItem` interface:

| Property            | Type                     | Default     | Description                                                                       |
| ------------------- | ------------------------ | ----------- | --------------------------------------------------------------------------------- |
| `open`              | `boolean`                | `false`     | Whether the accordion is open/expanded                                            |
| `caption`           | `string`                 | `undefined` | The caption text displayed in the accordion header                                |
| `icon`              | `boolean \| BaklavaIcon` | `undefined` | Icon configuration - boolean to show/hide default icon, or specific icon name     |
| `disabled`          | `boolean`                | `false`     | Whether the accordion is disabled                                                 |
| `animationDuration` | `number`                 | `250`       | Duration of the expand/collapse animation in milliseconds                         |
| `content`           | `string \| (() => any)`  | `undefined` | The content to display inside the accordion. Can be a string or a render function |

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

| Slot      | Description                                                                                                             |
| --------- | ----------------------------------------------------------------------------------------------------------------------- |
| `default` | Content displayed when accordion is expanded. Also used in group mode to add additional accordions alongside items prop |

## Types

```typescript
import type { AccordionProps, AccordionItem } from "@baklavue/ui";

interface AccordionItem {
  open?: boolean;
  caption?: string;
  icon?: boolean | BaklavaIcon;
  disabled?: boolean;
  animationDuration?: number;
  content?: string | (() => any);
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

- **Single vs Group Mode**: The component automatically switches between single accordion mode and group mode based on whether the `multiple` prop is provided. When `multiple` is `undefined`, it acts as a single accordion. When `multiple` is provided (even if `false`), it acts as a group wrapper.

- **Items Prop vs Slots**: Use the `items` prop when you have data-driven accordions or want a simpler API. Use slots when you need more control over individual accordion content or want to include complex markup/components.

- **Combining Items and Slots**: You can use both `items` prop and slots together. Items will be rendered first, followed by any accordions provided via slots.

- **State Management**: In group mode with slots, you need to manage the `open` state for each accordion item individually using `v-model` or `:open` with `@toggle`. With the `items` prop, you can control the initial `open` state directly in the items array.

- **Accessibility**: The component follows Baklava's accessibility guidelines and includes proper ARIA attributes for screen readers.

- **Styling**: The component uses Baklava's default styling. Custom styling can be applied through CSS variables or by overriding the component styles.
