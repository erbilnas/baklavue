export interface TabProps {
  activeTab?: string;
  tabs?: Array<{ label: string; value: string; disabled?: boolean }>;
  variant?: string;
  orientation?: string;
}
