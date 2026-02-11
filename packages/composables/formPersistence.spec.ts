import { mount } from "@vue/test-utils";
import { defineComponent, ref } from "vue";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useFormPersistence } from "./formPersistence";

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

describe("useFormPersistence", () => {
  const key = "form-persistence-" + Math.random();

  beforeEach(() => {
    vi.useFakeTimers();
    localStorage.removeItem(key);
    sessionStorage.removeItem(key);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("hydrates form from storage when storage has data", () => {
    const stored = { email: "stored@test.com" };
    localStorage.setItem(key, JSON.stringify(stored));

    const form = ref<{ email: string } | null>({ email: "" });
    withSetup(() => useFormPersistence(key, form));

    expect(form.value).toEqual({ email: "stored@test.com" });
  });

  it("persists form to storage when data changes", async () => {
    const form = ref({ email: "initial@test.com" });
    const { result, wrapper } = withSetup(() =>
      useFormPersistence(key, form, { debounce: 300 }),
    );

    form.value = { email: "updated@test.com" };
    await wrapper.vm.$nextTick();

    vi.advanceTimersByTime(300);
    await wrapper.vm.$nextTick();

    expect(localStorage.getItem(key)).toBe(
      JSON.stringify({ email: "updated@test.com" }),
    );
  });

  it("clear removes persisted data", async () => {
    const form = ref({ email: "test@test.com" });
    const { result, wrapper } = withSetup(() =>
      useFormPersistence(key, form, { debounce: 0 }),
    );

    await wrapper.vm.$nextTick();
    expect(localStorage.getItem(key)).toBeTruthy();

    result.clear();
    await wrapper.vm.$nextTick();
    expect(localStorage.getItem(key)).toBeNull();
  });

  it("uses sessionStorage when option is set", async () => {
    const form = ref({ draft: "content" });
    const sessionKey = "session-" + Math.random();
    withSetup(() =>
      useFormPersistence(sessionKey, form, {
        storage: "sessionStorage",
        debounce: 0,
      }),
    );

    vi.advanceTimersByTime(0);
    await Promise.resolve();
    expect(sessionStorage.getItem(sessionKey)).toBeTruthy();

    sessionStorage.removeItem(sessionKey);
  });

  it("stops watch on unmount", async () => {
    const form = ref({ email: "test@test.com" });
    const { wrapper } = withSetup(() =>
      useFormPersistence(key, form, { debounce: 0 }),
    );

    form.value = { email: "updated@test.com" };
    await wrapper.vm.$nextTick();
    wrapper.unmount();
    form.value = { email: "should-not-persist" };
    await wrapper.vm.$nextTick();
    vi.advanceTimersByTime(500);
    expect(localStorage.getItem(key)).toBe(
      JSON.stringify({ email: "updated@test.com" }),
    );
  });
});
