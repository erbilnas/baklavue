import { mount } from "@vue/test-utils";
import { defineComponent } from "vue";
import { describe, expect, it } from "vitest";
import { useId } from "./id";

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

describe("useId", () => {
  it("returns unique id with default prefix", () => {
    const { result } = withSetup(() => useId());
    expect(result.value).toMatch(/^bv-\d+$/);
  });

  it("returns unique id with custom prefix", () => {
    const { result } = withSetup(() => useId("my-prefix"));
    expect(result.value).toMatch(/^my-prefix-\d+$/);
  });

  it("returns different ids for multiple calls", () => {
    const { result: r1 } = withSetup(() => useId());
    const { result: r2 } = withSetup(() => useId());
    expect(r1.value).not.toBe(r2.value);
  });
});
