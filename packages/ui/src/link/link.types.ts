/** Link variant - inline (text within content) or standalone (button-like). */
export type LinkVariant = "inline" | "standalone";

/** Link size - only applies to standalone variant. */
export type LinkSize = "small" | "medium" | "large";

/** Link kind - only applies to standalone variant. */
export type LinkKind = "primary" | "neutral";

/**
 * Props for the Link component.
 *
 * @interface LinkProps
 */
export interface LinkProps {
  /** URL that the hyperlink points to. */
  href?: string;
  /** Where to display the linked URL (e.g. "_self", "_blank"). */
  target?: string;
  /** Whether the link is disabled. */
  disabled?: boolean;
  /** Link variant - inline or standalone. */
  variant?: LinkVariant;
  /** Link size - only applies to standalone variant. */
  size?: LinkSize;
  /** Link kind - only applies to standalone variant. */
  kind?: LinkKind;
  /** Aria label for the link. */
  ariaLabel?: string;
  /** Relationship between the current document and the linked document (e.g. "noopener noreferrer"). */
  rel?: string;
  /** Language of the linked document. */
  hreflang?: string;
  /** MIME type of the linked document. */
  type?: string;
  /** Referrer policy for the link. */
  referrerPolicy?: string;
  /** Whether to download the resource instead of navigating to it. */
  download?: string;
  /** Ping URLs to be notified when following the link. */
  ping?: string;
}
