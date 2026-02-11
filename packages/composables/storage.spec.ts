import { mount } from "@vue/test-utils";
import { defineComponent } from "vue";
import { afterEach, describe, expect, it } from "vitest";
import { useLocalStorage, useSessionStorage } from "./storage";

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

describe("useLocalStorage", () => {
  const key = "test-local-" + Math.random();

  afterEach(() => {
    localStorage.removeItem(key);
  });

  it("returns defaultValue when key is absent", () => {
    const { result } = withSetup(() => useLocalStorage(key, "default"));

    expect(result.value).toBe("default");
  });

  it("persists value to localStorage", async () => {
    const { result, wrapper } = withSetup(() => useLocalStorage(key, "initial"));

    result.value = "updated";
    await wrapper.vm.$nextTick();

    expect(localStorage.getItem(key)).toBe('"updated"');
    expect(result.value).toBe("updated");
  });

  it("reads existing value from localStorage", () => {
    localStorage.setItem(key, JSON.stringify("stored"));

    const { result } = withSetup(() => useLocalStorage(key, "default"));

    expect(result.value).toBe("stored");
  });

  it("handles object values", async () => {
    const key2 = "test-obj-" + Math.random();
    const defaultValue = { count: 0 };
    const { result, wrapper } = withSetup(() =>
      useLocalStorage(key2, defaultValue),
    );

    result.value = { count: 5 };
    await wrapper.vm.$nextTick();

    expect(JSON.parse(localStorage.getItem(key2)!)).toEqual({ count: 5 });

    localStorage.removeItem(key2);
  });
});

describe("useSessionStorage", () => {
  const key = "test-session-" + Math.random();

  afterEach(() => {
    sessionStorage.removeItem(key);
  });

  it("returns defaultValue when key is absent", () => {
    const { result } = withSetup(() => useSessionStorage(key, "default"));

    expect(result.value).toBe("default");
  });

  it("persists value to sessionStorage", async () => {
    const { result, wrapper } = withSetup(() =>
      useSessionStorage(key, "initial"),
    );

    result.value = "updated";
    await wrapper.vm.$nextTick();

    expect(sessionStorage.getItem(key)).toBe('"updated"');
    expect(result.value).toBe("updated");
  });

  it("reads existing value from sessionStorage", () => {
    sessionStorage.setItem(key, JSON.stringify("stored"));

    const { result } = withSetup(() => useSessionStorage(key, "default"));

    expect(result.value).toBe("stored");
  });
});
