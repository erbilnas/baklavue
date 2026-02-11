import { mount } from "@vue/test-utils";
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
});
