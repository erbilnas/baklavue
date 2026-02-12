import { vi } from "vitest";

vi.mock("../src/utils/loadBaklavaResources", () => ({
  loadBaklavaResources: vi.fn(),
}));

// Stub custom elements for Baklava components used in Phase 1 tests.
// These allow Vue components to render bl-* tags without loading CDN scripts.

if (!customElements.get("bl-button")) {
  class BlButtonStub extends HTMLElement {
    connectedCallback() {
      this.addEventListener("click", () => {
        this.dispatchEvent(new CustomEvent("bl-click", { bubbles: true }));
      });
    }
  }
  customElements.define("bl-button", BlButtonStub);
}

if (!customElements.get("bl-badge")) {
  class BlBadgeStub extends HTMLElement {
    connectedCallback() {}
  }
  customElements.define("bl-badge", BlBadgeStub);
}

if (!customElements.get("bl-spinner")) {
  class BlSpinnerStub extends HTMLElement {
    connectedCallback() {}
  }
  customElements.define("bl-spinner", BlSpinnerStub);
}

if (!customElements.get("bl-input")) {
  class BlInputStub extends HTMLElement {
    get value() {
      return this.getAttribute("value") ?? "";
    }
    set value(v: string) {
      this.setAttribute("value", v);
    }
    connectedCallback() {
      this.addEventListener("input", () => {
        this.dispatchEvent(
          new CustomEvent("bl-input", {
            bubbles: true,
            detail: { target: this },
          }),
        );
      });
      this.addEventListener("focus", () =>
        this.dispatchEvent(new FocusEvent("focus", { bubbles: true })),
      );
      this.addEventListener("blur", () =>
        this.dispatchEvent(new FocusEvent("blur", { bubbles: true })),
      );
    }
  }
  customElements.define("bl-input", BlInputStub);
}

// Minimal stubs for remaining bl-* components
const defineSimpleStub = (tag: string) => {
  if (customElements.get(tag)) return;
  customElements.define(tag, class extends HTMLElement {});
};

if (!customElements.get("bl-switch")) {
  class BlSwitchStub extends HTMLElement {
    connectedCallback() {
      this.addEventListener("click", () => {
        this.dispatchEvent(
          new CustomEvent("bl-switch-toggle", { bubbles: true, detail: true }),
        );
      });
    }
  }
  customElements.define("bl-switch", BlSwitchStub);
}

if (!customElements.get("bl-link")) {
  class BlLinkStub extends HTMLElement {
    connectedCallback() {
      this.addEventListener("click", () => {
        this.dispatchEvent(new CustomEvent("bl-click", { bubbles: true }));
      });
    }
  }
  customElements.define("bl-link", BlLinkStub);
}

if (!customElements.get("bl-textarea")) {
  class BlTextareaStub extends HTMLElement {
    get value() {
      return this.getAttribute("value") ?? "";
    }
    set value(v: string) {
      this.setAttribute("value", v);
    }
    connectedCallback() {
      this.addEventListener("input", () => {
        this.dispatchEvent(
          new CustomEvent("bl-input", {
            bubbles: true,
            detail: { target: this },
          }),
        );
      });
    }
  }
  customElements.define("bl-textarea", BlTextareaStub);
}

if (!customElements.get("bl-tag")) {
  class BlTagStub extends HTMLElement {
    connectedCallback() {
      this.addEventListener("click", () => {
        this.dispatchEvent(
          new CustomEvent("bl-tag-click", {
            bubbles: true,
            detail: { value: null, selected: true },
          }),
        );
      });
    }
  }
  customElements.define("bl-tag", BlTagStub);
}

if (!customElements.get("bl-pagination")) {
  class BlPaginationStub extends HTMLElement {
    connectedCallback() {
      this.addEventListener("click", () => {
        this.dispatchEvent(
          new CustomEvent("bl-change", {
            bubbles: true,
            detail: { selectedPage: 2, prevPage: 1, itemsPerPage: 10 },
          }),
        );
      });
    }
  }
  customElements.define("bl-pagination", BlPaginationStub);
}

if (!customElements.get("bl-alert")) {
  class BlAlertStub extends HTMLElement {
    closed = false;
    open() {
      this.closed = false;
    }
    close() {
      this.closed = true;
      this.dispatchEvent(new CustomEvent("bl-close", { bubbles: true }));
    }
    connectedCallback() {}
  }
  customElements.define("bl-alert", BlAlertStub);
}

if (!customElements.get("bl-dialog")) {
  class BlDialogStub extends HTMLElement {
    open = false;
    connectedCallback() {}
  }
  customElements.define("bl-dialog", BlDialogStub);
}

