import { mount } from "@vue/test-utils";
import { describe, expect, it, vi } from "vitest";
import { defineComponent, ref } from "vue";
import { useQuery, useQueryClient } from "./query";

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

describe("useQuery", () => {
  it("fetches data on mount", async () => {
    const mockData = { id: 1, name: "test" };
    const queryFn = vi.fn().mockResolvedValue(mockData);

    const { result } = withSetup(() =>
      useQuery({
        queryKey: ["user", 1],
        queryFn: queryFn as () => Promise<unknown>,
      }),
    );

    await new Promise((r) => setTimeout(r, 50));

    expect(queryFn).toHaveBeenCalled();
    expect(result.data.value).toEqual(mockData);
    expect(result.error.value).toBeNull();
    expect(result.isSuccess.value).toBe(true);
  });

  it("handles fetch error", async () => {
    const err = new Error("fetch failed");
    const queryFn = vi.fn().mockRejectedValue(err);

    const { result } = withSetup(() =>
      useQuery({
        queryKey: ["user", 1],
        queryFn: queryFn as () => Promise<unknown>,
        retry: false,
      }),
    );

    await new Promise((r) => setTimeout(r, 100));

    expect(result.data.value).toBeNull();
    expect(result.error.value).toEqual(err);
    expect(result.isError.value).toBe(true);
  });

  it("uses initialData when provided", () => {
    const initialData = { id: 0, name: "initial" };
    const queryFn = vi.fn().mockResolvedValue({ id: 1 });

    const { result } = withSetup(() =>
      useQuery({
        queryKey: ["user"],
        queryFn: queryFn as () => Promise<unknown>,
        initialData,
      }),
    );

    expect(result.data.value).toEqual(initialData);
  });

  it("refetch triggers new fetch", async () => {
    let callCount = 0;
    const queryFn = vi.fn().mockImplementation(() => {
      callCount++;
      return Promise.resolve({ id: callCount });
    });

    const { result } = withSetup(() =>
      useQuery({
        queryKey: ["refetch-test", Math.random()],
        queryFn: queryFn as () => Promise<unknown>,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
      }),
    );

    await new Promise((r) => setTimeout(r, 50));
    expect(result.data.value).toEqual({ id: 1 });

    await result.refetch();

    expect(queryFn).toHaveBeenCalledTimes(2);
    expect(result.data.value).toEqual({ id: 2 });
  });
});

describe("useQueryClient", () => {
  it("returns query client with invalidateQueries, getQueryData, setQueryData", () => {
    const client = useQueryClient();

    expect(typeof client.invalidateQueries).toBe("function");
    expect(typeof client.getQueryData).toBe("function");
    expect(typeof client.setQueryData).toBe("function");
    expect(typeof client.prefetchQuery).toBe("function");
  });

  it("setQueryData and getQueryData work", async () => {
    const client = useQueryClient();
    const key = ["test", "data"] as const;

    client.setQueryData(key, { value: 42 });
    const data = client.getQueryData(key);

    expect(data).toEqual({ value: 42 });
  });

  it("invalidateQueries clears cache for matching key", async () => {
    const queryFn = vi.fn().mockResolvedValue({ id: 1 });

    const { result } = withSetup(() =>
      useQuery({
        queryKey: ["users", "list"],
        queryFn: queryFn as () => Promise<unknown>,
      }),
    );

    await new Promise((r) => setTimeout(r, 50));
    expect(result.data.value).toEqual({ id: 1 });

    const client = useQueryClient();
    client.invalidateQueries({ queryKey: ["users"] });

    const dataBeforeRefetch = client.getQueryData(["users", "list"]);
    expect(dataBeforeRefetch).toBeUndefined();

    await result.refetch();
    expect(result.data.value).toEqual({ id: 1 });
  });

  it("prefetchQuery populates cache", async () => {
    const client = useQueryClient();
    const queryFn = vi.fn().mockResolvedValue({ prefetched: true });

    await client.prefetchQuery({
      queryKey: ["prefetch", "test"],
      queryFn: queryFn as () => Promise<unknown>,
    });

    const data = client.getQueryData(["prefetch", "test"]);
    expect(data).toEqual({ prefetched: true });
  });

  it("prefetchQuery stores error on failure", async () => {
    const client = useQueryClient();
    const err = new Error("prefetch failed");
    const queryFn = vi.fn().mockRejectedValue(err);

    await client.prefetchQuery({
      queryKey: ["prefetch", "error"],
      queryFn: queryFn as () => Promise<unknown>,
    });

    const { result } = withSetup(() =>
      useQuery({
        queryKey: ["prefetch", "error"],
        queryFn: vi.fn().mockResolvedValue({}),
        staleTime: 60_000,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
      }),
    );

    await new Promise((r) => setTimeout(r, 50));
    expect(result.error.value).toEqual(err);
  });

  it("invalidateQueries clears all when no queryKey", async () => {
    const client = useQueryClient();
    client.setQueryData(["a"], 1);
    client.setQueryData(["b"], 2);

    client.invalidateQueries();

    expect(client.getQueryData(["a"])).toBeUndefined();
    expect(client.getQueryData(["b"])).toBeUndefined();
  });
});

