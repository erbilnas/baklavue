import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import BvSwitch from "./Switch.vue";

describe("BvSwitch", () => {
  it("renders with default props", () => {
    const wrapper = mount(BvSwitch);
    expect(wrapper.find("bl-switch").exists()).toBe(true);
  });

  it("passes checked, disabled, and label to bl-switch", () => {
    const wrapper = mount(BvSwitch, {
      props: { checked: true, disabled: true, label: "Enable" },
    });
    const el = wrapper.find("bl-switch").element;
    expect(el.hasAttribute("checked")).toBe(true);
    expect(el.hasAttribute("disabled")).toBe(true);
    expect(wrapper.text()).toContain("Enable");
  });

  it("emits update:checked and change when bl-switch fires bl-switch-toggle", async () => {
    const wrapper = mount(BvSwitch);
    wrapper.find("bl-switch").element.dispatchEvent(
      new CustomEvent("bl-switch-toggle", { bubbles: true, detail: true }),
    );
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("update:checked")).toEqual([[true]]);
    expect(wrapper.emitted("change")).toHaveLength(1);
  });
});
