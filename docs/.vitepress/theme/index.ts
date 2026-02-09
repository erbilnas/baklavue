import * as BaklaVue from "@baklavue/ui";
import "@trendyol/baklava/dist/themes/default.css";
import Theme from "vitepress/theme";
import "./style.css";

export default {
  extends: Theme,
  enhanceApp({ app }) {
    // Register all BaklaVue components globally
    // Components are exported with "Bv" prefix (e.g., BvAccordion)
    // Register them with both prefixed and non-prefixed names
    for (const [key, component] of Object.entries(BaklaVue)) {
      if (key.startsWith("Bv") && typeof component !== "function") {
        // Register with prefixed name (BvAccordion)
        app.component(key, component);
        // Also register without prefix (Accordion) for convenience
        const name = key.replace(/^Bv/, "");
        app.component(name, component);
      }
    }
  },
};
