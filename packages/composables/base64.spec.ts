import { mount } from "@vue/test-utils";
import { defineComponent, ref } from "vue";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useBase64 } from "./base64";

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

describe("useBase64", () => {
  it("returns base64, execute, promise", () => {
    const { result } = withSetup(() => useBase64("hello"));

    expect(result.base64).toBeDefined();
    expect(result.execute).toBeDefined();
    expect(result.promise).toBeDefined();
  });

  it("encodes string to base64 with dataUrl", async () => {
    const { result, wrapper } = withSetup(() =>
      useBase64("hello", { dataUrl: true }),
    );

    await wrapper.vm.$nextTick();
    await result.execute();

    expect(result.base64.value).toMatch(/^data:text\/plain;base64,/);
    expect(result.base64.value).toContain("aGVsbG8=");
  });

  it("encodes string to raw base64 when dataUrl is false", async () => {
    const { result } = withSetup(() =>
      useBase64("AB", { dataUrl: false }),
    );

    await result.execute();

    expect(result.base64.value).toBe("QUI=");
    expect(result.base64.value).not.toContain("data:");
  });

  it("encodes string with special characters (unicode) to base64", async () => {
    const { result } = withSetup(() =>
      useBase64(" café", { dataUrl: false }),
    );

    await result.execute();

    expect(result.base64.value).toBeTruthy();
    expect(result.base64.value).not.toContain("data:");
  });

  it("clears base64 when target is null", async () => {
    const source = ref<string | undefined>("hello");
    const { result, wrapper } = withSetup(() => useBase64(source));

    await result.execute();
    expect(result.base64.value).toBeTruthy();

    source.value = undefined;
    await wrapper.vm.$nextTick();
    await new Promise((r) => setTimeout(r, 0));

    expect(result.base64.value).toBe("");
  });

  it("encode Blob to base64", async () => {
    const blob = new Blob(["test"], { type: "text/plain" });
    const { result } = withSetup(() => useBase64(blob));

    const encoded = await result.execute();

    expect(encoded).toMatch(/^data:text\/plain;base64,/);
    expect(result.base64.value).toBeTruthy();
  });

  it("encodes Blob to raw base64 when dataUrl is false", async () => {
    const blob = new Blob(["test"], { type: "text/plain" });
    const { result } = withSetup(() => useBase64(blob, { dataUrl: false }));

    const encoded = await result.execute();

    expect(encoded).not.toContain("data:");
    expect(encoded).toBeTruthy();
  });

  it("execute returns empty string for undefined", async () => {
    const { result } = withSetup(() => useBase64(undefined));

    const encoded = await result.execute();

    expect(encoded).toBe("");
    expect(result.base64.value).toBe("");
  });

  it("encodes ArrayBuffer to base64", async () => {
    const buffer = new TextEncoder().encode("test").buffer;
    const { result } = withSetup(() => useBase64(buffer));

    const encoded = await result.execute();
    expect(encoded).toMatch(/^data:.*;base64,/);
    expect(result.base64.value).toBeTruthy();
  });

  it("encodes HTMLCanvasElement to base64", async () => {
    const canvas = document.createElement("canvas");
    canvas.width = 10;
    canvas.height = 10;
    const mockDataUrl = "data:image/png;base64,mockCanvasBase64==";
    vi.spyOn(HTMLCanvasElement.prototype, "toDataURL").mockReturnValue(mockDataUrl);

    const { result } = withSetup(() =>
      useBase64(canvas, { type: "image/png", dataUrl: true }),
    );

    const encoded = await result.execute();
    expect(encoded).toMatch(/^data:image\/png;base64,/);
    vi.restoreAllMocks();
  });

  it("encodes HTMLCanvasElement without dataUrl returns raw base64", async () => {
    const canvas = document.createElement("canvas");
    canvas.width = 10;
    canvas.height = 10;
    const mockDataUrl = "data:image/png;base64,rawBase64Data";
    vi.spyOn(HTMLCanvasElement.prototype, "toDataURL").mockReturnValue(mockDataUrl);

    const { result } = withSetup(() =>
      useBase64(canvas, { type: "image/png", dataUrl: false }),
    );

    const encoded = await result.execute();
    expect(encoded).not.toContain("data:");
    expect(encoded).toBe("rawBase64Data");
    vi.restoreAllMocks();
  });

  it("encodes HTMLCanvasElement with quality option for jpeg", async () => {
    const canvas = document.createElement("canvas");
    canvas.width = 10;
    canvas.height = 10;
    const toDataURLSpy = vi
      .spyOn(HTMLCanvasElement.prototype, "toDataURL")
      .mockReturnValue("data:image/jpeg;base64,mock");

    const { result } = withSetup(() =>
      useBase64(canvas, { type: "image/jpeg", quality: 0.8, dataUrl: true }),
    );

    await result.execute();
    expect(toDataURLSpy).toHaveBeenCalledWith("image/jpeg", 0.8);
    vi.restoreAllMocks();
  });

  it("encodes HTMLImageElement when loaded", async () => {
    const img = document.createElement("img") as HTMLImageElement;
    Object.defineProperty(img, "complete", { value: true });
    Object.defineProperty(img, "naturalWidth", { value: 1 });
    Object.defineProperty(img, "naturalHeight", { value: 1 });
    const mockDataUrl = "data:image/png;base64,mockImageBase64==";
    vi.spyOn(HTMLCanvasElement.prototype, "toDataURL").mockReturnValue(mockDataUrl);
    const mockCtx = { drawImage: vi.fn() };
    vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(mockCtx as unknown as CanvasRenderingContext2D);

    const { result } = withSetup(() => useBase64(img));

    const encoded = await result.execute();
    expect(encoded).toMatch(/^data:image\/png;base64,/);
    vi.restoreAllMocks();
  });

  it("rejects when image fails to load", async () => {
    const img = document.createElement("img") as HTMLImageElement;
    Object.defineProperty(img, "complete", { value: false });
    Object.defineProperty(img, "naturalWidth", { value: 0 });

    const { result } = withSetup(() => useBase64(img));
    const loadPromise = result.execute();

    img.dispatchEvent(new Event("error"));

    await expect(loadPromise).rejects.toThrow("Image failed to load");
  });

  it("handles unknown source type as empty", async () => {
    const unknownSource = 123 as unknown as string;
    const { result } = withSetup(() => useBase64(unknownSource));

    const encoded = await result.execute();
    expect(encoded).toBe("");
    expect(result.base64.value).toBe("");
  });

  it("handles blob readAsDataURL result without comma in split fallback", async () => {
    const blob = new Blob(["test"], { type: "text/plain" });
    vi.spyOn(FileReader.prototype, "readAsDataURL").mockImplementation(function (this: FileReader) {
      queueMicrotask(() => {
        Object.defineProperty(this, "result", { value: "no-comma-here", configurable: true });
        (this as unknown as { onload: () => void }).onload?.();
      });
    });

    const { result } = withSetup(() => useBase64(blob, { dataUrl: false }));
    const encoded = await result.execute();
    expect(encoded).toBe("");
    vi.restoreAllMocks();
  });

  it("handles canvas toDataURL result without comma in split fallback", async () => {
    const canvas = document.createElement("canvas");
    canvas.width = 10;
    canvas.height = 10;
    vi.spyOn(HTMLCanvasElement.prototype, "toDataURL").mockReturnValue("invalid-no-comma");

    const { result } = withSetup(() =>
      useBase64(canvas, { type: "image/png", dataUrl: false }),
    );
    const encoded = await result.execute();
    expect(encoded).toBe("");
    vi.restoreAllMocks();
  });

  it("rejects when canvas getContext returns null", async () => {
    const img = document.createElement("img") as HTMLImageElement;
    Object.defineProperties(img, {
      complete: { value: false, configurable: true },
      naturalWidth: { value: 0, configurable: true },
      naturalHeight: { value: 0, configurable: true },
    });
    vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(null);

    const { result } = withSetup(() => useBase64(img));

    const loadPromise = result.execute();
    Object.defineProperties(img, {
      complete: { value: true, configurable: true },
      naturalWidth: { value: 1, configurable: true },
      naturalHeight: { value: 1, configurable: true },
    });
    img.dispatchEvent(new Event("load"));

    await expect(loadPromise).rejects.toThrow("Could not get canvas context");
    vi.restoreAllMocks();
  });

  it("encodes HTMLImageElement when not yet loaded waits for onload", async () => {
    const img = document.createElement("img") as HTMLImageElement;
    Object.defineProperties(img, {
      complete: { value: false, configurable: true },
      naturalWidth: { value: 0, configurable: true },
      naturalHeight: { value: 0, configurable: true },
    });

    const mockDataUrl = "data:image/png;base64,mockImageBase64==";
    vi.spyOn(HTMLCanvasElement.prototype, "toDataURL").mockReturnValue(mockDataUrl);
    const mockCtx = { drawImage: vi.fn() };
    vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(mockCtx as unknown as CanvasRenderingContext2D);

    const { result } = withSetup(() => useBase64(img));
    const loadPromise = result.execute();

    Object.defineProperties(img, {
      complete: { value: true, configurable: true },
      naturalWidth: { value: 1, configurable: true },
      naturalHeight: { value: 1, configurable: true },
    });
    img.dispatchEvent(new Event("load"));

    const encoded = await loadPromise;
    expect(encoded).toMatch(/^data:image\/png;base64,/);
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });
});
