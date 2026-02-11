import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import BvChip from "./Chip.vue";

describe("BvChip", () => {
  it("renders in default mode with slot", () => {
    const wrapper = mount(BvChip, {
      slots: {
        default: "Child content",
      },
    });
    expect(wrapper.find(".bv-chip").exists()).toBe(true);
    expect(wrapper.text()).toContain("Child content");
  });

  it("renders in standalone mode", () => {
    const wrapper = mount(BvChip, {
      props: { standalone: true, text: "5" },
    });
    expect(wrapper.find(".bv-chip--standalone").exists()).toBe(true);
    expect(wrapper.text()).toContain("5");
  });

  it("applies color and position styles", () => {
    const wrapper = mount(BvChip, {
      props: { text: "1", color: "success", position: "top-left" },
    });
    const badge = wrapper.find(".bv-chip__badge").element;
    expect(badge.className).toContain("bv-chip__badge--top-left");
    expect(badge.getAttribute("style")).toContain("bl-color-success");
  });

  it("renders slot content over text prop", () => {
    const wrapper = mount(BvChip, {
      props: { text: "fallback" },
      slots: {
        content: "Custom content",
      },
    });
    expect(wrapper.text()).toContain("Custom content");
  });

  it("hides badge when show is false", () => {
    const wrapper = mount(BvChip, {
      props: { text: "1", show: false },
    });
    expect(wrapper.find(".bv-chip__badge").exists()).toBe(false);
  });
});
