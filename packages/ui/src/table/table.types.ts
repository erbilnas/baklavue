export interface TableProps {
  data?: Record<string, any>[];
  columns?: Array<{ key: string; label: string; sortable?: boolean }>;
  sortable?: boolean;
  selectable?: boolean;
  pagination?: boolean;
}
