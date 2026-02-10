import * as BaklaVue from "@baklavue/ui";
import { useBaklavaTheme } from "@baklavue/composables";
import "@trendyol/baklava/dist/themes/default.css";
import Theme from "vitepress/theme";
import AlertProgrammaticDemo from "./components/AlertProgrammaticDemo.vue";
import ClosableAlertDemo from "./components/ClosableAlertDemo.vue";
import ControlledAccordionDemo from "./components/ControlledAccordionDemo.vue";
import CustomAnimationDemo from "./components/CustomAnimationDemo.vue";
import DynamicItemsDemo from "./components/DynamicItemsDemo.vue";
import FaqSlotsDemo from "./components/FaqSlotsDemo.vue";
import FormSubmitButtonDemo from "./components/FormSubmitButtonDemo.vue";
import LoadingButtonDemo from "./components/LoadingButtonDemo.vue";
import ProgrammaticControlDemo from "./components/ProgrammaticControlDemo.vue";
import SlotsAccordionDemo from "./components/SlotsAccordionDemo.vue";
import "./style.css";

export default {
  extends: Theme,
  enhanceApp({ app }) {
    useBaklavaTheme().applyTheme({ preset: "vue" });
    app.component("AlertProgrammaticDemo", AlertProgrammaticDemo);
    app.component("ClosableAlertDemo", ClosableAlertDemo);
    app.component("ControlledAccordionDemo", ControlledAccordionDemo);
    app.component("CustomAnimationDemo", CustomAnimationDemo);
    app.component("DynamicItemsDemo", DynamicItemsDemo);
    app.component("FaqSlotsDemo", FaqSlotsDemo);
    app.component("FormSubmitButtonDemo", FormSubmitButtonDemo);
    app.component("LoadingButtonDemo", LoadingButtonDemo);
    app.component("ProgrammaticControlDemo", ProgrammaticControlDemo);
    app.component("SlotsAccordionDemo", SlotsAccordionDemo);
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
