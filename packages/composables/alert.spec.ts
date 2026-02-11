import { mount } from "@vue/test-utils";
import { defineComponent } from "vue";
import { describe, expect, it } from "vitest";
import { useAlert } from "./alert";

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

describe("useAlert", () => {
  it("returns initial state", () => {
    const { result } = withSetup(() => useAlert());

    expect(result.isVisible.value).toBe(false);
    expect(result.variant.value).toBe("info");
    expect(result.caption.value).toBe("");
    expect(result.description.value).toBe("");
    expect(result.closable.value).toBe(false);
  });

  it("show() sets isVisible and options", async () => {
    const { result, wrapper } = withSetup(() => useAlert());

    result.show({
      variant: "success",
      caption: "Title",
      description: "Saved!",
      closable: true,
    });

    await wrapper.vm.$nextTick();
    expect(result.isVisible.value).toBe(true);
    expect(result.variant.value).toBe("success");
    expect(result.caption.value).toBe("Title");
    expect(result.description.value).toBe("Saved!");
    expect(result.closable.value).toBe(true);
  });

  it("show() uses defaults for omitted options", async () => {
    const { result, wrapper } = withSetup(() => useAlert());

    result.show();

    await wrapper.vm.$nextTick();
    expect(result.isVisible.value).toBe(true);
    expect(result.variant.value).toBe("info");
    expect(result.caption.value).toBe("");
    expect(result.description.value).toBe("");
    expect(result.closable.value).toBe(false);
  });

  it("hide() sets isVisible to false", async () => {
    const { result, wrapper } = withSetup(() => useAlert());

    result.show({ description: "Message" });
    await wrapper.vm.$nextTick();
    expect(result.isVisible.value).toBe(true);

    result.hide();
    await wrapper.vm.$nextTick();
    expect(result.isVisible.value).toBe(false);
  });
});
