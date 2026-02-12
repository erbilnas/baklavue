import type { BaklavaIcon } from "@trendyol/baklava-icons";

/** Tag variant: selectable (default) or removable (closable) */
export type TagVariant = "selectable" | "removable";

/** Tag size */
export type TagSize = "small" | "medium" | "large";

export interface TagProps {
  /** Tag variant: selectable or removable */
  variant?: TagVariant;
  /** Tag size */
  size?: TagSize;
  /** When true, shows close button (uses variant="removable" under the hood) */
  closable?: boolean;
  /** Icon name from Baklava icons */
  icon?: BaklavaIcon;
  /** Selected state (for selectable variant) */
  selected?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Value for form/selection */
  value?: string | null;
}
