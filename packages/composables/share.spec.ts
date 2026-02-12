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
  beforeEach(() => {
    vi.stubGlobal(
      "navigator",
      Object.assign({}, navigator, {
        share: vi.fn().mockResolvedValue(undefined),
        canShare: vi.fn().mockReturnValue(true),
      }),
    );
  });

  it("canShare uses canShare with files when data has files", () => {
    const files = [new File(["x"], "x.txt")];
    const canShareMock = vi.fn().mockReturnValue(true);
    vi.stubGlobal(
      "navigator",
      Object.assign({}, navigator, {
        share: vi.fn().mockResolvedValue(undefined),
        canShare: canShareMock,
      }),
    );

    const { result } = withSetup(() =>
      useShare({ data: { files } }),
    );

    expect(result.canShare.value).toBe(true);
    expect(canShareMock).toHaveBeenCalledWith({ files });
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

  it("share() returns false when API not supported", async () => {
    const navWithoutShare = Object.fromEntries(
      Object.entries(navigator).filter(([k]) => k !== "share"),
    ) as Navigator;
    vi.stubGlobal("navigator", navWithoutShare);
    const { result } = withSetup(() => useShare({ data: { title: "Test" } }));

    const ok = await result.share();
    expect(ok).toBe(false);
    expect(result.error.value?.message).toBe("Web Share API is not supported");

    vi.unstubAllGlobals();
  });

  it("share() returns false when canShare rejects files", async () => {
    vi.stubGlobal("navigator", {
      ...navigator,
      share: vi.fn().mockResolvedValue(undefined),
      canShare: vi.fn().mockReturnValue(false),
    });
    const file = new File(["x"], "test.txt");
    const { result } = withSetup(() =>
      useShare({ data: { files: [file] } }),
    );

    const ok = await result.share();
    expect(ok).toBe(false);
    expect(result.error.value?.message).toBe("Cannot share these files");

    vi.unstubAllGlobals();
  });

  it("share() does not set error on AbortError", async () => {
    vi.mocked(navigator.share).mockRejectedValue(
      Object.assign(new Error("Aborted"), { name: "AbortError" }),
    );
    const { result } = withSetup(() =>
      useShare({ data: { title: "Test" } }),
    );

    const ok = await result.share();
    expect(ok).toBe(false);
    expect(result.error.value).toBeNull();
  });

  it("canShare with files when canShare returns false", () => {
    vi.stubGlobal("navigator", {
      ...navigator,
      share: vi.fn().mockResolvedValue(undefined),
      canShare: vi.fn().mockReturnValue(false),
    });
    const file = new File(["x"], "test.txt");
    const { result } = withSetup(() =>
      useShare({ data: { files: [file] } }),
    );

    expect(result.canShare.value).toBe(false);
    vi.unstubAllGlobals();
  });

  it("canShare with files when canShare returns true", async () => {
    vi.stubGlobal("navigator", {
      ...navigator,
      share: vi.fn().mockResolvedValue(undefined),
      canShare: vi.fn().mockReturnValue(true),
    });
    const file = new File(["x"], "test.txt");
    const { result } = withSetup(() =>
      useShare({ data: { files: [file] } }),
    );

    expect(result.canShare.value).toBe(true);
    vi.unstubAllGlobals();
  });
});
