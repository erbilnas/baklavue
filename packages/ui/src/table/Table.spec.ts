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

  it("renders title and header-actions slot", () => {
    const wrapper = mount(BvTable, {
      props: { columns, data, title: "My Table" },
      slots: { "header-actions": "<button>Action</button>" },
    });
    expect(wrapper.find(".header").exists()).toBe(true);
    expect(wrapper.find(".--title").text()).toBe("My Table");
    expect(wrapper.text()).toContain("Action");
  });

  it("shows custom loadingText", () => {
    const wrapper = mount(BvTable, {
      props: { columns, data, isLoading: true, loadingText: "Please wait" },
    });
    expect(wrapper.text()).toContain("Please wait");
  });

  it("selectable with selected array maps ids to strings", () => {
    const wrapper = mount(BvTable, {
      props: { columns, data, selectable: true, selected: [1, 2] },
    });
    const blTable = wrapper.find("bl-table");
    expect(blTable.exists()).toBe(true);
    // selectable attribute should be set
    expect(blTable.attributes("selectable")).toBeDefined();
  });

  it("selectable without selected prop returns empty (s == null branch)", () => {
    const wrapper = mount(BvTable, {
      props: { columns, data, selectable: true },
    });
    const blTable = wrapper.find("bl-table");
    expect(blTable.exists()).toBe(true);
    expect(blTable.attributes("selectable")).toBeDefined();
  });

  it("emits sort on bl-sort event", async () => {
    const wrapper = mount(BvTable, {
      props: { columns, data, sortable: true },
    });
    wrapper.find("bl-table").element.dispatchEvent(
      new CustomEvent("bl-sort", { bubbles: true, detail: { sortKey: "name", sortDirection: "asc" } }),
    );
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("sort")).toHaveLength(1);
  });

  it("emits select on bl-row-select event", async () => {
    const wrapper = mount(BvTable, {
      props: { columns, data, selectable: true, selected: [1] },
    });
    wrapper.find("bl-table").element.dispatchEvent(
      new CustomEvent("bl-row-select", { bubbles: true, detail: { selectedRows: [1, 2] } }),
    );
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("select")).toHaveLength(1);
  });

  it("renders pagination and emits change on bl-change", async () => {
    const wrapper = mount(BvTable, {
      props: {
        columns,
        data,
        pagination: {
          currentPage: 1,
          totalItems: 50,
          itemsPerPage: 10,
          hasJumper: true,
          jumperLabel: "Jump",
          hasSelect: true,
          selectLabel: "Per page",
        },
      },
    });
    expect(wrapper.find(".pagination-wrapper").exists()).toBe(true);
    const blPagination = wrapper.find("bl-pagination");
    expect(blPagination.exists()).toBe(true);
    blPagination.element.dispatchEvent(
      new CustomEvent("bl-change", { bubbles: true, detail: { selectedPage: 2 } }),
    );
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("change")).toHaveLength(1);
  });

  it("uses getColumnLabel fallbacks: name > label > key", () => {
    const mixedColumns = [
      { key: "a", name: "ColName" },
      { key: "b", label: "ColLabel" },
      { key: "c" },
    ];
    const mixedData = [{ id: 1, a: "v1", b: "v2", c: "v3" }];
    const wrapper = mount(BvTable, {
      props: { columns: mixedColumns, data: mixedData },
    });
    expect(wrapper.text()).toContain("ColName");
    expect(wrapper.text()).toContain("ColLabel");
    expect(wrapper.text()).toContain("c");
  });

  it("uses index as row key when row has no id", () => {
    const noIdData = [
      { name: "NoId1", age: 20 },
      { name: "NoId2", age: 22 },
    ];
    const wrapper = mount(BvTable, {
      props: { columns, data: noIdData },
    });
    expect(wrapper.text()).toContain("NoId1");
    expect(wrapper.text()).toContain("NoId2");
  });

  it("sortable table with column.sortable false omits sort-key", () => {
    const sortColumns = [
      { key: "name", label: "Name", sortable: true },
      { key: "age", label: "Age", sortable: false },
    ];
    const wrapper = mount(BvTable, {
      props: { columns: sortColumns, data, sortable: true },
    });
    const headerCells = wrapper.findAll("bl-table-header-cell");
    expect(headerCells[0].attributes("sort-key")).toBe("name");
    expect(headerCells[1].attributes("sort-key")).toBeUndefined();
  });

  it("applies headerOptions sticky and minCellWidth", () => {
    const wrapper = mount(BvTable, {
      props: {
        columns,
        data,
        headerOptions: { sticky: true, minCellWidth: "150px" },
      },
    });
    const header = wrapper.find("bl-table-header");
    expect(header.attributes("sticky")).toBeDefined();
    const cell = wrapper.find("bl-table-header-cell");
    expect(cell.attributes("style")).toContain("150px");
  });

  it("renders with multiple prop", () => {
    const wrapper = mount(BvTable, {
      props: { columns, data, selectable: true, multiple: true, selected: [1] },
    });
    const blTable = wrapper.find("bl-table");
    expect(blTable.attributes("multiple")).toBeDefined();
  });
});
