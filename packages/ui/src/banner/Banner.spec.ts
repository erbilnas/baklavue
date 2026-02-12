import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import { afterEach, describe, expect, it, vi } from "vitest";
import BvBanner from "./Banner.vue";

describe("BvBanner", () => {
  afterEach(() => {
    localStorage.clear();
  });

  it("renders with title", () => {
    const wrapper = mount(BvBanner, {
      props: { title: "Important message" },
    });
    expect(wrapper.text()).toContain("Important message");
  });

  it("emits close when close button is clicked", async () => {
    const wrapper = mount(BvBanner, {
      props: { title: "Message", close: true },
    });
    const closeBtn = wrapper.find(".bv-banner__close-btn");
    await closeBtn.trigger("click");
    expect(wrapper.emitted("close")).toHaveLength(1);
  });

  it("applies color variant via inline style", () => {
    const wrapper = mount(BvBanner, {
      props: { title: "Test", color: "success" },
    });
    const banner = wrapper.find(".bv-banner").element;
    expect(banner.getAttribute("style")).toContain("bl-color-success");
  });

  it("renders action buttons when actions prop provided", async () => {
    const onClick = () => {};
    const wrapper = mount(BvBanner, {
      props: {
        title: "Actions",
        actions: [{ label: "Action 1", onClick }],
      },
    });
    expect(wrapper.find(".bv-banner__actions").exists()).toBe(true);
    await wrapper.find(".bv-banner__action-btn").trigger("click");
  });

  it("renders as link when to prop provided", () => {
    const wrapper = mount(BvBanner, {
      props: { title: "Link", to: "/page" },
    });
    expect(wrapper.find(".bv-banner__inner--link").exists()).toBe(true);
    expect(wrapper.find("bl-link").attributes("href")).toBe("/page");
  });

  it("renders icon when icon prop is provided", () => {
    const wrapper = mount(BvBanner, {
      props: { title: "With icon", icon: "info" },
    });
    expect(wrapper.find(".bv-banner__icon").exists()).toBe(true);
  });

  it("dismisses on mount when localStorage has 'true' for banner id", async () => {
    localStorage.setItem("banner-test-banner", "true");
    const wrapper = mount(BvBanner, {
      props: { title: "Persisted", close: true, id: "test-banner" },
    });
    await nextTick();
    expect(wrapper.find(".bv-banner").exists()).toBe(false);
  });

  it("persists dismissal to localStorage when closing a banner with id", async () => {
    const wrapper = mount(BvBanner, {
      props: { title: "Persist close", close: true, id: "persist-id" },
    });
    const closeBtn = wrapper.find(".bv-banner__close-btn");
    await closeBtn.trigger("click");
    expect(localStorage.getItem("banner-persist-id")).toBe("true");
    expect(wrapper.emitted("close")).toHaveLength(1);
  });

  it("does not persist when id sanitizes to empty string", async () => {
    const wrapper = mount(BvBanner, {
      props: { title: "Bad id", close: true, id: "!!!" },
    });
    const closeBtn = wrapper.find(".bv-banner__close-btn");
    await closeBtn.trigger("click");
    expect(wrapper.emitted("close")).toHaveLength(1);
    // No key written because sanitized id is empty
    expect(localStorage.length).toBe(0);
  });

  it("handles action button without an onClick handler", async () => {
    const wrapper = mount(BvBanner, {
      props: {
        title: "No handler",
        actions: [{ label: "NoOp" }],
      },
    });
    // Should not throw when clicking an action with no onClick
    await wrapper.find(".bv-banner__action-btn").trigger("click");
    expect(wrapper.find(".bv-banner__actions").exists()).toBe(true);
  });

  it("falls back to primary color when unknown color is given", () => {
    const wrapper = mount(BvBanner, {
      props: { title: "Unknown", color: "custom-unknown" as any },
    });
    const banner = wrapper.find(".bv-banner").element;
    expect(banner.getAttribute("style")).toContain("bl-color-primary");
  });
});
