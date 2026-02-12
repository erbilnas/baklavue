import { mount } from "@vue/test-utils";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { defineComponent, ref } from "vue";
import { useIntersectionObserver } from "./intersectionObserver";

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

describe("useIntersectionObserver", () => {
  const unobserveMock = vi.fn();
  const observeMock = vi.fn();
  let intersectCallback: (entries: { isIntersecting: boolean }[]) => void;

  beforeEach(() => {
    intersectCallback = () => {};
    vi.stubGlobal(
      "IntersectionObserver",
      class IntersectionObserver {
        constructor(
          callback: (entries: { isIntersecting: boolean }[]) => void,
        ) {
          intersectCallback = callback;
        }
        observe = observeMock;
        unobserve = unobserveMock;
        disconnect = vi.fn();
      },
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("returns isVisible ref initialized to false", () => {
    const target = ref<HTMLElement | null>(null);
    const { result } = withSetup(() => useIntersectionObserver(target));

    expect(result.value).toBe(false);
  });

  it("observes element when target is set", async () => {
    const div = document.createElement("div");
    const target = ref<HTMLElement | null>(div);

    const { wrapper } = withSetup(() => useIntersectionObserver(target));

    await wrapper.vm.$nextTick();

    expect(observeMock).toHaveBeenCalledWith(div);
  });

  it("updates isVisible when element is intersecting", async () => {
    const div = document.createElement("div");
    const target = ref<HTMLElement | null>(div);

    const { result, wrapper } = withSetup(() =>
      useIntersectionObserver(target),
    );

    await wrapper.vm.$nextTick();

    intersectCallback([{ isIntersecting: true }]);
    await wrapper.vm.$nextTick();

    expect(result.value).toBe(true);

    intersectCallback([{ isIntersecting: false }]);
    await wrapper.vm.$nextTick();

    expect(result.value).toBe(false);
  });

  it("unobserves when target changes to null", async () => {
    const div = document.createElement("div");
    const target = ref<HTMLElement | null>(div);

    const { wrapper } = withSetup(() => useIntersectionObserver(target));

    await wrapper.vm.$nextTick();

    target.value = null;
    await wrapper.vm.$nextTick();

    expect(unobserveMock).toHaveBeenCalledWith(div);
  });

  it("handles empty entries array (entry undefined)", async () => {
    const div = document.createElement("div");
    const target = ref<HTMLElement | null>(div);

    const { result, wrapper } = withSetup(() =>
      useIntersectionObserver(target),
    );

    await wrapper.vm.$nextTick();

    intersectCallback([]);
    await wrapper.vm.$nextTick();

    expect(result.value).toBe(false);
  });

  it("observes new element when target changes from null to element", async () => {
    const div = document.createElement("div");
    const target = ref<HTMLElement | null>(null);

    const { wrapper } = withSetup(() => useIntersectionObserver(target));

    await wrapper.vm.$nextTick();
    const callsBefore = observeMock.mock.calls.length;

    target.value = div;
    await wrapper.vm.$nextTick();
    expect(observeMock).toHaveBeenCalledWith(div);
    expect(observeMock.mock.calls.length).toBeGreaterThan(callsBefore);
  });

  it("does not throw on unmount when target is null", async () => {
    const target = ref<HTMLElement | null>(null);
    const { wrapper } = withSetup(() => useIntersectionObserver(target));

    await wrapper.vm.$nextTick();
    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("unobserves and observes when target changes to different element", async () => {
    const div1 = document.createElement("div");
    const div2 = document.createElement("div");
    const target = ref<HTMLElement | null>(div1);

    const { wrapper } = withSetup(() => useIntersectionObserver(target));

    await wrapper.vm.$nextTick();
    expect(observeMock).toHaveBeenCalledWith(div1);

    target.value = div2;
    await wrapper.vm.$nextTick();
    expect(unobserveMock).toHaveBeenCalledWith(div1);
    expect(observeMock).toHaveBeenCalledWith(div2);
  });
});
