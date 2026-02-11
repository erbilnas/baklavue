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
  ],

  themeConfig: {
    logo: "/logo.png",
    nav: [
      { text: "Guide", link: "/guide/getting-started" },
      { text: "Components", link: "/components/" },
      { text: "Composables", link: "/composables/" },
      { text: "API", link: "/api/reference" },
      { text: "Changelog", link: "/changelog" },
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
              text: `Button`,
              link: "/components/button",
            },
            {
              text: `Checkbox`,
              link: "/components/checkbox",
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
        {
          text: "Composables",
          items: [
            { text: "Overview", link: "/composables/" },
            { text: "useCsv", link: "/composables/csv" },
            { text: "useNotification", link: "/composables/notification" },
            { text: "useScrollToError", link: "/composables/scrollToError" },
            { text: "useBaklavaTheme", link: "/composables/theme" },
            { text: "useDisclosure", link: "/composables/disclosure" },
            { text: "usePagination", link: "/composables/pagination" },
            { text: "useConfirmDialog", link: "/composables/confirmDialog" },
            { text: "useClipboard", link: "/composables/clipboard" },
            { text: "useBreakpoints", link: "/composables/breakpoints" },
            {
              text: "useLocalStorage / useSessionStorage",
              link: "/composables/storage",
            },
            {
              text: "useDebounceFn / useDebouncedRef",
              link: "/composables/debounce",
            },
            {
              text: "useThrottleFn / useThrottledRef",
              link: "/composables/throttle",
            },
            {
              text: "useIntervalFn / useTimeoutFn",
              link: "/composables/timer",
            },
            { text: "useFetch", link: "/composables/fetch" },
            {
              text: "useIntersectionObserver",
              link: "/composables/intersectionObserver",
            },
            { text: "useRafFn", link: "/composables/raf" },
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
