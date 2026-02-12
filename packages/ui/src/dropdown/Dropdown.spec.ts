import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import { describe, expect, it } from "vitest";
import BvDropdown from "./Dropdown.vue";

describe("BvDropdown", () => {
  it("renders with label and items", () => {
    const wrapper = mount(BvDropdown, {
      props: {
        label: "Menu",
        items: [
          { value: "a", caption: "Option A" },
          { value: "b", caption: "Option B" },
        ],
      },
      slots: { item: ({ item }: { item: { caption: string } }) => item.caption },
    });
    expect(wrapper.find("bl-dropdown").exists()).toBe(true);
    expect(wrapper.text()).toContain("Option A");
    expect(wrapper.text()).toContain("Option B");
  });

  it("passes disabled to bl-dropdown", () => {
    const wrapper = mount(BvDropdown, {
      props: { label: "Menu", disabled: true, items: [] },
    });
    expect(wrapper.find("bl-dropdown").element.hasAttribute("disabled")).toBe(
      true,
    );
  });

  it("emits update:open and open when bl-dropdown fires bl-dropdown-open", async () => {
    const wrapper = mount(BvDropdown, {
      props: { label: "Menu", items: [] },
    });
    wrapper.find("bl-dropdown").element.dispatchEvent(
      new CustomEvent("bl-dropdown-open", { bubbles: true }),
    );
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("update:open")).toEqual([[true]]);
    expect(wrapper.emitted("open")).toHaveLength(1);
  });

  it("emits update:open and close when bl-dropdown fires bl-dropdown-close", async () => {
    const wrapper = mount(BvDropdown, {
      props: { label: "Menu", items: [], open: true },
    });
    wrapper.find("bl-dropdown").element.dispatchEvent(
      new CustomEvent("bl-dropdown-close", { bubbles: true }),
    );
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("update:open")).toEqual([[false]]);
    expect(wrapper.emitted("close")).toHaveLength(1);
  });

  it("emits select when dropdown item is clicked", async () => {
    const wrapper = mount(BvDropdown, {
      props: {
        label: "Menu",
        items: [{ value: "a", caption: "Option A" }],
      },
      slots: { item: ({ item }: { item: { caption: string } }) => item.caption },
    });
    const item = wrapper.find("bl-dropdown-item");
    const event = new CustomEvent("bl-dropdown-item-click", { bubbles: true });
    item.element.dispatchEvent(event);
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("select")).toHaveLength(1);
    expect(wrapper.emitted("select")![0][0]).toBe(event);
  });

  it("renders items with groups when groupCaption is set", () => {
    const wrapper = mount(BvDropdown, {
      props: {
        label: "Menu",
        items: [
          { value: "a", caption: "Option A", groupCaption: "Group 1" },
          { value: "b", caption: "Option B", groupCaption: "Group 1" },
        ],
      },
      slots: { item: ({ item }: { item: { caption: string } }) => item.caption },
    });
    const group = wrapper.find("bl-dropdown-group");
    expect(group.exists()).toBe(true);
    expect(group.attributes("caption")).toBe("Group 1");
  });

  it("exposes open, close, and toggle methods", () => {
    const wrapper = mount(BvDropdown, {
      props: { label: "Menu", items: [] },
    });
    const vm = wrapper.vm as unknown as {
      open: () => void;
      close: () => void;
      toggle: () => void;
    };
    expect(typeof vm.open).toBe("function");
    expect(typeof vm.close).toBe("function");
    expect(typeof vm.toggle).toBe("function");
  });

  it("calls open on bl-dropdown when exposed open is invoked", () => {
    const wrapper = mount(BvDropdown, {
      props: { label: "Menu", items: [] },
    });
    const vm = wrapper.vm as unknown as { open: () => void };
    const blDropdown = wrapper.find("bl-dropdown").element as unknown as {
      opened?: boolean;
      open: () => void;
    };
    vm.open();
    expect(blDropdown.opened).toBe(true);
  });

  it("calls close on bl-dropdown when exposed close is invoked", () => {
    const wrapper = mount(BvDropdown, {
      props: { label: "Menu", items: [], open: true },
    });
    const vm = wrapper.vm as unknown as { close: () => void };
    const blDropdown = wrapper.find("bl-dropdown").element as unknown as {
      opened?: boolean;
      close: () => void;
    };
    vm.close();
    expect(blDropdown.opened).toBe(false);
  });

  it("syncs open state via watch when prop changes from false to true", async () => {
    const wrapper = mount(BvDropdown, {
      props: { label: "Menu", items: [], open: false },
    });
    const blDropdown = wrapper.find("bl-dropdown").element as unknown as {
      opened?: boolean;
    };
    expect(blDropdown.opened).toBe(false);
    await wrapper.setProps({ open: true });
    expect(blDropdown.opened).toBe(true);
  });

  it("syncs open state via watch when prop changes from true to false", async () => {
    const wrapper = mount(BvDropdown, {
      props: { label: "Menu", items: [], open: false },
    });
    const blDropdown = wrapper.find("bl-dropdown").element as unknown as {
      opened?: boolean;
    };
    // First open it
    await wrapper.setProps({ open: true });
    expect(blDropdown.opened).toBe(true);
    // Then close it
    await wrapper.setProps({ open: false });
    expect(blDropdown.opened).toBe(false);
  });

  it("toggle closes when dropdown is opened", () => {
    const wrapper = mount(BvDropdown, {
      props: { label: "Menu", items: [] },
    });
    const vm = wrapper.vm as unknown as {
      open: () => void;
      toggle: () => void;
    };
    const blDropdown = wrapper.find("bl-dropdown").element as unknown as {
      opened?: boolean;
    };
    // Open first
    vm.open();
    expect(blDropdown.opened).toBe(true);
    // Toggle should close
    vm.toggle();
    expect(blDropdown.opened).toBe(false);
  });

  it("toggle opens when dropdown is closed", () => {
    const wrapper = mount(BvDropdown, {
      props: { label: "Menu", items: [] },
    });
    const vm = wrapper.vm as unknown as { toggle: () => void };
    const blDropdown = wrapper.find("bl-dropdown").element as unknown as {
      opened?: boolean;
    };
    expect(blDropdown.opened).toBe(false);
    vm.toggle();
    expect(blDropdown.opened).toBe(true);
  });

  it("renders item captions via default fallback when no item slot provided", () => {
    const wrapper = mount(BvDropdown, {
      props: {
        label: "Menu",
        items: [
          { value: "x", caption: "Fallback Caption" },
        ],
      },
    });
    expect(wrapper.text()).toContain("Fallback Caption");
  });

  it("renders slot mode content when no items provided", () => {
    const wrapper = mount(BvDropdown, {
      props: { label: "Menu" },
      slots: { default: '<div class="custom-content">Custom</div>' },
    });
    expect(wrapper.find(".custom-content").exists()).toBe(true);
    expect(wrapper.text()).toContain("Custom");
  });
});
