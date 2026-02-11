import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import BvSplitButton from "./SplitButton.vue";

describe("BvSplitButton", () => {
  it("renders with label", () => {
    const wrapper = mount(BvSplitButton, {
      props: { label: "Actions" },
    });
    expect(wrapper.find("bl-split-button").exists()).toBe(true);
    expect(wrapper.find("bl-split-button").element.getAttribute("label")).toBe(
      "Actions",
    );
  });

  it("emits click when bl-split-button fires bl-click", async () => {
    const wrapper = mount(BvSplitButton, { props: { label: "Save" } });
    wrapper.find("bl-split-button").element.dispatchEvent(
      new CustomEvent("bl-click", { bubbles: true }),
    );
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("click")).toHaveLength(1);
  });
});
