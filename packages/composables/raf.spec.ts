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

  it("respects fpsLimit with setTimeout when delta is small", () => {
    const fn = vi.fn();
    const { result } = withSetup(() =>
      useRafFn(fn, { immediate: false, fpsLimit: 60 }),
    );

    vi.stubGlobal("requestAnimationFrame", (cb: (t: number) => void) => {
      setTimeout(() => cb(0), 0);
      return 1;
    });
    vi.stubGlobal("cancelAnimationFrame", () => {});

    result.resume();
    vi.advanceTimersByTime(0);
    expect(fn).toHaveBeenCalled();

    vi.advanceTimersByTime(20);
    result.pause();

    vi.unstubAllGlobals();
  });

  it("uses setTimeout when elapsed < minInterval for fpsLimit", () => {
    const fn = vi.fn();
    const callbackRef = { current: null as ((t: number) => void) | null };
    vi.stubGlobal("requestAnimationFrame", (cb: (t: number) => void) => {
      callbackRef.current = cb;
      return 1;
    });
    vi.stubGlobal("cancelAnimationFrame", () => {});

    const { result } = withSetup(() =>
      useRafFn(fn, { immediate: false, fpsLimit: 10 }),
    );

    result.resume();
    callbackRef.current?.(0);
    callbackRef.current?.(5);

    vi.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalled();

    vi.unstubAllGlobals();
  });

  it("resume is no-op when already active", () => {
    const fn = vi.fn();
    const { result } = withSetup(() => useRafFn(fn, { immediate: false }));

    let rafCalls = 0;
    vi.stubGlobal("requestAnimationFrame", (cb: (t: number) => void) => {
      rafCalls++;
      if (rafCalls <= 2) cb(rafCalls * 16);
      return rafCalls;
    });
    vi.stubGlobal("cancelAnimationFrame", () => {});

    result.resume();
    result.resume();
    result.resume();

    expect(result.isActive.value).toBe(true);
    vi.unstubAllGlobals();
  });
});
