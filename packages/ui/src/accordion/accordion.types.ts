import type { BaklavaIcon } from "@trendyol/baklava-icons";

export interface AccordionProps {
  open?: boolean;
  caption?: string;
  icon?: boolean | BaklavaIcon;
  disabled?: boolean;
  animationDuration?: number;
}
