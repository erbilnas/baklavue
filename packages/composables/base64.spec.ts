import { mount } from "@vue/test-utils";
import { defineComponent, ref } from "vue";
import { describe, expect, it } from "vitest";
import { useBase64 } from "./base64";

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

describe("useBase64", () => {
  it("returns base64, execute, promise", () => {
    const { result } = withSetup(() => useBase64("hello"));

    expect(result.base64).toBeDefined();
    expect(result.execute).toBeDefined();
    expect(result.promise).toBeDefined();
  });

  it("encodes string to base64 with dataUrl", async () => {
    const { result, wrapper } = withSetup(() =>
      useBase64("hello", { dataUrl: true }),
    );

    await wrapper.vm.$nextTick();
    await result.execute();

    expect(result.base64.value).toMatch(/^data:text\/plain;base64,/);
    expect(result.base64.value).toContain("aGVsbG8=");
  });

  it("encodes string to raw base64 when dataUrl is false", async () => {
    const { result, wrapper } = withSetup(() =>
      useBase64("AB", { dataUrl: false }),
    );

    await result.execute();

    expect(result.base64.value).toBe("QUI=");
    expect(result.base64.value).not.toContain("data:");
  });

  it("clears base64 when target is null", async () => {
    const source = ref<string | undefined>("hello");
    const { result, wrapper } = withSetup(() => useBase64(source));

    await result.execute();
    expect(result.base64.value).toBeTruthy();

    source.value = undefined;
    await wrapper.vm.$nextTick();
    await new Promise((r) => setTimeout(r, 0));

    expect(result.base64.value).toBe("");
  });

  it("encode Blob to base64", async () => {
    const blob = new Blob(["test"], { type: "text/plain" });
    const { result } = withSetup(() => useBase64(blob));

    const encoded = await result.execute();

    expect(encoded).toMatch(/^data:text\/plain;base64,/);
    expect(result.base64.value).toBeTruthy();
  });

  it("execute returns empty string for undefined", async () => {
    const { result } = withSetup(() => useBase64(undefined));

    const encoded = await result.execute();

    expect(encoded).toBe("");
    expect(result.base64.value).toBe("");
  });
});
