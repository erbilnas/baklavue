/** Native image loading behavior */
export type ImageLoading = "lazy" | "eager";

/** Placeholder type while image loads */
export type ImagePlaceholder = "skeleton" | "none";

export interface ImageProps {
  /**
   * Image URL (required).
   */
  src: string;

  /**
   * Accessible description (required).
   */
  alt: string;

  /**
   * CSS width (e.g. "200px", "100%").
   * Recommended to prevent CLS.
   */
  width?: string;

  /**
   * CSS height (e.g. "120px", "auto").
   * Recommended to prevent CLS.
   */
  height?: string;

  /**
   * Native loading behavior.
   * @default "lazy"
   */
  loading?: ImageLoading;

  /**
   * Placeholder when lazy and not yet loaded.
   * @default "skeleton"
   */
  placeholder?: ImagePlaceholder;

  /**
   * CSS object-fit.
   * @default "cover"
   */
  objectFit?: string;

  /**
   * Responsive image sources (srcset attribute).
   */
  srcset?: string;

  /**
   * Sizes attribute for srcset.
   */
  sizes?: string;
}
