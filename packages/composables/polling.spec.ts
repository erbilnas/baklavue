import { mount } from "@vue/test-utils";
import { defineComponent } from "vue";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { usePolling } from "./polling";

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

describe("usePolling", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns data, error, isLoading, pause, resume, isActive", () => {
    const fetchFn = vi.fn().mockResolvedValue({ data: 1 });
    const { result } = withSetup(() =>
      usePolling(fetchFn, { interval: 1000, immediate: false }),
    );

    expect(result.data).toBeDefined();
    expect(result.error).toBeDefined();
    expect(result.isLoading).toBeDefined();
    expect(result.pause).toBeDefined();
    expect(result.resume).toBeDefined();
    expect(result.isActive).toBeDefined();
  });

  it("starts polling when immediate is true", () => {
    const fetchFn = vi.fn().mockResolvedValue("data");
    const { result } = withSetup(() =>
      usePolling(fetchFn, { interval: 1000 }),
    );

    expect(result.isActive.value).toBe(true);
    expect(fetchFn).toHaveBeenCalled();
  });

  it("does not start when immediate is false", () => {
    const fetchFn = vi.fn().mockResolvedValue("data");
    const { result } = withSetup(() =>
      usePolling(fetchFn, { interval: 1000, immediate: false }),
    );

    expect(result.isActive.value).toBe(false);
    expect(fetchFn).not.toHaveBeenCalled();
  });

  it("resume starts polling", async () => {
    const fetchFn = vi.fn().mockResolvedValue("data");
    const { result, wrapper } = withSetup(() =>
      usePolling(fetchFn, { interval: 1000, immediate: false }),
    );

    result.resume();
    await wrapper.vm.$nextTick();

    expect(result.isActive.value).toBe(true);
    vi.advanceTimersByTime(1000);
    expect(fetchFn).toHaveBeenCalled();
  });

  it("pause stops polling", async () => {
    const fetchFn = vi.fn().mockResolvedValue("data");
    const { result, wrapper } = withSetup(() =>
      usePolling(fetchFn, { interval: 1000 }),
    );

    result.pause();
    await wrapper.vm.$nextTick();

    expect(result.isActive.value).toBe(false);
    const callCount = fetchFn.mock.calls.length;
    vi.advanceTimersByTime(2000);
    expect(fetchFn.mock.calls.length).toBe(callCount);
  });

  it("respects initialData", async () => {
    const fetchFn = vi.fn().mockResolvedValue("fetched");
    const { result, wrapper } = withSetup(() =>
      usePolling(fetchFn, {
        interval: 1000,
        immediate: false,
        initialData: "initial",
      }),
    );

    await wrapper.vm.$nextTick();
    expect(result.data.value).toBe("initial");
  });

  it("pauses when tab is hidden and resumes when visible", async () => {
    const fetchFn = vi.fn().mockResolvedValue("data");
    const addSpy = vi.spyOn(document, "addEventListener");
    const removeSpy = vi.spyOn(document, "removeEventListener");

    Object.defineProperty(document, "hidden", {
      value: false,
      writable: true,
      configurable: true,
    });

    const { result, wrapper } = withSetup(() =>
      usePolling(fetchFn, {
        interval: 1000,
        immediate: true,
        pauseInBackground: true,
      }),
    );

    await wrapper.vm.$nextTick();
    expect(addSpy).toHaveBeenCalledWith("visibilitychange", expect.any(Function));

    const handler = addSpy.mock.calls.find(
      (c) => c[0] === "visibilitychange",
    )?.[1];

    Object.defineProperty(document, "hidden", {
      value: true,
      writable: true,
      configurable: true,
    });
    handler?.();
    expect(result.isActive.value).toBe(false);

    Object.defineProperty(document, "hidden", {
      value: false,
      writable: true,
      configurable: true,
    });
    handler?.();
    expect(result.isActive.value).toBe(true);

    wrapper.unmount();
    expect(removeSpy).toHaveBeenCalledWith("visibilitychange", expect.any(Function));

    addSpy.mockRestore();
    removeSpy.mockRestore();
  });

  it("starts paused when document.hidden is true", async () => {
    const fetchFn = vi.fn().mockResolvedValue("data");
    const originalHidden = Object.getOwnPropertyDescriptor(
      document,
      "hidden",
    );
    Object.defineProperty(document, "hidden", {
      value: true,
      writable: true,
      configurable: true,
    });

    const { result, wrapper } = withSetup(() =>
      usePolling(fetchFn, {
        interval: 1000,
        immediate: true,
        pauseInBackground: true,
      }),
    );

    await wrapper.vm.$nextTick();
    expect(result.isActive.value).toBe(false);

    if (originalHidden) {
      Object.defineProperty(document, "hidden", originalHidden);
    }
  });

  it("calls onSuccess when fetch succeeds", async () => {
    vi.useRealTimers();
    const onSuccess = vi.fn();
    const fetchFn = vi.fn().mockResolvedValue({ id: 1 });
    withSetup(() =>
      usePolling(fetchFn, {
        interval: 1000,
        immediate: true,
        pauseInBackground: false,
        onSuccess,
      }),
    );

    await new Promise((r) => setTimeout(r, 50));
    expect(onSuccess).toHaveBeenCalledWith({ id: 1 });
    vi.useFakeTimers();
  });
});
