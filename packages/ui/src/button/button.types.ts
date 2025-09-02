import type { BaklavaIcon } from "@trendyol/baklava-icons";
import type {
  ButtonKind as BaseButtonKind,
  ButtonSize,
  ButtonVariant,
  TargetType,
} from "@trendyol/baklava/dist/components/button/bl-button";

type ButtonKind = BaseButtonKind | "custom";

interface CustomClass {
  color?: string;
  highlightColor?: string;
}

export interface ButtonProps {
  variant?: ButtonVariant;
  kind?: ButtonKind;
  size?: ButtonSize;
  label?: string;
  loadingLabel?: string;
  loading?: boolean;
  disabled?: boolean;
  href?: string;
  icon?: BaklavaIcon;
  target?: TargetType;
  type?: HTMLButtonElement["type"];
  autofocus?: boolean;
  customClass?: CustomClass;
}
