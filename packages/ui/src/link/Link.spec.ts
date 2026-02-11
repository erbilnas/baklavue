import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import BvLink from "./Link.vue";

describe("BvLink", () => {
  it("renders with default props", () => {
    const wrapper = mount(BvLink);
    expect(wrapper.find("bl-link").exists()).toBe(true);
  });

  it("passes href and target to bl-link", () => {
    const wrapper = mount(BvLink, {
      props: { href: "/about", target: "_blank" },
    });
    const el = wrapper.find("bl-link").element;
    expect(el.getAttribute("href")).toBe("/about");
    expect(el.getAttribute("target")).toBe("_blank");
  });

  it("emits click when bl-link fires bl-click", async () => {
    const wrapper = mount(BvLink, { props: { href: "/test" } });
    wrapper.find("bl-link").element.dispatchEvent(
      new CustomEvent("bl-click", { bubbles: true }),
    );
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("click")).toHaveLength(1);
  });

  it("renders slot content", () => {
    const wrapper = mount(BvLink, {
      props: { href: "/" },
      slots: { default: "Link text" },
    });
    expect(wrapper.text()).toContain("Link text");
  });
});
