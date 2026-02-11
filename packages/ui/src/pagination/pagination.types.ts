/**
 * Options for the items-per-page select element.
 */
export interface ItemsPerPageOption {
  /** Display text for the option */
  text: string;
  /** Numeric value for the option */
  value: number;
}

/**
 * Props for the Pagination component.
 * Maps to Baklava's bl-pagination attributes.
 *
 * @see https://github.com/Trendyol/baklava
 */
export interface PaginationProps {
  /**
   * Current page number (1-based).
   * Supports v-model:currentPage.
   */
  currentPage?: number;

  /**
   * Total number of items to be paginated.
   * Baklava uses this to compute the total number of pages.
   */
  totalItems?: number;

  /**
   * Number of items per page.
   * Maps to Baklava's items-per-page attribute.
   */
  pageSize?: number;

  /**
   * When true, adds a jumper input to jump directly to a page.
   */
  hasJumper?: boolean;

  /**
   * Label for the jumper input.
   */
  jumperLabel?: string;

  /**
   * When true, adds a select element to choose items per page.
   */
  hasSelect?: boolean;

  /**
   * Label for the items-per-page select.
   */
  selectLabel?: string;

  /**
   * Options for the items-per-page select element.
   * Each option has `text` (display) and `value` (number).
   */
  itemsPerPageOptions?: ItemsPerPageOption[];
}
