import { mount } from "@vue/test-utils";
import { defineComponent, ref } from "vue";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useElementSize } from "./elementSize";

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

describe("useElementSize", () => {
  const observeMock = vi.fn();
  const unobserveMock = vi.fn();
  const disconnectMock = vi.fn();
  let resizeCallback: (entries: { contentRect: DOMRect }[]) => void;

  beforeEach(() => {
    resizeCallback = () => {};
    vi.stubGlobal(
      "ResizeObserver",
      class ResizeObserver {
        constructor(callback: (entries: { contentRect: DOMRect }[]) => void) {
          resizeCallback = callback;
        }
        observe = observeMock;
        unobserve = unobserveMock;
        disconnect = disconnectMock;
      },
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("returns width and height refs with initial values", () => {
    const target = ref<HTMLElement | null>(null);
    const { result } = withSetup(() => useElementSize(target));

    expect(result.width).toBeDefined();
    expect(result.height).toBeDefined();
    expect(result.width.value).toBe(0);
    expect(result.height.value).toBe(0);
  });

  it("uses custom initial options", () => {
    const target = ref<HTMLElement | null>(null);
    const { result } = withSetup(() =>
      useElementSize(target, { initialWidth: 100, initialHeight: 50 }),
    );

    expect(result.width.value).toBe(100);
    expect(result.height.value).toBe(50);
  });

  it("observes element when target is set", async () => {
    const div = document.createElement("div");
    const target = ref<HTMLElement | null>(div);

    const { wrapper } = withSetup(() => useElementSize(target));

    await wrapper.vm.$nextTick();

    expect(observeMock).toHaveBeenCalledWith(div);
  });

  it("updates width and height when ResizeObserver callback fires", async () => {
    const div = document.createElement("div");
    const target = ref<HTMLElement | null>(div);

    const { result, wrapper } = withSetup(() => useElementSize(target));

    await wrapper.vm.$nextTick();

    resizeCallback([
      {
        contentRect: {
          width: 200,
          height: 100,
          top: 0,
          left: 0,
          right: 200,
          bottom: 100,
          x: 0,
          y: 0,
          toJSON: () => ({}),
        } as DOMRect,
      },
    ]);

    await wrapper.vm.$nextTick();

    expect(result.width.value).toBe(200);
    expect(result.height.value).toBe(100);
  });

  it("unobserves and resets when target changes to null", async () => {
    const div = document.createElement("div");
    const target = ref<HTMLElement | null>(div);

    const { result, wrapper } = withSetup(() =>
      useElementSize(target, { initialWidth: 10, initialHeight: 20 }),
    );

    await wrapper.vm.$nextTick();
    resizeCallback([{
      contentRect: { width: 50, height: 60, top: 0, left: 0, right: 50, bottom: 60, x: 0, y: 0, toJSON: () => ({}) } as DOMRect,
    }]);
    await wrapper.vm.$nextTick();

    target.value = null;
    await wrapper.vm.$nextTick();

    expect(unobserveMock).toHaveBeenCalledWith(div);
    expect(result.width.value).toBe(10);
    expect(result.height.value).toBe(20);
  });

  it("resets to initial when target changes from element to null with no oldEl", async () => {
    const target = ref<HTMLElement | null>(null);
    const { result, wrapper } = withSetup(() =>
      useElementSize(target, { initialWidth: 5, initialHeight: 8 }),
    );

    expect(result.width.value).toBe(5);
    expect(result.height.value).toBe(8);

    const div = document.createElement("div");
    target.value = div;
    await wrapper.vm.$nextTick();
    resizeCallback([{
      contentRect: { width: 100, height: 50, top: 0, left: 0, right: 100, bottom: 50, x: 0, y: 0, toJSON: () => ({}) } as DOMRect,
    }]);
    await wrapper.vm.$nextTick();

    target.value = null;
    await wrapper.vm.$nextTick();

    expect(result.width.value).toBe(5);
    expect(result.height.value).toBe(8);
  });

  it("handles empty ResizeObserver entries", async () => {
    const div = document.createElement("div");
    const target = ref<HTMLElement | null>(div);

    const { result, wrapper } = withSetup(() => useElementSize(target));

    await wrapper.vm.$nextTick();
    resizeCallback([]);
    await wrapper.vm.$nextTick();

    expect(result.width.value).toBe(0);
    expect(result.height.value).toBe(0);
  });

  it("unobserves on unmount", async () => {
    const div = document.createElement("div");
    const target = ref<HTMLElement | null>(div);

    const { wrapper } = withSetup(() => useElementSize(target));
    await wrapper.vm.$nextTick();

    wrapper.unmount();

    expect(unobserveMock).toHaveBeenCalledWith(div);
  });
});
