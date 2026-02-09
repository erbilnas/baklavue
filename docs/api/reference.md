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
import { Checkbox } from "@baklavue/ui";

interface CheckboxProps {
  modelValue?: boolean;
  name?: string;
  label?: string;
  disabled?: boolean;
  required?: boolean;
}

// Events
interface CheckboxEmits {
  "update:modelValue": [value: boolean];
}
```

### Radio

```typescript
import { Radio } from "@baklavue/ui";

interface RadioProps {
  modelValue?: string;
  value?: string;
  name?: string;
  label?: string;
  disabled?: boolean;
  required?: boolean;
}

// Events
interface RadioEmits {
  "update:modelValue": [value: string];
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
import { useNotification } from "@baklavue/composables";

interface NotificationOptions {
  title?: string;
  message?: string;
  duration?: number;
  closable?: boolean;
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
  RadioProps,
  SwitchProps,
  SelectProps,
  TextareaProps,
} from "@baklavue/ui";
```

## Import Patterns

### Individual Imports

```typescript
import { Button, Input, Checkbox } from "@baklavue/ui";
import { useNotification } from "@baklavue/composables";
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
