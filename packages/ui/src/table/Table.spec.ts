import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import BvTable from "./Table.vue";

describe("BvTable", () => {
  const columns = [
    { key: "name", label: "Name" },
    { key: "age", label: "Age" },
  ];
  const data = [
    { id: 1, name: "Alice", age: 30 },
    { id: 2, name: "Bob", age: 25 },
  ];

  it("renders table with columns and data", () => {
    const wrapper = mount(BvTable, {
      props: { columns, data },
    });
    expect(wrapper.find("bl-table").exists()).toBe(true);
    expect(wrapper.text()).toContain("Alice");
    expect(wrapper.text()).toContain("Bob");
  });

  it("shows loading state when isLoading is true", () => {
    const wrapper = mount(BvTable, {
      props: { columns, data, isLoading: true },
    });
    expect(wrapper.find("bl-table").exists()).toBe(true);
    expect(wrapper.text()).toContain("Loading");
  });

  it("shows empty state when data is empty", () => {
    const wrapper = mount(BvTable, {
      props: { columns, data: [] },
      slots: { "empty-state": "No data found" },
    });
    expect(wrapper.text()).toContain("No data found");
  });
});
