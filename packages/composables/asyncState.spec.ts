import { mount } from "@vue/test-utils";
import { defineComponent } from "vue";
import { describe, expect, it, vi } from "vitest";
import { useAsyncState } from "./asyncState";

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

describe("useAsyncState", () => {
  it("returns initial state", () => {
    const fn = vi.fn();
    const { result } = withSetup(() => useAsyncState(fn));

    expect(result.state.value).toBeUndefined();
    expect(result.isLoading.value).toBe(false);
    expect(result.error.value).toBeNull();
  });

  it("execute() runs async fn and updates state", async () => {
    let resolveFn!: (value: number) => void;
    const fn = vi.fn().mockReturnValue(
      new Promise<number>((r) => {
        resolveFn = r;
      }),
    );
    const { result, wrapper } = withSetup(() => useAsyncState(fn));

    const promise = result.execute();
    await wrapper.vm.$nextTick();
    expect(result.isLoading.value).toBe(true);

    resolveFn(42);
    const value = await promise;
    await wrapper.vm.$nextTick();
    expect(value).toBe(42);
    expect(result.state.value).toBe(42);
    expect(result.isLoading.value).toBe(false);
    expect(result.error.value).toBeNull();
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("execute() sets error on rejection", async () => {
    const err = new Error("Failed");
    const fn = vi.fn().mockRejectedValue(err);
    const { result, wrapper } = withSetup(() => useAsyncState(fn));

    await expect(result.execute()).rejects.toThrow("Failed");
    await wrapper.vm.$nextTick();
    expect(result.error.value).toEqual(err);
    expect(result.isLoading.value).toBe(false);
  });

  it("respects initialData option", () => {
    const fn = vi.fn();
    const { result } = withSetup(() =>
      useAsyncState(fn, { initialData: "initial" }),
    );

    expect(result.state.value).toBe("initial");
  });

  it("calls onSuccess when fn resolves", async () => {
    const onSuccess = vi.fn();
    const fn = vi.fn().mockResolvedValue("data");
    const { result } = withSetup(() =>
      useAsyncState(fn, { onSuccess }),
    );

    await result.execute();
    expect(onSuccess).toHaveBeenCalledWith("data");
  });

  it("calls onError when fn rejects", async () => {
    const err = new Error("Error");
    const onError = vi.fn();
    const fn = vi.fn().mockRejectedValue(err);
    const { result } = withSetup(() => useAsyncState(fn, { onError }));

    await expect(result.execute()).rejects.toThrow("Error");
    expect(onError).toHaveBeenCalledWith(err);
  });

  it("wraps non-Error thrown values in Error", async () => {
    const fn = vi.fn().mockRejectedValue("string error");
    const { result } = withSetup(() => useAsyncState(fn));

    await expect(result.execute()).rejects.toThrow("string error");
    expect(result.error.value).toBeInstanceOf(Error);
    expect(result.error.value?.message).toBe("string error");
  });

  it("immediate: true executes on mount", async () => {
    const fn = vi.fn().mockResolvedValue(1);
    const { result, wrapper } = withSetup(() =>
      useAsyncState(fn, { immediate: true }),
    );

    await wrapper.vm.$nextTick();
    await new Promise((r) => setTimeout(r, 0));
    await wrapper.vm.$nextTick();
    expect(result.state.value).toBe(1);
    expect(result.isLoading.value).toBe(false);
    expect(fn).toHaveBeenCalledTimes(1);
  });
});
