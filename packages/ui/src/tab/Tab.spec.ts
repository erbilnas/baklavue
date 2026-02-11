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
});
