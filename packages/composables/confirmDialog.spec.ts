import { mount } from "@vue/test-utils";
import { defineComponent } from "vue";
import { describe, expect, it } from "vitest";
import { useConfirmDialog } from "./confirmDialog";

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

describe("useConfirmDialog", () => {
  it("returns initial state", () => {
    const { result } = withSetup(() => useConfirmDialog());

    expect(result.isOpen.value).toBe(false);
    expect(result.caption.value).toBe("");
    expect(result.description.value).toBe("");
    expect(result.isPending.value).toBe(false);
  });

  it("confirm() opens dialog and sets options", async () => {
    const { result, wrapper } = withSetup(() => useConfirmDialog());

    const promise = result.confirm({
      caption: "Delete?",
      description: "Are you sure?",
    });

    await wrapper.vm.$nextTick();
    expect(result.isOpen.value).toBe(true);
    expect(result.isPending.value).toBe(true);
    expect(result.caption.value).toBe("Delete?");
    expect(result.description.value).toBe("Are you sure?");
  });

  it("handleConfirm resolves with true", async () => {
    const { result, wrapper } = withSetup(() => useConfirmDialog());

    const promise = result.confirm();
    result.handleConfirm();
    await wrapper.vm.$nextTick();

    const value = await promise;
    expect(value).toBe(true);
    expect(result.isOpen.value).toBe(false);
    expect(result.isPending.value).toBe(false);
  });

  it("handleCancel resolves with false", async () => {
    const { result, wrapper } = withSetup(() => useConfirmDialog());

    const promise = result.confirm();
    result.handleCancel();
    await wrapper.vm.$nextTick();

    const value = await promise;
    expect(value).toBe(false);
    expect(result.isOpen.value).toBe(false);
    expect(result.isPending.value).toBe(false);
  });

  it("close(result) resolves with given value", async () => {
    const { result, wrapper } = withSetup(() => useConfirmDialog());

    const promise = result.confirm();
    result.close(true);
    await wrapper.vm.$nextTick();

    const value = await promise;
    expect(value).toBe(true);
  });
});
