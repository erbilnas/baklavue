import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import BvTextarea from "./Textarea.vue";

describe("BvTextarea", () => {
  it("renders with default props", () => {
    const wrapper = mount(BvTextarea);
    expect(wrapper.find("bl-textarea").exists()).toBe(true);
  });

  it("passes label and placeholder to bl-textarea", () => {
    const wrapper = mount(BvTextarea, {
      props: { label: "Message", placeholder: "Enter text" },
    });
    const el = wrapper.find("bl-textarea").element;
    expect(el.getAttribute("label")).toBe("Message");
    expect(el.getAttribute("placeholder")).toBe("Enter text");
  });

  it("emits update:modelValue when bl-textarea fires bl-input", async () => {
    const wrapper = mount(BvTextarea);
    const el = wrapper.find("bl-textarea").element as HTMLTextAreaElement & {
      value: string;
    };
    el.value = "new text";
    el.dispatchEvent(
      new CustomEvent("bl-input", { bubbles: true, detail: { target: el } }),
    );
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("update:modelValue")).toEqual([["new text"]]);
  });

  it("binds modelValue to value attribute", () => {
    const wrapper = mount(BvTextarea, {
      props: { modelValue: "initial" },
    });
    expect(wrapper.find("bl-textarea").element.getAttribute("value")).toBe(
      "initial",
    );
  });
});
