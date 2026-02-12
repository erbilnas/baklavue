import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import BvTag from "./Tag.vue";

describe("BvTag", () => {
  it("renders with default props", () => {
    const wrapper = mount(BvTag);
    expect(wrapper.find("bl-tag").exists()).toBe(true);
  });

  it("passes variant and size to bl-tag", () => {
    const wrapper = mount(BvTag, {
      props: { variant: "selectable", size: "small" },
    });
    const el = wrapper.find("bl-tag").element;
    expect(el.getAttribute("variant")).toBe("selectable");
    expect(el.getAttribute("size")).toBe("small");
  });

  it("emits close when closable tag receives bl-tag-click", async () => {
    const wrapper = mount(BvTag, { props: { closable: true } });
    wrapper.find("bl-tag").element.dispatchEvent(
      new CustomEvent("bl-tag-click", {
        bubbles: true,
        detail: { value: null, selected: false },
      }),
    );
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("close")).toHaveLength(1);
  });

  it("renders slot content", () => {
    const wrapper = mount(BvTag, { slots: { default: "Tag label" } });
    expect(wrapper.text()).toContain("Tag label");
  });

  it("maps closable prop to variant='removable' on bl-tag", () => {
    const wrapper = mount(BvTag, { props: { closable: true } });
    const el = wrapper.find("bl-tag").element;
    expect(el.getAttribute("variant")).toBe("removable");
  });

  it("emits update:selected when selectable tag receives bl-tag-click", async () => {
    const wrapper = mount(BvTag, { props: { variant: "selectable" } });
    wrapper.find("bl-tag").element.dispatchEvent(
      new CustomEvent("bl-tag-click", {
        bubbles: true,
        detail: { value: "tag1", selected: true },
      }),
    );
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("update:selected")).toEqual([[true]]);
  });

  it("does not emit close or update:selected for non-closable non-selectable tag click", async () => {
    const wrapper = mount(BvTag);
    wrapper.find("bl-tag").element.dispatchEvent(
      new CustomEvent("bl-tag-click", {
        bubbles: true,
        detail: { value: null, selected: false },
      }),
    );
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("close")).toBeUndefined();
    expect(wrapper.emitted("update:selected")).toBeUndefined();
  });

  it("renders icon slot when provided", () => {
    const wrapper = mount(BvTag, {
      slots: { icon: "<span class=\"test-icon\">icon</span>", default: "Label" },
    });
    expect(wrapper.find(".test-icon").exists()).toBe(true);
  });

  it("passes disabled, selected, and value props through to bl-tag", () => {
    const wrapper = mount(BvTag, {
      props: { disabled: true, selected: true, value: "my-val" },
    });
    const el = wrapper.find("bl-tag").element;
    expect(el.getAttribute("disabled")).toBe("true");
    expect(el.getAttribute("selected")).toBe("true");
    expect(el.getAttribute("value")).toBe("my-val");
  });
});
