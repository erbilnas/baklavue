import { mount } from "@vue/test-utils";
import { defineComponent } from "vue";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useScrollToError } from "./scrollToError";

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

describe("useScrollToError", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("returns scrollToError function", () => {
    const { result } = withSetup(() => useScrollToError());

    expect(result.scrollToError).toBeDefined();
    expect(typeof result.scrollToError).toBe("function");
  });

  it("scrollToError returns success false when target not found", () => {
    const { result } = withSetup(() => useScrollToError());

    const r = result.scrollToError(".non-existent-selector");

    expect(r.success).toBe(false);
  });

  it("scrollToError returns success true when element exists", () => {
    const div = document.createElement("div");
    div.id = "error-field";
    document.body.appendChild(div);

    const { result } = withSetup(() => useScrollToError());

    const scrollIntoViewSpy = vi.spyOn(div, "scrollIntoView");
    const r = result.scrollToError("#error-field");

    expect(r.success).toBe(true);
    expect(scrollIntoViewSpy).toHaveBeenCalled();
  });

  it("scrollToError accepts HTMLElement as target", () => {
    const div = document.createElement("div");
    document.body.appendChild(div);

    const { result } = withSetup(() => useScrollToError());

    const r = result.scrollToError(div);

    expect(r.success).toBe(true);
  });

  it("applies shine class when shineDuration > 0", () => {
    const div = document.createElement("div");
    div.id = "shine-target";
    document.body.appendChild(div);

    const { result } = withSetup(() => useScrollToError());

    result.scrollToError("#shine-target", {
      shineClass: "my-shine",
      shineDuration: 100,
    });

    expect(div.classList.contains("my-shine")).toBe(true);
  });

  it("honors defaultOptions", () => {
    const div = document.createElement("div");
    div.id = "default-target";
    document.body.appendChild(div);

    const { result } = withSetup(() =>
      useScrollToError({
        defaultOptions: { shineClass: "default-shine", shineDuration: 100 },
      }),
    );

    result.scrollToError("#default-target");

    expect(div.classList.contains("default-shine")).toBe(true);
  });

  it("accepts object with scrollTarget", () => {
    const div = document.createElement("div");
    div.id = "scroll-target-el";
    document.body.appendChild(div);

    const { result } = withSetup(() => useScrollToError());

    const r = result.scrollToError({ scrollTarget: "#scroll-target-el" });
    expect(r.success).toBe(true);
  });

  it("returns success false for invalid scrollTarget object", () => {
    const { result } = withSetup(() => useScrollToError());

    const r = result.scrollToError({ scrollTarget: "" });
    expect(r.success).toBe(false);
  });

  it("scrolls container when scrollContainer is provided and contains element", () => {
    const container = document.createElement("div");
    container.id = "scroll-container";
    const child = document.createElement("div");
    child.id = "scroll-child";
    container.appendChild(child);
    document.body.appendChild(container);

    const scrollToSpy = vi.spyOn(container, "scrollTo").mockImplementation(() => {});

    const { result } = withSetup(() => useScrollToError());

    const r = result.scrollToError("#scroll-child", {
      scrollContainer: "#scroll-container",
    });

    expect(r.success).toBe(true);
    expect(scrollToSpy).toHaveBeenCalled();
    scrollToSpy.mockRestore();
  });

  it("skips shine when shineDuration is 0", () => {
    const div = document.createElement("div");
    div.id = "no-shine";
    document.body.appendChild(div);

    const { result } = withSetup(() => useScrollToError());

    result.scrollToError("#no-shine", { shineDuration: 0 });

    expect(div.classList.contains("error-shine")).toBe(false);
  });

  it("skips focus when focus is false", () => {
    const div = document.createElement("div");
    div.id = "no-focus";
    document.body.appendChild(div);

    const { result } = withSetup(() => useScrollToError());

    const r = result.scrollToError("#no-focus", { focus: false });
    expect(r.success).toBe(true);
  });

  it("uses custom announce message", () => {
    const div = document.createElement("div");
    div.id = "announce-target";
    document.body.appendChild(div);

    const { result } = withSetup(() => useScrollToError());

    const r = result.scrollToError("#announce-target", {
      announce: "Custom error message",
    });
    expect(r.success).toBe(true);

    const announcer = document.getElementById("scroll-to-error-announcer");
    expect(announcer?.textContent).toBe("Custom error message");
  });

  it("uses scrollOffset when provided", () => {
    const div = document.createElement("div");
    div.id = "offset-target";
    document.body.appendChild(div);

    const scrollIntoViewSpy = vi.spyOn(div, "scrollIntoView").mockImplementation(() => {});

    const { result } = withSetup(() => useScrollToError());

    const r = result.scrollToError("#offset-target", {
      scrollOffset: { top: 80, left: 0 },
    });

    expect(r.success).toBe(true);
    expect(scrollIntoViewSpy).toHaveBeenCalled();
    scrollIntoViewSpy.mockRestore();
  });
});
