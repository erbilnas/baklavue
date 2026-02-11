# API Reference

Complete API reference for BaklaVue components and composables.

## Components

### Button

```typescript
import { Button } from "@baklavue/ui";

interface ButtonProps {
  variant?: "primary" | "secondary" | "tertiary" | "danger";
  kind?: "default" | "custom";
  size?: "small" | "medium" | "large";
  label?: string;
  loadingLabel?: string;
  loading?: boolean;
  disabled?: boolean;
  href?: string;
  target?: "_self" | "_blank" | "_parent" | "_top";
  icon?: string;
  type?: "button" | "submit" | "reset";
  autofocus?: boolean;
  customClass?: {
    color?: string;
    highlightColor?: string;
  };
}

// Events
interface ButtonEmits {
  click: [event: CustomEvent<MouseEvent>];
}
```

### Input

```typescript
import { Input } from "@baklavue/ui";

interface InputProps {
  modelValue?: string | number | null;
  name?: string;
  type?: InputType;
  label?: string;
  placeholder?: string;
  required?: boolean;
  minlength?: number;
  maxlength?: number;
  min?: number | string;
  max?: number | string;
  pattern?: string;
  step?: number;
  autocomplete?: string;
  inputmode?: InputMode;
  autofocus?: boolean;
  icon?: string;
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  readonly?: boolean;
  labelFixed?: boolean;
  invalidText?: string;
  helpText?: string;
  loading?: boolean;
  suffixText?: string;
}

// Events
interface InputEmits {
  "update:modelValue": [value: string | number | null];
  invalid: [state: ValidityState];
  focus: [event: FocusEvent];
  blur: [event: FocusEvent];
}
```

### Checkbox

```typescript
import { BvCheckbox } from "@baklavue/ui";

interface CheckboxProps {
  // Single checkbox mode
  modelValue?: boolean | (string | number)[];
  disabled?: boolean;
  indeterminate?: boolean;
  value?: string | number;
  name?: string;
  label?: string;

  // Group mode
  items?: CheckboxItem[];
}

interface CheckboxItem {
  value: string | number;
  label?: string;
  checked?: boolean;
  disabled?: boolean;
  indeterminate?: boolean;
  name?: string;
  [key: string]: unknown;
}

// Events
interface CheckboxEmits {
  "update:modelValue": [value: boolean | (string | number)[]];
  change: [event: CustomEvent];
  input: [event: CustomEvent]; // Single mode only
}
```

### Radio

```typescript
import { BvRadio } from "@baklavue/ui";

interface RadioItem {
  value: string | number;
  label?: string;
  disabled?: boolean;
  name?: string;
  [key: string]: unknown;
}

interface RadioProps {
  modelValue?: string | number;
  value?: string | number;
  name?: string;
  label?: string;
  checked?: boolean;
  disabled?: boolean;
  required?: boolean;
  items?: RadioItem[]; // Group mode
}

// Events
interface RadioEmits {
  "update:modelValue": [value: string | number];
  "update:checked": [checked: boolean];
  change: [event: CustomEvent];
  input: [event: CustomEvent];
}
```

### Switch

```typescript
import { Switch } from "@baklavue/ui";

interface SwitchProps {
  modelValue?: boolean;
  name?: string;
  label?: string;
  disabled?: boolean;
  required?: boolean;
}

// Events
interface SwitchEmits {
  "update:modelValue": [value: boolean];
}
```

### Select

```typescript
import { Select } from "@baklavue/ui";

interface SelectProps {
  modelValue?: string;
  name?: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  size?: "small" | "medium" | "large";
}

// Events
interface SelectEmits {
  "update:modelValue": [value: string];
}
```

### Textarea

```typescript
import { Textarea } from "@baklavue/ui";

interface TextareaProps {
  modelValue?: string;
  name?: string;
  label?: string;
  placeholder?: string;
  rows?: number;
  cols?: number;
  required?: boolean;
  minlength?: number;
  maxlength?: number;
  disabled?: boolean;
  readonly?: boolean;
  invalidText?: string;
  helpText?: string;
}

// Events
interface TextareaEmits {
  "update:modelValue": [value: string];
  invalid: [state: ValidityState];
}
```

## Composables

### useNotification

```typescript
import { useNotification, useBaklavaTheme } from "@baklavue/composables";

interface NotificationOptions {
  caption?: string;    // Notification title
  description: string; // Notification message (required)
  duration?: number;
  permanent?: boolean;
}

interface UseNotificationReturn {
  success: (options: Omit<NotificationOptions, "variant">) => void;
  error: (options: Omit<NotificationOptions, "variant">) => void;
  warning: (options: Omit<NotificationOptions, "variant">) => void;
  info: (options: Omit<NotificationOptions, "variant">) => void;
}

const { success, error, warning, info }: UseNotificationReturn =
  useNotification();
```

### useBaklavaTheme

```typescript
import { useBaklavaTheme } from "@baklavue/composables";

const { applyTheme } = useBaklavaTheme();

// Vue preset
applyTheme({ preset: "vue" });

// Custom colors
applyTheme({
  colors: { primary: "#41B883", primaryHighlight: "#3aa876" },
});
```

## Utilities

### loadBaklavaResources

```typescript
import { loadBaklavaResources } from '@baklavue/ui'

// Loads Baklava CSS and resources
loadBaklavaResources(): void
```

## Type Exports

All types are exported from the main package:

```typescript
import type {
  ButtonProps,
  InputProps,
  CheckboxProps,
  CheckboxItem,
  RadioProps,
  SwitchProps,
  SelectProps,
  TextareaProps,
} from "@baklavue/ui";
```

## Import Patterns

### Individual Imports

```typescript
import { BvButton, BvInput, BvCheckbox } from "@baklavue/ui";
import { useNotification, useBaklavaTheme } from "@baklavue/composables";
```

### Namespace Import

```typescript
import * as BaklaVue from "@baklavue/ui";
import * as BaklaVueComposables from "@baklavue/composables";
```

### Type Imports

```typescript
import type { ButtonProps } from "@baklavue/ui";
```
