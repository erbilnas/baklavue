import { mount } from "@vue/test-utils";
import { defineComponent } from "vue";
import { describe, expect, it, vi } from "vitest";
import { useMutation } from "./mutation";

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

describe("useMutation", () => {
  it("returns initial state", () => {
    const mutationFn = vi.fn();
    const { result } = withSetup(() =>
      useMutation({ mutationFn: mutationFn as () => Promise<unknown> }),
    );

    expect(result.data.value).toBeNull();
    expect(result.error.value).toBeNull();
    expect(result.isPending.value).toBe(false);
    expect(result.isSuccess.value).toBe(false);
    expect(result.isError.value).toBe(false);
  });

  it("mutateAsync executes mutation and updates state on success", async () => {
    const mockData = { id: 1, name: "test" };
    const mutationFn = vi.fn().mockResolvedValue(mockData);

    const { result, wrapper } = withSetup(() =>
      useMutation({ mutationFn: mutationFn as (v: unknown) => Promise<unknown> }),
    );

    const promise = result.mutateAsync({ name: "test" });
    await wrapper.vm.$nextTick();

    expect(result.isPending.value).toBe(true);

    const data = await promise;
    expect(data).toEqual(mockData);
    expect(result.data.value).toEqual(mockData);
    expect(result.error.value).toBeNull();
    expect(result.isPending.value).toBe(false);
    expect(result.isSuccess.value).toBe(true);
    expect(result.isError.value).toBe(false);
  });

  it("mutateAsync handles error and updates state", async () => {
    const err = new Error("mutation failed");
    const mutationFn = vi.fn().mockRejectedValue(err);

    const { result, wrapper } = withSetup(() =>
      useMutation({ mutationFn: mutationFn as () => Promise<unknown> }),
    );

    await expect(result.mutateAsync({})).rejects.toThrow("mutation failed");
    await wrapper.vm.$nextTick();

    expect(result.data.value).toBeNull();
    expect(result.error.value).toEqual(err);
    expect(result.isPending.value).toBe(false);
    expect(result.isSuccess.value).toBe(false);
    expect(result.isError.value).toBe(true);
  });

  it("mutate is fire-and-forget", async () => {
    const mockData = { id: 1 };
    const mutationFn = vi.fn().mockResolvedValue(mockData);

    const { result, wrapper } = withSetup(() =>
      useMutation({ mutationFn: mutationFn as (v: unknown) => Promise<unknown> }),
    );

    result.mutate({});
    await wrapper.vm.$nextTick();

    expect(result.isPending.value).toBe(true);

    await new Promise((r) => setTimeout(r, 10));

    expect(result.data.value).toEqual(mockData);
    expect(result.isSuccess.value).toBe(true);
  });

  it("reset clears state", async () => {
    const mockData = { id: 1 };
    const mutationFn = vi.fn().mockResolvedValue(mockData);

    const { result, wrapper } = withSetup(() =>
      useMutation({ mutationFn: mutationFn as (v: unknown) => Promise<unknown> }),
    );

    await result.mutateAsync({});
    await wrapper.vm.$nextTick();

    expect(result.data.value).toEqual(mockData);
    expect(result.isSuccess.value).toBe(true);

    result.reset();
    await wrapper.vm.$nextTick();

    expect(result.data.value).toBeNull();
    expect(result.error.value).toBeNull();
    expect(result.isPending.value).toBe(false);
    expect(result.isSuccess.value).toBe(false);
    expect(result.isError.value).toBe(false);
  });

  it("calls onSuccess callback on success", async () => {
    const mockData = { id: 1 };
    const mutationFn = vi.fn().mockResolvedValue(mockData);
    const onSuccess = vi.fn();

    const { result, wrapper } = withSetup(() =>
      useMutation({
        mutationFn: mutationFn as (v: unknown) => Promise<unknown>,
        onSuccess,
      }),
    );

    await result.mutateAsync({ name: "test" });
    await wrapper.vm.$nextTick();

    expect(onSuccess).toHaveBeenCalledWith(mockData, { name: "test" });
  });

  it("calls onError callback on error", async () => {
    const err = new Error("failed");
    const mutationFn = vi.fn().mockRejectedValue(err);
    const onError = vi.fn();

    const { result, wrapper } = withSetup(() =>
      useMutation({
        mutationFn: mutationFn as () => Promise<unknown>,
        onError,
      }),
    );

    await expect(result.mutateAsync({})).rejects.toThrow("failed");
    await wrapper.vm.$nextTick();

    expect(onError).toHaveBeenCalledWith(err, {});
  });
});
