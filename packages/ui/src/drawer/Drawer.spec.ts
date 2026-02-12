import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import BvDrawer from "./Drawer.vue";

describe("BvDrawer", () => {
  it("renders with default props", () => {
    const wrapper = mount(BvDrawer);
    expect(wrapper.find("bl-drawer").exists()).toBe(true);
  });

  it("passes caption and open to bl-drawer", () => {
    const wrapper = mount(BvDrawer, {
      props: { caption: "Title", open: true },
      slots: { default: "Content" },
    });
    const el = wrapper.find("bl-drawer").element;
    expect(el.getAttribute("caption")).toBe("Title");
  });

  it("emits update:open and open when bl-drawer fires bl-drawer-open", async () => {
    const wrapper = mount(BvDrawer, { slots: { default: "Content" } });
    wrapper.find("bl-drawer").element.dispatchEvent(
      new CustomEvent("bl-drawer-open", { bubbles: true }),
    );
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("update:open")).toEqual([[true]]);
    expect(wrapper.emitted("open")).toHaveLength(1);
  });

  it("emits update:open and close when bl-drawer fires bl-drawer-close", async () => {
    const wrapper = mount(BvDrawer, {
      props: { open: true },
      slots: { default: "Content" },
    });
    wrapper.find("bl-drawer").element.dispatchEvent(
      new CustomEvent("bl-drawer-close", { bubbles: true }),
    );
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("update:open")).toEqual([[false]]);
    expect(wrapper.emitted("close")).toHaveLength(1);
  });

  it("passes width for size preset", () => {
    const wrapper = mount(BvDrawer, { props: { width: "small" } });
    const el = wrapper.find("bl-drawer").element;
    expect(el.getAttribute("width")).toBe("320px");
  });

  it("maps medium width preset to 424px", () => {
    const wrapper = mount(BvDrawer, { props: { width: "medium" } });
    expect(wrapper.find("bl-drawer").element.getAttribute("width")).toBe("424px");
  });

  it("maps large width preset to 560px", () => {
    const wrapper = mount(BvDrawer, { props: { width: "large" } });
    expect(wrapper.find("bl-drawer").element.getAttribute("width")).toBe("560px");
  });

  it("passes custom CSS width through unchanged", () => {
    const wrapper = mount(BvDrawer, { props: { width: "500px" } });
    expect(wrapper.find("bl-drawer").element.getAttribute("width")).toBe("500px");
  });

  it("passes embedUrl and externalLink to bl-drawer", () => {
    const wrapper = mount(BvDrawer, {
      props: { embedUrl: "https://example.com", externalLink: "https://link.com" },
    });
    const el = wrapper.find("bl-drawer").element;
    expect(el.getAttribute("embed-url")).toBe("https://example.com");
    expect(el.getAttribute("external-link")).toBe("https://link.com");
  });

  it("exposes open and close methods", () => {
    const wrapper = mount(BvDrawer);
    const vm = wrapper.vm as unknown as { open: () => void; close: () => void };
    expect(typeof vm.open).toBe("function");
    expect(typeof vm.close).toBe("function");
  });

  it("open() exposed method sets open property on the element", () => {
    const wrapper = mount(BvDrawer);
    const vm = wrapper.vm as unknown as { open: () => void };
    vm.open();
    const el = wrapper.find("bl-drawer").element as unknown as { open: boolean };
    expect(el.open).toBe(true);
  });

  it("close() exposed method sets open property to false on the element", () => {
    const wrapper = mount(BvDrawer, { props: { open: true } });
    const vm = wrapper.vm as unknown as { close: () => void };
    vm.close();
    const el = wrapper.find("bl-drawer").element as unknown as { open: boolean };
    expect(el.open).toBe(false);
  });

  it("syncs open prop change to the underlying element", async () => {
    const wrapper = mount(BvDrawer, { props: { open: false } });
    await wrapper.setProps({ open: true });
    const el = wrapper.find("bl-drawer").element as unknown as { open: boolean };
    expect(el.open).toBe(true);
  });
});
