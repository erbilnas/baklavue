# BaklaVue Documentation

This directory contains the VitePress documentation site for BaklaVue.

## Development

```bash
# Install dependencies (from project root)
bun install

# Start development server
bun run docs:dev

# Build for production
bun run docs:build

# Preview production build
bun run docs:preview
```

## Structure

- `.vitepress/` - VitePress configuration and theme
- `guide/` - Getting started guides
- `components/` - Component documentation
- `composables/` - Composable documentation
- `api/` - API reference
- `release/` - Release guide

## Adding Documentation

### Adding a Component Page

1. Create a new markdown file in `components/`
2. Add it to the sidebar in `.vitepress/config.ts`
3. Include examples, props, events, and slots documentation

### Adding a Guide Page

1. Create a new markdown file in `guide/`
2. Add it to the sidebar in `.vitepress/config.ts`

## Vue Components in Markdown

You can use Vue components directly in markdown files:

```vue
<Button variant="primary">Click me</Button>
```

Components are automatically imported from `@baklavue/ui`.
