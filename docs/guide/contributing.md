# Contributing

Thank you for your interest in contributing to BaklaVue! This guide covers the development setup, workflow, conventions, and how to add new components and composables.

## Table of Contents

- [Development Setup](#development-setup)
- [Development Workflow](#development-workflow)
- [Adding New Components](#adding-new-components)
- [Adding New Composables](#adding-new-composables)
- [Documentation](#documentation)
- [Code Style](#code-style)
- [Testing](#testing)
- [Release Process](#release-process)
- [Getting Help](#getting-help)

## Development Setup

### Prerequisites

- **Bun** (recommended) or **Node.js 20.8.1+** — The project uses Bun for package management
- **Git** — For version control
- **Code editor** — VS Code recommended; the project uses TypeScript and Vue

### Clone and Install

```bash
# Clone the repository
git clone https://github.com/erbilnas/baklavue.git
cd baklavue

# Install dependencies (uses Bun workspaces)
bun install
```

### Project Structure

```
baklavue/
├── packages/
│   ├── ui/                    # @baklavue/ui — Vue UI components
│   │   ├── src/
│   │   │   ├── accordion/      # One folder per component
│   │   │   ├── button/
│   │   │   ├── input/
│   │   │   ├── ...
│   │   │   ├── utils/          # Shared utilities (e.g. loadBaklavaResources)
│   │   │   └── index.ts        # Main exports
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   └── composables/            # @baklavue/composables
│       ├── theme.ts
│       ├── notification.ts
│       ├── file.ts
│       ├── scrollToError.ts
│       ├── index.ts
│       └── package.json
│
├── docs/                      # VitePress documentation site
│   ├── .vitepress/
│   ├── components/             # Component docs
│   ├── composables/           # Composable docs
│   ├── guide/                 # Getting started, installation, contributing
│   ├── tokens/                # Design token docs
│   └── package.json
│
├── scripts/
│   └── commit.sh              # Conventional commit helper
├── .github/workflows/         # CI (release, deploy docs)
├── package.json               # Root workspace config
└── tsconfig.json
```

### Run the Documentation Site

The docs site doubles as a development playground. Run it to test components live:

```bash
bun run docs:dev
```

This starts the VitePress dev server (typically at `http://localhost:5173`). Components are loaded from the workspace packages, so changes in `packages/ui` or `packages/composables` are reflected immediately with hot reload.

## Development Workflow

### 1. Create a Branch

Create a feature or fix branch from `main`:

```bash
git checkout main
git pull origin main
git checkout -b feat/your-feature-name
# or
git checkout -b fix/issue-description
```

Branch naming conventions:

- `feat/` — New features
- `fix/` — Bug fixes
- `docs/` — Documentation only
- `refactor/` — Code refactoring

### 2. Make Changes

- Follow existing code style and patterns
- Add TypeScript types for all new code
- Update documentation when adding or changing components or composables
- Ensure Baklava resources are loaded (either via component mount or manually)

### 3. Verify the Build

Build the docs site to ensure everything compiles:

```bash
bun run docs:build
```

If the build succeeds, TypeScript and Vue components are compiling correctly.

### 4. Test in the Docs Site

```bash
bun run docs:dev
```

Open the docs, navigate to relevant component or composable pages, and verify behavior and styling.

### 5. Commit Changes

Use [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**Types:**

| Type | Purpose | Release impact |
| ---- | ------- | -------------- |
| `feat` | New feature | Minor |
| `fix` | Bug fix | Patch |
| `docs` | Documentation only | — |
| `style` | Formatting, whitespace | — |
| `refactor` | Code change, no behavior change | — |
| `perf` | Performance improvement | Patch |
| `test` | Tests | — |
| `chore` | Build, tooling | — |

**Examples:**

```bash
git commit -m "feat: add new button variant"
git commit -m "fix(ui): resolve button alignment issue"
git commit -m "docs: update installation guide"
git commit -m "feat(composables): add useNotification hook"
```

**Optional:** Use the commit helper script:

```bash
./scripts/commit.sh feat add new button variant
./scripts/commit.sh fix ui resolve alignment issue
```

### 6. Push and Create a Pull Request

```bash
git push origin feat/your-feature-name
```

Then open a pull request on GitHub. Provide:

- A clear title and description
- What changed and why
- Any screenshots or examples for UI changes

## Adding New Components

### Component Structure

Each component lives in its own directory under `packages/ui/src/`:

```
packages/ui/src/my-component/
├── MyComponent.vue      # Vue component
├── my-component.types.ts # TypeScript interfaces
└── index.ts             # Exports (must use Bv prefix)
```

### Step-by-Step: Create a New Component

#### 1. Create the directory and files

```bash
mkdir -p packages/ui/src/my-component
touch packages/ui/src/my-component/MyComponent.vue
touch packages/ui/src/my-component/my-component.types.ts
touch packages/ui/src/my-component/index.ts
```

#### 2. Define types in `my-component.types.ts`

```typescript
export interface MyComponentProps {
  label?: string;
  disabled?: boolean;
  // ... other props matching the Baklava web component
}
```

#### 3. Implement the component in `MyComponent.vue`

```vue
<script setup lang="ts">
import { onMounted } from "vue";
import { loadBaklavaResources } from "../utils/loadBaklavaResources";
import type { MyComponentProps } from "./my-component.types";

const props = withDefaults(defineProps<MyComponentProps>(), {
  // default values
});

const emit = defineEmits<{
  change: [value: string];
}>();

onMounted(() => {
  loadBaklavaResources();
});
</script>

<template>
  <bl-my-component
    v-bind="props"
    @bl-change="emit('change', $event.detail)"
  >
    <slot />
  </bl-my-component>
</template>
```

#### 4. Export from `index.ts` (with Bv prefix)

```typescript
export { default as BvMyComponent } from "./MyComponent.vue";
export type { MyComponentProps } from "./my-component.types";
```

#### 5. Register in `packages/ui/src/index.ts`

```typescript
export * from "./my-component";
```

### Component Guidelines

- **Bv prefix:** All components must be exported with the `Bv` prefix (e.g. `BvButton`, `BvInput`).
- **Wrap Baklava web components:** Use the corresponding `bl-*` custom element; do not reimplement from scratch.
- **Load resources:** Call `loadBaklavaResources()` in `onMounted` so scripts and styles are available.
- **TypeScript:** Provide prop and event types in a `.types.ts` file.
- **Composition API:** Use Vue 3 Composition API with `<script setup>`.
- **Events:** Map Baklava events (e.g. `bl-click`) to Vue emits (e.g. `click`).
- **v-model:** Support `v-model` where appropriate (e.g. input value, checkbox checked).
- **JSDoc:** Add JSDoc for non-obvious props and complex logic.

### Checking Baklava Component API

Consult the [Baklava Design System](https://baklava.design) and the [@trendyol/baklava](https://www.npmjs.com/package/@trendyol/baklava) package to see:

- Available `bl-*` elements and their attributes
- Events (typically prefixed with `bl-`)
- Slots and structure

## Adding New Composables

### Structure

1. Create the file in `packages/composables/`:

```typescript
// packages/composables/myComposable.ts
export const useMyComposable = () => {
  // composable logic
  return {
    doSomething: () => {},
    state: ref(0),
  };
};
```

2. Export from `packages/composables/index.ts`:

```typescript
export { useMyComposable } from "./myComposable";
```

### Guidelines

- Use Vue 3 Composition API patterns
- Export named functions (e.g. `useMyComposable`)
- Provide TypeScript types for arguments and return values
- Add JSDoc for public API

## Documentation

When adding or modifying components or composables:

1. **Component docs:** Add or update `docs/components/<component>.md`.
2. **Composable docs:** Add or update `docs/composables/<composable>.md`.
3. **Include:**
   - Description and usage
   - Code examples (with `<script setup>` and `<template>`)
   - Props, events, and slots tables
   - TypeScript usage examples where relevant

4. **Sidebar:** Update `docs/.vitepress/config.ts` if adding new pages.

5. **Demo components:** For complex demos, add Vue components in `docs/.vitepress/theme/components/` and register them in the theme.

## Code Style

- **TypeScript:** Use TypeScript for all new code; avoid `any` where possible.
- **Composition API:** Prefer `<script setup>` and Composition API.
- **Naming:** Use clear, descriptive names for variables and functions.
- **Comments:** Document complex logic; keep comments up to date.
- **Single-purpose:** Keep components and composables focused.

## Testing

- **Manual testing:** Use the docs site (`bun run docs:dev`) to verify components.
- **Build:** Ensure `bun run docs:build` completes successfully.
- **Baklava resources:** Confirm components render correctly and styles load.
- **Different scenarios:** Test with various props, slots, and edge cases.

## Release Process

BaklaVue uses [Semantic Release](https://semantic-release.gitbook.io/) for versioning:

- Commits follow [Conventional Commits](https://www.conventionalcommits.org/)
- Pushing to `main` triggers the release workflow
- Versions are derived from commit types (`feat` → minor, `fix` → patch)
- Changelogs are generated from commit messages

See the [Release Guide](/release/guide) for:

- Commit message format
- Breaking changes (`!` suffix)
- Manual release and dry-run
- Package-specific releases

## Getting Help

- **Issues:** Open an issue on [GitHub](https://github.com/erbilnas/baklavue/issues)
- **Documentation:** Check the [docs](/guide/getting-started) and [API Reference](/api/)
- **Examples:** Review existing components in `packages/ui/src/` for patterns

Thank you for contributing to BaklaVue!
