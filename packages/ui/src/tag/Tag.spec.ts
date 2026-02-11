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
});
