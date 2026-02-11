/**
 * Props for the Drawer component.
 *
 * @interface DrawerProps
 */
export interface DrawerProps {
  /** Whether the drawer is visible. */
  open?: boolean;
  /** Drawer title. Maps to bl-drawer's caption attribute. */
  caption?: string;
  /** Iframe URL for embedded content. When set, drawer shows iframe instead of slot. */
  embedUrl?: string;
  /** External link URL - adds a button in the header. */
  externalLink?: string;
  /** Drawer width. Accepts "small", "medium", "large" or CSS value (e.g. "424px"). */
  width?: string;
}
