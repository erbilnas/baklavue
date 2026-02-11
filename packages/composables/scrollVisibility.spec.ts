import { mount } from "@vue/test-utils";
import { defineComponent } from "vue";
import { describe, expect, it, vi } from "vitest";
import { useScrollVisibility } from "./scrollVisibility";

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

describe("useScrollVisibility", () => {
  it("returns isVisible, scrollY, scrollToTop", () => {
    const { result } = withSetup(() => useScrollVisibility());

    expect(result.isVisible).toBeDefined();
    expect(result.scrollY).toBeDefined();
    expect(result.scrollToTop).toBeDefined();
  });

  it("isVisible false when scroll below threshold", () => {
    Object.defineProperty(window, "scrollY", {
      writable: true,
      configurable: true,
      value: 0,
    });

    const { result } = withSetup(() => useScrollVisibility({ threshold: 300 }));

    expect(result.isVisible.value).toBe(false);
    expect(result.scrollY.value).toBe(0);
  });

  it("isVisible true when scroll exceeds threshold", async () => {
    Object.defineProperty(window, "scrollY", {
      writable: true,
      configurable: true,
      value: 500,
    });

    const { result, wrapper } = withSetup(() =>
      useScrollVisibility({ threshold: 300 }),
    );

    window.dispatchEvent(new Event("scroll"));
    await wrapper.vm.$nextTick();

    expect(result.isVisible.value).toBe(true);
    expect(result.scrollY.value).toBe(500);
  });

  it("scrollToTop does not throw", () => {
    const scrollToSpy = vi.spyOn(window, "scrollTo").mockImplementation(() => {});

    const { result } = withSetup(() => useScrollVisibility());

    expect(() => result.scrollToTop()).not.toThrow();
    expect(scrollToSpy).toHaveBeenCalledWith({
      top: 0,
      behavior: "smooth",
    });

    scrollToSpy.mockRestore();
  });
});
