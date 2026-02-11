import { mount } from "@vue/test-utils";
import { defineComponent } from "vue";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useCookie } from "./cookie";

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

describe("useCookie", () => {
  const key = "test-cookie-" + Math.random();

  afterEach(() => {
    document.cookie = `${key}=; path=/; max-age=0`;
  });

  it("returns defaultValue when cookie is absent", () => {
    const { result } = withSetup(() => useCookie(key, "default"));

    expect(result.value.value).toBe("default");
  });

  it("set updates value and cookie", async () => {
    const { result, wrapper } = withSetup(() => useCookie(key, "initial"));

    result.set("updated");
    await wrapper.vm.$nextTick();

    expect(result.value.value).toBe("updated");
    expect(document.cookie).toContain(key);
  });

  it("reads existing cookie from document", () => {
    document.cookie = `${key}=${encodeURIComponent(JSON.stringify("stored"))}; path=/`;

    const { result } = withSetup(() => useCookie(key, "default"));

    expect(result.value.value).toBe("stored");
  });

  it("remove resets to defaultValue", async () => {
    const { result, wrapper } = withSetup(() => useCookie(key, "default"));

    result.set("value");
    await wrapper.vm.$nextTick();
    expect(result.value.value).toBe("value");

    result.remove();
    await wrapper.vm.$nextTick();
    expect(result.value.value).toBe("default");
  });

  it("get reads current value from cookie", async () => {
    const { result, wrapper } = withSetup(() => useCookie(key, "default"));

    result.set("stored");
    await wrapper.vm.$nextTick();
    expect(result.get()).toBe("stored");
  });

  it("handles object values", async () => {
    const key2 = "test-obj-" + Math.random();
    const defaultValue = { count: 0 };
    const { result, wrapper } = withSetup(() =>
      useCookie(key2, defaultValue),
    );

    result.set({ count: 5 });
    await wrapper.vm.$nextTick();

    expect(result.value.value).toEqual({ count: 5 });

    document.cookie = `${key2}=; path=/; max-age=0`;
  });

  it("mergeDefaults merges stored object with default", async () => {
    const key2 = "test-merge-" + Math.random();
    document.cookie = `${key2}=${encodeURIComponent(JSON.stringify({ b: 2 }))}; path=/`;
    const defaultValue = { a: 1, b: 0 };
    const { result, wrapper } = withSetup(() =>
      useCookie(key2, defaultValue, { mergeDefaults: true }),
    );

    await wrapper.vm.$nextTick();
    expect(result.value.value).toEqual({ a: 1, b: 2 });

    document.cookie = `${key2}=; path=/; max-age=0`;
  });

  it("mergeDefaults with function merges values", async () => {
    const key2 = "test-merge-fn-" + Math.random();
    document.cookie = `${key2}=${encodeURIComponent(JSON.stringify({ x: 10 }))}; path=/`;
    const defaultValue = { x: 0, y: 1 };
    const { result, wrapper } = withSetup(() =>
      useCookie(key2, defaultValue, {
        mergeDefaults: (stored, def) => ({ ...def, ...stored }),
      }),
    );

    await wrapper.vm.$nextTick();
    expect(result.value.value).toEqual({ x: 10, y: 1 });

    document.cookie = `${key2}=; path=/; max-age=0`;
  });

  it("calls onError when serializer read fails", async () => {
    const key2 = "test-onerror-" + Math.random();
    document.cookie = `${key2}=invalid-json; path=/`;
    const onError = vi.fn();
    const { result, wrapper } = withSetup(() =>
      useCookie(key2, "default", {
        serializer: {
          read: () => {
            throw new Error("parse error");
          },
          write: (v) => JSON.stringify(v),
        },
        onError,
      }),
    );

    await wrapper.vm.$nextTick();
    expect(onError).toHaveBeenCalled();
    expect(result.value.value).toBe("default");
  });

  it("removes cookie when value is set to null", async () => {
    const key2 = "test-remove-null-" + Math.random();
    const { result, wrapper } = withSetup(() =>
      useCookie(key2, "default"),
    );

    result.set("value");
    await wrapper.vm.$nextTick();
    expect(document.cookie).toContain(key2);

    result.set(null as unknown as string);
    await wrapper.vm.$nextTick();
    expect(result.value.value).toBeNull();
  });

  it("get returns defaultValue when cookie is absent", () => {
    const key2 = "test-get-absent-" + Math.random();
    const { result } = withSetup(() => useCookie(key2, "default"));

    expect(result.get()).toBe("default");
  });
});
