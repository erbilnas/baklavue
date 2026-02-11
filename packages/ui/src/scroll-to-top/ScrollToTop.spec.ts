import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import BvScrollToTop from "./ScrollToTop.vue";

describe("BvScrollToTop", () => {
  it("renders button when visible", async () => {
    Object.defineProperty(window, "scrollY", { value: 500, writable: true });
    const wrapper = mount(BvScrollToTop, {
      props: { threshold: 300 },
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.find(".scroll-to-top").exists()).toBe(true);
    expect(wrapper.find("bl-button").exists()).toBe(true);
  });

  it("emits click when button is clicked", async () => {
    Object.defineProperty(window, "scrollY", { value: 500, writable: true });
    const wrapper = mount(BvScrollToTop, { props: { threshold: 300 } });
    await wrapper.vm.$nextTick();
    wrapper.find("bl-button").element.dispatchEvent(
      new CustomEvent("bl-click", { bubbles: true }),
    );
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("click")).toHaveLength(1);
  });
});
