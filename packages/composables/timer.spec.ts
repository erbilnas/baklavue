import { mount } from "@vue/test-utils";
import { defineComponent } from "vue";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useIntervalFn, useTimeoutFn } from "./timer";

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

describe("useIntervalFn", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("starts immediately by default and runs callback", () => {
    const fn = vi.fn();
    const { result } = withSetup(() => useIntervalFn(fn, 1000));

    expect(result.isActive.value).toBe(true);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("runs callback at interval", () => {
    const fn = vi.fn();
    const { result } = withSetup(() => useIntervalFn(fn, 1000));

    vi.advanceTimersByTime(1000);
    expect(fn).toHaveBeenCalledTimes(2);
    vi.advanceTimersByTime(1000);
    expect(fn).toHaveBeenCalledTimes(3);
  });

  it("pause stops the interval", () => {
    const fn = vi.fn();
    const { result } = withSetup(() => useIntervalFn(fn, 1000));

    result.pause();
    expect(result.isActive.value).toBe(false);
    vi.advanceTimersByTime(2000);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("resume restarts the interval", () => {
    const fn = vi.fn();
    const { result } = withSetup(() => useIntervalFn(fn, 1000));

    result.pause();
    expect(fn).toHaveBeenCalledTimes(1);
    result.resume();
    expect(result.isActive.value).toBe(true);
    vi.advanceTimersByTime(1000);
    expect(fn).toHaveBeenCalledTimes(3);
  });

  it("immediate: false does not run on start", () => {
    const fn = vi.fn();
    const { result } = withSetup(() =>
      useIntervalFn(fn, 1000, { immediate: false }),
    );

    expect(result.isActive.value).toBe(false);
    expect(fn).not.toHaveBeenCalled();

    result.resume();
    expect(result.isActive.value).toBe(true);
    expect(fn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1000);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("cleans up on unmount", () => {
    const fn = vi.fn();
    const { result, wrapper } = withSetup(() => useIntervalFn(fn, 1000));

    wrapper.unmount();
    vi.advanceTimersByTime(2000);
    expect(fn).toHaveBeenCalledTimes(1);
  });
});

describe("useTimeoutFn", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("run executes callback after delay", () => {
    const fn = vi.fn();
    const { result } = withSetup(() => useTimeoutFn(fn, 1000));

    expect(result.isPending.value).toBe(false);
    result.run();
    expect(result.isPending.value).toBe(true);

    vi.advanceTimersByTime(999);
    expect(fn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1);
    expect(fn).toHaveBeenCalledTimes(1);
    expect(result.isPending.value).toBe(false);
  });

  it("cancel aborts pending timeout", () => {
    const fn = vi.fn();
    const { result } = withSetup(() => useTimeoutFn(fn, 1000));

    result.run();
    result.cancel();
    vi.advanceTimersByTime(1000);
    expect(fn).not.toHaveBeenCalled();
    expect(result.isPending.value).toBe(false);
  });

  it("run cancels previous timeout", () => {
    const fn = vi.fn();
    const { result } = withSetup(() => useTimeoutFn(fn, 1000));

    result.run();
    vi.advanceTimersByTime(500);
    result.run();
    vi.advanceTimersByTime(500);
    expect(fn).not.toHaveBeenCalled();
    vi.advanceTimersByTime(500);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("cleans up on unmount", () => {
    const fn = vi.fn();
    const { result, wrapper } = withSetup(() => useTimeoutFn(fn, 1000));

    result.run();
    wrapper.unmount();
    vi.advanceTimersByTime(1000);
    expect(fn).not.toHaveBeenCalled();
  });
});
