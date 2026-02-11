import { mount } from "@vue/test-utils";
import { defineComponent } from "vue";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useRafFn } from "./raf";

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

describe("useRafFn", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns pause, resume, isActive", () => {
    const fn = vi.fn();
    const { result } = withSetup(() =>
      useRafFn(fn, { immediate: false }),
    );

    expect(result.pause).toBeDefined();
    expect(result.resume).toBeDefined();
    expect(result.isActive).toBeDefined();
  });

  it("starts immediately by default", () => {
    const fn = vi.fn();
    const { result } = withSetup(() => useRafFn(fn));

    expect(result.isActive.value).toBe(true);
  });

  it("immediate: false does not start", () => {
    const fn = vi.fn();
    const { result } = withSetup(() =>
      useRafFn(fn, { immediate: false }),
    );

    expect(result.isActive.value).toBe(false);
    expect(fn).not.toHaveBeenCalled();
  });

  it("pause stops the loop", () => {
    const fn = vi.fn();
    const { result } = withSetup(() =>
      useRafFn(fn, { immediate: false }),
    );

    result.resume();
    expect(result.isActive.value).toBe(true);
    result.pause();
    expect(result.isActive.value).toBe(false);
  });

  it("resume starts the loop", () => {
    const fn = vi.fn();
    const { result } = withSetup(() =>
      useRafFn(fn, { immediate: false }),
    );

    result.resume();
    expect(result.isActive.value).toBe(true);
  });

  it("cleans up on unmount", () => {
    const fn = vi.fn();
    const { result, wrapper } = withSetup(() => useRafFn(fn));

    wrapper.unmount();
    expect(result.isActive.value).toBe(false);
  });
});
