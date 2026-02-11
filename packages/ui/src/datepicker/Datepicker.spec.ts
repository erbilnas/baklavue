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
});
