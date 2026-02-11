import { mount } from "@vue/test-utils";
import { defineComponent, ref } from "vue";
import { describe, expect, it, vi } from "vitest";
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

    expect(form.value.email).toBe("new@example.com");
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
    expect(form.value.email).toBe("reset@example.com");
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
});
