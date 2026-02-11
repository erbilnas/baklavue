import type { ItemsPerPageOption } from "../pagination/pagination.types";

/** Table column definition */
export interface TableColumn {
  key: string;
  /** Column header text (alias: use `name` or `label`) */
  label?: string;
  /** Column header text (alias: use `name` or `label`) */
  name?: string;
  sortable?: boolean;
}

/** Table row data (record of column keys to values). When selectable, rows should have `id`. */
export type TableRow = Record<string, unknown> & { id?: string | number };

/** Pagination props for table integration */
export interface TablePaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  hasJumper?: boolean;
  jumperLabel?: string;
  hasSelect?: boolean;
  selectLabel?: string;
  itemsPerPageOptions?: ItemsPerPageOption[];
}

export interface TableProps {
  /** Optional title displayed above the table */
  title?: string;
  /** Header options: sticky, minCellWidth */
  headerOptions?: {
    sticky?: boolean;
    minCellWidth?: string;
  };
  /** Table data rows */
  data?: TableRow[];
  /** Column definitions */
  columns?: TableColumn[];
  /** Enable column sorting */
  sortable?: boolean;
  /** Enable row selection */
  selectable?: boolean;
  /** Enable multiple row selection */
  multiple?: boolean;
  /** Selected row selection keys (use with v-model:selected when selectable). Accepts string or number ids. */
  selected?: (string | number)[];
  /** Sort key for the sorted column */
  sortKey?: string;
  /** Sort direction: '' | 'asc' | 'desc' */
  sortDirection?: string;
  /** Make first column sticky */
  stickyFirstColumn?: boolean;
  /** Make last column sticky */
  stickyLastColumn?: boolean;
  /** Show loading state */
  isLoading?: boolean;
  /** Pagination configuration */
  pagination?: TablePaginationProps;
  /** Text shown in loading state */
  loadingText?: string;
}
