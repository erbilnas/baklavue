import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import BvAccordion from "./Accordion.vue";

describe("BvAccordion", () => {
  it("renders single accordion mode", () => {
    const wrapper = mount(BvAccordion, {
      props: { caption: "Section" },
      slots: { default: "Content" },
    });
    expect(wrapper.find("bl-accordion").exists()).toBe(true);
    expect(wrapper.text()).toContain("Content");
    expect(wrapper.find("bl-accordion").element.getAttribute("caption")).toBe("Section");
  });

  it("renders group mode when items and multiple provided", () => {
    const wrapper = mount(BvAccordion, {
      props: {
        multiple: false,
        items: [
          { caption: "Q1", content: "A1" },
          { caption: "Q2", content: "A2" },
        ],
      },
      slots: { item: "<p>Answer</p>" },
    });
    expect(wrapper.find("bl-accordion-group").exists()).toBe(true);
    expect(wrapper.findAll("bl-accordion").length).toBeGreaterThan(0);
  });

  it("emits toggle when single accordion fires bl-toggle", async () => {
    const wrapper = mount(BvAccordion, {
      props: { caption: "Test" },
      slots: { default: "Content" },
    });
    const el = wrapper.find("bl-accordion").element;
    el.dispatchEvent(
      new CustomEvent("bl-toggle", { bubbles: true, detail: true }),
    );
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("toggle")).toEqual([[true]]);
  });
});
