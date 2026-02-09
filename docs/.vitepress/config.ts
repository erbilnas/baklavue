import { resolve } from "path";
import { defineConfig } from "vitepress";

export default defineConfig({
  title: "BaklaVue",
  description: "Vue 3 wrapper library for Trendyol Baklava Design System",
  base: "/baklavue/",

  themeConfig: {
    logo: "/logo.png",
    nav: [
      { text: "Guide", link: "/guide/getting-started" },
      { text: "Components", link: "/components/" },
      { text: "Composables", link: "/composables/" },
      { text: "API", link: "/api/reference" },
      { text: "GitHub", link: "https://github.com/erbilnas/baklavue" },
    ],

    sidebar: {
      "/guide/": [
        {
          text: "Getting Started",
          items: [
            { text: "Introduction", link: "/guide/getting-started" },
            { text: "Installation", link: "/guide/installation" },
            { text: "Contributing", link: "/guide/contributing" },
          ],
        },
      ],
      "/components/": [
        {
          text: "Components",
          items: [
            { text: "Overview", link: "/components/" },
            { text: "Accordion", link: "/components/accordion" },
            { text: "Alert", link: "/components/alert" },
            { text: "Badge", link: "/components/badge" },
            { text: "Button", link: "/components/button" },
            { text: "Checkbox", link: "/components/checkbox" },
            { text: "Datepicker", link: "/components/datepicker" },
            { text: "Dialog", link: "/components/dialog" },
            { text: "Drawer", link: "/components/drawer" },
            { text: "Dropdown", link: "/components/dropdown" },
            { text: "Icon", link: "/components/icon" },
            { text: "Input", link: "/components/input" },
            { text: "Link", link: "/components/link" },
            { text: "Notification", link: "/components/notification" },
            { text: "Pagination", link: "/components/pagination" },
            { text: "Radio", link: "/components/radio" },
            { text: "Select", link: "/components/select" },
            { text: "Spinner", link: "/components/spinner" },
            { text: "Split Button", link: "/components/split-button" },
            { text: "Stepper", link: "/components/stepper" },
            { text: "Switch", link: "/components/switch" },
            { text: "Tab", link: "/components/tab" },
            { text: "Table", link: "/components/table" },
            { text: "Tag", link: "/components/tag" },
            { text: "Textarea", link: "/components/textarea" },
            { text: "Tooltip", link: "/components/tooltip" },
          ],
        },
      ],
      "/composables/": [
        {
          text: "Composables",
          items: [
            { text: "Overview", link: "/composables/" },
            { text: "useNotification", link: "/composables/notification" },
          ],
        },
      ],
      "/api/": [
        {
          text: "API Reference",
          items: [{ text: "Reference", link: "/api/reference" }],
        },
      ],
      "/release/": [
        {
          text: "Release",
          items: [{ text: "Release Guide", link: "/release/guide" }],
        },
      ],
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/erbilnas/baklavue" },
    ],

    search: {
      provider: "local",
    },
  },

  vite: {
    resolve: {
      alias: {
        "@baklavue/ui": resolve(__dirname, "../../packages/ui"),
        "@baklavue/composables": resolve(
          __dirname,
          "../../packages/composables",
        ),
      },
    },
    optimizeDeps: {
      include: ["@baklavue/ui", "@baklavue/composables", "@trendyol/baklava"],
    },
    css: {
      postcss: undefined,
    },
  },
});
