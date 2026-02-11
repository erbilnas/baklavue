import { mount } from "@vue/test-utils";
import { defineComponent, ref } from "vue";
import { describe, expect, it } from "vitest";
import { useSlug } from "./slug";

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

describe("useSlug", () => {
  it("converts string to lowercase slug with default separator", () => {
    const { result } = withSetup(() => useSlug("Hello World!"));
    expect(result.value).toBe("hello-world");
  });

  it("removes special characters", () => {
    const { result } = withSetup(() => useSlug("Hello @World #123"));
    expect(result.value).toBe("hello-world-123");
  });

  it("trims whitespace", () => {
    const { result } = withSetup(() => useSlug("  Hello World  "));
    expect(result.value).toBe("hello-world");
  });

  it("replaces spaces with custom separator", () => {
    const { result } = withSetup(() =>
      useSlug("Hello World", { separator: "_" }),
    );
    expect(result.value).toBe("hello_world");
  });

  it("respects lowercase: false", () => {
    const { result } = withSetup(() =>
      useSlug("Hello World", { lowercase: false }),
    );
    expect(result.value).toBe("Hello-World");
  });

  it("returns empty string for null/undefined", () => {
    const { result: r1 } = withSetup(() => useSlug(null));
    const { result: r2 } = withSetup(() => useSlug(undefined));
    expect(r1.value).toBe("");
    expect(r2.value).toBe("");
  });

  it("is reactive when source is ref", async () => {
    const source = ref("Initial Title");
    const { result, wrapper } = withSetup(() => useSlug(source));
    expect(result.value).toBe("initial-title");
    source.value = "Updated Title";
    await wrapper.vm.$nextTick();
    expect(result.value).toBe("updated-title");
  });

  it("removes diacritics", () => {
    const { result } = withSetup(() => useSlug("Café naïve"));
    expect(result.value).toBe("cafe-naive");
  });
});
