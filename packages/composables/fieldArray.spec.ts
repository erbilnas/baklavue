import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { defineComponent, ref } from "vue";
import { useFieldArray } from "./fieldArray";

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

describe("useFieldArray", () => {
  it("returns fields from initial array", () => {
    const arr = ref(["a", "b"]);
    const { result } = withSetup(() => useFieldArray(arr));

    expect(result.fields.value).toHaveLength(2);
    expect(result.fields.value[0]?.value).toBe("a");
    expect(result.fields.value[1]?.value).toBe("b");
    expect(result.fields.value[0]?.key).toBeTruthy();
    expect(result.fields.value[1]?.key).toBeTruthy();
  });

  it("push adds item to array", async () => {
    const arr = ref<string[]>([]);
    const { result, wrapper } = withSetup(() => useFieldArray(arr));

    result.push("first");
    await wrapper.vm.$nextTick();

    expect(arr.value).toEqual(["first"]);
    expect(result.fields.value).toHaveLength(1);
    expect(result.fields.value[0]?.value).toBe("first");

    result.push("second");
    await wrapper.vm.$nextTick();
    expect(arr.value).toEqual(["first", "second"]);
  });

  it("remove removes item at index", async () => {
    const arr = ref(["a", "b", "c"]);
    const { result, wrapper } = withSetup(() => useFieldArray(arr));

    result.remove(1);
    await wrapper.vm.$nextTick();

    expect(arr.value).toEqual(["a", "c"]);
    expect(result.fields.value).toHaveLength(2);
  });

  it("insert adds item at index", async () => {
    const arr = ref(["a", "c"]);
    const { result, wrapper } = withSetup(() => useFieldArray(arr));

    result.insert(1, "b");
    await wrapper.vm.$nextTick();

    expect(arr.value).toEqual(["a", "b", "c"]);
  });

  it("move reorders items", async () => {
    const arr = ref(["a", "b", "c"]);
    const { result, wrapper } = withSetup(() => useFieldArray(arr));

    result.move(0, 2);
    await wrapper.vm.$nextTick();

    expect(arr.value).toEqual(["b", "c", "a"]);
  });

  it("replace replaces entire array", async () => {
    const arr = ref(["a", "b"]);
    const { result, wrapper } = withSetup(() => useFieldArray(arr));

    result.replace(["x", "y", "z"]);
    await wrapper.vm.$nextTick();

    expect(arr.value).toEqual(["x", "y", "z"]);
    expect(result.fields.value).toHaveLength(3);
  });

  it("reset replaces with values or empties", async () => {
    const arr = ref(["a", "b"]);
    const { result, wrapper } = withSetup(() => useFieldArray(arr));

    result.reset(["new"]);
    await wrapper.vm.$nextTick();
    expect(arr.value).toEqual(["new"]);

    result.reset();
    await wrapper.vm.$nextTick();
    expect(arr.value).toEqual([]);
  });

  it("fields have stable keys across updates", async () => {
    const arr = ref([{ name: "a" }, { name: "b" }]);
    const { result, wrapper } = withSetup(() => useFieldArray(arr));

    const key0 = result.fields.value[0]?.key;
    const key1 = result.fields.value[1]?.key;

    arr.value[0] = { name: "a-modified" };
    await wrapper.vm.$nextTick();

    expect(result.fields.value[0]?.key).toBe(key0);
    expect(result.fields.value[1]?.key).toBe(key1);
  });

  it("keyName option supports custom key extractor", () => {
    const arr = ref([{ id: "1", name: "a" }]);
    const { result } = withSetup(() => useFieldArray(arr, { keyName: "id" }));

    expect(result.fields.value[0]?.value).toEqual({ id: "1", name: "a" });
    expect(result.fields.value[0]?.key).toBe("1");
  });

  it("keyName property falls back to generated key when value is null", () => {
    const arr = ref([{ id: null as unknown as string, name: "a" }]);
    const { result } = withSetup(() => useFieldArray(arr, { keyName: "id" }));

    expect(result.fields.value[0]?.key).toBeTruthy();
    expect(typeof result.fields.value[0]?.key).toBe("string");
  });

  it("keyName as function returns custom key from item and index", () => {
    const arr = ref([
      { name: "a", slug: "item-a" },
      { name: "b", slug: "item-b" },
    ]);
    const { result } = withSetup(() =>
      useFieldArray(arr, {
        keyName: (item, index) =>
          `${(item as { slug: string }).slug}-${index}`,
      }),
    );

    expect(result.fields.value[0]?.key).toBe("item-a-0");
    expect(result.fields.value[1]?.key).toBe("item-b-1");
  });

  it("syncKeys removes keys when array shrinks", async () => {
    const arr = ref(["a", "b", "c"]);
    const { result, wrapper } = withSetup(() => useFieldArray(arr));

    expect(result.fields.value).toHaveLength(3);

    arr.value = ["a", "b"];
    await wrapper.vm.$nextTick();
    expect(result.fields.value).toHaveLength(2);
  });

  it("syncKeys adds keys when array grows", async () => {
    const arr = ref<string[]>([]);
    const { result, wrapper } = withSetup(() => useFieldArray(arr));

    result.push("a");
    await wrapper.vm.$nextTick();
    result.push("b");
    await wrapper.vm.$nextTick();

    expect(result.fields.value).toHaveLength(2);
    expect(result.fields.value[0]?.key).not.toBe(result.fields.value[1]?.key);
  });
});
