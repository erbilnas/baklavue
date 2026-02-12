import { mount } from "@vue/test-utils";
import { defineComponent } from "vue";
import { afterEach, describe, expect, it, vi } from "vitest";
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

  it("returns defaultValue when localStorage access throws", () => {
    const key2 = "test-throw-" + Math.random();
    const originalLocalStorage = window.localStorage;
    Object.defineProperty(window, "localStorage", {
      get: () => {
        throw new Error("Storage unavailable");
      },
      configurable: true,
    });

    const result = useLocalStorage(key2, "fallback");

    expect(result.value).toBe("fallback");

    Object.defineProperty(window, "localStorage", {
      value: originalLocalStorage,
      configurable: true,
    });
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

describe("storage options", () => {
  const key = "test-storage-options-" + Math.random();

  afterEach(() => {
    localStorage.removeItem(key);
  });

  it("mergeDefaults: true merges objects", () => {
    localStorage.setItem(key, JSON.stringify({ count: 5 }));
    const { result } = withSetup(() =>
      useLocalStorage(key, { count: 0, name: "default" }, { mergeDefaults: true }),
    );

    expect(result.value).toEqual({ count: 5, name: "default" });
  });

  it("mergeDefaults: function merges with custom logic", () => {
    localStorage.setItem(key, JSON.stringify({ a: 1 }));
    const { result } = withSetup(() =>
      useLocalStorage(key, { b: 2 }, {
        mergeDefaults: (stored, def) => ({ ...def, ...stored }),
      }),
    );

    expect(result.value).toEqual({ b: 2, a: 1 });
  });

  it("default serializer returns raw string on parse error", () => {
    localStorage.setItem(key, "invalid-json");
    const { result } = withSetup(() => useLocalStorage(key, "default"));

    expect(result.value).toBe("invalid-json");
  });

  it("calls onError when serializer.read throws", () => {
    const onError = vi.fn();
    localStorage.setItem(key, "not-json");
    const { result } = withSetup(() =>
      useLocalStorage(key, "default", {
        onError,
        serializer: {
          read: () => {
            throw new Error("Parse failed");
          },
          write: (v) => JSON.stringify(v),
        },
      }),
    );

    expect(result.value).toBe("default");
    expect(onError).toHaveBeenCalledWith(expect.any(Error));
  });

  it("removes item when value is null", async () => {
    const { result, wrapper } = withSetup(() =>
      useLocalStorage(key, "default"),
    );

    result.value = "set";
    await wrapper.vm.$nextTick();
    expect(localStorage.getItem(key)).toBeTruthy();

    result.value = null as unknown as string;
    await wrapper.vm.$nextTick();
    expect(localStorage.getItem(key)).toBeNull();
  });

  it("syncs to defaultValue when storage event has null newValue", async () => {
    const { result, wrapper } = withSetup(() =>
      useLocalStorage(key, "default"),
    );

    result.value = "set";
    await wrapper.vm.$nextTick();

    window.dispatchEvent(
      new StorageEvent("storage", {
        key,
        newValue: null,
        storageArea: localStorage,
      }),
    );
    await wrapper.vm.$nextTick();

    expect(result.value).toBe("default");
  });

  it("calls onError when watch setItem throws", async () => {
    const onError = vi.fn();
    const { result, wrapper } = withSetup(() =>
      useLocalStorage(key, "default", {
        onError,
        serializer: {
          read: (raw) => JSON.parse(raw),
          write: () => {
            throw new Error("QuotaExceeded");
          },
        },
      }),
    );

    result.value = "fail";
    await wrapper.vm.$nextTick();

    expect(onError).toHaveBeenCalled();
  });

  it("syncs storage event from other tab", async () => {
    const { result, wrapper } = withSetup(() =>
      useLocalStorage(key, "default"),
    );

    expect(result.value).toBe("default");

    window.dispatchEvent(
      new StorageEvent("storage", {
        key,
        newValue: JSON.stringify("from-other-tab"),
        storageArea: localStorage,
      }),
    );
    await wrapper.vm.$nextTick();

    expect(result.value).toBe("from-other-tab");
  });

  it("calls onError when storage event has invalid value", async () => {
    const onError = vi.fn();
    const { result, wrapper } = withSetup(() =>
      useLocalStorage(key, "default", {
        onError,
        serializer: {
          read: (raw) => {
            if (raw === "invalid") throw new Error("Parse failed");
            return JSON.parse(raw);
          },
          write: (v) => JSON.stringify(v),
        },
      }),
    );

    result.value = "valid";
    await wrapper.vm.$nextTick();

    window.dispatchEvent(
      new StorageEvent("storage", {
        key,
        newValue: "invalid",
        storageArea: localStorage,
      }),
    );
    await wrapper.vm.$nextTick();

    expect(onError).toHaveBeenCalled();
    expect(result.value).toBe("valid");
  });

});
