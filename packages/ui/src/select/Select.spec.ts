import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import BvSelect from "./Select.vue";

describe("BvSelect", () => {
  it("renders with default props", () => {
    const wrapper = mount(BvSelect);
    expect(wrapper.find("bl-select").exists()).toBe(true);
  });

  it("passes label and placeholder to bl-select", () => {
    const wrapper = mount(BvSelect, {
      props: { label: "Choose", placeholder: "Select..." },
    });
    const el = wrapper.find("bl-select").element;
    expect(el.getAttribute("label")).toBe("Choose");
    expect(el.getAttribute("placeholder")).toBe("Select...");
  });

  it("emits update:modelValue when bl-select fires bl-change", async () => {
    const wrapper = mount(BvSelect);
    const el = wrapper.find("bl-select").element as HTMLElement & { value?: string };
    el.value = "option1";
    el.dispatchEvent(
      new CustomEvent("bl-change", {
        bubbles: true,
        detail: { target: el },
      }),
    );
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("update:modelValue")).toEqual([["option1"]]);
  });

  it("renders options from options prop", () => {
    const wrapper = mount(BvSelect, {
      props: {
        options: [
          { value: "a", label: "Option A" },
          { value: "b", label: "Option B" },
        ],
      },
    });
    expect(wrapper.findAll("bl-select-option")).toHaveLength(2);
    expect(wrapper.text()).toContain("Option A");
    expect(wrapper.text()).toContain("Option B");
  });
});
