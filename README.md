# BaklaVue

A Vue 3 wrapper library for [Trendyol Baklava](https://github.com/Trendyol/baklava) design system components, providing a seamless integration between Vue 3 and Baklava's web components.

## 🚀 Features

- **Vue 3 Integration**: Built with Vue 3 Composition API and TypeScript
- **Baklava Components**: Wraps Baklava web components with Vue-friendly APIs
- **Type Safety**: Full TypeScript support with proper type definitions
- **Composable Utilities**: Vue composables for enhanced functionality
- **Modern Build**: Uses Bun for fast package management and building
- **Documentation**: Interactive documentation site with component examples and playground

## 📦 Project Structure

```
baklavue/
├── packages/
│   ├── ui/                    # Vue components wrapping Baklava
│   │   ├── src/
│   │   │   ├── button/       # Button component
│   │   │   ├── input/        # Input component
│   │   │   ├── notification/ # Notification component
│   │   │   └── utils/        # Utility functions
│   │   └── package.json
│   └── composables/          # Vue composables
│       ├── notification.ts    # Notification management composable
│       └── package.json
├── docs/                      # Documentation site
│   ├── src/
│   │   ├── components/       # Component examples
│   │   └── App.vue           # Main docs app
│   └── package.json
└── package.json               # Root workspace configuration
```

## 🧩 Components

### Button Component

A Vue wrapper for Baklava's `bl-button` component with enhanced features:

```vue
<template>
  <Button
    variant="primary"
    kind="default"
    size="medium"
    :loading="isLoading"
    @click="handleClick"
  >
    Click me
  </Button>
</template>
```

**Props:**

- `variant`: Button style variant (primary, secondary, etc.)
- `kind`: Button type (default, custom, etc.)
- `size`: Button size (small, medium, large)
- `loading`: Loading state
- `disabled`: Disabled state
- `customClass`: Custom color overrides

### Input Component

A Vue wrapper for Baklava's `bl-input` component with v-model support:

```vue
<template>
  <Input
    v-model="inputValue"
    label="Email"
    placeholder="Enter your email"
    type="email"
    required
  />
</template>
```

**Features:**

- Full v-model support
- All HTML input attributes
- Validation states
- Help text and error messages
- Icon support

### Notification Component

A Vue wrapper for Baklava's `bl-notification` component:

```vue
<template>
  <Notification :duration="5" />
</template>
```

## 🔧 Composables

### useNotification

A composable for managing notifications programmatically:

```vue
<script setup>
import { useNotification } from "@baklavue/composables";

const { success, error, warning, info } = useNotification();

const showSuccess = () => {
  success({
    title: "Success!",
    message: "Operation completed successfully",
  });
};
</script>
```

**Methods:**

- `success()`: Show success notification
- `error()`: Show error notification
- `warning()`: Show warning notification
- `info()`: Show info notification

## 🚀 Getting Started

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd baklavue

# Install dependencies
bun install
```

### Development

```bash
# Start the documentation site
cd docs
bun run dev
```

The documentation site will be available at `http://localhost:5173` with interactive examples of all components and a playground for testing.

### Building

```bash
# Build all packages
bun run build

# Type checking
bun run type-check
```

## 📚 Usage Examples

### Basic Button Usage

```vue
<template>
  <div>
    <Button variant="primary" @click="handlePrimaryClick">
      Primary Button
    </Button>

    <Button variant="secondary" kind="outline" size="large">
      Large Outline Button
    </Button>

    <Button
      :loading="isLoading"
      loading-label="Processing..."
      variant="success"
    >
      Submit
    </Button>
  </div>
</template>

<script setup>
import { Button } from "@baklavue/ui";
import { ref } from "vue";

const isLoading = ref(false);

const handlePrimaryClick = () => {
  console.log("Primary button clicked!");
};
</script>
```

### Form with Input and Notifications

```vue
<template>
  <div>
    <Input
      v-model="email"
      label="Email Address"
      type="email"
      required
      :invalid-text="emailError"
    />

    <Button @click="submitForm" :loading="isSubmitting"> Submit Form </Button>

    <Notification />
  </div>
</template>

<script setup>
import { Button, Input, Notification } from "@baklavue/ui";
import { useNotification } from "@baklavue/composables";
import { ref } from "vue";

const email = ref("");
const emailError = ref("");
const isSubmitting = ref(false);
const { success, error } = useNotification();

const submitForm = async () => {
  if (!email.value) {
    emailError.value = "Email is required";
    return;
  }

  isSubmitting.value = true;

  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    success({ title: "Success!", message: "Form submitted successfully" });
    email.value = "";
  } catch (err) {
    error({ title: "Error", message: "Failed to submit form" });
  } finally {
    isSubmitting.value = false;
  }
};
</script>
```

## 🛠️ Development

### Project Setup

This project uses:

- **Bun** for package management and building
- **Vue 3** with Composition API
- **TypeScript** for type safety
- **Vite** for the documentation development server
- **Workspaces** for monorepo management

### Versioning and Releases

This project uses [Semantic Release](https://semantic-release.gitbook.io/semantic-release/) for automated versioning.

#### Commit Convention

All commits must follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```bash
# Features (triggers minor release)
feat: add new button component
feat(ui): add input validation

# Bug fixes (triggers patch release)
fix: resolve button alignment issue
fix(composables): handle notification cleanup

# Documentation
docs: update installation guide

# Breaking changes (triggers major release)
feat!: remove deprecated API
```

#### Automated Releases

- Push to `main` branch triggers automatic release
- Version numbers are determined by commit types
- Changelog is automatically generated
- GitHub releases are created automatically

#### Manual Release

```bash
# Test release process
bun run release:dry-run

# Create release
bun run release

# Use commit helper
bun run commit feat add new feature
```

For detailed release information, see [RELEASE.md](./RELEASE.md).

### Adding New Components

1. Create a new component in `packages/ui/src/`
2. Export it from `packages/ui/src/index.ts`
3. Add types to the component's `.types.ts` file
4. Update the documentation with examples
5. Ensure Baklava resources are loaded via `loadBaklavaResources()`

### Component Guidelines

- Always wrap Baklava web components
- Provide proper TypeScript interfaces
- Use Vue 3 Composition API
- Include proper event handling
- Support v-model where applicable
- Load Baklava resources on component mount

## 📖 API Reference

### Button Props

| Prop       | Type            | Default     | Description          |
| ---------- | --------------- | ----------- | -------------------- |
| `variant`  | `ButtonVariant` | `'primary'` | Button style variant |
| `kind`     | `ButtonKind`    | `'default'` | Button type          |
| `size`     | `ButtonSize`    | `'medium'`  | Button size          |
| `loading`  | `boolean`       | `false`     | Loading state        |
| `disabled` | `boolean`       | `false`     | Disabled state       |
| `label`    | `string`        | `undefined` | Button text          |
| `icon`     | `BaklavaIcon`   | `undefined` | Icon to display      |

### Input Props

| Prop          | Type                       | Default     | Description      |
| ------------- | -------------------------- | ----------- | ---------------- |
| `modelValue`  | `string \| number \| null` | `undefined` | v-model value    |
| `label`       | `string`                   | `undefined` | Input label      |
| `placeholder` | `string`                   | `undefined` | Placeholder text |
| `type`        | `string`                   | `'text'`    | Input type       |
| `required`    | `boolean`                  | `false`     | Required field   |
| `invalidText` | `string`                   | `undefined` | Error message    |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🔗 Links

- [Trendyol Baklava](https://github.com/Trendyol/baklava) - Design system
- [Vue 3 Documentation](https://vuejs.org/) - Vue framework
- [Bun Documentation](https://bun.sh/) - Package manager
