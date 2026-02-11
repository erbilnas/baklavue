import { mount } from "@vue/test-utils";
import { defineComponent } from "vue";
import { afterEach, describe, expect, it } from "vitest";
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
});
