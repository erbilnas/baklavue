import { mount } from "@vue/test-utils";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import BvScrollToTop from "./ScrollToTop.vue";

describe("BvScrollToTop", () => {
  beforeEach(() => {
    Object.defineProperty(window, "scrollY", { value: 0, writable: true, configurable: true });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders button when visible", async () => {
    Object.defineProperty(window, "scrollY", { value: 500, writable: true, configurable: true });
    const wrapper = mount(BvScrollToTop, {
      props: { threshold: 300 },
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.find(".scroll-to-top").exists()).toBe(true);
    expect(wrapper.find("bl-button").exists()).toBe(true);
  });

  it("emits click when button is clicked", async () => {
    Object.defineProperty(window, "scrollY", { value: 500, writable: true, configurable: true });
    const wrapper = mount(BvScrollToTop, { props: { threshold: 300 } });
    await wrapper.vm.$nextTick();
    wrapper.find("bl-button").element.dispatchEvent(
      new CustomEvent("bl-click", { bubbles: true }),
    );
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("click")).toHaveLength(1);
  });

  it("button is hidden when scrollY is below threshold", async () => {
    Object.defineProperty(window, "scrollY", { value: 0, writable: true, configurable: true });
    const wrapper = mount(BvScrollToTop, { props: { threshold: 300 } });
    await wrapper.vm.$nextTick();
    const el = wrapper.find(".scroll-to-top").element as HTMLElement;
    expect(el.style.display).toBe("none");
  });

  it("debounces rapid scroll events via RAF (early return branch)", async () => {
    Object.defineProperty(window, "scrollY", { value: 500, writable: true, configurable: true });
    // Mock RAF to store callback without executing it — keeps rafId set
    vi.spyOn(window, "requestAnimationFrame").mockImplementation(() => 42);

    const wrapper = mount(BvScrollToTop, { props: { threshold: 300 } });
    await wrapper.vm.$nextTick();

    // First scroll: rafId is null → enters RAF → rafId = 42
    window.dispatchEvent(new Event("scroll"));
    // Second scroll: rafId = 42 (not null) → hits early return branch
    window.dispatchEvent(new Event("scroll"));

    // Component still renders correctly after debounced scrolls
    expect(wrapper.find(".scroll-to-top").exists()).toBe(true);
    wrapper.unmount();
  });

  it("RAF callback executes checkVisibility and resets rafId", async () => {
    Object.defineProperty(window, "scrollY", { value: 500, writable: true, configurable: true });
    // Mock RAF to immediately invoke the callback
    vi.spyOn(window, "requestAnimationFrame").mockImplementation((cb) => {
      cb(0);
      return 1;
    });

    const wrapper = mount(BvScrollToTop, { props: { threshold: 300 } });
    await wrapper.vm.$nextTick();

    // Trigger scroll — RAF callback runs immediately, calling checkVisibility
    window.dispatchEvent(new Event("scroll"));
    await wrapper.vm.$nextTick();

    // After callback ran, button should be visible (scrollY 500 > threshold 300)
    const el = wrapper.find(".scroll-to-top").element as HTMLElement;
    expect(el.style.display).not.toBe("none");
    wrapper.unmount();
  });

  it("calls cancelAnimationFrame on unmount when RAF is pending", async () => {
    Object.defineProperty(window, "scrollY", { value: 500, writable: true, configurable: true });
    const rafSpy = vi.spyOn(window, "requestAnimationFrame").mockImplementation(() => 42);
    const cancelSpy = vi.spyOn(window, "cancelAnimationFrame").mockImplementation(() => {});

    const wrapper = mount(BvScrollToTop, { props: { threshold: 300 } });
    await wrapper.vm.$nextTick();

    // Trigger scroll to set rafId (callback not executed since RAF is mocked)
    window.dispatchEvent(new Event("scroll"));
    expect(rafSpy).toHaveBeenCalled();

    // Unmount while RAF is pending
    wrapper.unmount();
    expect(cancelSpy).toHaveBeenCalledWith(42);
  });

  it("applies bottom-left position class", async () => {
    Object.defineProperty(window, "scrollY", { value: 500, writable: true, configurable: true });
    const wrapper = mount(BvScrollToTop, { props: { threshold: 300, position: "bottom-left" } });
    await wrapper.vm.$nextTick();
    expect(wrapper.find(".scroll-to-top--bottom-left").exists()).toBe(true);
  });

  it("applies top-right position class", async () => {
    Object.defineProperty(window, "scrollY", { value: 500, writable: true, configurable: true });
    const wrapper = mount(BvScrollToTop, { props: { threshold: 300, position: "top-right" } });
    await wrapper.vm.$nextTick();
    expect(wrapper.find(".scroll-to-top--top-right").exists()).toBe(true);
  });

  it("applies top-left position class", async () => {
    Object.defineProperty(window, "scrollY", { value: 500, writable: true, configurable: true });
    const wrapper = mount(BvScrollToTop, { props: { threshold: 300, position: "top-left" } });
    await wrapper.vm.$nextTick();
    expect(wrapper.find(".scroll-to-top--top-left").exists()).toBe(true);
  });
});
