import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import BvTab from "./Tab.vue";

describe("BvTab", () => {
  it("renders with tabs prop", () => {
    const wrapper = mount(BvTab, {
      props: {
        tabs: [
          { value: "tab1", label: "Tab 1" },
          { value: "tab2", label: "Tab 2" },
        ],
      },
      slots: { default: "Panel content" },
    });
    expect(wrapper.find("bl-tab-group").exists()).toBe(true);
    expect(wrapper.findAll("bl-tab")).toHaveLength(2);
    expect(wrapper.text()).toContain("Tab 1");
    expect(wrapper.text()).toContain("Tab 2");
  });

  it("emits update:activeTab when bl-tab-group fires bl-tab-selected", async () => {
    const wrapper = mount(BvTab, {
      props: {
        tabs: [{ value: "a", label: "A" }],
      },
    });
    wrapper.find("bl-tab-group").element.dispatchEvent(
      new CustomEvent("bl-tab-selected", { bubbles: true, detail: "a" }),
    );
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("update:activeTab")).toEqual([["a"]]);
    expect(wrapper.emitted("tab-change")).toHaveLength(1);
  });

  it("does not emit update:activeTab when detail is undefined", async () => {
    const wrapper = mount(BvTab, {
      props: {
        tabs: [{ value: "a", label: "A" }],
      },
    });
    const event = new CustomEvent("bl-tab-selected", { bubbles: true });
    Object.defineProperty(event, "detail", { value: undefined });
    wrapper.find("bl-tab-group").element.dispatchEvent(event);
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("tab-change")).toHaveLength(1);
    expect(wrapper.emitted("update:activeTab")).toBeUndefined();
  });

  it("renders slot content when tabs prop is not provided (v-else branch)", () => {
    const wrapper = mount(BvTab, {
      slots: { default: "<div class=\"custom-slot\">Custom content</div>" },
    });
    expect(wrapper.find("bl-tab-group").exists()).toBe(true);
    expect(wrapper.find(".custom-slot").exists()).toBe(true);
    expect(wrapper.text()).toContain("Custom content");
  });

  it("sets disabled attribute on tab when disabled is true", () => {
    const wrapper = mount(BvTab, {
      props: {
        tabs: [
          { value: "a", label: "A", disabled: true },
          { value: "b", label: "B" },
        ],
      },
    });
    const tabs = wrapper.findAll("bl-tab");
    expect(tabs[0].attributes("disabled")).toBeDefined();
    expect(tabs[1].attributes("disabled")).toBeUndefined();
  });

  it("sets selected attribute on the active tab", () => {
    const wrapper = mount(BvTab, {
      props: {
        activeTab: "b",
        tabs: [
          { value: "a", label: "A" },
          { value: "b", label: "B" },
        ],
      },
    });
    const tabs = wrapper.findAll("bl-tab");
    expect(tabs[0].attributes("selected")).toBe("false");
    expect(tabs[1].attributes("selected")).toBe("true");
  });
});
