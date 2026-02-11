/**
 * Skeleton shape variant.
 */
export type SkeletonVariant = "text" | "rectangle" | "circle";

export interface SkeletonProps {
  /**
   * Shape variant of the skeleton.
   * - text: Line shape for text placeholders
   * - rectangle: Default block shape
   * - circle: Circular shape for avatars
   * @default "rectangle"
   */
  variant?: SkeletonVariant;

  /**
   * Width as CSS value (e.g. "100%", "200px", "5rem").
   * @default "100%" for text/rectangle, "40px" for circle
   */
  width?: string;

  /**
   * Height as CSS value (e.g. "1rem", "20px").
   * @default "1rem" for text, "1rem" for rectangle, "40px" for circle
   */
  height?: string;

  /**
   * Number of skeleton elements to render (for text lines).
   * @default 1
   */
  count?: number;
}
