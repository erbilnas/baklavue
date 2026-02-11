import { mount } from "@vue/test-utils";
import { defineComponent } from "vue";
import { describe, expect, it, vi } from "vitest";
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
});
