import { mount } from "@vue/test-utils";
import { describe, expect, it, vi } from "vitest";
import { defineComponent, ref } from "vue";
import { z } from "zod";
import { useZodForm } from "./formValidation";

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

const testSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "At least 8 characters"),
});

describe("useZodForm", () => {
  it("returns all expected API", () => {
    const form = ref({ email: "", password: "" });
    const { result } = withSetup(() =>
      useZodForm(testSchema, form, { mode: "lazy" }),
    );

    expect(typeof result.validate).toBe("function");
    expect(typeof result.validateField).toBe("function");
    expect(typeof result.clearErrors).toBe("function");
    expect(typeof result.reset).toBe("function");
    expect(typeof result.getError).toBe("function");
    expect(typeof result.getErrors).toBe("function");
    expect(typeof result.handleSubmit).toBe("function");
    expect(typeof result.scrollToFirstError).toBe("function");
    expect(typeof result.setFieldValue).toBe("function");
    expect(typeof result.setErrors).toBe("function");
    expect(typeof result.setFieldError).toBe("function");
    expect(typeof result.setFieldTouched).toBe("function");
    expect(result.errors).toBeDefined();
    expect(result.isValid).toBeDefined();
    expect(result.initialValues).toBeDefined();
    expect(result.isDirty).toBeDefined();
    expect(result.dirtyFields).toBeDefined();
    expect(result.touched).toBeDefined();
    expect(result.touchedFields).toBeDefined();
    expect(result.isSubmitting).toBeDefined();
    expect(result.isSubmitted).toBeDefined();
    expect(result.submitCount).toBeDefined();
  });

  it("validate returns null for valid data", async () => {
    const form = ref({
      email: "test@example.com",
      password: "password123",
    });
    const { result } = withSetup(() =>
      useZodForm(testSchema, form, { mode: "lazy" }),
    );

    const errors = await result.validate();
    expect(errors).toBeNull();
    expect(result.isValid.value).toBe(true);
    expect(result.errors.value).toBeNull();
  });

  it("validate returns errors for invalid data", async () => {
    const form = ref({
      email: "invalid",
      password: "short",
    });
    const { result } = withSetup(() =>
      useZodForm(testSchema, form, { mode: "lazy" }),
    );

    const errors = await result.validate();
    expect(errors).not.toBeNull();
    expect(errors).toHaveProperty("email");
    expect(errors).toHaveProperty("password");
    expect(result.isValid.value).toBe(false);
  });

  it("getError returns first error message for path", async () => {
    const form = ref({
      email: "invalid",
      password: "short",
    });
    const { result } = withSetup(() =>
      useZodForm(testSchema, form, { mode: "lazy" }),
    );

    await result.validate();
    expect(result.getError("email")).toBe("Invalid email");
    expect(result.getError("password")).toBe("At least 8 characters");
  });

  it("getErrors returns all error messages for path", async () => {
    const schema = z.object({
      field: z.string().min(2).email("Invalid email"),
    });
    const form = ref({ field: "a" });
    const { result } = withSetup(() =>
      useZodForm(schema, form, { mode: "lazy" }),
    );

    await result.validate();
    const errors = result.getErrors("field");
    expect(errors.length).toBeGreaterThan(0);
  });

  it("clearErrors clears errors", async () => {
    const form = ref({ email: "invalid", password: "short" });
    const { result } = withSetup(() =>
      useZodForm(testSchema, form, { mode: "lazy" }),
    );

    await result.validate();
    expect(result.errors.value).not.toBeNull();

    result.clearErrors();
    expect(result.errors.value).toBeNull();
  });

  it("setFieldError sets error for path", async () => {
    const form = ref({ email: "test@example.com", password: "password123" });
    const { result, wrapper } = withSetup(() =>
      useZodForm(testSchema, form, { mode: "lazy" }),
    );

    result.setFieldError("email", "Custom error");
    await wrapper.vm.$nextTick();

    expect(result.getError("email")).toBe("Custom error");
    expect(result.isValid.value).toBe(false);
  });

  it("setFieldValue updates form data", async () => {
    const form = ref<Record<string, string>>({
      email: "",
      password: "",
    });
    const { result, wrapper } = withSetup(() =>
      useZodForm(testSchema, form, { mode: "lazy" }),
    );

    result.setFieldValue("email", "new@example.com");
    await wrapper.vm.$nextTick();

    expect(form.value["email"]).toBe("new@example.com");
  });

  it("reset clears state and optionally sets new initial values", async () => {
    const form = ref({ email: "a@b.com", password: "password123" });
    const { result, wrapper } = withSetup(() =>
      useZodForm(testSchema, form, { mode: "lazy" }),
    );

    await result.validate();
    result.setFieldError("email", "test");
    result.reset({ email: "reset@example.com", password: "password123" });
    await wrapper.vm.$nextTick();

    expect(result.errors.value).toBeNull();
    expect(result.isSubmitted.value).toBe(false);
    expect(result.submitCount.value).toBe(0);
    expect(form.value["email"]).toBe("reset@example.com");
  });

  it("handleSubmit validates and calls onSubmit when valid", async () => {
    const form = ref({
      email: "test@example.com",
      password: "password123",
    });
    const { result, wrapper } = withSetup(() =>
      useZodForm(testSchema, form, { mode: "lazy" }),
    );

    const onSubmit = vi.fn().mockResolvedValue("success");

    const outcome = await result.handleSubmit(onSubmit);
    await wrapper.vm.$nextTick();

    expect(onSubmit).toHaveBeenCalled();
    expect(outcome).toBe("success");
  });

  it("handleSubmit rejects when validation fails", async () => {
    const form = ref({ email: "invalid", password: "short" });
    const { result } = withSetup(() =>
      useZodForm(testSchema, form, { mode: "lazy" }),
    );

    const onSubmit = vi.fn();

    await expect(result.handleSubmit(onSubmit)).rejects.toBeDefined();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("isDirty reflects when form differs from initial", async () => {
    const form = ref({ email: "a@b.com", password: "password123" });
    const { result, wrapper } = withSetup(() =>
      useZodForm(testSchema, form, { mode: "lazy" }),
    );

    expect(result.isDirty.value).toBe(false);

    form.value.email = "changed@example.com";
    await wrapper.vm.$nextTick();

    expect(result.isDirty.value).toBe(true);
  });

  it("validateField validates specific field when schema exists at path", async () => {
    const form = ref({ email: "invalid", password: "password123" });
    const { result } = withSetup(() =>
      useZodForm(testSchema, form, { mode: "lazy" }),
    );

    const errs = await result.validateField("email");
    expect(errs).toHaveProperty("email");
    expect(result.getError("email")).toBe("Invalid email");
  });

  it("validateField falls back to full validate when no schema at path", async () => {
    const form = ref({ email: "invalid", password: "short" });
    const { result } = withSetup(() =>
      useZodForm(testSchema, form, { mode: "lazy" }),
    );

    await result.validateField("nonexistent");
    expect(result.errors.value).not.toBeNull();
  });

  it("validateField clears field error when field becomes valid", async () => {
    const schema = z.object({ a: z.string().min(1), b: z.string().min(1) });
    const form = ref({ a: "x", b: "" });
    const { result } = withSetup(() =>
      useZodForm(schema, form, { mode: "lazy" }),
    );

    await result.validate();
    expect(result.errors.value).toHaveProperty("b");
    form.value.b = "valid";
    await result.validateField("b");
    expect(result.errors.value?.["b"]).toBeUndefined();
  });

  it("scrollToFirstError uses custom fieldSelector", async () => {
    const form = ref({ email: "invalid", password: "short" });
    const { result } = withSetup(() =>
      useZodForm(testSchema, form, { mode: "lazy" }),
    );

    await result.validate();
    const scrollResult = result.scrollToFirstError({
      fieldSelector: (path) => `[data-field="${path}"]`,
    });
    expect(typeof scrollResult.success).toBe("boolean");
  });

  it("setErrors with null clears errors", async () => {
    const form = ref({ email: "invalid", password: "short" });
    const { result } = withSetup(() =>
      useZodForm(testSchema, form, { mode: "lazy" }),
    );

    await result.validate();
    expect(result.errors.value).not.toBeNull();
    result.setErrors(null);
    expect(result.errors.value).toBeNull();
    expect(result.isValid.value).toBe(true);
  });

  it("setFieldTouched marks field as touched", async () => {
    const form = ref({ email: "", password: "" });
    const { result, wrapper } = withSetup(() =>
      useZodForm(testSchema, form, { mode: "lazy" }),
    );

    expect(result.touched.value).toBe(false);
    result.setFieldTouched("email");
    await wrapper.vm.$nextTick();
    expect(result.touchedFields.value["email"]).toBe(true);
    expect(result.touched.value).toBe(true);
  });

  it("reset without initialValuesArg uses current data", async () => {
    const form = ref({ email: "a@b.com", password: "password123" });
    const { result, wrapper } = withSetup(() =>
      useZodForm(testSchema, form, { mode: "lazy" }),
    );

    result.setFieldError("email", "err");
    result.reset();
    await wrapper.vm.$nextTick();
    expect(result.initialValues.value).toEqual({
      email: "a@b.com",
      password: "password123",
    });
  });

  it("getError returns undefined when no errors", () => {
    const form = ref({ email: "test@example.com", password: "password123" });
    const { result } = withSetup(() =>
      useZodForm(testSchema, form, { mode: "lazy" }),
    );

    expect(result.getError("email")).toBeUndefined();
  });

  it("getErrors returns empty array when no errors", () => {
    const form = ref({ email: "test@example.com", password: "password123" });
    const { result } = withSetup(() =>
      useZodForm(testSchema, form, { mode: "lazy" }),
    );

    expect(result.getErrors("email")).toEqual([]);
  });

  it("eager mode runs validation watch on mount", async () => {
    const form = ref({ email: "invalid", password: "short" });
    const { result, wrapper } = withSetup(() =>
      useZodForm(testSchema, form, { mode: "eager" }),
    );

    await new Promise((r) => setTimeout(r, 50));
    form.value.email = "still-invalid";
    await wrapper.vm.$nextTick();
    await new Promise((r) => setTimeout(r, 50));
    expect(result.errors.value).not.toBeNull();
  });

  it("setFieldValue with non-ref data still updates", async () => {
    const form = { email: "", password: "" };
    const reactiveForm = ref(form);
    const { result } = withSetup(() =>
      useZodForm(testSchema, () => reactiveForm.value, { mode: "lazy" }),
    );

    result.setFieldValue("email", "new@example.com");
    expect(reactiveForm.value.email).toBe("new@example.com");
  });

  it("eager mode with debounce debounces validation", async () => {
    const form = ref({ email: "invalid", password: "short" });
    const { result, wrapper } = withSetup(() =>
      useZodForm(testSchema, form, { mode: "eager", debounce: 50 }),
    );

    form.value.email = "still-invalid";
    await wrapper.vm.$nextTick();
    await new Promise((r) => setTimeout(r, 30));
    form.value.email = "another-invalid";
    await wrapper.vm.$nextTick();
    await new Promise((r) => setTimeout(r, 60));
    expect(result.errors.value).not.toBeNull();
  });

  it("scrollToFirstError returns success false when no errors", () => {
    const form = ref({ email: "test@example.com", password: "password123" });
    const { result } = withSetup(() =>
      useZodForm(testSchema, form, { mode: "lazy" }),
    );

    const r = result.scrollToFirstError();
    expect(r.success).toBe(false);
  });

  it("validateField mergeFieldErrors removes path when field valid", async () => {
    const form = ref({ email: "invalid", password: "password123" });
    const { result } = withSetup(() =>
      useZodForm(testSchema, form, { mode: "lazy" }),
    );

    await result.validate();
    expect(result.errors.value).toHaveProperty("email");
    form.value.email = "valid@example.com";
    await result.validateField("email");
    expect(result.errors.value?.["email"]).toBeUndefined();
  });
});
