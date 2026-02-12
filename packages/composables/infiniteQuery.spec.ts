import { mount } from "@vue/test-utils";
import { describe, expect, it, vi } from "vitest";
import { defineComponent, ref } from "vue";
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
        queryFn: queryFn as (ctx: {
          pageParam: string | null;
        }) => Promise<{ nextCursor?: string }>,
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

    const { result } = withSetup(() =>
      useInfiniteQuery({
        queryKey: ["items"],
        queryFn: queryFn as (ctx: {
          pageParam: string | null;
        }) => Promise<{ nextCursor?: string }>,
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

  it("fetchPreviousPage when getPreviousPageParam is provided", async () => {
    const page1 = {
      items: [{ id: 1 }],
      prevCursor: "cursor0",
      nextCursor: "cursor2",
    };
    const page0 = {
      items: [{ id: 0 }],
      prevCursor: undefined,
      nextCursor: "cursor1",
    };
    const queryFn = vi
      .fn()
      .mockResolvedValueOnce(page1)
      .mockResolvedValueOnce(page0);

    const { result } = withSetup(() =>
      useInfiniteQuery({
        queryKey: ["items"],
        queryFn: queryFn as (ctx: {
          pageParam: string | null;
        }) => Promise<{ nextCursor?: string; prevCursor?: string }>,
        initialPageParam: null,
        getNextPageParam: (p: { nextCursor?: string }) =>
          p.nextCursor ?? undefined,
        getPreviousPageParam: (p: { nextCursor?: string; prevCursor?: string }) =>
          p.prevCursor ?? undefined,
      }),
    );

    await new Promise((r) => setTimeout(r, 50));
    expect(result.data.value).toEqual([page1]);
    expect(result.hasPreviousPage.value).toBe(true);

    await result.fetchPreviousPage();
    await new Promise((r) => setTimeout(r, 50));

    expect(result.data.value).toEqual([page0, page1]);
    expect(result.hasPreviousPage.value).toBe(false);
  });

  it("refetch resets pages", async () => {
    const page1 = { items: [1], nextCursor: "c2" };
    const queryFn = vi.fn().mockResolvedValue(page1);

    const { result } = withSetup(() =>
      useInfiniteQuery({
        queryKey: ["items"],
        queryFn: queryFn as (ctx: {
          pageParam: string | null;
        }) => Promise<unknown>,
        initialPageParam: null,
        getNextPageParam: () => undefined,
      }),
    );

    await new Promise((r) => setTimeout(r, 50));
    expect(result.data.value).toEqual([page1]);

    await result.refetch();
    await new Promise((r) => setTimeout(r, 50));

    expect(queryFn).toHaveBeenCalledTimes(2);
    expect(result.data.value).toEqual([page1]);
  });

  it("handles fetch error", async () => {
    const err = new Error("fetch failed");
    const queryFn = vi.fn().mockRejectedValue(err);

    const { result } = withSetup(() =>
      useInfiniteQuery({
        queryKey: ["items"],
        queryFn: queryFn as () => Promise<unknown>,
        initialPageParam: null,
        getNextPageParam: () => undefined,
        retry: false,
      }),
    );

    await new Promise((r) => setTimeout(r, 100));

    expect(result.error.value).toEqual(err);
    expect(result.data.value).toBeNull();
    expect(result.isError.value).toBe(true);
  });

  it("fetchNextPage returns early when no next page", async () => {
    const page1 = { items: [1], nextCursor: undefined };
    const queryFn = vi.fn().mockResolvedValue(page1);

    const { result } = withSetup(() =>
      useInfiniteQuery({
        queryKey: ["items"],
        queryFn: queryFn as (ctx: {
          pageParam: string | null;
        }) => Promise<unknown>,
        initialPageParam: null,
        getNextPageParam: () => undefined,
      }),
    );

    await new Promise((r) => setTimeout(r, 50));
    expect(result.hasNextPage.value).toBe(false);

    await result.fetchNextPage();
    expect(queryFn).toHaveBeenCalledTimes(1);
  });

  it("fetchNextPage returns early when enabled is false", async () => {
    const page1 = { items: [1], nextCursor: "c2" };
    const queryFn = vi
      .fn()
      .mockResolvedValueOnce(page1)
      .mockResolvedValue({ items: [2] });

    const enabledRef = ref(false);
    const { result } = withSetup(() =>
      useInfiniteQuery({
        queryKey: ["items"],
        queryFn: queryFn as (ctx: {
          pageParam: string | null;
        }) => Promise<{ nextCursor?: string }>,
        initialPageParam: null,
        getNextPageParam: (p: { nextCursor?: string }) =>
          p.nextCursor ?? undefined,
        enabled: enabledRef,
      }),
    );

    enabledRef.value = true;
    await new Promise((r) => setTimeout(r, 50));
    expect(result.hasNextPage.value).toBe(true);

    enabledRef.value = false;
    await result.fetchNextPage();
    expect(queryFn).toHaveBeenCalledTimes(1);
  });

  it("fetchPreviousPage returns early when getPreviousPageParam not provided", async () => {
    const page1 = { items: [1], nextCursor: undefined };
    const queryFn = vi.fn().mockResolvedValue(page1);

    const { result } = withSetup(() =>
      useInfiniteQuery({
        queryKey: ["items"],
        queryFn: queryFn as (ctx: {
          pageParam: string | null;
        }) => Promise<unknown>,
        initialPageParam: null,
        getNextPageParam: () => undefined,
      }),
    );

    await new Promise((r) => setTimeout(r, 50));
    expect(result.hasPreviousPage.value).toBe(false);
    await result.fetchPreviousPage();
    expect(queryFn).toHaveBeenCalledTimes(1);
  });

  it("retry true uses 3 retries before failing", async () => {
    const err = new Error("fail");
    const queryFn = vi.fn().mockRejectedValue(err);

    const { result } = withSetup(() =>
      useInfiniteQuery({
        queryKey: ["retry-true"],
        queryFn: queryFn as () => Promise<unknown>,
        initialPageParam: null,
        getNextPageParam: () => undefined,
        retry: true,
        retryDelay: 5,
      }),
    );

    await new Promise((r) => setTimeout(r, 200));
    expect(result.error.value).toEqual(err);
    expect(queryFn.mock.calls.length).toBeGreaterThan(1);
  });

  it("uses retryDelay as number when provided", async () => {
    const err = new Error("failed");
    const queryFn = vi.fn().mockRejectedValue(err);

    const { result } = withSetup(() =>
      useInfiniteQuery({
        queryKey: ["retry"],
        queryFn: queryFn as () => Promise<unknown>,
        initialPageParam: null,
        getNextPageParam: () => undefined,
        retry: 1,
        retryDelay: 10,
      }),
    );

    await new Promise((r) => setTimeout(r, 150));
    expect(result.error.value).toEqual(err);
  });

  it("refetchOnWindowFocus refetches when enabled and has pages", async () => {
    const page1 = { items: [1], nextCursor: undefined };
    const queryFn = vi.fn().mockResolvedValue(page1);

    withSetup(() =>
      useInfiniteQuery({
        queryKey: ["focus-refetch"],
        queryFn: queryFn as (ctx: {
          pageParam: string | null;
        }) => Promise<unknown>,
        initialPageParam: null,
        getNextPageParam: () => undefined,
        refetchOnWindowFocus: true,
        refetchOnReconnect: false,
      }),
    );

    await new Promise((r) => setTimeout(r, 50));
    const callsBefore = queryFn.mock.calls.length;

    window.dispatchEvent(new Event("focus"));
    await new Promise((r) => setTimeout(r, 100));
    expect(queryFn.mock.calls.length).toBeGreaterThan(callsBefore);
  });

  it("refetchOnReconnect refetches when enabled", async () => {
    const page1 = { items: [1], nextCursor: undefined };
    const queryFn = vi.fn().mockResolvedValue(page1);

    withSetup(() =>
      useInfiniteQuery({
        queryKey: ["reconnect-refetch"],
        queryFn: queryFn as (ctx: {
          pageParam: string | null;
        }) => Promise<unknown>,
        initialPageParam: null,
        getNextPageParam: () => undefined,
        refetchOnWindowFocus: false,
        refetchOnReconnect: true,
      }),
    );

    await new Promise((r) => setTimeout(r, 50));
    const callsBefore = queryFn.mock.calls.length;

    window.dispatchEvent(new Event("online"));
    await new Promise((r) => setTimeout(r, 100));
    expect(queryFn.mock.calls.length).toBeGreaterThan(callsBefore);
  });

  it("clears data when enabled becomes false", async () => {
    const queryFn = vi.fn().mockResolvedValue({ items: [1] });
    const enabledRef = ref(true);

    const { result } = withSetup(() =>
      useInfiniteQuery({
        queryKey: ["items"],
        queryFn: queryFn as () => Promise<unknown>,
        initialPageParam: null,
        getNextPageParam: () => undefined,
        enabled: enabledRef,
      }),
    );

    await new Promise((r) => setTimeout(r, 50));
    expect(result.data.value).toEqual([{ items: [1] }]);

    enabledRef.value = false;
    await new Promise((r) => setTimeout(r, 50));
    expect(result.data.value).toBeNull();
  });
});
