import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import BvInput from "./Input.vue";

describe("BvInput", () => {
  it("renders with default props", () => {
    const wrapper = mount(BvInput);
    const blInput = wrapper.find("bl-input");
    expect(blInput.exists()).toBe(true);
  });

  it("passes label, placeholder, and invalidText to bl-input", () => {
    const wrapper = mount(BvInput, {
      props: {
        label: "Email",
        placeholder: "Enter email",
        invalidText: "Invalid email",
      },
    });
    const blInput = wrapper.find("bl-input").element;
    expect(blInput.getAttribute("label")).toBe("Email");
    expect(blInput.getAttribute("placeholder")).toBe("Enter email");
    expect(blInput.getAttribute("invalid-text")).toBe("Invalid email");
  });

  it("emits update:modelValue when bl-input fires bl-input", async () => {
    const wrapper = mount(BvInput);
    const blInput = wrapper.find("bl-input").element as unknown as HTMLInputElement & {
      value: string;
    };
    blInput.value = "test value";
    blInput.dispatchEvent(
      new CustomEvent("bl-input", {
        bubbles: true,
        detail: { target: blInput },
      }),
    );
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("update:modelValue")).toBeDefined();
    expect(wrapper.emitted("update:modelValue")).toHaveLength(1);
    expect(wrapper.emitted("update:modelValue")![0][0]).toBe("test value");
  });

  it("emits focus when bl-input receives focus", async () => {
    const wrapper = mount(BvInput);
    const blInput = wrapper.find("bl-input").element;
    blInput.dispatchEvent(new FocusEvent("focus", { bubbles: true }));
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("focus")).toBeDefined();
    expect(wrapper.emitted("focus")).toHaveLength(1);
  });

  it("emits blur when bl-input loses focus", async () => {
    const wrapper = mount(BvInput);
    const blInput = wrapper.find("bl-input").element;
    blInput.dispatchEvent(new FocusEvent("blur", { bubbles: true }));
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("blur")).toBeDefined();
    expect(wrapper.emitted("blur")).toHaveLength(1);
  });

  it("binds modelValue to value attribute", () => {
    const wrapper = mount(BvInput, {
      props: { modelValue: "initial value" },
    });
    const blInput = wrapper.find("bl-input").element;
    expect(blInput.getAttribute("value")).toBe("initial value");
  });
});
