import type { NotificationProps } from "@trendyol/baklava/dist/components/notification/bl-notification";
import type { NotificationVariant } from "@trendyol/baklava/dist/components/notification/card/bl-notification-card";

interface NotificationElement extends HTMLElement {
  addNotification: (options: NotificationProps) => void;
}

interface NotificationOptions extends Omit<NotificationProps, "variant"> {
  variant: NotificationVariant;
}

export const useNotification = () => {
  const getNotificationElement = (): NotificationElement | null => {
    return document.querySelector(
      "bl-notification"
    ) as NotificationElement | null;
  };

  const createNotification = (options: NotificationOptions): void => {
    const notificationElement = getNotificationElement();

    if (!notificationElement) {
      console.warn(
        "Notification element not found. Make sure <bl-notification> is present in the DOM."
      );
      return;
    }

    notificationElement.addNotification({
      ...options,
      icon: true,
    });
  };

  const success = (notification: Omit<NotificationProps, "variant">): void => {
    createNotification({
      ...notification,
      variant: "success",
    });
  };

  const error = (notification: Omit<NotificationProps, "variant">): void => {
    createNotification({
      ...notification,
      variant: "error",
    });
  };

  const warning = (notification: Omit<NotificationProps, "variant">): void => {
    createNotification({
      ...notification,
      variant: "warning",
    });
  };

  const info = (notification: Omit<NotificationProps, "variant">): void => {
    createNotification({
      ...notification,
      variant: "info",
    });
  };

  return {
    success,
    error,
    warning,
    info,
  };
};
