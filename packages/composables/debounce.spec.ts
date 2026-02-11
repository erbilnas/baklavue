import { mount } from "@vue/test-utils";
import { defineComponent, ref } from "vue";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useDebounceFn, useDebouncedRef } from "./debounce";

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

describe("useDebounceFn", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("delays function execution until after delay", () => {
    const fn = vi.fn();
    const { result } = withSetup(() => useDebounceFn(fn, 200));

    result("arg1");
    expect(fn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(199);
    expect(fn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1);
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith("arg1");
  });

  it("cancels previous call when invoked again before delay", () => {
    const fn = vi.fn();
    const { result } = withSetup(() => useDebounceFn(fn, 200));

    result("first");
    vi.advanceTimersByTime(100);
    result("second");
    vi.advanceTimersByTime(100);
    expect(fn).not.toHaveBeenCalled();
    vi.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith("second");
  });

  it("cleans up timeout on unmount", () => {
    const fn = vi.fn();
    const { result, wrapper } = withSetup(() => useDebounceFn(fn, 200));

    result("arg");
    wrapper.unmount();
    vi.advanceTimersByTime(200);
    expect(fn).not.toHaveBeenCalled();
  });
});

describe("useDebouncedRef", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns initial value immediately", () => {
    const source = ref("initial");
    const { result } = withSetup(() => useDebouncedRef(source, 200));
    expect(result.value).toBe("initial");
  });

  it("updates debounced value after delay", async () => {
    const source = ref("initial");
    const { result, wrapper } = withSetup(() => useDebouncedRef(source, 200));

    source.value = "updated";
    await wrapper.vm.$nextTick();
    expect(result.value).toBe("initial");

    vi.advanceTimersByTime(200);
    await wrapper.vm.$nextTick();
    expect(result.value).toBe("updated");
  });

  it("only applies last value when source changes rapidly", async () => {
    const source = ref("a");
    const { result, wrapper } = withSetup(() => useDebouncedRef(source, 200));

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

  it("cleans up timeout on unmount", () => {
    const source = ref("initial");
    const { result, wrapper } = withSetup(() => useDebouncedRef(source, 200));

    source.value = "updated";
    wrapper.unmount();
    vi.advanceTimersByTime(200);
    expect(result.value).toBe("initial");
  });
});
