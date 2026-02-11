import { mount } from "@vue/test-utils";
import { defineComponent } from "vue";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useShare } from "./share";

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

describe("useShare", () => {
  const originalShare = navigator.share;
  const originalCanShare = navigator.canShare;

  beforeEach(() => {
    vi.stubGlobal(
      "navigator",
      Object.assign({}, navigator, {
        share: vi.fn().mockResolvedValue(undefined),
        canShare: vi.fn().mockReturnValue(true),
      }),
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("share() returns false when no data provided", async () => {
    const { result } = withSetup(() => useShare());

    const ok = await result.share();
    expect(ok).toBe(false);
    expect(result.error.value?.message).toBe("Share data is required");
  });

  it("share() returns false when data is empty", async () => {
    const { result } = withSetup(() => useShare());

    const ok = await result.share({});
    expect(ok).toBe(false);
  });

  it("share() returns true and sets shared when successful", async () => {
    const { result } = withSetup(() => useShare());

    const ok = await result.share({ title: "Test", url: "https://example.com" });
    expect(ok).toBe(true);
    expect(result.shared.value).toBe(true);
    expect(navigator.share).toHaveBeenCalledWith({
      title: "Test",
      url: "https://example.com",
    });
  });

  it("share() uses default data when called without args", async () => {
    const { result } = withSetup(() =>
      useShare({ data: { title: "Default", text: "Shared" } }),
    );

    const ok = await result.share();
    expect(ok).toBe(true);
    expect(navigator.share).toHaveBeenCalledWith({
      title: "Default",
      text: "Shared",
    });
  });

  it("share() calls onSuccess when successful", async () => {
    const onSuccess = vi.fn();
    const { result } = withSetup(() =>
      useShare({ onSuccess, data: { title: "Test" } }),
    );

    await result.share();
    expect(onSuccess).toHaveBeenCalledTimes(1);
  });

  it("share() sets error and calls onError when share fails", async () => {
    vi.mocked(navigator.share).mockRejectedValue(new Error("Share failed"));
    const onError = vi.fn();
    const { result } = withSetup(() =>
      useShare({ onError, data: { title: "Test" } }),
    );

    const ok = await result.share();
    expect(ok).toBe(false);
    expect(result.error.value?.message).toBe("Share failed");
    expect(onError).toHaveBeenCalled();
  });

  it("isSupported is true when navigator.share exists", () => {
    const { result } = withSetup(() => useShare());
    expect(result.isSupported.value).toBe(true);
  });
});
