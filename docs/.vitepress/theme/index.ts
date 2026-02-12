import * as BaklaVue from "@baklavue/ui";
import "@trendyol/baklava/dist/themes/default.css";
import Theme from "vitepress/theme";
import { enhanceAppWithTabs } from "vitepress-plugin-tabs/client";
import "./style.css";

import Layout from "./Layout.vue";

// Auto-register all demo components from subfolders
const demos = import.meta.glob<{ default: object }>("./components/**/*Demo.vue", {
  eager: true,
});

export default {
  extends: Theme,
  Layout,
  enhanceApp({ app }) {
    enhanceAppWithTabs(app);

    // Register demo components
    for (const [path, module] of Object.entries(demos)) {
      const name = path.split("/").pop()?.replace(".vue", "") ?? "";
      if (name && module.default) {
        app.component(name, module.default as any);
      }
    }

    // Register all BaklaVue components globally
    // Components are exported with "Bv" prefix (e.g., BvAccordion)
    // Register them with both prefixed and non-prefixed names
    const VITEPRESS_BUILTIN_COMPONENTS = ["Badge"];
    for (const [key, component] of Object.entries(BaklaVue)) {
      if (key.startsWith("Bv") && typeof component !== "function") {
        app.component(key, component);
        const name = key.replace(/^Bv/, "");
        if (!VITEPRESS_BUILTIN_COMPONENTS.includes(name)) {
          app.component(name, component);
        }
      }
    }
  },
};
