import { useBaklavaTheme } from "@baklavue/composables";
import * as BaklaVue from "@baklavue/ui";
import "@trendyol/baklava/dist/themes/default.css";
import Theme from "vitepress/theme";
import AlertProgrammaticDemo from "./components/AlertProgrammaticDemo.vue";
import CheckboxCustomSlotDemo from "./components/CheckboxCustomSlotDemo.vue";
import CheckboxDisabledDemo from "./components/CheckboxDisabledDemo.vue";
import CheckboxGroupDemo from "./components/CheckboxGroupDemo.vue";
import CheckboxPreferencesDemo from "./components/CheckboxPreferencesDemo.vue";
import CheckboxSingleDemo from "./components/CheckboxSingleDemo.vue";
import ClosableAlertDemo from "./components/ClosableAlertDemo.vue";
import ControlledAccordionDemo from "./components/ControlledAccordionDemo.vue";
import CustomAnimationDemo from "./components/CustomAnimationDemo.vue";
import DatepickerDemo from "./components/DatepickerDemo.vue";
import DialogBasicDemo from "./components/DialogBasicDemo.vue";
import DialogCaptionDemo from "./components/DialogCaptionDemo.vue";
import DialogClosableDemo from "./components/DialogClosableDemo.vue";
import DialogHeaderFooterDemo from "./components/DialogHeaderFooterDemo.vue";
import DialogProgrammaticDemo from "./components/DialogProgrammaticDemo.vue";
import DrawerBasicDemo from "./components/DrawerBasicDemo.vue";
import DropdownBasicDemo from "./components/DropdownBasicDemo.vue";
import DropdownDisabledDemo from "./components/DropdownDisabledDemo.vue";
import DropdownGroupDemo from "./components/DropdownGroupDemo.vue";
import DropdownItemsDemo from "./components/DropdownItemsDemo.vue";
import DropdownProgrammaticDemo from "./components/DropdownProgrammaticDemo.vue";
import DropdownSlotDemo from "./components/DropdownSlotDemo.vue";
import DrawerCaptionDemo from "./components/DrawerCaptionDemo.vue";
import DrawerProgrammaticDemo from "./components/DrawerProgrammaticDemo.vue";
import DynamicItemsDemo from "./components/DynamicItemsDemo.vue";
import FaqSlotsDemo from "./components/FaqSlotsDemo.vue";
import FormSubmitButtonDemo from "./components/FormSubmitButtonDemo.vue";
import IconBasicDemo from "./components/IconBasicDemo.vue";
import IconColorDemo from "./components/IconColorDemo.vue";
import IconSizeDemo from "./components/IconSizeDemo.vue";
import InputBasicDemo from "./components/InputBasicDemo.vue";
import InputDisabledReadonlyDemo from "./components/InputDisabledReadonlyDemo.vue";
import InputFormValidationDemo from "./components/InputFormValidationDemo.vue";
import InputHelpTextDemo from "./components/InputHelpTextDemo.vue";
import InputLoadingDemo from "./components/InputLoadingDemo.vue";
import InputSizesDemo from "./components/InputSizesDemo.vue";
import InputTypesDemo from "./components/InputTypesDemo.vue";
import InputValidationDemo from "./components/InputValidationDemo.vue";
import InputWithIconDemo from "./components/InputWithIconDemo.vue";
import LinkBasicDemo from "./components/LinkBasicDemo.vue";
import LinkDisabledDemo from "./components/LinkDisabledDemo.vue";
import LinkExternalDemo from "./components/LinkExternalDemo.vue";
import LinkInlineDemo from "./components/LinkInlineDemo.vue";
import LinkSizesDemo from "./components/LinkSizesDemo.vue";
import LinkStandaloneDemo from "./components/LinkStandaloneDemo.vue";
import LinkWithIconDemo from "./components/LinkWithIconDemo.vue";
import LoadingButtonDemo from "./components/LoadingButtonDemo.vue";
import ProgrammaticControlDemo from "./components/ProgrammaticControlDemo.vue";
import SlotsAccordionDemo from "./components/SlotsAccordionDemo.vue";
import "./style.css";

export default {
  extends: Theme,
  enhanceApp({ app }) {
    useBaklavaTheme().applyTheme({ preset: "vue" });
    app.component("AlertProgrammaticDemo", AlertProgrammaticDemo);
    app.component("CheckboxCustomSlotDemo", CheckboxCustomSlotDemo);
    app.component("CheckboxDisabledDemo", CheckboxDisabledDemo);
    app.component("CheckboxGroupDemo", CheckboxGroupDemo);
    app.component("CheckboxPreferencesDemo", CheckboxPreferencesDemo);
    app.component("CheckboxSingleDemo", CheckboxSingleDemo);
    app.component("ClosableAlertDemo", ClosableAlertDemo);
    app.component("ControlledAccordionDemo", ControlledAccordionDemo);
    app.component("CustomAnimationDemo", CustomAnimationDemo);
    app.component("DatepickerDemo", DatepickerDemo);
    app.component("DialogBasicDemo", DialogBasicDemo);
    app.component("DialogCaptionDemo", DialogCaptionDemo);
    app.component("DialogClosableDemo", DialogClosableDemo);
    app.component("DialogHeaderFooterDemo", DialogHeaderFooterDemo);
    app.component("DialogProgrammaticDemo", DialogProgrammaticDemo);
    app.component("DrawerBasicDemo", DrawerBasicDemo);
    app.component("DrawerCaptionDemo", DrawerCaptionDemo);
    app.component("DropdownBasicDemo", DropdownBasicDemo);
    app.component("DropdownDisabledDemo", DropdownDisabledDemo);
    app.component("DropdownGroupDemo", DropdownGroupDemo);
    app.component("DropdownItemsDemo", DropdownItemsDemo);
    app.component("DropdownProgrammaticDemo", DropdownProgrammaticDemo);
    app.component("DropdownSlotDemo", DropdownSlotDemo);
    app.component("DrawerProgrammaticDemo", DrawerProgrammaticDemo);
    app.component("DynamicItemsDemo", DynamicItemsDemo);
    app.component("FaqSlotsDemo", FaqSlotsDemo);
    app.component("FormSubmitButtonDemo", FormSubmitButtonDemo);
    app.component("IconBasicDemo", IconBasicDemo);
    app.component("IconColorDemo", IconColorDemo);
    app.component("IconSizeDemo", IconSizeDemo);
    app.component("InputBasicDemo", InputBasicDemo);
    app.component("InputDisabledReadonlyDemo", InputDisabledReadonlyDemo);
    app.component("InputFormValidationDemo", InputFormValidationDemo);
    app.component("InputHelpTextDemo", InputHelpTextDemo);
    app.component("InputLoadingDemo", InputLoadingDemo);
    app.component("InputSizesDemo", InputSizesDemo);
    app.component("InputTypesDemo", InputTypesDemo);
    app.component("InputValidationDemo", InputValidationDemo);
    app.component("InputWithIconDemo", InputWithIconDemo);
    app.component("LinkBasicDemo", LinkBasicDemo);
    app.component("LinkDisabledDemo", LinkDisabledDemo);
    app.component("LinkExternalDemo", LinkExternalDemo);
    app.component("LinkInlineDemo", LinkInlineDemo);
    app.component("LinkSizesDemo", LinkSizesDemo);
    app.component("LinkStandaloneDemo", LinkStandaloneDemo);
    app.component("LinkWithIconDemo", LinkWithIconDemo);
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
