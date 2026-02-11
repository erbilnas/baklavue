import { mount } from "@vue/test-utils";
import { defineComponent } from "vue";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createFetch, useFetch } from "./fetch";

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

describe("useFetch", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        statusText: "OK",
        headers: new Headers({ "content-type": "application/json" }),
        json: () => Promise.resolve({ id: 1, name: "test" }),
        text: () => Promise.resolve(""),
        blob: () => Promise.resolve(new Blob()),
        arrayBuffer: () => Promise.resolve(new ArrayBuffer(0)),
      }),
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("returns data, error, statusCode, isFetching, isFinished, execute, abort", () => {
    const { result } = withSetup(() =>
      useFetch("/api/user", { immediate: false }),
    );

    expect(result.data).toBeDefined();
    expect(result.error).toBeDefined();
    expect(result.statusCode).toBeDefined();
    expect(result.isFetching).toBeDefined();
    expect(result.isFinished).toBeDefined();
    expect(typeof result.execute).toBe("function");
    expect(typeof result.abort).toBe("function");
  });

  it("fetches on mount when immediate is true", async () => {
    const { result } = withSetup(() => useFetch("/api/user"));

    await new Promise((r) => setTimeout(r, 50));

    expect(globalThis.fetch).toHaveBeenCalledWith(
      "/api/user",
      expect.any(Object),
    );
    expect(result.data.value).toEqual({ id: 1, name: "test" });
    expect(result.statusCode.value).toBe(200);
    expect(result.isFetching.value).toBe(false);
    expect(result.isFinished.value).toBe(true);
  });

  it("does not fetch when immediate is false", async () => {
    const { result } = withSetup(() =>
      useFetch("/api/user", { immediate: false }),
    );

    await new Promise((r) => setTimeout(r, 50));

    expect(globalThis.fetch).not.toHaveBeenCalled();
    expect(result.data.value).toBeNull();
  });

  it("execute triggers fetch when immediate is false", async () => {
    const { result } = withSetup(() =>
      useFetch("/api/user", { immediate: false }),
    );

    await result.execute();

    expect(globalThis.fetch).toHaveBeenCalled();
    expect(result.data.value).toEqual({ id: 1, name: "test" });
  });

  it("uses initialData before fetch completes", () => {
    const initialData = { id: 0, placeholder: true };
    const { result } = withSetup(() =>
      useFetch("/api/user", { immediate: false, initialData }),
    );

    expect(result.data.value).toEqual(initialData);
  });

  it("appends params to URL", async () => {
    withSetup(() =>
      useFetch("/api/users", {
        immediate: true,
        params: { page: 1, limit: 10 },
      }),
    );

    await new Promise((r) => setTimeout(r, 50));

    expect(globalThis.fetch).toHaveBeenCalledWith(
      expect.stringContaining("page=1"),
      expect.any(Object),
    );
    expect(globalThis.fetch).toHaveBeenCalledWith(
      expect.stringContaining("limit=10"),
      expect.any(Object),
    );
  });

  it("handles fetch error", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockRejectedValue(new Error("Network error")),
    );

    const { result } = withSetup(() =>
      useFetch("/api/user", { retry: false }),
    );

    await new Promise((r) => setTimeout(r, 50));

    expect(result.error.value).toEqual(new Error("Network error"));
    expect(result.data.value).toBeNull();
    expect(result.isFinished.value).toBe(true);
  });

  it("validateStatus rejects non-2xx", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        status: 404,
        statusText: "Not Found",
        headers: new Headers(),
        json: () => Promise.resolve({}),
        text: () => Promise.resolve(""),
        blob: () => Promise.resolve(new Blob()),
        arrayBuffer: () => Promise.resolve(new ArrayBuffer(0)),
      }),
    );

    const { result } = withSetup(() =>
      useFetch("/api/user", {
        validateStatus: (s) => s >= 200 && s < 300,
      }),
    );

    await new Promise((r) => setTimeout(r, 50));

    expect(result.error.value).toBeTruthy();
    expect(result.error.value?.message).toContain("404");
  });
});

describe("createFetch", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        statusText: "OK",
        headers: new Headers({ "content-type": "application/json" }),
        json: () => Promise.resolve({ id: 1 }),
        text: () => Promise.resolve(""),
        blob: () => Promise.resolve(new Blob()),
        arrayBuffer: () => Promise.resolve(new ArrayBuffer(0)),
      }),
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("creates useFetch with default options", async () => {
    const useApiFetch = createFetch({
      baseURL: "https://api.example.com",
      headers: { "X-Custom": "value" },
    });

    const { result } = withSetup(() =>
      useApiFetch("/users", { immediate: true }),
    );

    await new Promise((r) => setTimeout(r, 50));

    expect(globalThis.fetch).toHaveBeenCalledWith(
      "https://api.example.com/users",
      expect.objectContaining({
        headers: expect.objectContaining({
          "X-Custom": "value",
        }),
      }),
    );
    expect(result.data.value).toEqual({ id: 1 });
  });
});