if (!customElements.get("bl-checkbox")) {
  class BlCheckboxStub extends HTMLElement {
    connectedCallback() {
      this.addEventListener("click", () => {
        this.dispatchEvent(new CustomEvent("bl-change", { bubbles: true }));
      });
    }
  }
  customElements.define("bl-checkbox", BlCheckboxStub);
}

if (!customElements.get("bl-checkbox-group")) {
  class BlCheckboxGroupStub extends HTMLElement {
    connectedCallback() {
      this.addEventListener("change", () => {
        this.dispatchEvent(
          new CustomEvent("bl-checkbox-group-change", {
            bubbles: true,
            detail: { target: this },
          }),
        );
      });
    }
  }
  customElements.define("bl-checkbox-group", BlCheckboxGroupStub);
}

if (!customElements.get("bl-select")) {
  class BlSelectStub extends HTMLElement {
    get value() {
      return this.getAttribute("value") ?? "";
    }
    set value(v: string) {
      this.setAttribute("value", v);
    }
    connectedCallback() {
      this.addEventListener("change", () => {
        this.dispatchEvent(
          new CustomEvent("bl-change", {
            bubbles: true,
            detail: { target: this },
          }),
        );
      });
    }
  }
  customElements.define("bl-select", BlSelectStub);
}

if (!customElements.get("bl-tab-group")) {
  class BlTabGroupStub extends HTMLElement {
    connectedCallback() {
      this.addEventListener("click", () => {
        this.dispatchEvent(
          new CustomEvent("bl-tab-selected", {
            bubbles: true,
            detail: "tab1",
          }),
        );
      });
    }
  }
  customElements.define("bl-tab-group", BlTabGroupStub);
}

if (!customElements.get("bl-stepper")) {
  class BlStepperStub extends HTMLElement {
    connectedCallback() {
      this.addEventListener("click", () => {
        this.dispatchEvent(
          new CustomEvent("bl-stepper-change", {
            bubbles: true,
            detail: { activeStep: 1, totalSteps: 3 },
          }),
        );
      });
    }
  }
  customElements.define("bl-stepper", BlStepperStub);
}

if (!customElements.get("bl-radio")) {
  class BlRadioStub extends HTMLElement {
    connectedCallback() {
      this.addEventListener("click", () => {
        this.dispatchEvent(new CustomEvent("bl-change", { bubbles: true }));
      });
    }
  }
  customElements.define("bl-radio", BlRadioStub);
}

if (!customElements.get("bl-radio-group")) {
  class BlRadioGroupStub extends HTMLElement {
    connectedCallback() {
      this.addEventListener("change", () => {
        this.dispatchEvent(
          new CustomEvent("bl-radio-change", {
            bubbles: true,
            detail: "",
          }),
        );
      });
    }
  }
  customElements.define("bl-radio-group", BlRadioGroupStub);
}

if (!customElements.get("bl-dropdown")) {
  class BlDropdownStub extends HTMLElement {
    _opened = false;
    get opened() {
      return this._opened;
    }
    open() {
      this._opened = true;
    }
    close() {
      this._opened = false;
    }
    connectedCallback() {}
  }
  customElements.define("bl-dropdown", BlDropdownStub);
}

if (!customElements.get("bl-datepicker")) {
  class BlDatepickerStub extends HTMLElement {
    _value = "";
    get value() {
      return this._value;
    }
    set value(v: string) {
      this._value = v;
    }
    connectedCallback() {}
  }
  customElements.define("bl-datepicker", BlDatepickerStub);
}

if (!customElements.get("bl-accordion")) {
  class BlAccordionStub extends HTMLElement {
    open = false;
    expand() {
      this.open = true;
    }
    collapse() {
      this.open = false;
    }
    connectedCallback() {}
  }
  customElements.define("bl-accordion", BlAccordionStub);
}

if (!customElements.get("bl-accordion-group")) {
  customElements.define("bl-accordion-group", class extends HTMLElement {});
}

if (!customElements.get("bl-drawer")) {
  class BlDrawerStub extends HTMLElement {
    open = false;
    connectedCallback() {}
  }
  customElements.define("bl-drawer", BlDrawerStub);
}

[
  "bl-icon",
  "bl-select-option",
  "bl-tooltip",
  "bl-dropdown-group",
  "bl-dropdown-item",
  "bl-notification",
  "bl-split-button",
  "bl-stepper-item",
  "bl-tab",
  "bl-tab-panel",
  "bl-table",
  "bl-table-header",
  "bl-table-body",
  "bl-table-row",
  "bl-table-cell",
  "bl-table-header-cell",
].forEach(defineSimpleStub);
