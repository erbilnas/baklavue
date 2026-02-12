import { mount } from "@vue/test-utils";
import { defineComponent, ref } from "vue";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useThrottleFn, useThrottledRef } from "./throttle";

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

describe("useThrottleFn", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("invokes immediately on first call (leading)", () => {
    const fn = vi.fn();
    const { result } = withSetup(() => useThrottleFn(fn, 200));

    result("arg");
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith("arg");
  });

  it("throttles calls within interval", () => {
    const fn = vi.fn();
    const { result } = withSetup(() => useThrottleFn(fn, 200));

    result("a");
    result("b");
    result("c");
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith("a");

    vi.advanceTimersByTime(200);
    expect(fn).toHaveBeenCalledTimes(2);
    expect(fn).toHaveBeenCalledWith("c");
  });

  it("invokes again after delay has passed", () => {
    const fn = vi.fn();
    const { result } = withSetup(() => useThrottleFn(fn, 200));

    result("a");
    vi.advanceTimersByTime(200);
    result("b");
    expect(fn).toHaveBeenCalledTimes(2);
    expect(fn).toHaveBeenCalledWith("b");
  });

  it("leading: false skips immediate invocation on first call", () => {
    const fn = vi.fn();
    const { result } = withSetup(() =>
      useThrottleFn(fn, 200, { leading: false, trailing: true }),
    );

    result("a");
    expect(fn).not.toHaveBeenCalled();
  });

  it("trailing: false with leading only invokes on leading edge", () => {
    const fn = vi.fn();
    const { result } = withSetup(() =>
      useThrottleFn(fn, 200, { leading: true, trailing: false }),
    );

    result("a");
    result("b");
    result("c");
    expect(fn).toHaveBeenCalledTimes(1);
    vi.advanceTimersByTime(200);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("cleans up on unmount", () => {
    const fn = vi.fn();
    const { result, wrapper } = withSetup(() => useThrottleFn(fn, 200));

    result("a");
    result("b");
    wrapper.unmount();
    vi.advanceTimersByTime(200);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("clears trailing timeout when call arrives after cooldown", () => {
    const fn = vi.fn();
    const { result } = withSetup(() => useThrottleFn(fn, 200));

    result("a");
    vi.advanceTimersByTime(50);
    result("b");
    result("c");
    vi.advanceTimersByTime(150);
    expect(fn).toHaveBeenCalledTimes(2);
    expect(fn).toHaveBeenNthCalledWith(1, "a");
    expect(fn).toHaveBeenNthCalledWith(2, "c");
  });


  it("clears trailing timeout when new call arrives after cooldown", () => {
    const fn = vi.fn();
    const { result } = withSetup(() => useThrottleFn(fn, 200));

    result("a");
    vi.advanceTimersByTime(50);
    result("b");
    vi.advanceTimersByTime(50);
    result("c");
    vi.advanceTimersByTime(200);
    expect(fn).toHaveBeenCalledTimes(2);
    expect(fn).toHaveBeenNthCalledWith(1, "a");
    expect(fn).toHaveBeenNthCalledWith(2, "c");
  });

});

describe("useThrottledRef", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns initial value immediately", () => {
    const source = ref("initial");
    const { result } = withSetup(() => useThrottledRef(source, 200));
    expect(result.value).toBe("initial");
  });

  it("throttles updates when source changes rapidly", async () => {
    const source = ref("a");
    const { result, wrapper } = withSetup(() => useThrottledRef(source, 200));

    expect(result.value).toBe("a");
    source.value = "b";
    await wrapper.vm.$nextTick();
    source.value = "c";
    await wrapper.vm.$nextTick();
    expect(result.value).toBe("b");

    vi.advanceTimersByTime(200);
    await wrapper.vm.$nextTick();
    expect(result.value).toBe("c");
  });

  it("throttles rapid updates", async () => {
    const source = ref("a");
    const { result, wrapper } = withSetup(() => useThrottledRef(source, 200));

    source.value = "b";
    await wrapper.vm.$nextTick();
    source.value = "c";
    await wrapper.vm.$nextTick();
    source.value = "d";
    await wrapper.vm.$nextTick();

    vi.advanceTimersByTime(200);
    await wrapper.vm.$nextTick();
    expect(result.value).toBe("d");
  });

  it("cleans up on unmount", () => {
    const source = ref("initial");
    const { result, wrapper } = withSetup(() => useThrottledRef(source, 200));

    source.value = "updated";
    wrapper.unmount();
    vi.advanceTimersByTime(200);
    expect(result.value).toBe("initial");
  });

  it("schedules trailing update when change happens in cooldown", async () => {
    const source = ref("a");
    const { result, wrapper } = withSetup(() => useThrottledRef(source, 200));

    source.value = "b";
    await wrapper.vm.$nextTick();
    expect(result.value).toBe("b");

    source.value = "c";
    await wrapper.vm.$nextTick();
    expect(result.value).toBe("b");

    vi.advanceTimersByTime(200);
    await wrapper.vm.$nextTick();
    expect(result.value).toBe("c");
  });

  it("clears pending timeout when new change arrives after delay", async () => {
    const source = ref("a");
    const { result, wrapper } = withSetup(() => useThrottledRef(source, 200));

    source.value = "b";
    await wrapper.vm.$nextTick();
    expect(result.value).toBe("b");

    source.value = "c";
    await wrapper.vm.$nextTick();
    vi.advanceTimersByTime(100);
    source.value = "d";
    await wrapper.vm.$nextTick();
    vi.advanceTimersByTime(200);
    await wrapper.vm.$nextTick();
    expect(result.value).toBe("d");
  });
});
