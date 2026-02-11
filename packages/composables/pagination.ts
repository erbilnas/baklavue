import { computed, ref } from "vue";

/**
 * Options for usePagination.
 */
export interface UsePaginationOptions {
  /** Total number of items. Default: 0 */
  totalItems?: number;
  /** Number of items per page. Default: 10 */
  pageSize?: number;
  /** Initial current page (1-based). Default: 1 */
  initialPage?: number;
}

/**
 * Composable for pagination state used by BvPagination and BvTable.
 * Provides currentPage, pageSize, totalItems, derived totalPages, offset, and a slice helper.
 *
 * @example
 * ```ts
 * const {
 *   currentPage,
 *   pageSize,
 *   totalItems,
 *   totalPages,
 *   setPage,
 *   setPageSize,
 *   slice,
 * } = usePagination({ totalItems: 100, pageSize: 10 });
 *
 * // Pass to BvPagination or BvTable pagination prop
 * <BvPagination
 *   v-model:current-page="currentPage"
 *   :total-items="totalItems"
 *   :page-size="pageSize"
 * />
 * ```
 *
 * @param options - Initial pagination options
 * @returns Pagination state and helpers
 */
export const usePagination = (options: UsePaginationOptions = {}) => {
  const {
    totalItems: initialTotal = 0,
    pageSize: initialPageSize = 10,
    initialPage = 1,
  } = options;

  const currentPage = ref(initialPage);
  const pageSize = ref(initialPageSize);
  const totalItems = ref(initialTotal);

  const totalPages = computed(() => {
    const total = totalItems.value;
    const size = pageSize.value;
    if (size <= 0) return 0;
    return Math.max(1, Math.ceil(total / size));
  });

  const offset = computed(() => {
    const page = Math.max(1, Math.min(currentPage.value, totalPages.value));
    return (page - 1) * pageSize.value;
  });

  const setPage = (page: number) => {
    currentPage.value = Math.max(1, Math.min(page, totalPages.value));
  };

  const setPageSize = (size: number) => {
    if (size > 0) {
      pageSize.value = size;
      currentPage.value = Math.min(currentPage.value, totalPages.value);
    }
  };

  const setTotalItems = (total: number) => {
    totalItems.value = Math.max(0, total);
  };

  /**
   * Slices an array for the current page.
   * Useful when you have a full array and want to display only the current page's items.
   */
  const slice = <T>(arr: T[]): T[] => {
    const start = offset.value;
    const end = start + pageSize.value;
    return arr.slice(start, end);
  };

  return {
    currentPage,
    pageSize,
    totalItems,
    totalPages,
    offset,
    setPage,
    setPageSize,
    setTotalItems,
    slice,
  };
};
