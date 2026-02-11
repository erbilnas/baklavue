import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import BvBadge from "./Badge.vue";

describe("BvBadge", () => {
  it("renders with default props", () => {
    const wrapper = mount(BvBadge);
    const blBadge = wrapper.find("bl-badge");
    expect(blBadge.exists()).toBe(true);
  });

  it("passes size to bl-badge", () => {
    const wrapper = mount(BvBadge, {
      props: { size: "small" },
    });
    const blBadge = wrapper.find("bl-badge").element;
    expect(blBadge.getAttribute("size")).toBe("small");
  });

  it("renders slot content", () => {
    const wrapper = mount(BvBadge, {
      slots: {
        default: "Badge content",
      },
    });
    expect(wrapper.text()).toContain("Badge content");
  });
});
