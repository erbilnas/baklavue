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
});