describe("useQuery advanced", () => {
  it("uses initialData as function", () => {
    const initialDataFn = vi.fn().mockReturnValue({ id: 0 });
    const queryFn = vi.fn().mockResolvedValue({ id: 1 });

    const { result } = withSetup(() =>
      useQuery({
        queryKey: ["user"],
        queryFn: queryFn as () => Promise<unknown>,
        initialData: initialDataFn,
      }),
    );

    expect(result.data.value).toEqual({ id: 0 });
    expect(initialDataFn).toHaveBeenCalled();
  });

  it("does not fetch when enabled is false", async () => {
    const queryFn = vi.fn().mockResolvedValue({});

    withSetup(() =>
      useQuery({
        queryKey: ["disabled"],
        queryFn: queryFn as () => Promise<unknown>,
        enabled: false,
      }),
    );

    await new Promise((r) => setTimeout(r, 50));
    expect(queryFn).not.toHaveBeenCalled();
  });

  it("uses cached data when not stale", async () => {
    const client = useQueryClient();
    client.setQueryData(["cached"], { value: 42 });

    const queryFn = vi.fn().mockResolvedValue({ value: 99 });

    const { result } = withSetup(() =>
      useQuery({
        queryKey: ["cached"],
        queryFn: queryFn as () => Promise<unknown>,
        staleTime: 60_000,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
      }),
    );

    await new Promise((r) => setTimeout(r, 50));
    expect(result.data.value).toEqual({ value: 42 });
    expect(queryFn).not.toHaveBeenCalled();
  });

  it("does not refetch on focus when staleTime is set and cache is fresh", async () => {
    const client = useQueryClient();
    client.setQueryData(["fresh-focus"], { value: 1 });

    const queryFn = vi.fn().mockResolvedValue({ value: 2 });

    withSetup(() =>
      useQuery({
        queryKey: ["fresh-focus"],
        queryFn: queryFn as () => Promise<unknown>,
        staleTime: 60_000,
        refetchOnWindowFocus: true,
        refetchOnReconnect: false,
      }),
    );

    await new Promise((r) => setTimeout(r, 50));
    const callCountAfterMount = queryFn.mock.calls.length;

    window.dispatchEvent(new Event("focus"));
    await new Promise((r) => setTimeout(r, 50));
    expect(queryFn.mock.calls.length).toBe(callCountAfterMount);
  });

  it("refetches on reconnect when enabled", async () => {
    const queryFn = vi.fn().mockResolvedValue({ id: 1 });

    withSetup(() =>
      useQuery({
        queryKey: ["reconnect-test"],
        queryFn: queryFn as () => Promise<unknown>,
        refetchOnWindowFocus: false,
        refetchOnReconnect: true,
      }),
    );

    await new Promise((r) => setTimeout(r, 50));
    const callCountBefore = queryFn.mock.calls.length;

    window.dispatchEvent(new Event("online"));
    await new Promise((r) => setTimeout(r, 100));
    expect(queryFn.mock.calls.length).toBeGreaterThan(callCountBefore);
  });

  it("uses retryDelay as number when provided", async () => {
    const err = new Error("fail");
    const queryFn = vi.fn().mockRejectedValue(err);

    const { result } = withSetup(() =>
      useQuery({
        queryKey: ["retry-num"],
        queryFn: queryFn as () => Promise<unknown>,
        retry: 1,
        retryDelay: 5,
      }),
    );

    await new Promise((r) => setTimeout(r, 100));
    expect(result.error.value).toEqual(err);
  });

  it("refetchInterval polls when set", async () => {
    const queryFn = vi.fn().mockResolvedValue({ id: 1 });

    withSetup(() =>
      useQuery({
        queryKey: ["poll-test"],
        queryFn: queryFn as () => Promise<unknown>,
        refetchInterval: 100,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
      }),
    );

    await new Promise((r) => setTimeout(r, 50));
    expect(queryFn).toHaveBeenCalledTimes(1);

    await new Promise((r) => setTimeout(r, 150));
    expect(queryFn.mock.calls.length).toBeGreaterThanOrEqual(2);
  });

  it("restores initialData when enabled becomes false", async () => {
    const initialData = { id: 0 };
    const queryFn = vi.fn().mockResolvedValue({ id: 1 });
    const enabledRef = ref(true);

    const { result } = withSetup(() =>
      useQuery({
        queryKey: ["enabled-toggle"],
        queryFn: queryFn as () => Promise<unknown>,
        initialData,
        enabled: enabledRef,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
      }),
    );

    await new Promise((r) => setTimeout(r, 50));
    expect(result.data.value).toEqual({ id: 1 });

    enabledRef.value = false;
    await new Promise((r) => setTimeout(r, 50));
    expect(result.data.value).toEqual(initialData);
  });
});
