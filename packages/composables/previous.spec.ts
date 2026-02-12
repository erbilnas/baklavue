import { mount } from "@vue/test-utils";
import { defineComponent, ref } from "vue";
import { describe, expect, it } from "vitest";
import { usePrevious } from "./previous";

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

describe("usePrevious", () => {
  it("returns undefined initially", () => {
    const source = ref(0);
    const { result } = withSetup(() => usePrevious(source));
    expect(result.value).toBeUndefined();
  });

  it("tracks previous value when source changes", async () => {
    const source = ref(0);
    const { result, wrapper } = withSetup(() => usePrevious(source));

    expect(result.value).toBeUndefined();

    source.value = 1;
    await wrapper.vm.$nextTick();
    expect(result.value).toBe(0);

    source.value = 2;
    await wrapper.vm.$nextTick();
    expect(result.value).toBe(1);

    source.value = 3;
    await wrapper.vm.$nextTick();
    expect(result.value).toBe(2);
  });

  it("works with string values", async () => {
    const source = ref("a");
    const { result, wrapper } = withSetup(() => usePrevious(source));

    source.value = "b";
    await wrapper.vm.$nextTick();
    expect(result.value).toBe("a");
  });

  it("works with object values", async () => {
    const source = ref({ name: "foo" });
    const { result, wrapper } = withSetup(() => usePrevious(source));

    source.value = { name: "bar" };
    await wrapper.vm.$nextTick();
    expect(result.value).toEqual({ name: "foo" });
  });
});
