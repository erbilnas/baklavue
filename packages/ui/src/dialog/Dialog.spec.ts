import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import BvDialog from "./Dialog.vue";

describe("BvDialog", () => {
  it("renders with default props", () => {
    const wrapper = mount(BvDialog);
    expect(wrapper.find("bl-dialog").exists()).toBe(true);
  });

  it("passes caption and open to bl-dialog", () => {
    const wrapper = mount(BvDialog, {
      props: { caption: "Title", open: true },
    });
    const el = wrapper.find("bl-dialog").element;
    expect(el.getAttribute("caption")).toBe("Title");
  });

  it("emits update:open and close when bl-dialog fires bl-dialog-close", async () => {
    const wrapper = mount(BvDialog, { props: { open: true } });
    wrapper.find("bl-dialog").element.dispatchEvent(
      new CustomEvent("bl-dialog-close", { bubbles: true }),
    );
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("update:open")).toEqual([[false]]);
    expect(wrapper.emitted("close")).toHaveLength(1);
  });

  it("exposes open and close methods", () => {
    const wrapper = mount(BvDialog);
    const vm = wrapper.vm as { open: () => void; close: () => void };
    expect(typeof vm.open).toBe("function");
    expect(typeof vm.close).toBe("function");
  });
});
