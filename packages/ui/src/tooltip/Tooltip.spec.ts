import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import BvTooltip from "./Tooltip.vue";

describe("BvTooltip", () => {
  it("renders with content prop", () => {
    const wrapper = mount(BvTooltip, {
      props: { content: "Tooltip text" },
      slots: { default: "Trigger" },
    });
    expect(wrapper.find("bl-tooltip").exists()).toBe(true);
    expect(wrapper.text()).toContain("Tooltip text");
    expect(wrapper.text()).toContain("Trigger");
  });

  it("passes placement to bl-tooltip", () => {
    const wrapper = mount(BvTooltip, {
      props: { content: "Tip", placement: "bottom" },
      slots: { default: "Hover" },
    });
    expect(wrapper.find("bl-tooltip").element.getAttribute("placement")).toBe(
      "bottom",
    );
  });

  it("emits show when bl-tooltip fires bl-tooltip-show", async () => {
    const wrapper = mount(BvTooltip, {
      props: { content: "Tip" },
      slots: { default: "Hover" },
    });
    wrapper.find("bl-tooltip").element.dispatchEvent(
      new CustomEvent("bl-tooltip-show", { bubbles: true }),
    );
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("show")).toHaveLength(1);
  });

  it("renders slot when disabled", () => {
    const wrapper = mount(BvTooltip, {
      props: { content: "Tip", disabled: true },
      slots: { default: "Disabled trigger" },
    });
    expect(wrapper.find("bl-tooltip").exists()).toBe(false);
    expect(wrapper.text()).toContain("Disabled trigger");
  });
});
