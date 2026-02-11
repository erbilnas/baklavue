import { mount } from "@vue/test-utils";
import { defineComponent, ref } from "vue";
import { describe, expect, it } from "vitest";
import { useFormState } from "./formState";

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

describe("useFormState", () => {
  it("returns isDirty false when data matches initial", () => {
    const form = ref({ email: "" });
    const { result } = withSetup(() => useFormState(form));

    expect(result.isDirty.value).toBe(false);
    expect(result.touched.value).toBe(false);
    expect(Object.values(result.dirtyFields.value).some(Boolean)).toBe(false);
  });

  it("returns isDirty true when data differs from initial", async () => {
    const form = ref({ email: "", name: "" });
    const { result, wrapper } = withSetup(() => useFormState(form));

    form.value = { email: "test@test.com", name: "" };
    await wrapper.vm.$nextTick();

    expect(result.isDirty.value).toBe(true);
    expect(result.dirtyFields.value["email"]).toBe(true);
  });

  it("setFieldTouched marks field as touched", async () => {
    const form = ref({ email: "" });
    const { result, wrapper } = withSetup(() => useFormState(form));

    result.setFieldTouched("email");
    await wrapper.vm.$nextTick();

    expect(result.touched.value).toBe(true);
    expect(result.touchedFields.value["email"]).toBe(true);
  });

  it("setFieldTouched(path, false) removes touched", async () => {
    const form = ref({ email: "" });
    const { result, wrapper } = withSetup(() => useFormState(form));

    result.setFieldTouched("email");
    result.setFieldTouched("email", false);
    await wrapper.vm.$nextTick();

    expect(result.touchedFields.value["email"]).toBe(false);
  });

  it("setFieldValue updates nested path", async () => {
    const form = ref({ address: { city: "NYC" } });
    const { result, wrapper } = withSetup(() => useFormState(form));

    result.setFieldValue("address.city", "LA");
    await wrapper.vm.$nextTick();

    expect(form.value).toEqual({ address: { city: "LA" } });
  });

  it("reset clears touched and syncs initial", async () => {
    const form = ref({ email: "a@b.com" });
    const { result, wrapper } = withSetup(() => useFormState(form));

    result.setFieldTouched("email");
    form.value = { email: "changed@b.com" };
    await wrapper.vm.$nextTick();

    result.reset({ email: "reset@b.com" });
    await wrapper.vm.$nextTick();

    expect(result.touchedFields.value).toEqual({});
    expect(result.initialValues.value).toEqual({ email: "reset@b.com" });
    expect(form.value).toEqual({ email: "reset@b.com" });
  });

  it("reset without arg uses current data as new initial", async () => {
    const form = ref({ email: "current@b.com" });
    const { result, wrapper } = withSetup(() => useFormState(form));

    form.value = { email: "modified@b.com" };
    await wrapper.vm.$nextTick();
    expect(result.isDirty.value).toBe(true);

    result.reset();
    await wrapper.vm.$nextTick();

    expect(result.isDirty.value).toBe(false);
    expect(result.initialValues.value).toEqual({ email: "modified@b.com" });
  });

  it("respects initialValues option", () => {
    const form = ref({ email: "current" });
    const { result } = withSetup(() =>
      useFormState(form, { initialValues: { email: "initial" } }),
    );

    expect(result.initialValues.value).toEqual({ email: "initial" });
    expect(result.isDirty.value).toBe(true);
  });
});
