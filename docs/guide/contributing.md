# Contributing

Thank you for your interest in contributing to BaklaVue! This guide will help you get started.

## Development Setup

### Prerequisites

- [Bun](https://bun.sh) (recommended) or Node.js 20.8.1+
- Git
- A code editor (VS Code recommended)

### Clone and Install

```bash
# Clone the repository
git clone https://github.com/erbilnas/baklavue.git
cd baklavue

# Install dependencies
bun install
```

### Project Structure

```
baklavue/
├── packages/
│   ├── ui/              # Vue component wrappers
│   ├── composables/     # Vue composables
│   └── docs/            # Documentation (VitePress)
├── playground/          # Development playground
└── package.json         # Root workspace config
```

## Development Workflow

### 1. Create a Branch

```bash
git checkout -b feat/your-feature-name
```

### 2. Make Changes

- Follow the existing code style
- Add TypeScript types for all new code
- Update documentation if needed
- Ensure Baklava resources are loaded

### 3. Test Your Changes

```bash
# Run type checking
bun run type-check

# Test in playground
cd playground
bun run dev
```

### 4. Commit Changes

Follow [Conventional Commits](https://www.conventionalcommits.org/) format:

```bash
# Features
git commit -m "feat: add new button variant"

# Bug fixes
git commit -m "fix: resolve button alignment issue"

# Documentation
git commit -m "docs: update installation guide"
```

### 5. Push and Create PR

```bash
git push origin feat/your-feature-name
```

Then create a pull request on GitHub.

## Adding New Components

### Component Structure

1. Create component directory in `packages/ui/src/`:

```
packages/ui/src/my-component/
├── MyComponent.vue
├── my-component.types.ts
└── index.ts
```

2. Component template:

```vue
<script setup lang="ts">
import { onMounted } from "vue";
import { loadBaklavaResources } from "../utils/loadBaklavaResources";
import type { MyComponentProps } from "./my-component.types";

const props = withDefaults(defineProps<MyComponentProps>(), {
  // default props
});

const emit = defineEmits<{
  // events
}>();

onMounted(() => {
  loadBaklavaResources();
});
</script>

<template>
  <bl-my-component v-bind="props" @bl-event="emit('event', $event)">
    <slot />
  </bl-my-component>
</template>
```

3. Export from `packages/ui/src/index.ts`:

```typescript
export * from "./my-component";
```

4. Add types in `my-component.types.ts`:

```typescript
export interface MyComponentProps {
  // props definition
}
```

### Component Guidelines

- Always wrap Baklava web components
- Provide proper TypeScript interfaces
- Use Vue 3 Composition API
- Include proper event handling
- Support v-model where applicable
- Load Baklava resources on component mount
- Add JSDoc comments for complex props

## Adding New Composables

1. Create composable file in `packages/composables/`:

```typescript
export const useMyComposable = () => {
  // composable logic
  return {
    // return values
  };
};
```

2. Export from `packages/composables/index.ts`:

```typescript
export { useMyComposable } from "./my-composable";
```

## Documentation

When adding or modifying components:

1. Update component documentation in `docs/components/`
2. Add code examples
3. Document all props, events, and slots
4. Include usage examples

## Code Style

- Use TypeScript for all new code
- Follow Vue 3 Composition API patterns
- Use meaningful variable and function names
- Add comments for complex logic
- Keep components focused and single-purpose

## Testing

- Test components in the playground
- Verify TypeScript types compile correctly
- Test with different Vue versions (if applicable)
- Ensure Baklava resources load correctly

## Release Process

This project uses [Semantic Release](https://semantic-release.gitbook.io/) for automated versioning:

- Commits follow Conventional Commits format
- Pushing to `main` triggers automatic release
- Version numbers are determined by commit types
- Changelog is automatically generated

See [Release Guide](/release/guide) for more details.

## Questions?

- Open an issue on GitHub
- Check existing documentation
- Review similar components for patterns

Thank you for contributing to BaklaVue! 🎉
