import { shallowRef, toValue, watch } from "vue";
import type { MaybeRefOrGetter } from "vue";

export interface UseBase64Options {
  /** Output as Data URL format (e.g. data:image/png;base64,...). Default: true */
  dataUrl?: boolean;
}

export interface UseBase64ToDataURLOptions extends UseBase64Options {
  /** MIME type for canvas/image. Default: image/png */
  type?: string;
  /** Image quality for jpeg or webp (0-1) */
  quality?: number;
}

type Base64Source =
  | string
  | Blob
  | File
  | ArrayBuffer
  | HTMLCanvasElement
  | HTMLImageElement
  | undefined;

function blobToBase64(blob: Blob, dataUrl: boolean): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      resolve(dataUrl ? result : result.split(",")[1] ?? "");
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });
}

function arrayBufferToBase64(
  buffer: ArrayBuffer,
  dataUrl: boolean,
): Promise<string> {
  return blobToBase64(new Blob([buffer]), dataUrl);
}

function stringToBase64(str: string, dataUrl: boolean): Promise<string> {
  const encoded = btoa(
    encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (_, p1) =>
      String.fromCharCode(Number.parseInt(p1, 16)),
    ),
  );
  return Promise.resolve(dataUrl ? `data:text/plain;base64,${encoded}` : encoded);
}

function canvasToBase64(
  canvas: HTMLCanvasElement,
  options: UseBase64ToDataURLOptions,
): Promise<string> {
  const { dataUrl = true, type = "image/png", quality } = options;
  const dataURL = canvas.toDataURL(type, quality);
  return Promise.resolve(dataUrl ? dataURL : dataURL.split(",")[1] ?? "");
}

function imageToBase64(
  img: HTMLImageElement,
  options: UseBase64ToDataURLOptions,
): Promise<string> {
  if (!img.complete || img.naturalWidth === 0) {
    return new Promise((resolve, reject) => {
      img.onload = () => imageToBase64(img, options).then(resolve).catch(reject);
      img.onerror = () => reject(new Error("Image failed to load"));
    });
  }

  const canvas = document.createElement("canvas");
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  const ctx = canvas.getContext("2d");
  if (!ctx) return Promise.reject(new Error("Could not get canvas context"));
  ctx.drawImage(img, 0, 0);
  return canvasToBase64(canvas, options);
}

/**
 * Composable for converting Blob/File/ArrayBuffer/canvas/image to Base64 data URLs.
 * Complements useFile for image preview before upload, avatar uploads, thumbnails.
 *
 * @example
 * ```ts
 * const file = ref<File | undefined>();
 * const { base64, execute } = useBase64(file);
 *
 * watch(file, () => execute(), { immediate: true });
 * // base64.value is the data URL when file is set
 * ```
 *
 * @example
 * ```ts
 * const { base64, execute } = useBase64(canvasRef, { type: "image/jpeg", quality: 0.8 });
 * await execute();
 * ```
 *
 * @param target - Source to convert (string, Blob, File, ArrayBuffer, HTMLCanvasElement, HTMLImageElement)
 * @param options - Optional: dataUrl (default true), type and quality for canvas/image
 * @returns base64 (ShallowRef), execute(), and promise (ShallowRef)
 */
export function useBase64(
  target: MaybeRefOrGetter<string | undefined>,
  options?: UseBase64Options,
): { base64: ReturnType<typeof shallowRef<string>>; execute: () => Promise<string>; promise: ReturnType<typeof shallowRef<Promise<string>>> };
export function useBase64(
  target: MaybeRefOrGetter<Blob | File | undefined>,
  options?: UseBase64Options,
): { base64: ReturnType<typeof shallowRef<string>>; execute: () => Promise<string>; promise: ReturnType<typeof shallowRef<Promise<string>>> };
export function useBase64(
  target: MaybeRefOrGetter<ArrayBuffer | undefined>,
  options?: UseBase64Options,
): { base64: ReturnType<typeof shallowRef<string>>; execute: () => Promise<string>; promise: ReturnType<typeof shallowRef<Promise<string>>> };
export function useBase64(
  target: MaybeRefOrGetter<HTMLCanvasElement | undefined>,
  options?: UseBase64ToDataURLOptions,
): { base64: ReturnType<typeof shallowRef<string>>; execute: () => Promise<string>; promise: ReturnType<typeof shallowRef<Promise<string>>> };
export function useBase64(
  target: MaybeRefOrGetter<HTMLImageElement | undefined>,
  options?: UseBase64ToDataURLOptions,
): { base64: ReturnType<typeof shallowRef<string>>; execute: () => Promise<string>; promise: ReturnType<typeof shallowRef<Promise<string>>> };
export function useBase64(
  target: MaybeRefOrGetter<Base64Source>,
  options: UseBase64Options | UseBase64ToDataURLOptions = {},
): {
  base64: ReturnType<typeof shallowRef<string>>;
  execute: () => Promise<string>;
  promise: ReturnType<typeof shallowRef<Promise<string>>>;
} {
  const { dataUrl = true } = options;
  const toDataURLOptions = options as UseBase64ToDataURLOptions;

  const base64 = shallowRef("");
  const promise = shallowRef<Promise<string>>(Promise.resolve(""));

  const execute = async (): Promise<string> => {
    const raw = toValue(target);
    let p: Promise<string>;

    if (raw == null) {
      base64.value = "";
      p = Promise.resolve("");
    } else if (typeof raw === "string") {
      p = stringToBase64(raw, dataUrl);
    } else if (raw instanceof Blob) {
      p = blobToBase64(raw, dataUrl);
    } else if (raw instanceof ArrayBuffer) {
      p = arrayBufferToBase64(raw, dataUrl);
    } else if (raw instanceof HTMLCanvasElement) {
      p = canvasToBase64(raw, toDataURLOptions);
    } else if (raw instanceof HTMLImageElement) {
      p = imageToBase64(raw, toDataURLOptions);
    } else {
      base64.value = "";
      p = Promise.resolve("");
    }

    promise.value = p;
    try {
      const result = await p;
      base64.value = result;
      return result;
    } catch (err) {
      base64.value = "";
      throw err;
    }
  };

  watch(
    () => toValue(target),
    () => execute(),
    { immediate: true },
  );

  return {
    base64,
    execute,
    promise,
  };
}
