import { mount } from "@vue/test-utils";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { defineComponent, ref } from "vue";
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

    const { result } = withSetup(() => useFetch("/api/user", { retry: false }));

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

  it("beforeFetch can modify url", async () => {
    const { result } = withSetup(() =>
      useFetch("/api/user", {
        immediate: true,
        beforeFetch: (ctx) => {
          ctx.url = "/api/user/modified";
        },
      }),
    );

    await new Promise((r) => setTimeout(r, 50));

    expect(globalThis.fetch).toHaveBeenCalledWith(
      "/api/user/modified",
      expect.any(Object),
    );
    expect(result.data.value).toEqual({ id: 1, name: "test" });
  });

  it("afterFetch can transform response", async () => {
    const { result } = withSetup(() =>
      useFetch("/api/user", {
        immediate: true,
        afterFetch: ({ data }) =>
          ({ ...(data as Record<string, unknown>), transformed: true }),
      }),
    );

    await new Promise((r) => setTimeout(r, 50));

    expect(result.data.value).toEqual({
      id: 1,
      name: "test",
      transformed: true,
    });
  });

  it("onFetchError is called on error", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockRejectedValue(new Error("Network error")),
    );

    const onFetchError = vi.fn();
    const { result } = withSetup(() =>
      useFetch("/api/user", { retry: false, onFetchError }),
    );

    await new Promise((r) => setTimeout(r, 50));

    expect(onFetchError).toHaveBeenCalledWith({
      response: null,
      error: expect.any(Error),
    });
    expect(result.error.value).toBeTruthy();
  });

  it("retries on network error", async () => {
    const fetchMock = vi
      .fn()
      .mockRejectedValueOnce(new Error("Failed to fetch"))
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        headers: new Headers({ "content-type": "application/json" }),
        json: () => Promise.resolve({ id: 1 }),
        text: () => Promise.resolve(""),
        blob: () => Promise.resolve(new Blob()),
        arrayBuffer: () => Promise.resolve(new ArrayBuffer(0)),
      });

    vi.stubGlobal("fetch", fetchMock);

    const { result } = withSetup(() =>
      useFetch("/api/user", { retry: 2, retryDelay: 10 }),
    );

    await new Promise((r) => setTimeout(r, 100));

    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(result.data.value).toEqual({ id: 1 });
  });

  it("execute with overrides", async () => {
    const { result } = withSetup(() =>
      useFetch("/api/user", { immediate: false }),
    );

    await result.execute({
      url: "/api/other",
      params: { x: 1 },
    });

    expect(globalThis.fetch).toHaveBeenCalledWith(
      expect.stringContaining("/api/other"),
      expect.any(Object),
    );
    expect(globalThis.fetch).toHaveBeenCalledWith(
      expect.stringContaining("x=1"),
      expect.any(Object),
    );
  });

  it("abort cancels request", async () => {
    let resolveFetch: (value: unknown) => void;
    const fetchPromise = new Promise((resolve) => {
      resolveFetch = resolve;
    });
    const fetchMock = vi.fn().mockReturnValue(fetchPromise);

    vi.stubGlobal("fetch", fetchMock);

    const { result } = withSetup(() =>
      useFetch("/api/user", { immediate: true }),
    );

    await new Promise((r) => setTimeout(r, 10));
    expect(result.isFetching.value).toBe(true);

    result.abort();
    resolveFetch!({
      ok: true,
      status: 200,
      headers: new Headers(),
      json: () => Promise.resolve({}),
      text: () => Promise.resolve(""),
      blob: () => Promise.resolve(new Blob()),
      arrayBuffer: () => Promise.resolve(new ArrayBuffer(0)),
    });
    await new Promise((r) => setTimeout(r, 50));

    expect(result.isFetching.value).toBe(false);
  });

  it("parseResponse uses responseType", async () => {
    const blob = new Blob(["test"]);
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        headers: new Headers(),
        json: () => Promise.resolve({}),
        text: () => Promise.resolve("text"),
        blob: () => Promise.resolve(blob),
        arrayBuffer: () => Promise.resolve(new ArrayBuffer(0)),
      }),
    );

    const { result } = withSetup(() =>
      useFetch("/api/user", {
        immediate: true,
        responseType: "blob",
      }),
    );

    await new Promise((r) => setTimeout(r, 50));

    expect(result.data.value).toBeInstanceOf(Blob);
  });

  it("baseURL prepends to relative URLs", async () => {
    withSetup(() =>
      useFetch("users", {
        immediate: true,
        baseURL: "https://api.example.com",
      }),
    );

    await new Promise((r) => setTimeout(r, 50));

    expect(globalThis.fetch).toHaveBeenCalledWith(
      "https://api.example.com/users",
      expect.any(Object),
    );
  });

  it("baseURL prepends to relative URLs without leading slash", async () => {
    withSetup(() =>
      useFetch("/users", {
        immediate: true,
        baseURL: "https://api.example.com/",
      }),
    );

    await new Promise((r) => setTimeout(r, 50));

    expect(globalThis.fetch).toHaveBeenCalledWith(
      "https://api.example.com/users",
      expect.any(Object),
    );
  });

  it("does not modify absolute URLs when baseURL is set", async () => {
    withSetup(() =>
      useFetch("https://other.com/api", {
        immediate: true,
        baseURL: "https://api.example.com",
      }),
    );

    await new Promise((r) => setTimeout(r, 50));

    expect(globalThis.fetch).toHaveBeenCalledWith(
      "https://other.com/api",
      expect.any(Object),
    );
  });

  it("serializes array params", async () => {
    withSetup(() =>
      useFetch("/api/users", {
        immediate: true,
        params: { ids: [1, 2, 3] },
      }),
    );

    await new Promise((r) => setTimeout(r, 50));

    expect(globalThis.fetch).toHaveBeenCalledWith(
      expect.stringMatching(/ids=1&ids=2&ids=3|ids=1.*ids=2.*ids=3/),
      expect.any(Object),
    );
  });

  it("responseType text returns text", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        headers: new Headers(),
        json: () => Promise.resolve({}),
        text: () => Promise.resolve("plain text"),
        blob: () => Promise.resolve(new Blob()),
        arrayBuffer: () => Promise.resolve(new ArrayBuffer(0)),
      }),
    );

    const { result } = withSetup(() =>
      useFetch("/api/user", {
        immediate: true,
        responseType: "text",
      }),
    );

    await new Promise((r) => setTimeout(r, 50));

    expect(result.data.value).toBe("plain text");
  });

  it("responseType arraybuffer returns ArrayBuffer", async () => {
    const buf = new ArrayBuffer(8);
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        headers: new Headers(),
        json: () => Promise.resolve({}),
        text: () => Promise.resolve(""),
        blob: () => Promise.resolve(new Blob()),
        arrayBuffer: () => Promise.resolve(buf),
      }),
    );

    const { result } = withSetup(() =>
      useFetch("/api/user", {
        immediate: true,
        responseType: "arraybuffer",
      }),
    );

    await new Promise((r) => setTimeout(r, 50));

    expect(result.data.value).toBe(buf);
  });

  it("onFetchError rethrow prevents retry", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockRejectedValue(new Error("Network error")),
    );

    const onFetchError = vi.fn().mockRejectedValue(new Error("rethrown"));
    const { result } = withSetup(() =>
      useFetch("/api/user", { retry: 2, retryDelay: 10, onFetchError }),
    );

    await new Promise((r) => setTimeout(r, 100));

    expect(onFetchError).toHaveBeenCalled();
    expect(result.error.value).toBeTruthy();
  });

  it("execute with throwOnFailed throws on error", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockRejectedValue(new Error("Network error")),
    );

    const { result } = withSetup(() =>
      useFetch("/api/user", { immediate: false, retry: false }),
    );

    await expect(result.execute({ throwOnFailed: true })).rejects.toThrow(
      "Network error",
    );
  });

  it("execute with boolean true refetches", async () => {
    const { result } = withSetup(() =>
      useFetch("/api/user", { immediate: true }),
    );

    await new Promise((r) => setTimeout(r, 50));
    const initialCalls = vi.mocked(globalThis.fetch).mock
      .calls.length;

    await result.execute(true);
    await new Promise((r) => setTimeout(r, 50));

    expect(
      vi.mocked(globalThis.fetch).mock.calls.length,
    ).toBeGreaterThan(initialCalls);
  });

  it("abort clears timeout", async () => {
    const clearSpy = vi.spyOn(globalThis, "clearTimeout");
    vi.stubGlobal(
      "fetch",
      vi.fn().mockImplementation(
        () =>
          new Promise((_, reject) => {
            setTimeout(() => reject(new Error("timeout")), 1000);
          }),
      ),
    );

    const { result } = withSetup(() =>
      useFetch("/api/user", { immediate: true, timeout: 5000 }),
    );

    await new Promise((r) => setTimeout(r, 10));
    result.abort();
    await new Promise((r) => setTimeout(r, 50));

    expect(clearSpy).toHaveBeenCalled();
  });

  it("sets Content-Type for JSON body when not provided", async () => {
    withSetup(() =>
      useFetch("/api/user", {
        immediate: true,
        method: "POST",
        body: { key: "value" },
      }),
    );

    await new Promise((r) => setTimeout(r, 50));

    expect(globalThis.fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        headers: expect.objectContaining({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify({ key: "value" }),
      }),
    );
  });

  it("skips body for GET requests", async () => {
    withSetup(() =>
      useFetch("/api/user", {
        immediate: true,
        method: "GET",
        body: { key: "value" },
      }),
    );

    await new Promise((r) => setTimeout(r, 50));

    const call = vi.mocked(globalThis.fetch).mock.calls[0]?.[1];
    expect(call?.body).toBeUndefined();
  });

  it("retries on 5xx status", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce({
        ok: false,
        status: 503,
        statusText: "Service Unavailable",
        headers: new Headers(),
        json: () => Promise.resolve({}),
        text: () => Promise.resolve(""),
        blob: () => Promise.resolve(new Blob()),
        arrayBuffer: () => Promise.resolve(new ArrayBuffer(0)),
      })
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        headers: new Headers({ "content-type": "application/json" }),
        json: () => Promise.resolve({ id: 1 }),
        text: () => Promise.resolve(""),
        blob: () => Promise.resolve(new Blob()),
        arrayBuffer: () => Promise.resolve(new ArrayBuffer(0)),
      });

    vi.stubGlobal("fetch", fetchMock);

    const { result } = withSetup(() =>
      useFetch("/api/user", {
        retry: 3,
        retryDelay: 50,
        retryCondition: (err) => err.message.includes("503"),
      }),
    );

    await new Promise((r) => setTimeout(r, 200));

    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(result.data.value).toEqual({ id: 1 });
  });

  it("refetchOnUrlChange refetches when url getter changes", async () => {
    const url = ref("/api/a");
    withSetup(() =>
      useFetch(() => url.value, {
        immediate: true,
        refetchOnUrlChange: true,
      }),
    );

    await new Promise((r) => setTimeout(r, 50));
    expect(
      vi.mocked(globalThis.fetch).mock.calls[0][0],
    ).toBe("/api/a");

    url.value = "/api/b";
    await new Promise((r) => setTimeout(r, 150));

    expect(
      vi.mocked(globalThis.fetch).mock.calls.some(
        (c) => c[0] === "/api/b",
      ),
    ).toBe(true);
  });

  it("refetchOnWindowFocus refetches on focus", async () => {
    withSetup(() =>
      useFetch("/api/user", {
        immediate: true,
        refetchOnWindowFocus: true,
      }),
    );

    await new Promise((r) => setTimeout(r, 50));
    const initialCalls = vi.mocked(globalThis.fetch).mock
      .calls.length;

    window.dispatchEvent(new Event("focus"));
    await new Promise((r) => setTimeout(r, 50));

    expect(
      vi.mocked(globalThis.fetch).mock.calls.length,
    ).toBeGreaterThan(initialCalls);
  });

  it("buildRequestBody converts non-object body to string", async () => {
    withSetup(() =>
      useFetch("/api/user", {
        immediate: true,
        method: "POST",
        body: 123,
      }),
    );

    await new Promise((r) => setTimeout(r, 50));

    expect(globalThis.fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        body: "123",
      }),
    );
  });

  it("returns early on AbortError", async () => {
    const abortError = new Error("Aborted");
    abortError.name = "AbortError";
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(abortError));

    const { result } = withSetup(() =>
      useFetch("/api/user", { immediate: true, retry: false }),
    );

    await new Promise((r) => setTimeout(r, 50));

    expect(result.error.value).toBeNull();
    expect(result.data.value).toBeNull();
  });

  it("clears timeout when fetch succeeds before timeout", async () => {
    const clearSpy = vi.spyOn(globalThis, "clearTimeout");
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        headers: new Headers({ "content-type": "application/json" }),
        json: () => Promise.resolve({ id: 1 }),
        text: () => Promise.resolve(""),
        blob: () => Promise.resolve(new Blob()),
        arrayBuffer: () => Promise.resolve(new ArrayBuffer(0)),
      }),
    );

    const { result } = withSetup(() =>
      useFetch("/api/user", { immediate: true, timeout: 5000 }),
    );

    await new Promise((r) => setTimeout(r, 50));

    expect(clearSpy).toHaveBeenCalled();
    expect(result.data.value).toEqual({ id: 1 });
  });

  it("refetchOnReconnect refetches on online", async () => {
    withSetup(() =>
      useFetch("/api/user", {
        immediate: true,
        refetchOnReconnect: true,
      }),
    );

    await new Promise((r) => setTimeout(r, 50));
    const initialCalls = vi.mocked(globalThis.fetch).mock
      .calls.length;

    window.dispatchEvent(new Event("online"));
    await new Promise((r) => setTimeout(r, 50));

    expect(
      vi.mocked(globalThis.fetch).mock.calls.length,
    ).toBeGreaterThan(initialCalls);
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
