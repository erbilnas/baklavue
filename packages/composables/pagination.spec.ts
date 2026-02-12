import { mount } from "@vue/test-utils";
import { defineComponent } from "vue";
import { describe, expect, it } from "vitest";
import { usePagination } from "./pagination";

function withSetup<T>(composable: () => T) {
  let result: T;
  const TestComponent = defineComponent({
    setup() {
      result = composable();
      return () => null;
    },
  });
  const wrapper = mount(TestComponent);
  return { result: result!, wrapper };
}

describe("usePagination", () => {
  it("returns default values when no options provided", () => {
    const { result } = withSetup(() => usePagination());
    expect(result.currentPage.value).toBe(1);
    expect(result.pageSize.value).toBe(10);
    expect(result.totalItems.value).toBe(0);
    expect(result.totalPages.value).toBe(1);
    expect(result.offset.value).toBe(0);
  });

  it("computes totalPages from totalItems and pageSize", () => {
    const { result } = withSetup(() =>
      usePagination({ totalItems: 100, pageSize: 10 }),
    );
    expect(result.totalPages.value).toBe(10);
  });

  it("computes totalPages as at least 1 when totalItems > 0", () => {
    const { result } = withSetup(() =>
      usePagination({ totalItems: 5, pageSize: 10 }),
    );
    expect(result.totalPages.value).toBe(1);
  });

  it("setPage updates currentPage within bounds", async () => {
    const { result, wrapper } = withSetup(() =>
      usePagination({ totalItems: 100, pageSize: 10 }),
    );
    result.setPage(3);
    await wrapper.vm.$nextTick();
    expect(result.currentPage.value).toBe(3);
    expect(result.offset.value).toBe(20);

    result.setPage(99);
    await wrapper.vm.$nextTick();
    expect(result.currentPage.value).toBe(10);
  });

  it("slice returns correct subset of array", () => {
    const { result } = withSetup(() =>
      usePagination({ totalItems: 100, pageSize: 10, initialPage: 2 }),
    );
    const arr = Array.from({ length: 100 }, (_, i) => i);
    const sliced = result.slice(arr);
    expect(sliced).toEqual([10, 11, 12, 13, 14, 15, 16, 17, 18, 19]);
  });

  it("setPageSize updates pageSize and clamps currentPage", async () => {
    const { result, wrapper } = withSetup(() =>
      usePagination({ totalItems: 100, pageSize: 10, initialPage: 5 }),
    );
    result.setPageSize(25);
    await wrapper.vm.$nextTick();
    expect(result.pageSize.value).toBe(25);
    expect(result.totalPages.value).toBe(4);
    expect(result.currentPage.value).toBe(4);
  });

  it("setTotalItems updates totalItems", async () => {
    const { result, wrapper } = withSetup(() =>
      usePagination({ totalItems: 50, pageSize: 10 }),
    );
    result.setTotalItems(200);
    await wrapper.vm.$nextTick();
    expect(result.totalItems.value).toBe(200);
    expect(result.totalPages.value).toBe(20);
  });

  it("totalPages returns 0 when pageSize is 0", () => {
    const { result } = withSetup(() =>
      usePagination({ totalItems: 100, pageSize: 0 }),
    );
    expect(result.totalPages.value).toBe(0);
  });

  it("setPageSize does nothing when size <= 0", async () => {
    const { result, wrapper } = withSetup(() =>
      usePagination({ totalItems: 100, pageSize: 10 }),
    );
    result.setPageSize(0);
    await wrapper.vm.$nextTick();
    expect(result.pageSize.value).toBe(10);
  });
});
