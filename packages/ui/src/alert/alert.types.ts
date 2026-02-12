import type { BaklavaIcon } from "@trendyol/baklava-icons";
import type { AlertVariant } from "@trendyol/baklava/dist/components/alert/bl-alert";

/**
 * Interface for the bl-alert custom element.
 * Extends HTMLElement with Baklava Alert API.
 *
 * @interface BlAlertElement
 */
export interface BlAlertElement extends HTMLElement {
  closed?: boolean;
  open?: () => void;
  close?: () => void;
}

/**
 * Props for the Alert component.
 * Wraps Baklava's bl-alert web component.
 *
 * @interface AlertProps
 */
export interface AlertProps {
  /**
   * Alert variant (success, danger, info, warning).
   *
   * @default "info"
   */
  variant?: AlertVariant;

  /**
   * Alert description text.
   */
  description?: string;

  /**
   * Icon configuration: boolean to show/hide default icon, or a specific BaklavaIcon.
   */
  icon?: boolean | BaklavaIcon;

  /**
   * Whether to show the close button.
   *
   * @default false
   */
  closable?: boolean;

  /**
   * Alert caption text.
   */
  caption?: string;

  /**
   * Whether the alert is closed/collapsed.
   *
   * @default false
   */
  closed?: boolean;
}
