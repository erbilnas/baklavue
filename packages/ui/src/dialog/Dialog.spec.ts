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

  it("emits update:open and open when bl-dialog fires bl-dialog-open", async () => {
    const wrapper = mount(BvDialog);
    wrapper.find("bl-dialog").element.dispatchEvent(
      new CustomEvent("bl-dialog-open", { bubbles: true }),
    );
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("update:open")).toEqual([[true]]);
    expect(wrapper.emitted("open")).toHaveLength(1);
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

  it("prevents close when closable is false and source is close-button", async () => {
    const wrapper = mount(BvDialog, {
      props: { open: true, closable: false },
    });
    const el = wrapper.find("bl-dialog").element;
    const event = new CustomEvent("bl-dialog-request-close", {
      bubbles: true,
      cancelable: true,
      detail: { source: "close-button" },
    });
    el.dispatchEvent(event);
    expect(event.defaultPrevented).toBe(true);
  });

  it("prevents close when backdrop is false and source is backdrop", async () => {
    const wrapper = mount(BvDialog, {
      props: { open: true, backdrop: false },
    });
    const el = wrapper.find("bl-dialog").element;
    const event = new CustomEvent("bl-dialog-request-close", {
      bubbles: true,
      cancelable: true,
      detail: { source: "backdrop" },
    });
    el.dispatchEvent(event);
    expect(event.defaultPrevented).toBe(true);
  });

  it("does not prevent close when source is keyboard", async () => {
    const wrapper = mount(BvDialog, {
      props: { open: true, closable: false },
    });
    const el = wrapper.find("bl-dialog").element;
    const event = new CustomEvent("bl-dialog-request-close", {
      bubbles: true,
      cancelable: true,
      detail: { source: "keyboard" },
    });
    el.dispatchEvent(event);
    expect(event.defaultPrevented).toBe(false);
  });

  it("applies size width via style", () => {
    const wrapper = mount(BvDialog, { props: { size: "small" } });
    const el = wrapper.find("bl-dialog").element;
    expect(el.getAttribute("style")).toContain("--bl-dialog-width");
  });

  it("exposes open and close methods", () => {
    const wrapper = mount(BvDialog);
    const vm = wrapper.vm as unknown as { open: () => void; close: () => void };
    expect(typeof vm.open).toBe("function");
    expect(typeof vm.close).toBe("function");
  });

  it("calls open on bl-dialog when exposed open is invoked", async () => {
    const wrapper = mount(BvDialog);
    const blDialog = wrapper.find("bl-dialog").element as { open?: boolean };
    const vm = wrapper.vm as unknown as { open: () => void };
    vm.open();
    await wrapper.vm.$nextTick();
    expect(blDialog.open).toBe(true);
  });

  it("calls close on bl-dialog when exposed close is invoked", async () => {
    const wrapper = mount(BvDialog, { props: { open: true } });
    const blDialog = wrapper.find("bl-dialog").element as { open?: boolean };
    const vm = wrapper.vm as unknown as { close: () => void };
    vm.close();
    await wrapper.vm.$nextTick();
    expect(blDialog.open).toBe(false);
  });
});
