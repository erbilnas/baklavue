import { mount } from "@vue/test-utils";
import { defineComponent } from "vue";
import { describe, expect, it, vi } from "vitest";
import { useLazyQuery } from "./lazyQuery";

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

describe("useLazyQuery", () => {
  it("does not fetch on mount", async () => {
    const queryFn = vi.fn().mockResolvedValue({ id: 1 });

    const { result } = withSetup(() =>
      useLazyQuery({
        queryKey: ["user", 1],
        queryFn: queryFn as () => Promise<unknown>,
      }),
    );

    await new Promise((r) => setTimeout(r, 50));

    expect(queryFn).not.toHaveBeenCalled();
    expect(result.data.value).toBeNull();
  });

  it("execute triggers fetch", async () => {
    const mockData = { id: 1, name: "test" };
    const queryFn = vi.fn().mockResolvedValue(mockData);

    const { result, wrapper } = withSetup(() =>
      useLazyQuery({
        queryKey: ["user", 1],
        queryFn: queryFn as () => Promise<unknown>,
      }),
    );

    expect(result.execute).toBeDefined();
    result.execute();
    await wrapper.vm.$nextTick();

    await new Promise((r) => setTimeout(r, 50));

    expect(queryFn).toHaveBeenCalled();
    expect(result.data.value).toEqual(mockData);
  });

  it("returns useQuery interface with execute", () => {
    const queryFn = vi.fn().mockResolvedValue({});

    const { result } = withSetup(() =>
      useLazyQuery({
        queryKey: ["test"],
        queryFn: queryFn as () => Promise<unknown>,
      }),
    );

    expect(result.data).toBeDefined();
    expect(result.error).toBeDefined();
    expect(result.isFetching).toBeDefined();
    expect(result.isLoading).toBeDefined();
    expect(result.isSuccess).toBeDefined();
    expect(result.isError).toBeDefined();
    expect(result.refetch).toBeDefined();
    expect(result.execute).toBeDefined();
  });
});
