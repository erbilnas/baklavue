import { mount } from "@vue/test-utils";
import { defineComponent, ref } from "vue";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useClipboard } from "./clipboard";

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

describe("useClipboard", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "navigator",
      Object.assign({}, navigator, {
        clipboard: {
          writeText: vi.fn().mockResolvedValue(undefined),
        },
      }),
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("copy() returns false when text is empty", async () => {
    const { result } = withSetup(() => useClipboard());
    const ok = await result.copy("");
    expect(ok).toBe(false);
    expect(result.copied.value).toBe(false);
  });

  it("copy() returns false when no text and no source", async () => {
    const { result } = withSetup(() => useClipboard());
    const ok = await result.copy();
    expect(ok).toBe(false);
  });

  it("copy() copies text via Clipboard API and sets copied", async () => {
    const { result } = withSetup(() => useClipboard());
    const ok = await result.copy("test text");
    expect(ok).toBe(true);
    expect(result.copied.value).toBe(true);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith("test text");
  });

  it("copy() uses source when no text provided", async () => {
    const source = ref("default text");
    const { result } = withSetup(() =>
      useClipboard({ source }),
    );
    const ok = await result.copy();
    expect(ok).toBe(true);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith("default text");
  });

  it("copiedDuring resets copied after delay", async () => {
    vi.useFakeTimers();
    const { result } = withSetup(() =>
      useClipboard({ copiedDuring: 1000 }),
    );

    await result.copy("text");
    expect(result.copied.value).toBe(true);

    vi.advanceTimersByTime(999);
    expect(result.copied.value).toBe(true);

    vi.advanceTimersByTime(1);
    expect(result.copied.value).toBe(false);

    vi.useRealTimers();
  });

  it("isSupported is true when navigator.clipboard exists", () => {
    const { result } = withSetup(() => useClipboard());
    expect(result.isSupported.value).toBe(true);
  });

  it("legacy fallback when Clipboard API fails", async () => {
    vi.mocked(navigator.clipboard.writeText).mockRejectedValue(
      new Error("Not allowed"),
    );

    const execCommand = vi.fn().mockReturnValue(true);
    Object.defineProperty(document, "execCommand", {
      value: execCommand,
      configurable: true,
    });

    const { result } = withSetup(() => useClipboard({ legacy: true }));

    const ok = await result.copy("legacy text");
    expect(ok).toBe(true);
    expect(result.copied.value).toBe(true);
    expect(execCommand).toHaveBeenCalledWith("copy");
  });
});
