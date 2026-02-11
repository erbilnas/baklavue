import { mount } from "@vue/test-utils";
import { defineComponent } from "vue";
import { describe, expect, it, vi } from "vitest";
import { useNotification } from "./notification";

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

describe("useNotification", () => {
  it("returns success, error, warning, info functions", () => {
    const { result } = withSetup(() => useNotification());

    expect(typeof result.success).toBe("function");
    expect(typeof result.error).toBe("function");
    expect(typeof result.warning).toBe("function");
    expect(typeof result.info).toBe("function");
  });

  it("calls addNotification when bl-notification element exists", () => {
    const addNotification = vi.fn();
    const mockEl = document.createElement("bl-notification") as HTMLElement & {
      addNotification: (opts: unknown) => void;
    };
    mockEl.addNotification = addNotification;
    document.body.appendChild(mockEl);

    const { result } = withSetup(() => useNotification());

    result.success({ title: "Success", description: "Done" });

    expect(addNotification).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "Success",
        description: "Done",
        variant: "success",
        icon: true,
      }),
    );

    document.body.removeChild(mockEl);
  });

  it("does not throw when bl-notification element is absent", () => {
    const existing = document.querySelector("bl-notification");
    if (existing) existing.remove();

    const { result } = withSetup(() => useNotification());

    expect(() =>
      result.success({ title: "Test", description: "Test" }),
    ).not.toThrow();
  });
});
