/**
 * Props for the Notification component.
 *
 * The Notification component is a Vue UI kit component for Baklava's `bl-notification` web component.
 * It acts as a container for toast notifications triggered via the `useNotification` composable.
 *
 * @interface NotificationProps
 */
export interface NotificationProps {
  /**
   * Default duration of notifications in seconds.
   * Individual notifications can override this via the `useNotification` options.
   *
   * @default 7
   */
  duration?: number;

  /**
   * Whether to disable animations.
   * Respects user's reduced-motion preferences.
   *
   * @default false
   */
  noAnimation?: boolean;
}
