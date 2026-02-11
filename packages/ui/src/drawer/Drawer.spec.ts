import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import BvDrawer from "./Drawer.vue";

describe("BvDrawer", () => {
  it("renders with default props", () => {
    const wrapper = mount(BvDrawer);
    expect(wrapper.find("bl-drawer").exists()).toBe(true);
  });

  it("passes caption and open to bl-drawer", () => {
    const wrapper = mount(BvDrawer, {
      props: { caption: "Title", open: true },
      slots: { default: "Content" },
    });
    const el = wrapper.find("bl-drawer").element;
    expect(el.getAttribute("caption")).toBe("Title");
  });

  it("emits update:open and close when bl-drawer fires bl-drawer-close", async () => {
    const wrapper = mount(BvDrawer, {
      props: { open: true },
      slots: { default: "Content" },
    });
    wrapper.find("bl-drawer").element.dispatchEvent(
      new CustomEvent("bl-drawer-close", { bubbles: true }),
    );
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("update:open")).toEqual([[false]]);
    expect(wrapper.emitted("close")).toHaveLength(1);
  });
});
