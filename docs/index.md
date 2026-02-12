---
layout: home

head:
  - - meta
    - property: og:title
      content: "BaklaVue - Vue 3 UI Kit for Trendyol Baklava Design System"
  - - meta
    - property: og:description
      content: "Type-safe Vue 3 components, 50+ composables, and design tokens built on the Trendyol Baklava Design System. v-model support, TypeScript, and composable utilities."
  - - meta
    - name: description
      content: "Type-safe Vue 3 components, 50+ composables, and design tokens built on the Trendyol Baklava Design System. v-model support, TypeScript, and composable utilities."

hero:
  name: "BaklaVue"
  text: "Enhanced Baklava experience for Vue 3"
  tagline: "Type-safe, composable, ready to ship."
  image:
    src: /logo.png
    alt: BaklaVue Logo
  actions:
    - theme: brand
      text: Get Started
      link: /guide/getting-started
    - theme: alt
      text: View on GitHub
      link: https://github.com/erbilnas/baklavue
    - theme:
      text: Open Theme Customizer
      link: "#theme-customizer"

features:
  - icon: 🚀
    title: Vue 3 Integration
    details: Composition API, reactive binding, and lifecycle hooks. Baklava components feel native in Vue.
  - icon: 📦
    title: Type Safe
    details: Full TypeScript with autocomplete, type checking, and IntelliSense for every component.
  - icon: 🔧
    title: Composable Utilities
    details: Enhanced DX and programmatic control.
  - icon: 📚
    title: Well Documented
    details: API docs, examples, and interactive playgrounds for every component.
  - icon: 🤖
    title: MCP Support
    details: Model Context Protocol server for AI assistants like Cursor, Claude, and Windsurf.
  - icon: 🌐
    title: Localization
    details: Built-in i18n support for multi-language applications.
  - icon: ↔️
    title: RTL Support
    details: Right-to-left layout support for Arabic, Hebrew, and other RTL languages.
  - icon: 🎨
    title: Theme Customization
    details: Design tokens for colors, typography, and spacing. Apply presets or define your own brand.
---

## What is BaklaVue?

::: tip Disclaimer
BaklaVue builds on [@trendyol/baklava](https://www.npmjs.com/package/@trendyol/baklava) v3.4.2. Not all Baklava components and features are yet available in BaklaVue. Check the [components list](/components/) for what's supported. Contributions welcome.
:::

BaklaVue brings the [Trendyol Baklava Design System](https://github.com/Trendyol/baklava) to Vue 3. All components support v-model, TypeScript, and Vue-friendly APIs for a native development experience.

## Quick Start

:::tabs
== npm

```bash
npm install @baklavue/ui @baklavue/composables
```

== pnpm

```bash
pnpm add @baklavue/ui @baklavue/composables
```

== yarn

```bash
yarn add @baklavue/ui @baklavue/composables
```

== bun

```bash
bun add @baklavue/ui @baklavue/composables
```

:::

See the [Getting Started Guide](/guide/getting-started) for full setup.

## Components

30+ Baklava components—forms, feedback, layout, navigation, and data display.

**[Browse all components →](/components/)**

## Composables

More for programmatic control and DX.

**[Composables docs →](/composables/)**

## MCP Support

AI-powered development with Cursor, Claude, and Windsurf. The Baklavue MCP server gives AI assistants direct access to component docs, composable APIs, and usage examples — so they generate accurate Baklavue code out of the box.

**[MCP setup guide →](/guide/mcp)**

## Learn More

- [Getting Started](/guide/getting-started) · [Installation](/guide/installation)
- [Components](/components/) · [API Reference](/api/) · [Changelog](/changelog) · [MCP Support](/guide/mcp) · [Localization](/guide/localization) · [Contributing](/guide/contributing)

---

**Built with ❤️ for the Vue community**
