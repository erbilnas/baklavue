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
});
