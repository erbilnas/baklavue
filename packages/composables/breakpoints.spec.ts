import { mount } from "@vue/test-utils";
import { defineComponent } from "vue";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useBreakpoints, useMediaQuery, useWindowSize } from "./breakpoints";

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

    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 400,
    });
    window.dispatchEvent(new Event("resize"));
    await wrapper.vm.$nextTick();

    expect(result.isMobile.value).toBe(true);
  });

  it("removes resize listener on unmount", () => {
    const removeSpy = vi.spyOn(window, "removeEventListener");
    const { wrapper } = withSetup(() => useBreakpoints());
    wrapper.unmount();
    expect(removeSpy).toHaveBeenCalledWith("resize", expect.any(Function));
    removeSpy.mockRestore();
  });
});

describe("useMediaQuery", () => {
  it("returns matches ref", () => {
    const { result } = withSetup(() => useMediaQuery("(max-width: 768px)"));
    expect(typeof result.value).toBe("boolean");
  });

  it("updates when media query changes", async () => {
    const mediaQuery = { matches: false, addEventListener: vi.fn(), removeEventListener: vi.fn() };
    const originalMatchMedia = window.matchMedia;
    Object.defineProperty(window, "matchMedia", {
      value: () => mediaQuery,
      configurable: true,
    });

    const { result, wrapper } = withSetup(() => useMediaQuery("(max-width: 768px)"));
    expect(result.value).toBe(false);

    const handler = mediaQuery.addEventListener.mock.calls[0][1];
    handler({ matches: true });
    await wrapper.vm.$nextTick();
    expect(result.value).toBe(true);

    wrapper.unmount();
    expect(mediaQuery.removeEventListener).toHaveBeenCalled();

    Object.defineProperty(window, "matchMedia", {
      value: originalMatchMedia,
      configurable: true,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
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

  it("removes resize listener on unmount", () => {
    const removeSpy = vi.spyOn(window, "removeEventListener");
    const { wrapper } = withSetup(() => useWindowSize());
    wrapper.unmount();
    expect(removeSpy).toHaveBeenCalledWith("resize", expect.any(Function));
    removeSpy.mockRestore();
  });
});
