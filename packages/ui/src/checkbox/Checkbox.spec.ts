import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import BvCheckbox from "./Checkbox.vue";

describe("BvCheckbox", () => {
  it("renders single checkbox mode", () => {
    const wrapper = mount(BvCheckbox, { props: { label: "Agree" } });
    expect(wrapper.find("bl-checkbox").exists()).toBe(true);
    expect(wrapper.text()).toContain("Agree");
  });

  it("renders group mode when items prop provided", () => {
    const wrapper = mount(BvCheckbox, {
      props: {
        items: [
          { value: "a", label: "Option A" },
          { value: "b", label: "Option B" },
        ],
      },
    });
    expect(wrapper.find("bl-checkbox-group").exists()).toBe(true);
    expect(wrapper.findAll("bl-checkbox")).toHaveLength(2);
  });

  it("emits update:modelValue when single checkbox changes", async () => {
    const wrapper = mount(BvCheckbox, { props: { label: "Test" } });
    const blCheckbox = wrapper.find("bl-checkbox").element as HTMLElement & {
      checked?: boolean;
    };
    blCheckbox.checked = true;
    blCheckbox.dispatchEvent(new CustomEvent("bl-change", { bubbles: true }));
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("update:modelValue")).toEqual([[true]]);
  });
});
