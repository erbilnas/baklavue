import { resolve } from "path";
import { defineConfig } from "vitepress";
import { tabsMarkdownPlugin } from "vitepress-plugin-tabs";

const badge = (label: string, type: "wip" | "new" | "broken") =>
  ` <span class="VPBadge ${type === "wip" ? "warning" : type === "new" ? "tip" : type === "broken" ? "error" : "info"}">${label.toUpperCase()}</span>`;

export default defineConfig({
  markdown: {
    config(md) {
      md.use(tabsMarkdownPlugin);
    },
  },
  title: "BaklaVue",
  description: "Vue 3 UI kit for Trendyol Baklava Design System",
  base: "/baklavue/",

  sitemap: {
    hostname: "https://erbilnas.github.io/baklavue/",
  },

  head: [
    ["link", { rel: "icon", href: "/baklavue/logo.png" }],
    ["link", { rel: "preconnect", href: "https://fonts.googleapis.com" }],
    [
      "link",
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
    ],
    [
      "link",
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Public+Sans:wght@400;500;600;700&family=Rubik:wght@400;500;600;700&display=swap",
      },
    ],
    ["meta", { property: "og:type", content: "website" }],
    [
      "meta",
      {
        property: "og:title",
        content: "BaklaVue - Vue 3 UI Kit for Baklava Design System",
      },
    ],
    [
      "meta",
      {
        property: "og:description",
        content: "Vue 3 UI kit for Trendyol Baklava Design System",
      },
    ],
    [
      "meta",
      {
        property: "og:image",
        content: "https://erbilnas.github.io/baklavue/logo.png",
      },
    ],
    [
      "meta",
      {
        property: "og:url",
        content: "https://erbilnas.github.io/baklavue/",
      },
    ],
    ["meta", { property: "og:site_name", content: "BaklaVue" }],
    ["meta", { name: "twitter:card", content: "summary" }],
    [
      "meta",
      {
        name: "twitter:title",
        content: "BaklaVue - Vue 3 UI Kit for Baklava Design System",
      },
    ],
    [
      "meta",
      {
        name: "twitter:description",
        content: "Vue 3 UI kit for Trendyol Baklava Design System",
      },
    ],
    [
      "meta",
      {
        name: "twitter:image",
        content: "https://erbilnas.github.io/baklavue/logo.png",
      },
    ],
  ],

  themeConfig: {
    logo: "/logo.png",
    nav: [
      {
        text: "Guide",
        items: [
          { text: "Getting Started", link: "/guide/getting-started" },
          { text: "Design Tokens", link: "/guide/design-tokens" },
          { text: "Localization", link: "/guide/localization" },
          { text: "MCP Support", link: "/guide/mcp" },
          { text: "Changelog", link: "/changelog" },
          { text: "Release", link: "/release/guide" },
        ],
      },
      { text: "Components", link: "/components/" },
      { text: "Composables", link: "/composables/" },
      { text: "API", link: "/api/" },
      { text: "GitHub", link: "https://github.com/erbilnas/baklavue" },
    ],

    sidebar: {
      "/guide/": [
        {
          text: "Getting Started",
          items: [
            { text: "Introduction", link: "/guide/getting-started" },
            { text: "Installation", link: "/guide/installation" },
            { text: "Localization", link: "/guide/localization" },
            { text: "MCP Support", link: "/guide/mcp" },
            { text: "Contributing", link: "/guide/contributing" },
          ],
        },
        {
          text: "Design Tokens",
          items: [
            { text: "Overview", link: "/guide/design-tokens" },
            { text: "Colors", link: "/tokens/colors" },
            { text: "Border Radius", link: "/tokens/border-radius" },
            { text: "Size & Spacing", link: "/tokens/size-spacing" },
            { text: "Typography", link: "/tokens/typography" },
            { text: "Z-Index", link: "/tokens/z-index" },
          ],
        },
      ],
      "/tokens/": [
        {
          text: "Design Tokens",
          items: [
            { text: "Overview", link: "/guide/design-tokens" },
            { text: "Colors", link: "/tokens/colors" },
            { text: "Border Radius", link: "/tokens/border-radius" },
            { text: "Size & Spacing", link: "/tokens/size-spacing" },
            { text: "Typography", link: "/tokens/typography" },
            { text: "Z-Index", link: "/tokens/z-index" },
          ],
        },
      ],
      "/components/": [
        {
          text: "Components",
          items: [
            { text: "Overview", link: "/components/" },
            {
              text: `Accordion`,
              link: "/components/accordion",
            },
            {
              text: `Alert`,
              link: "/components/alert",
            },
            {
              text: `Badge`,
              link: "/components/badge",
            },
            {
              text: `Banner${badge("new", "new")}`,
              link: "/components/banner",
            },
            {
              text: `Button`,
              link: "/components/button",
            },
            {
              text: `Checkbox`,
              link: "/components/checkbox",
            },
            {
              text: `Chip${badge("new", "new")}`,
              link: "/components/chip",
            },
            {
              text: `Datepicker`,
              link: "/components/datepicker",
            },
            {
              text: `Dialog`,
              link: "/components/dialog",
            },
            {
              text: `Drawer`,
              link: "/components/drawer",
            },
            {
              text: `Dropdown`,
              link: "/components/dropdown",
            },
            {
              text: `Icon`,
              link: "/components/icon",
            },
            {
              text: `Image${badge("new", "new")}`,
              link: "/components/image",
            },
            {
              text: `File Upload${badge("new", "new")}`,
              link: "/components/file-upload",
            },
            {
              text: `Input`,
              link: "/components/input",
            },
            {
              text: `Link`,
              link: "/components/link",
            },
            {
              text: `Notification`,
              link: "/components/notification",
            },
            {
              text: `Pagination`,
              link: "/components/pagination",
            },
            {
              text: `Radio`,
              link: "/components/radio",
            },
            {
              text: `ScrollToTop${badge("new", "new")}`,
              link: "/components/scroll-to-top",
            },
            {
              text: `Select`,
              link: "/components/select",
            },
            {
              text: `Skeleton${badge("new", "new")}`,
              link: "/components/skeleton",
            },
            {
              text: `Spinner`,
              link: "/components/spinner",
            },
            {
              text: `Split Button`,
              link: "/components/split-button",
            },
            {
              text: `Stepper`,
              link: "/components/stepper",
            },
            {
              text: `Switch`,
              link: "/components/switch",
            },
            { text: `Tab`, link: "/components/tab" },
            { text: `Table`, link: "/components/table" },
            { text: `Tag`, link: "/components/tag" },
            {
              text: `Textarea`,
              link: "/components/textarea",
            },
            {
              text: `Tooltip`,
              link: "/components/tooltip",
            },
          ],
        },
      ],
      "/composables/": [
        { text: "Overview", link: "/composables/" },
        {
          text: "UI & Feedback",
          collapsed: false,
          items: [
            { text: `Alert${badge("new", "new")}`, link: "/composables/alert" },
            { text: "Confirm Dialog", link: "/composables/confirmDialog" },
            { text: "Disclosure", link: "/composables/disclosure" },
            {
              text: `Focus Trap${badge("new", "new")}`,
              link: "/composables/focusTrap",
            },
            {
              text: `Generate ID${badge("new", "new")}`,
              link: "/composables/id",
            },
            { text: "Loading", link: "/composables/loading" },
            { text: "Notification", link: "/composables/notification" },
            {
              text: `Scroll Lock${badge("new", "new")}`,
              link: "/composables/scrollLock",
            },
            {
              text: `Scroll Visibility${badge("new", "new")}`,
              link: "/composables/scrollVisibility",
            },
            {
              text: `Stepper${badge("new", "new")}`,
              link: "/composables/stepper",
            },
          ],
        },
        {
          text: "Forms",
          collapsed: false,
          items: [
            {
              text: `Field Array${badge("new", "new")}`,
              link: "/composables/fieldArray",
            },
            { text: "Form Persistence", link: "/composables/formPersistence" },
            { text: "Form State", link: "/composables/formState" },
            { text: "Form Validation", link: "/composables/formValidation" },
            { text: "Scroll to Error", link: "/composables/scrollToError" },
            {
              text: `Stepper Form${badge("new", "new")}`,
              link: "/composables/stepperForm",
            },
          ],
        },
        {
          text: "Data & Utilities",
          collapsed: false,
          items: [
            { text: "Async State", link: "/composables/asyncState" },
            {
              text: `Base64${badge("new", "new")}`,
              link: "/composables/base64",
            },
            { text: "Clipboard", link: "/composables/clipboard" },
            { text: "Cookie", link: "/composables/cookie" },
            { text: "File", link: "/composables/file" },
            { text: "Format", link: "/composables/format" },
            {
              text: `Previous${badge("new", "new")}`,
              link: "/composables/previous",
            },
            {
              text: `Share${badge("new", "new")}`,
              link: "/composables/share",
            },
            {
              text: `Slug${badge("new", "new")}`,
              link: "/composables/slug",
            },
            { text: "Storage", link: "/composables/storage" },
            { text: "Toggle", link: "/composables/toggle" },
          ],
        },
        {
          text: "Performance",
          collapsed: false,
          items: [
            { text: "Debounce", link: "/composables/debounce" },
            {
              text: `Request Animation Frame${badge("new", "new")}`,
              link: "/composables/raf",
            },
            { text: "Throttle", link: "/composables/throttle" },
            { text: "Timer", link: "/composables/timer" },
          ],
        },
        {
          text: "Browser APIs",
          collapsed: false,
          items: [
            { text: "Breakpoints", link: "/composables/breakpoints" },
            {
              text: "Intersection Observer",
              link: "/composables/intersectionObserver",
            },
            {
              text: `Element Size${badge("new", "new")}`,
              link: "/composables/elementSize",
            },
            {
              text: `Window Size${badge("new", "new")}`,
              link: "/composables/breakpoints#use-window-size",
            },
            {
              text: `Container Scroll${badge("new", "new")}`,
              link: "/composables/containerScroll",
            },
            { text: "Sticky", link: "/composables/sticky" },
          ],
        },
        {
          text: "Data Fetching",
          collapsed: false,
          items: [
            { text: "Fetch", link: "/composables/fetch" },
            { text: "Query", link: "/composables/query" },
            {
              text: `Mutation${badge("new", "new")}`,
              link: "/composables/mutation",
            },
            {
              text: `Infinite Query${badge("new", "new")}`,
              link: "/composables/infiniteQuery",
            },
            {
              text: `Lazy Query${badge("new", "new")}`,
              link: "/composables/lazyQuery",
            },
            {
              text: `Polling${badge("new", "new")}`,
              link: "/composables/polling",
            },
          ],
        },
        {
          text: "Theme & Layout",
          collapsed: false,
          items: [
            {
              text: `Pagination${badge("new", "new")}`,
              link: "/composables/pagination",
            },
            { text: "Theme", link: "/composables/theme" },
            { text: "Color Scheme", link: "/composables/colorScheme" },
            {
              text: `Theme Preset${badge("new", "new")}`,
              link: "/composables/themePreset",
            },
          ],
        },
      ],
      "/api/": [
        { text: "Overview", link: "/api/" },
        {
          text: "Components",
          collapsed: false,
          items: [
            { text: "Form", link: "/api/components/form" },
            { text: "Feedback", link: "/api/components/feedback" },
            { text: "Layout", link: "/api/components/layout" },
            { text: "Navigation", link: "/api/components/navigation" },
            { text: "Data Display", link: "/api/components/data-display" },
          ],
        },
        {
          text: "Composables",
          collapsed: false,
          items: [
            { text: "Overview", link: "/api/composables/" },
            { text: "UI & Feedback", link: "/api/composables/ui-feedback" },
            { text: "Forms", link: "/api/composables/forms" },
            {
              text: "Data & Utilities",
              link: "/api/composables/data-utilities",
            },
            { text: "Performance", link: "/api/composables/performance" },
            { text: "Browser APIs", link: "/api/composables/browser-apis" },
            { text: "Data Fetching", link: "/api/composables/data-fetching" },
            { text: "Theme & Layout", link: "/api/composables/theme-layout" },
          ],
        },
        { text: "Utilities", link: "/api/utilities" },
        { text: "Type Exports", link: "/api/types" },
        { text: "Import Patterns", link: "/api/import-patterns" },
      ],
      "/release/": [
        {
          text: "Release",
          items: [
            { text: "Release Guide", link: "/release/guide" },
            { text: "Changelog", link: "/changelog" },
          ],
        },
      ],
      "/changelog": [
        {
          text: "Release",
          items: [
            { text: "Release Guide", link: "/release/guide" },
            { text: "Changelog", link: "/changelog" },
          ],
        },
      ],
    },

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
