import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import BvIcon from "./Icon.vue";

describe("BvIcon", () => {
  it("renders with default props", () => {
    const wrapper = mount(BvIcon);
    expect(wrapper.find("bl-icon").exists()).toBe(true);
  });

  it("passes name to bl-icon", () => {
    const wrapper = mount(BvIcon, { props: { name: "home" } });
    expect(wrapper.find("bl-icon").element.getAttribute("name")).toBe("home");
  });

  it("applies size and color via style", () => {
    const wrapper = mount(BvIcon, {
      props: { name: "info", size: "24px", color: "#0066cc" },
    });
    const style = wrapper.find("bl-icon").element.getAttribute("style") ?? "";
    expect(style).toContain("24px");
    expect(style).toContain("#0066cc");
  });

  it("emits load when bl-icon fires bl-load", async () => {
    const wrapper = mount(BvIcon, { props: { name: "home" } });
    wrapper.find("bl-icon").element.dispatchEvent(
      new CustomEvent("bl-load", { bubbles: true, detail: "loaded" }),
    );
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("load")).toEqual([["loaded"]]);
  });

  it("renders slot content", () => {
    const wrapper = mount(BvIcon, {
      slots: { default: "<svg>custom</svg>" },
    });
    expect(wrapper.html()).toContain("custom");
  });
});
