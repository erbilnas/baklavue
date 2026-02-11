import { mount } from "@vue/test-utils";
import { defineComponent } from "vue";
import { describe, expect, it, vi } from "vitest";
import { useInfiniteQuery } from "./infiniteQuery";

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

describe("useInfiniteQuery", () => {
  it("fetches initial page on mount", async () => {
    const page1 = { items: [{ id: 1 }], nextCursor: "cursor2" };
    const queryFn = vi.fn().mockResolvedValue(page1);

    const { result } = withSetup(() =>
      useInfiniteQuery({
        queryKey: ["items"],
        queryFn: queryFn as (ctx: { pageParam: string | null }) => Promise<unknown>,
        initialPageParam: null,
        getNextPageParam: (lastPage: { nextCursor?: string }) =>
          lastPage.nextCursor ?? undefined,
      }),
    );

    await new Promise((r) => setTimeout(r, 50));

    expect(queryFn).toHaveBeenCalledWith({
      queryKey: ["items"],
      pageParam: null,
    });
    expect(result.data.value).toEqual([page1]);
    expect(result.hasNextPage.value).toBe(true);
  });

  it("fetchNextPage appends next page", async () => {
    const page1 = { items: [{ id: 1 }], nextCursor: "cursor2" };
    const page2 = { items: [{ id: 2 }], nextCursor: undefined };
    const queryFn = vi
      .fn()
      .mockResolvedValueOnce(page1)
      .mockResolvedValueOnce(page2);

    const { result, wrapper } = withSetup(() =>
      useInfiniteQuery({
        queryKey: ["items"],
        queryFn: queryFn as (ctx: { pageParam: string | null }) => Promise<unknown>,
        initialPageParam: null,
        getNextPageParam: (lastPage: { nextCursor?: string }) =>
          lastPage.nextCursor ?? undefined,
      }),
    );

    await new Promise((r) => setTimeout(r, 50));
    expect(result.data.value).toEqual([page1]);

    result.fetchNextPage();
    await new Promise((r) => setTimeout(r, 50));

    expect(queryFn).toHaveBeenCalledTimes(2);
    expect(result.data.value).toEqual([page1, page2]);
    expect(result.hasNextPage.value).toBe(false);
  });

  it("does not fetch when enabled is false", async () => {
    const queryFn = vi.fn().mockResolvedValue({});

    withSetup(() =>
      useInfiniteQuery({
        queryKey: ["items"],
        queryFn: queryFn as () => Promise<unknown>,
        initialPageParam: null,
        getNextPageParam: () => undefined,
        enabled: false,
      }),
    );

    await new Promise((r) => setTimeout(r, 50));

    expect(queryFn).not.toHaveBeenCalled();
  });
});
