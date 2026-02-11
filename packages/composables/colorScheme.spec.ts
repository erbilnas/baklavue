import { mount } from "@vue/test-utils";
import { defineComponent } from "vue";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useColorScheme } from "./colorScheme";

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

describe("useColorScheme", () => {
  const storageKey = "color-scheme-test-" + Math.random();

  beforeEach(() => {
    localStorage.removeItem(storageKey);
    vi.stubGlobal(
      "matchMedia",
      vi.fn().mockImplementation((query: string) => ({
        matches: false,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        media: query,
      })),
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("returns scheme, isDark, setScheme", () => {
    const { result } = withSetup(() =>
      useColorScheme({ storageKey: false, defaultScheme: "light" }),
    );

    expect(result.scheme).toBeDefined();
    expect(result.isDark).toBeDefined();
    expect(result.setScheme).toBeDefined();
  });

  it("defaultScheme light sets isDark false", () => {
    const { result } = withSetup(() =>
      useColorScheme({ storageKey: false, defaultScheme: "light" }),
    );

    expect(result.scheme.value).toBe("light");
    expect(result.isDark.value).toBe(false);
  });

  it("defaultScheme dark sets isDark true", () => {
    const { result } = withSetup(() =>
      useColorScheme({ storageKey: false, defaultScheme: "dark" }),
    );

    expect(result.scheme.value).toBe("dark");
    expect(result.isDark.value).toBe(true);
  });

  it("setScheme updates scheme and isDark", async () => {
    const { result, wrapper } = withSetup(() =>
      useColorScheme({ storageKey: false, defaultScheme: "light" }),
    );

    result.setScheme("dark");
    await wrapper.vm.$nextTick();

    expect(result.scheme.value).toBe("dark");
    expect(result.isDark.value).toBe(true);
  });

  it("setScheme persists to localStorage when storageKey is set", async () => {
    const { result, wrapper } = withSetup(() =>
      useColorScheme({ storageKey, defaultScheme: "light" }),
    );

    result.setScheme("dark");
    await wrapper.vm.$nextTick();

    expect(localStorage.getItem(storageKey)).toBe("dark");
  });

  it("hydrates from localStorage when storage has value", () => {
    localStorage.setItem(storageKey, "dark");

    const { result } = withSetup(() =>
      useColorScheme({ storageKey, defaultScheme: "light" }),
    );

    expect(result.scheme.value).toBe("dark");
    expect(result.isDark.value).toBe(true);
  });

  it("sets data-theme on html element", async () => {
    const { result, wrapper } = withSetup(() =>
      useColorScheme({ storageKey: false, defaultScheme: "light" }),
    );

    await wrapper.vm.$nextTick();
    expect(document.documentElement.getAttribute("data-theme")).toBe("light");

    result.setScheme("dark");
    await wrapper.vm.$nextTick();
    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
  });
});
