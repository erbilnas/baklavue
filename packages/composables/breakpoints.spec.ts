import { mount } from "@vue/test-utils";
import { defineComponent } from "vue";
import { describe, expect, it, vi } from "vitest";
import { useBreakpoints, useWindowSize } from "./breakpoints";

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

describe("useBreakpoints", () => {
  it("returns initial breakpoint values", () => {
    const { result } = withSetup(() => useBreakpoints());

    expect(typeof result.isMobile.value).toBe("boolean");
    expect(typeof result.isTablet.value).toBe("boolean");
    expect(typeof result.isDesktop.value).toBe("boolean");
    expect(
      result.isMobile.value || result.isTablet.value || result.isDesktop.value,
    ).toBe(true);
  });

  it("respects custom breakpoint options", () => {
    const { result } = withSetup(() =>
      useBreakpoints({ mobile: 600, tablet: 900 }),
    );

    expect(typeof result.isMobile.value).toBe("boolean");
    expect(typeof result.isTablet.value).toBe("boolean");
    expect(typeof result.isDesktop.value).toBe("boolean");
  });

  it("updates on window resize", async () => {
    const { result, wrapper } = withSetup(() => useBreakpoints());

    const initialMobile = result.isMobile.value;

    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 400,
    });
    window.dispatchEvent(new Event("resize"));
    await wrapper.vm.$nextTick();

    expect(result.isMobile.value).toBe(true);
  });
});

describe("useWindowSize", () => {
  it("returns width and height", () => {
    const { result } = withSetup(() => useWindowSize());

    expect(typeof result.width.value).toBe("number");
    expect(typeof result.height.value).toBe("number");
    expect(result.width.value).toBeGreaterThanOrEqual(0);
    expect(result.height.value).toBeGreaterThanOrEqual(0);
  });

  it("updates on window resize", async () => {
    const { result, wrapper } = withSetup(() => useWindowSize());

    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 800,
    });
    Object.defineProperty(window, "innerHeight", {
      writable: true,
      configurable: true,
      value: 600,
    });
    window.dispatchEvent(new Event("resize"));
    await wrapper.vm.$nextTick();

    expect(result.width.value).toBe(800);
    expect(result.height.value).toBe(600);
  });
});
