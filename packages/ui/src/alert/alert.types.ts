import type { BaklavaIcon } from "@trendyol/baklava-icons";
import type { AlertVariant } from "@trendyol/baklava/dist/components/alert/bl-alert";

export interface AlertProps {
  variant?: AlertVariant;
  description?: string;
  icon?: boolean | BaklavaIcon;
  closable?: boolean;
  caption?: string;
  closed?: boolean;
}
