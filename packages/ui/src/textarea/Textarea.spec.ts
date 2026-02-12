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

  it("passes disabled=true to bl-textarea", () => {
    const wrapper = mount(BvTextarea, { props: { disabled: true } });
    const el = wrapper.find("bl-textarea").element;
    expect(el.getAttribute("disabled")).toBe("true");
  });

  it("passes required=true to bl-textarea", () => {
    const wrapper = mount(BvTextarea, { props: { required: true } });
    const el = wrapper.find("bl-textarea").element;
    expect(el.getAttribute("required")).toBe("true");
  });

  it("emits update:modelValue with null when target value is empty", async () => {
    const wrapper = mount(BvTextarea);
    const el = wrapper.find("bl-textarea").element as HTMLTextAreaElement & {
      value: string;
    };
    el.value = "";
    el.dispatchEvent(
      new CustomEvent("bl-input", { bubbles: true, detail: { target: el } }),
    );
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("update:modelValue")).toEqual([[null]]);
  });

  it("emits input event on bl-input", async () => {
    const wrapper = mount(BvTextarea);
    const el = wrapper.find("bl-textarea").element as HTMLTextAreaElement & {
      value: string;
    };
    el.value = "text";
    el.dispatchEvent(
      new CustomEvent("bl-input", { bubbles: true }),
    );
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("input")).toHaveLength(1);
  });

  it("emits change event on bl-change", async () => {
    const wrapper = mount(BvTextarea);
    const el = wrapper.find("bl-textarea").element;
    el.dispatchEvent(new CustomEvent("bl-change", { bubbles: true }));
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("change")).toHaveLength(1);
  });

  it("renders slot content", () => {
    const wrapper = mount(BvTextarea, {
      slots: { default: "<span class=\"helper\">Help</span>" },
    });
    expect(wrapper.find(".helper").exists()).toBe(true);
  });

  it("passes additional props (rows, maxlength, name, size) to bl-textarea", () => {
    const wrapper = mount(BvTextarea, {
      props: { rows: 5, maxlength: 200, name: "comment", size: "large" as const },
    });
    const el = wrapper.find("bl-textarea").element;
    expect(el.getAttribute("rows")).toBe("5");
    expect(el.getAttribute("maxlength")).toBe("200");
    expect(el.getAttribute("name")).toBe("comment");
    expect(el.getAttribute("size")).toBe("large");
  });
});
