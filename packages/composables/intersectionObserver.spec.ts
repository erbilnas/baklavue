import { mount } from "@vue/test-utils";
import { defineComponent, ref } from "vue";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
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
        constructor(callback: (entries: { isIntersecting: boolean }[]) => void) {
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

    const { result, wrapper } = withSetup(() => useIntersectionObserver(target));

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
});
