import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import BvSkeleton from "./Skeleton.vue";

describe("BvSkeleton", () => {
  it("renders with default props", () => {
    const wrapper = mount(BvSkeleton);
    expect(wrapper.find(".skeleton-wrapper").exists()).toBe(true);
    expect(wrapper.findAll(".skeleton")).toHaveLength(1);
  });

  it("renders multiple skeletons when count > 1", () => {
    const wrapper = mount(BvSkeleton, { props: { count: 3 } });
    expect(wrapper.findAll(".skeleton")).toHaveLength(3);
  });

  it("applies variant class", () => {
    const wrapper = mount(BvSkeleton, { props: { variant: "circle" } });
    expect(wrapper.find(".skeleton--circle").exists()).toBe(true);
  });

  it("has aria-label for accessibility", () => {
    const wrapper = mount(BvSkeleton);
    expect(wrapper.find(".skeleton-wrapper").element.getAttribute("aria-label")).toBe(
      "Loading",
    );
  });
});
