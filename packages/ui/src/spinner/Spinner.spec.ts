import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import BvSpinner from "./Spinner.vue";

describe("BvSpinner", () => {
  it("renders with default props", () => {
    const wrapper = mount(BvSpinner);
    const blSpinner = wrapper.find("bl-spinner");
    expect(blSpinner.exists()).toBe(true);
  });

  it("passes size and variant to bl-spinner", () => {
    const wrapper = mount(BvSpinner, {
      props: { size: "large", variant: "primary" },
    });
    const blSpinner = wrapper.find("bl-spinner").element;
    expect(blSpinner.getAttribute("size")).toBe("large");
    expect(blSpinner.getAttribute("variant")).toBe("primary");
  });

  it("passes aria-label for accessibility", () => {
    const wrapper = mount(BvSpinner, {
      props: { label: "Loading..." },
    });
    const blSpinner = wrapper.find("bl-spinner").element;
    expect(blSpinner.getAttribute("aria-label")).toBe("Loading...");
  });
});
