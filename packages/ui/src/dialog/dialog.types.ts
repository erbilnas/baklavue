/**
 * Props for the Dialog component.
 *
 * @interface DialogProps
 */
export interface DialogProps {
  /** Whether the dialog is visible. */
  open?: boolean;
  /** Optional dialog title. Maps to bl-dialog's caption attribute. */
  caption?: string;
  /** Whether to show the close button in the header. When false, clicking the X is prevented. */
  closable?: boolean;
  /** Whether clicking the backdrop closes the dialog. When false, click-outside is prevented. */
  backdrop?: boolean;
  /** Dialog width. Accepts "small", "medium", "large" or a CSS value (e.g. "424px"). */
  size?: string;
}
