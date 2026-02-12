import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import BvRadio from "./Radio.vue";

describe("BvRadio", () => {
  it("renders single radio mode", () => {
    const wrapper = mount(BvRadio, {
      props: { value: "yes", label: "Yes", name: "choice" },
    });
    expect(wrapper.find("bl-radio").exists()).toBe(true);
    expect(wrapper.text()).toContain("Yes");
  });

  it("renders group mode when items prop provided", () => {
    const wrapper = mount(BvRadio, {
      props: {
        items: [
          { value: "a", label: "Option A" },
          { value: "b", label: "Option B" },
        ],
      },
    });
    expect(wrapper.find("bl-radio-group").exists()).toBe(true);
    expect(wrapper.findAll("bl-radio")).toHaveLength(2);
  });

  it("emits update:modelValue when single radio is selected", async () => {
    const wrapper = mount(BvRadio, {
      props: { value: "opt1", label: "Option 1" },
    });
    const el = wrapper.find("bl-radio").element as HTMLElement & {
      checked?: boolean;
      value?: string;
    };
    el.checked = true;
    el.value = "opt1";
    el.dispatchEvent(new CustomEvent("bl-change", { bubbles: true }));
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("update:modelValue")).toEqual([["opt1"]]);
  });

  it("group mode emits update:modelValue when bl-radio-change fires with matching item", async () => {
    const wrapper = mount(BvRadio, {
      props: {
        modelValue: "a",
        items: [
          { value: "a", label: "Option A" },
          { value: "b", label: "Option B" },
        ],
      },
    });
    const group = wrapper.find("bl-radio-group").element;
    group.dispatchEvent(
      new CustomEvent("bl-radio-change", { bubbles: true, detail: "b" }),
    );
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("update:modelValue")).toEqual([["b"]]);
    expect(wrapper.emitted("change")).toHaveLength(1);
  });

  it("group mode emits raw detail when no item matches", async () => {
    const wrapper = mount(BvRadio, {
      props: {
        items: [
          { value: "a", label: "Option A" },
        ],
      },
    });
    const group = wrapper.find("bl-radio-group").element;
    group.dispatchEvent(
      new CustomEvent("bl-radio-change", { bubbles: true, detail: "unknown" }),
    );
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("update:modelValue")).toEqual([["unknown"]]);
  });

  it("group mode does not emit update:modelValue when detail is empty", async () => {
    const wrapper = mount(BvRadio, {
      props: {
        items: [
          { value: "a", label: "Option A" },
        ],
      },
    });
    const group = wrapper.find("bl-radio-group").element;
    group.dispatchEvent(
      new CustomEvent("bl-radio-change", { bubbles: true, detail: "" }),
    );
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("change")).toHaveLength(1);
    expect(wrapper.emitted("update:modelValue")).toBeUndefined();
  });

  it("group mode with defined modelValue renders correct value attribute", () => {
    const wrapper = mount(BvRadio, {
      props: {
        modelValue: 42,
        items: [
          { value: 42, label: "Forty-two" },
          { value: 99, label: "Ninety-nine" },
        ],
      },
    });
    const group = wrapper.find("bl-radio-group").element;
    expect(group.getAttribute("value")).toBe("42");
  });

  it("single mode with explicit checked=false renders unchecked", () => {
    const wrapper = mount(BvRadio, {
      props: { value: "opt", label: "Opt", checked: false },
    });
    const el = wrapper.find("bl-radio").element;
    expect(el.getAttribute("checked")).toBe("false");
  });

  it("single mode with modelValue matching value renders checked", () => {
    const wrapper = mount(BvRadio, {
      props: { value: "opt1", label: "Option 1", modelValue: "opt1" },
    });
    const el = wrapper.find("bl-radio").element;
    expect(el.getAttribute("checked")).toBe("true");
  });

  it("single mode emits update:checked with false when unchecked", async () => {
    const wrapper = mount(BvRadio, {
      props: { value: "opt1", label: "Option 1" },
    });
    const el = wrapper.find("bl-radio").element as HTMLElement & {
      checked?: boolean;
    };
    el.checked = false;
    el.dispatchEvent(new CustomEvent("bl-change", { bubbles: true }));
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("update:checked")).toEqual([[false]]);
    // Should not emit update:modelValue when checked is false
    expect(wrapper.emitted("update:modelValue")).toBeUndefined();
  });

  it("single mode emits input event on bl-input", async () => {
    const wrapper = mount(BvRadio, {
      props: { value: "opt1", label: "Option 1" },
    });
    const el = wrapper.find("bl-radio").element;
    const event = new CustomEvent("bl-input", { bubbles: true });
    el.dispatchEvent(event);
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("input")).toHaveLength(1);
  });
});
