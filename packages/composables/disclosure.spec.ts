import { mount } from "@vue/test-utils";
import { defineComponent } from "vue";
import { describe, expect, it } from "vitest";
import { useDisclosure } from "./disclosure";

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

describe("useDisclosure", () => {
  it("returns initial state as false when no initial provided", () => {
    const { result } = withSetup(() => useDisclosure());
    expect(result.isOpen.value).toBe(false);
  });

  it("returns initial state when provided", () => {
    const { result } = withSetup(() => useDisclosure(true));
    expect(result.isOpen.value).toBe(true);
  });

  it("open sets isOpen to true", async () => {
    const { result, wrapper } = withSetup(() => useDisclosure(false));
    expect(result.isOpen.value).toBe(false);
    result.open();
    await wrapper.vm.$nextTick();
    expect(result.isOpen.value).toBe(true);
  });

  it("close sets isOpen to false", async () => {
    const { result, wrapper } = withSetup(() => useDisclosure(true));
    expect(result.isOpen.value).toBe(true);
    result.close();
    await wrapper.vm.$nextTick();
    expect(result.isOpen.value).toBe(false);
  });

  it("toggle flips isOpen state", async () => {
    const { result, wrapper } = withSetup(() => useDisclosure(false));
    expect(result.isOpen.value).toBe(false);
    result.toggle();
    await wrapper.vm.$nextTick();
    expect(result.isOpen.value).toBe(true);
    result.toggle();
    await wrapper.vm.$nextTick();
    expect(result.isOpen.value).toBe(false);
  });

  it("returns open, close, and toggle functions", () => {
    const { result } = withSetup(() => useDisclosure());
    expect(typeof result.open).toBe("function");
    expect(typeof result.close).toBe("function");
    expect(typeof result.toggle).toBe("function");
  });
});
