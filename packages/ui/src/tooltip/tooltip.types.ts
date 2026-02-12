/** Tooltip placement relative to trigger */
export type TooltipPlacement =
  | "top"
  | "top-start"
  | "top-end"
  | "bottom"
  | "bottom-start"
  | "bottom-end"
  | "left"
  | "left-start"
  | "left-end"
  | "right"
  | "right-start"
  | "right-end";

export interface TooltipProps {
  /** Tooltip content text */
  content?: string;
  /** Placement of tooltip relative to trigger (default: 'top') */
  placement?: TooltipPlacement;
  /** Target element (selector or Element) when using external trigger */
  target?: string | Element;
  /** Trigger type: 'hover' | 'click' etc. (passed to bl-tooltip) */
  trigger?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Delay before showing tooltip (ms) */
  delay?: number;
}
