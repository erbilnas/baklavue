# Installation

This guide covers detailed installation instructions for BaklaVue in different scenarios.

## Package Installation

### Install Core Packages

BaklaVue consists of two main packages:

- `@baklavue/ui` - Vue component wrappers
- `@baklavue/composables` - Vue composables

```bash
npm install @baklavue/ui @baklavue/composables
```

### Peer Dependencies

BaklaVue requires the following peer dependencies:

- `vue` ^3.5.21
- `typescript` ^5.9.2 (recommended)

These should already be installed in your Vue 3 project. If not:

```bash
npm install vue@^3.5.21 typescript@^5.9.2
```

## Framework Integration

### Vue 3 with Vite

BaklaVue works seamlessly with Vite:

```bash
npm create vue@latest my-app
cd my-app
npm install @baklavue/ui @baklavue/composables
```

### Vue 3 with Nuxt

For Nuxt 3 projects:

```bash
npx nuxi@latest init my-app
cd my-app
npm install @baklavue/ui @baklavue/composables
```

### Vue 3 with Vue CLI

```bash
vue create my-app
cd my-app
npm install @baklavue/ui @baklavue/composables
```

## TypeScript Configuration

If using TypeScript, ensure your `tsconfig.json` includes proper module resolution:

```json
{
  "compilerOptions": {
    "moduleResolution": "bundler",
    "types": ["vite/client"]
  }
}
```

## Import Styles

BaklaVue components automatically load Baklava styles. However, if you need to import them manually:

```typescript
// In your main.ts or main.js
import "@trendyol/baklava/dist/baklava.css";
```

## Verify Installation

Create a test component to verify everything is working:

```vue
<template>
  <Button variant="primary">Test Button</Button>
</template>

<script setup>
import { Button } from "@baklavue/ui";
</script>
```

If the button renders correctly, installation is successful!

## Troubleshooting

### Components not rendering

- Ensure Baklava CSS is loaded
- Check that Vue 3 is installed correctly
- Verify component imports are correct

### TypeScript errors

- Ensure TypeScript version is 5.9.2 or higher
- Check that type definitions are being resolved
- Verify `tsconfig.json` configuration

### Build errors

- Clear node_modules and reinstall dependencies
- Check for version conflicts
- Ensure all peer dependencies are installed

## Next Steps

- Read the [Getting Started Guide](/guide/getting-started)
- Explore [Components](/components/)
- Check [API Reference](/api/reference)
