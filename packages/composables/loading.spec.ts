import { mount } from "@vue/test-utils";
import { defineComponent } from "vue";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useLoading } from "./loading";

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

describe("useLoading", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("showLoading sets isLoading to true when no delay", async () => {
    const { result, wrapper } = withSetup(() => useLoading());
    expect(result.isLoading.value).toBe(false);
    result.showLoading();
    await wrapper.vm.$nextTick();
    expect(result.isLoading.value).toBe(true);
  });

  it("hideLoading sets isLoading to false", async () => {
    const { result, wrapper } = withSetup(() => useLoading());
    result.showLoading();
    await wrapper.vm.$nextTick();
    result.hideLoading();
    await wrapper.vm.$nextTick();
    expect(result.isLoading.value).toBe(false);
  });

  it("withLoading wraps async fn and shows/hides loading", async () => {
    const { result, wrapper } = withSetup(() => useLoading());
    let resolveFn!: (value: number) => void;
    const fn = vi.fn().mockReturnValue(
      new Promise<number>((r) => {
        resolveFn = r;
      }),
    );

    const promise = result.withLoading(fn);
    await wrapper.vm.$nextTick();
    expect(result.isLoading.value).toBe(true);

    resolveFn(42);
    const value = await promise;
    await wrapper.vm.$nextTick();
    expect(value).toBe(42);
    expect(result.isLoading.value).toBe(false);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("withLoading hides loading even when fn rejects", async () => {
    const { result, wrapper } = withSetup(() => useLoading());
    const fn = vi.fn().mockRejectedValue(new Error("fail"));

    await expect(result.withLoading(fn)).rejects.toThrow("fail");
    await wrapper.vm.$nextTick();
    expect(result.isLoading.value).toBe(false);
  });

  describe("with delay", () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    it("delays showing loading state", async () => {
      const { result, wrapper } = withSetup(() =>
        useLoading({ delay: 200 }),
      );

      result.showLoading();
      await wrapper.vm.$nextTick();
      expect(result.isLoading.value).toBe(false);

      vi.advanceTimersByTime(199);
      await wrapper.vm.$nextTick();
      expect(result.isLoading.value).toBe(false);

      vi.advanceTimersByTime(1);
      await wrapper.vm.$nextTick();
      expect(result.isLoading.value).toBe(true);
    });

    it("hideLoading cancels pending delay", async () => {
      const { result, wrapper } = withSetup(() =>
        useLoading({ delay: 200 }),
      );

      result.showLoading();
      vi.advanceTimersByTime(100);
      result.hideLoading();
      vi.advanceTimersByTime(200);
      await wrapper.vm.$nextTick();
      expect(result.isLoading.value).toBe(false);
    });

    it("cleans up delay timer on unmount", () => {
      const { result, wrapper } = withSetup(() =>
        useLoading({ delay: 200 }),
      );

      result.showLoading();
      wrapper.unmount();
      vi.advanceTimersByTime(200);
      expect(result.isLoading.value).toBe(false);
    });

    it("showLoading is no-op when called again before delay completes", async () => {
      const { result, wrapper } = withSetup(() =>
        useLoading({ delay: 200 }),
      );

      result.showLoading();
      result.showLoading();
      result.showLoading();
      vi.advanceTimersByTime(199);
      await wrapper.vm.$nextTick();
      expect(result.isLoading.value).toBe(false);
    });

    it("hideLoading clears delayTimer when called before delay", async () => {
      const { result, wrapper } = withSetup(() =>
        useLoading({ delay: 200 }),
      );

      result.showLoading();
      vi.advanceTimersByTime(50);
      result.hideLoading();
      vi.advanceTimersByTime(200);
      await wrapper.vm.$nextTick();
      expect(result.isLoading.value).toBe(false);
    });
  });
});
