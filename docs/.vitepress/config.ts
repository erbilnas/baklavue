import { resolve } from "path";
import { defineConfig } from "vitepress";

const badge = (label: string, type: "wip" | "new" | "broken") =>
  ` <span class="VPBadge ${type === "wip" ? "warning" : type === "new" ? "tip" : type === "broken" ? "error" : "info"}">${label.toUpperCase()}</span>`;

export default defineConfig({
  title: "BaklaVue",
  description: "Vue 3 wrapper library for Trendyol Baklava Design System",
  base: "/baklavue/",

  head: [["link", { rel: "icon", href: "/baklavue/logo.png" }]],

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
            {
              text: `Accordion${badge("new", "new")}`,
              link: "/components/accordion",
            },
            {
              text: `Alert${badge("new", "new")}`,
              link: "/components/alert",
            },
            {
              text: `Badge${badge("new", "new")}`,
              link: "/components/badge",
            },
            {
              text: `Button${badge("new", "new")}`,
              link: "/components/button",
            },
            {
              text: `Checkbox${badge("new", "new")}`,
              link: "/components/checkbox",
            },
            {
              text: `Datepicker${badge("new", "new")}`,
              link: "/components/datepicker",
            },
            {
              text: `Dialog${badge("new", "new")}`,
              link: "/components/dialog",
            },
            {
              text: `Drawer${badge("new", "new")}`,
              link: "/components/drawer",
            },
            {
              text: `Dropdown${badge("new", "new")}`,
              link: "/components/dropdown",
            },
            {
              text: `Icon${badge("new", "new")}`,
              link: "/components/icon",
            },
            {
              text: `Input${badge("new", "new")}`,
              link: "/components/input",
            },
            {
              text: `Link${badge("new", "new")}`,
              link: "/components/link",
            },
            {
              text: `Notification${badge("new", "new")}`,
              link: "/components/notification",
            },
            {
              text: `Pagination${badge("new", "new")}`,
              link: "/components/pagination",
            },
            {
              text: `Radio${badge("new", "new")}`,
              link: "/components/radio",
            },
            {
              text: `Select${badge("new", "new")}`,
              link: "/components/select",
            },
            {
              text: `Spinner${badge("new", "new")}`,
              link: "/components/spinner",
            },
            {
              text: `Split Button${badge("new", "new")}`,
              link: "/components/split-button",
            },
            {
              text: `Stepper${badge("new", "new")}`,
              link: "/components/stepper",
            },
            {
              text: `Switch${badge("new", "new")}`,
              link: "/components/switch",
            },
            { text: `Tab${badge("new", "new")}`, link: "/components/tab" },
            { text: `Table${badge("new", "new")}`, link: "/components/table" },
            { text: `Tag${badge("new", "new")}`, link: "/components/tag" },
            {
              text: `Textarea${badge("new", "new")}`,
              link: "/components/textarea",
            },
            {
              text: `Tooltip${badge("new", "new")}`,
              link: "/components/tooltip",
            },
          ],
        },
      ],
      "/composables/": [
        {
          text: "Composables",
          items: [
            { text: "Overview", link: "/composables/" },
            { text: "useNotification", link: "/composables/notification" },
            { text: "useBaklavaTheme", link: "/composables/theme" },
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

  vue: {
    template: {
      compilerOptions: {
        isCustomElement: (tag) => tag.startsWith("bl-"),
      },
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
      include: ["@baklavue/ui", "@trendyol/baklava"],
      exclude: ["@baklavue/composables"],
    },
    css: {
      postcss: undefined,
    },
  },
});
