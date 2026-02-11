import { mount } from "@vue/test-utils";
import { defineComponent } from "vue";
import { afterEach, describe, expect, it } from "vitest";
import { useThemePreset } from "./themePreset";

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

const storageKey = "test-theme-preset-" + Math.random();

describe("useThemePreset", () => {
  afterEach(() => {
    localStorage.removeItem(storageKey);
    const styleEl = document.getElementById("baklavue-theme-overrides");
    if (styleEl) {
      styleEl.remove();
    }
  });

  it("returns preset, setPreset, and applyTheme", () => {
    const { result } = withSetup(() =>
      useThemePreset({ storageKey, defaultPreset: "vue" }),
    );

    expect(result.preset).toBeDefined();
    expect(typeof result.setPreset).toBe("function");
    expect(typeof result.applyTheme).toBe("function");
  });

  it("uses default preset when no stored value", () => {
    const { result } = withSetup(() =>
      useThemePreset({ storageKey, defaultPreset: "vue" }),
    );

    expect(result.preset.value).toBe("vue");
  });

  it("setPreset updates preset value", async () => {
    const { result, wrapper } = withSetup(() =>
      useThemePreset({ storageKey, defaultPreset: "vue" }),
    );

    result.setPreset("default");
    await wrapper.vm.$nextTick();

    expect(result.preset.value).toBe("default");
  });

  it("persists preset to localStorage", async () => {
    const { result, wrapper } = withSetup(() =>
      useThemePreset({ storageKey, defaultPreset: "vue" }),
    );

    result.setPreset("default");
    await wrapper.vm.$nextTick();

    expect(localStorage.getItem(storageKey)).toBe('"default"');
  });

  it("reads preset from localStorage on init", () => {
    localStorage.setItem(storageKey, JSON.stringify("default"));

    const { result } = withSetup(() =>
      useThemePreset({ storageKey, defaultPreset: "vue" }),
    );

    expect(result.preset.value).toBe("default");
  });

  it("applyTheme does not throw", () => {
    const { result } = withSetup(() =>
      useThemePreset({ storageKey, defaultPreset: "vue" }),
    );

    expect(() => result.applyTheme()).not.toThrow();
  });
});
