import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import BvDatepicker from "./Datepicker.vue";

describe("BvDatepicker", () => {
  it("renders with default props", () => {
    const wrapper = mount(BvDatepicker);
    expect(wrapper.find("bl-datepicker").exists()).toBe(true);
  });

  it("passes label and placeholder to bl-datepicker", () => {
    const wrapper = mount(BvDatepicker, {
      props: { label: "Pick date", placeholder: "Select..." },
    });
    const el = wrapper.find("bl-datepicker").element;
    expect(el.getAttribute("label")).toBe("Pick date");
    expect(el.getAttribute("placeholder")).toBe("Select...");
  });

  it("passes modelValue to bl-datepicker", async () => {
    const wrapper = mount(BvDatepicker, {
      props: { modelValue: "2024-01-15" },
    });
    await wrapper.vm.$nextTick();
    const el = wrapper.find("bl-datepicker").element as HTMLElement & {
      value?: string;
    };
    expect(el.value).toBe("2024-01-15");
  });

  it("passes disabled and required to bl-datepicker", () => {
    const wrapper = mount(BvDatepicker, {
      props: { disabled: true, required: true },
    });
    const el = wrapper.find("bl-datepicker").element;
    expect(el.hasAttribute("disabled")).toBe(true);
    expect(el.hasAttribute("required")).toBe(true);
  });

  it("passes min and max as Date objects", () => {
    const wrapper = mount(BvDatepicker, {
      props: { min: "2024-01-01", max: "2024-12-31" },
    });
    const el = wrapper.find("bl-datepicker").element;
    expect(el.getAttribute("min-date")).toBeDefined();
    expect(el.getAttribute("max-date")).toBeDefined();
  });

  it("emits update:modelValue and change on bl-datepicker-change (single)", async () => {
    const wrapper = mount(BvDatepicker, { props: { type: "single" } });
    const date = new Date(2024, 0, 15);
    wrapper.find("bl-datepicker").element.dispatchEvent(
      new CustomEvent("bl-datepicker-change", {
        bubbles: true,
        detail: [date],
      }),
    );
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("update:modelValue")).toEqual([["2024-01-15"]]);
    expect(wrapper.emitted("change")).toHaveLength(1);
  });

  it("emits update:modelValue with array for type multiple", async () => {
    const wrapper = mount(BvDatepicker, { props: { type: "multiple" } });
    const d1 = new Date(2024, 0, 15);
    const d2 = new Date(2024, 0, 20);
    wrapper.find("bl-datepicker").element.dispatchEvent(
      new CustomEvent("bl-datepicker-change", {
        bubbles: true,
        detail: [d1, d2],
      }),
    );
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("update:modelValue")).toEqual([
      [["2024-01-15", "2024-01-20"]],
    ]);
  });

  it("emits update:modelValue with range for type range", async () => {
    const wrapper = mount(BvDatepicker, { props: { type: "range" } });
    const d1 = new Date(2024, 0, 15);
    const d2 = new Date(2024, 0, 20);
    wrapper.find("bl-datepicker").element.dispatchEvent(
      new CustomEvent("bl-datepicker-change", {
        bubbles: true,
        detail: [d1, d2],
      }),
    );
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("update:modelValue")).toEqual([
      [["2024-01-15", "2024-01-20"]],
    ]);
  });

  it("emits null when empty for single type", async () => {
    const wrapper = mount(BvDatepicker, { props: { type: "single" } });
    wrapper.find("bl-datepicker").element.dispatchEvent(
      new CustomEvent("bl-datepicker-change", {
        bubbles: true,
        detail: [],
      }),
    );
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("update:modelValue")).toEqual([[null]]);
  });

  it("emits empty array when empty for multiple type", async () => {
    const wrapper = mount(BvDatepicker, { props: { type: "multiple" } });
    wrapper.find("bl-datepicker").element.dispatchEvent(
      new CustomEvent("bl-datepicker-change", {
        bubbles: true,
        detail: [],
      }),
    );
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("update:modelValue")).toEqual([[[]]]);
  });

  it("converts modelValue array to comma-separated for bl-datepicker", async () => {
    const wrapper = mount(BvDatepicker, {
      props: { modelValue: ["2024-01-15", "2024-01-20"] },
    });
    await wrapper.vm.$nextTick();
    const el = wrapper.find("bl-datepicker").element as HTMLElement & {
      value?: string;
    };
    expect(el.value).toBe("2024-01-15,2024-01-20");
  });
});
