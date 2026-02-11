import type { BaklavaIcon } from "@trendyol/baklava-icons";
import type { ButtonVariant } from "@trendyol/baklava/dist/components/button/bl-button";

/**
 * Banner color variant.
 */
export type BannerColor =
  | "primary"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "neutral";

/**
 * Action button configuration for the banner.
 */
export interface BannerAction {
  /** Button label */
  label?: string;
  /** Button variant */
  variant?: ButtonVariant;
  /** Leading icon name */
  icon?: BaklavaIcon;
  /** Trailing icon name */
  trailingIcon?: BaklavaIcon;
  /** Click handler */
  onClick?: () => void;
}

/**
 * Props for the Banner component.
 */
export interface BannerProps {
  /**
   * Banner message text.
   */
  title?: string;

  /**
   * Icon name displayed next to the title.
   */
  icon?: BaklavaIcon;

  /**
   * Color variant.
   *
   * @default "primary"
   */
  color?: BannerColor;

  /**
   * Show close button to dismiss the banner.
   *
   * @default false
   */
  close?: boolean;

  /**
   * Icon for the close button.
   *
   * @default "close"
   */
  closeIcon?: BaklavaIcon;

  /**
   * Unique ID for localStorage persistence.
   * When set with close=true, dismissed state is stored as banner-${id}.
   */
  id?: string;

  /**
   * Makes the banner a link. When provided, the banner wraps content in a link.
   */
  to?: string;

  /**
   * Target attribute for the link (e.g. "_blank").
   */
  target?: string;

  /**
   * Action buttons to display.
   */
  actions?: BannerAction[];
}
