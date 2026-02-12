import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import BvPagination from "./Pagination.vue";

describe("BvPagination", () => {
  it("renders with default props", () => {
    const wrapper = mount(BvPagination);
    expect(wrapper.find("bl-pagination").exists()).toBe(true);
  });

  it("passes currentPage, totalItems, pageSize to bl-pagination", () => {
    const wrapper = mount(BvPagination, {
      props: {
        currentPage: 2,
        totalItems: 100,
        pageSize: 10,
      },
    });
    const el = wrapper.find("bl-pagination").element;
    expect(el.getAttribute("current-page")).toBe("2");
    expect(el.getAttribute("total-items")).toBe("100");
    expect(el.getAttribute("items-per-page")).toBe("10");
  });

  it("emits update:currentPage and change when bl-pagination fires bl-change", async () => {
    const wrapper = mount(BvPagination, {
      props: { currentPage: 1, totalItems: 50, pageSize: 10 },
    });
    wrapper.find("bl-pagination").element.dispatchEvent(
      new CustomEvent("bl-change", {
        bubbles: true,
        detail: { selectedPage: 3, prevPage: 2, itemsPerPage: 10 },
      }),
    );
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("update:currentPage")).toEqual([[3]]);
    expect(wrapper.emitted("change")).toHaveLength(1);
  });
});
