import { mount } from "@vue/test-utils";
import { defineComponent } from "vue";
import { afterEach, describe, expect, it } from "vitest";
import { useBaklavaTheme } from "./theme";

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

describe("useBaklavaTheme", () => {
  afterEach(() => {
    const styleEl = document.getElementById("baklavue-theme-overrides");
    if (styleEl) {
      styleEl.remove();
    }
  });

  it("returns applyTheme function", () => {
    const { result } = withSetup(() => useBaklavaTheme());
    expect(typeof result.applyTheme).toBe("function");
  });

  it("applyTheme with vue preset injects style element", () => {
    const { result } = withSetup(() => useBaklavaTheme());

    result.applyTheme({ preset: "vue" });

    const styleEl = document.getElementById("baklavue-theme-overrides");
    expect(styleEl).toBeTruthy();
    expect(styleEl?.tagName).toBe("STYLE");
    expect(styleEl?.textContent).toContain("--bl-color-primary");
    expect(styleEl?.textContent).toContain("#41b883");
  });

  it("applyTheme with custom preset object", () => {
    const { result } = withSetup(() => useBaklavaTheme());

    result.applyTheme({
      preset: {
        "--bl-color-primary": "#ea4c89",
        "--bl-color-primary-highlight": "#d6427a",
      },
    });

    const styleEl = document.getElementById("baklavue-theme-overrides");
    expect(styleEl?.textContent).toContain("--bl-color-primary: #ea4c89");
    expect(styleEl?.textContent).toContain("--bl-color-primary-highlight: #d6427a");
  });

  it("applyTheme with colors override", () => {
    const { result } = withSetup(() => useBaklavaTheme());

    result.applyTheme({
      colors: {
        primary: "#ff0000",
        primaryHighlight: "#cc0000",
      },
    });

    const styleEl = document.getElementById("baklavue-theme-overrides");
    expect(styleEl?.textContent).toContain("--bl-color-primary: #ff0000");
    expect(styleEl?.textContent).toContain("--bl-color-primary-highlight: #cc0000");
  });

  it("applyTheme with empty options does not add style", () => {
    const { result } = withSetup(() => useBaklavaTheme());

    result.applyTheme({});

    const styleEl = document.getElementById("baklavue-theme-overrides");
    expect(styleEl).toBeFalsy();
  });

  it("applyTheme with borderRadius override", () => {
    const { result } = withSetup(() => useBaklavaTheme());

    result.applyTheme({
      borderRadius: { m: "12px" },
    });

    const styleEl = document.getElementById("baklavue-theme-overrides");
    expect(styleEl?.textContent).toContain("--bl-border-radius-m");
  });

  it("applyTheme with size override", () => {
    const { result } = withSetup(() => useBaklavaTheme());

    result.applyTheme({
      size: { m: "1rem" },
    });

    const styleEl = document.getElementById("baklavue-theme-overrides");
    expect(styleEl?.textContent).toContain("--bl-size-m");
  });

  it("applyTheme with typography override", () => {
    const { result } = withSetup(() => useBaklavaTheme());

    result.applyTheme({
      typography: { fontFamily: "monospace" },
    });

    const styleEl = document.getElementById("baklavue-theme-overrides");
    expect(styleEl?.textContent).toContain("--bl-font-family");
  });

  it("applyTheme with zIndex override", () => {
    const { result } = withSetup(() => useBaklavaTheme());

    result.applyTheme({
      zIndex: { dialog: 9999 },
    });

    const styleEl = document.getElementById("baklavue-theme-overrides");
    expect(styleEl?.textContent).toContain("--bl-index-dialog");
  });
});
