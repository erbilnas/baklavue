import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import BvCheckbox from "./Checkbox.vue";

describe("BvCheckbox", () => {
  // --- Single mode ---

  it("renders single checkbox mode", () => {
    const wrapper = mount(BvCheckbox, { props: { label: "Agree" } });
    expect(wrapper.find("bl-checkbox").exists()).toBe(true);
    expect(wrapper.text()).toContain("Agree");
  });

  it("emits update:modelValue when single checkbox changes", async () => {
    const wrapper = mount(BvCheckbox, { props: { label: "Test" } });
    const blCheckbox = wrapper.find("bl-checkbox").element as HTMLElement & {
      checked?: boolean;
    };
    blCheckbox.checked = true;
    blCheckbox.dispatchEvent(new CustomEvent("bl-change", { bubbles: true }));
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("update:modelValue")).toEqual([[true]]);
  });

  it("emits update:modelValue with false when checked is undefined on change", async () => {
    const wrapper = mount(BvCheckbox, { props: { label: "Test" } });
    const blCheckbox = wrapper.find("bl-checkbox").element;
    blCheckbox.dispatchEvent(new CustomEvent("bl-change", { bubbles: true }));
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("update:modelValue")).toEqual([[false]]);
    expect(wrapper.emitted("change")).toHaveLength(1);
  });

  it("binds checked=false when modelValue is false in single mode", () => {
    const wrapper = mount(BvCheckbox, {
      props: { label: "Test", modelValue: false },
    });
    const el = wrapper.find("bl-checkbox").element;
    expect(el.getAttribute("checked")).toBe("false");
  });

  it("does not set checked attribute when modelValue is undefined in single mode", () => {
    const wrapper = mount(BvCheckbox, { props: { label: "Test" } });
    const el = wrapper.find("bl-checkbox").element;
    expect(el.getAttribute("checked")).toBeNull();
  });

  it("passes disabled and indeterminate props in single mode", () => {
    const wrapper = mount(BvCheckbox, {
      props: { label: "Test", disabled: true, indeterminate: true },
    });
    const el = wrapper.find("bl-checkbox").element;
    expect(el.getAttribute("disabled")).toBe("true");
    expect(el.getAttribute("indeterminate")).toBe("true");
  });

  it("passes value and name props in single mode", () => {
    const wrapper = mount(BvCheckbox, {
      props: { label: "Test", value: "v1", name: "cb-name" },
    });
    const el = wrapper.find("bl-checkbox").element;
    expect(el.getAttribute("value")).toBe("v1");
    expect(el.getAttribute("name")).toBe("cb-name");
  });

  it("emits input event on bl-input in single mode", async () => {
    const wrapper = mount(BvCheckbox, { props: { label: "Test" } });
    const blCheckbox = wrapper.find("bl-checkbox").element;
    blCheckbox.dispatchEvent(new CustomEvent("bl-input", { bubbles: true }));
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("input")).toHaveLength(1);
  });

  // --- Group mode ---

  it("renders group mode when items prop provided", () => {
    const wrapper = mount(BvCheckbox, {
      props: {
        items: [
          { value: "a", label: "Option A" },
          { value: "b", label: "Option B" },
        ],
      },
    });
    expect(wrapper.find("bl-checkbox-group").exists()).toBe(true);
    expect(wrapper.findAll("bl-checkbox")).toHaveLength(2);
  });

  it("marks items as checked when modelValue array contains their value", () => {
    const wrapper = mount(BvCheckbox, {
      props: {
        items: [
          { value: "a", label: "A" },
          { value: "b", label: "B" },
        ],
        modelValue: ["a"],
      },
    });
    const checkboxes = wrapper.findAll("bl-checkbox");
    expect(checkboxes[0].element.getAttribute("checked")).toBe("true");
    expect(checkboxes[1].element.getAttribute("checked")).toBe("false");
  });

  it("defaults groupValue to empty array when modelValue is non-array in group mode", () => {
    const wrapper = mount(BvCheckbox, {
      props: {
        items: [{ value: "a", label: "A" }],
        modelValue: true as unknown as (string | number)[],
      },
    });
    const checkbox = wrapper.find("bl-checkbox").element;
    expect(checkbox.getAttribute("checked")).toBe("false");
  });

  it("emits update:modelValue with array when group change fires with array value", async () => {
    const wrapper = mount(BvCheckbox, {
      props: {
        items: [
          { value: "a", label: "A" },
          { value: "b", label: "B" },
        ],
      },
    });
    const group = wrapper.find("bl-checkbox-group").element as HTMLElement & {
      value?: unknown;
    };
    group.value = ["a", "b"];
    group.dispatchEvent(
      new CustomEvent("bl-checkbox-group-change", { bubbles: true }),
    );
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("update:modelValue")).toEqual([[["a", "b"]]]);
    expect(wrapper.emitted("change")).toHaveLength(1);
  });

  it("handles string value from group change (comma-separated)", async () => {
    const wrapper = mount(BvCheckbox, {
      props: {
        items: [
          { value: "a", label: "A" },
          { value: "b", label: "B" },
        ],
      },
    });
    const group = wrapper.find("bl-checkbox-group").element as HTMLElement & {
      value?: unknown;
    };
    group.value = "a, b";
    group.dispatchEvent(
      new CustomEvent("bl-checkbox-group-change", { bubbles: true }),
    );
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("update:modelValue")).toEqual([[["a", "b"]]]);
  });

  it("handles empty string value from group change", async () => {
    const wrapper = mount(BvCheckbox, {
      props: {
        items: [{ value: "a", label: "A" }],
      },
    });
    const group = wrapper.find("bl-checkbox-group").element as HTMLElement & {
      value?: unknown;
    };
    group.value = "";
    group.dispatchEvent(
      new CustomEvent("bl-checkbox-group-change", { bubbles: true }),
    );
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("update:modelValue")).toEqual([[[]]]);
  });

  it("handles non-array non-string value from group change (fallback to empty array)", async () => {
    const wrapper = mount(BvCheckbox, {
      props: {
        items: [{ value: "a", label: "A" }],
      },
    });
    const group = wrapper.find("bl-checkbox-group").element as HTMLElement & {
      value?: unknown;
    };
    group.value = 123;
    group.dispatchEvent(
      new CustomEvent("bl-checkbox-group-change", { bubbles: true }),
    );
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("update:modelValue")).toEqual([[[]]]);
  });

  it("renders items with disabled and indeterminate attributes", () => {
    const wrapper = mount(BvCheckbox, {
      props: {
        items: [
          { value: "a", label: "A", disabled: true },
          { value: "b", label: "B", indeterminate: true },
        ],
      },
    });
    const checkboxes = wrapper.findAll("bl-checkbox");
    expect(checkboxes[0].element.getAttribute("disabled")).toBe("true");
    expect(checkboxes[1].element.getAttribute("indeterminate")).toBe("true");
  });

  it("renders custom item slot content in group mode", () => {
    const wrapper = mount(BvCheckbox, {
      props: {
        items: [{ value: "x", label: "Default" }],
      },
      slots: {
        item: '<span class="custom-item">Custom</span>',
      },
    });
    expect(wrapper.find(".custom-item").exists()).toBe(true);
    expect(wrapper.text()).toContain("Custom");
  });
});
