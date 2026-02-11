import { mount } from "@vue/test-utils";
import { defineComponent, ref } from "vue";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useFocusTrap } from "./focusTrap";

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

describe("useFocusTrap", () => {
  let container: HTMLElement;

  afterEach(() => {
    if (container?.parentNode) {
      document.body.removeChild(container);
    }
  });

  it("returns activate, deactivate, focusFirst, focusLast", () => {
    const target = ref<HTMLElement | null>(null);
    const { result } = withSetup(() => useFocusTrap({ target }));

    expect(typeof result.activate).toBe("function");
    expect(typeof result.deactivate).toBe("function");
    expect(typeof result.focusFirst).toBe("function");
    expect(typeof result.focusLast).toBe("function");
  });

  it("activate does nothing when target is null", () => {
    const target = ref<HTMLElement | null>(null);
    const addSpy = vi.spyOn(document, "addEventListener");

    const { result } = withSetup(() => useFocusTrap({ target }));

    result.activate();

    expect(addSpy).not.toHaveBeenCalledWith("keydown", expect.any(Function), true);
  });

  it("focusFirst focuses first focusable element", () => {
    container = document.createElement("div");
    const btn1 = document.createElement("button");
    btn1.textContent = "First";
    const btn2 = document.createElement("button");
    btn2.textContent = "Second";
    container.appendChild(btn1);
    container.appendChild(btn2);
    document.body.appendChild(container);

    const target = ref<HTMLElement | null>(container);
    const { result } = withSetup(() => useFocusTrap({ target }));

    const focusSpy = vi.spyOn(btn1, "focus");

    result.focusFirst();

    expect(focusSpy).toHaveBeenCalled();
  });

  it("focusLast focuses last focusable element", () => {
    container = document.createElement("div");
    const btn1 = document.createElement("button");
    btn1.textContent = "First";
    const btn2 = document.createElement("button");
    btn2.textContent = "Second";
    container.appendChild(btn1);
    container.appendChild(btn2);
    document.body.appendChild(container);

    const target = ref<HTMLElement | null>(container);
    const { result } = withSetup(() => useFocusTrap({ target }));

    const focusSpy = vi.spyOn(btn2, "focus");

    result.focusLast();

    expect(focusSpy).toHaveBeenCalled();
  });

  it("activate adds keydown listener when target has focusable elements", () => {
    container = document.createElement("div");
    const btn = document.createElement("button");
    container.appendChild(btn);
    document.body.appendChild(container);

    const target = ref<HTMLElement | null>(container);
    const addSpy = vi.spyOn(document, "addEventListener");

    const { result } = withSetup(() => useFocusTrap({ target }));

    result.activate();

    expect(addSpy).toHaveBeenCalledWith("keydown", expect.any(Function), true);
  });

  it("deactivate removes keydown listener", () => {
    container = document.createElement("div");
    const btn = document.createElement("button");
    container.appendChild(btn);
    document.body.appendChild(container);

    const target = ref<HTMLElement | null>(container);
    const removeSpy = vi.spyOn(document, "removeEventListener");

    const { result } = withSetup(() => useFocusTrap({ target }));
    result.activate();
    result.deactivate();

    expect(removeSpy).toHaveBeenCalledWith("keydown", expect.any(Function), true);
  });

  it("does not activate when active is false", () => {
    container = document.createElement("div");
    const btn = document.createElement("button");
    container.appendChild(btn);
    document.body.appendChild(container);

    const target = ref<HTMLElement | null>(container);
    const active = ref(false);
    const addSpy = vi.spyOn(document, "addEventListener");
    addSpy.mockClear();

    const { result } = withSetup(() =>
      useFocusTrap({ target, active }),
    );

    result.activate();

    expect(addSpy).not.toHaveBeenCalledWith("keydown", expect.any(Function), true);
  });
});
