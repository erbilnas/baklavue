import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import BvButton from "./Button.vue";

describe("BvButton", () => {
  it("renders with default props", () => {
    const wrapper = mount(BvButton);
    const blButton = wrapper.find("bl-button");
    expect(blButton.exists()).toBe(true);
  });

  it("passes label, variant, and disabled to bl-button", () => {
    const wrapper = mount(BvButton, {
      props: {
        label: "Click me",
        variant: "secondary",
        disabled: true,
      },
    });
    const blButton = wrapper.find("bl-button").element;
    expect(blButton.getAttribute("label")).toBe("Click me");
    expect(blButton.getAttribute("variant")).toBe("secondary");
    expect(blButton.hasAttribute("disabled")).toBe(true);
  });

  it("emits click when bl-button fires bl-click", async () => {
    const wrapper = mount(BvButton);
    const blButton = wrapper.find("bl-button").element;
    blButton.dispatchEvent(new CustomEvent("bl-click", { bubbles: true }));
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("click")).toBeDefined();
    expect(wrapper.emitted("click")).toHaveLength(1);
    expect(wrapper.emitted("click")![0][0]).toBeInstanceOf(CustomEvent);
  });

  it("renders slot content", () => {
    const wrapper = mount(BvButton, {
      slots: {
        default: "Slot content",
      },
    });
    expect(wrapper.text()).toContain("Slot content");
  });

  it("renders label prop when no slot provided", () => {
    const wrapper = mount(BvButton, {
      props: { label: "Button label" },
    });
    expect(wrapper.text()).toContain("Button label");
  });
});
