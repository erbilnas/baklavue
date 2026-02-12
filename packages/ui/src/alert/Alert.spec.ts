import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import BvAlert from "./Alert.vue";

describe("BvAlert", () => {
  it("renders with default props", () => {
    const wrapper = mount(BvAlert);
    expect(wrapper.find("bl-alert").exists()).toBe(true);
  });

  it("passes variant and description to bl-alert", () => {
    const wrapper = mount(BvAlert, {
      props: { variant: "success", description: "Done" },
    });
    const el = wrapper.find("bl-alert").element;
    expect(el.getAttribute("variant")).toBe("success");
    expect(el.getAttribute("description")).toBe("Done");
  });

  it("emits close when bl-alert fires bl-close", async () => {
    const wrapper = mount(BvAlert, { props: { closable: true } });
    wrapper.find("bl-alert").element.dispatchEvent(
      new CustomEvent("bl-close", { bubbles: true }),
    );
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("close")).toHaveLength(1);
  });

  it("exposes open and close methods", async () => {
    const wrapper = mount(BvAlert, { props: { closable: true } });
    const vm = wrapper.vm as unknown as { open: () => Promise<void>; close: () => Promise<void> };
    expect(typeof vm.open).toBe("function");
    expect(typeof vm.close).toBe("function");
    await vm.close();
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("close")).toHaveLength(1);
  });
});
