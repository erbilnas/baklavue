/** Tab option for the `tabs` prop */
export interface TabOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface TabProps {
  /** Currently active tab value (use with v-model:activeTab) */
  activeTab?: string;
  /** Array of tab options. When provided, tabs are rendered from this array. */
  tabs?: TabOption[];
  /** Tab variant (passed to bl-tabs) */
  variant?: string;
  /** Tab orientation: horizontal or vertical */
  orientation?: string;
}
