import { mount } from "@vue/test-utils";
import { defineComponent } from "vue";
import { describe, expect, it } from "vitest";
import { useToggle } from "./toggle";

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

describe("useToggle", () => {
  it("returns initial value as false when no initial provided", () => {
    const { result } = withSetup(() => useToggle());
    const [value] = result;
    expect(value.value).toBe(false);
  });

  it("returns initial value when provided", () => {
    const { result } = withSetup(() => useToggle(true));
    const [value] = result;
    expect(value.value).toBe(true);
  });

  it("toggles value when called without args", async () => {
    const { result, wrapper } = withSetup(() => useToggle(false));
    const [value, toggle] = result;

    expect(value.value).toBe(false);
    toggle();
    await wrapper.vm.$nextTick();
    expect(value.value).toBe(true);
    toggle();
    await wrapper.vm.$nextTick();
    expect(value.value).toBe(false);
  });

  it("sets value explicitly when called with boolean", async () => {
    const { result, wrapper } = withSetup(() => useToggle(false));
    const [value, toggle] = result;

    toggle(true);
    await wrapper.vm.$nextTick();
    expect(value.value).toBe(true);

    toggle(false);
    await wrapper.vm.$nextTick();
    expect(value.value).toBe(false);
  });
});
