import { useQuery, type UseQueryOptions, type UseQueryReturn } from "./query";

export interface UseLazyQueryOptions<T = unknown>
  extends Omit<UseQueryOptions<T>, "enabled"> {
  /** Unique key for caching. Array of values; reactive getters supported. */
  queryKey: UseQueryOptions<T>["queryKey"];
  /** Async function that fetches data */
  queryFn: UseQueryOptions<T>["queryFn"];
}

export interface UseLazyQueryReturn<T = unknown> extends UseQueryReturn<T> {
  /** Execute the query. First call fetches, subsequent calls refetch. */
  execute: () => Promise<void>;
}

/**
 * Composable for lazy/on-demand queries. Does not fetch until execute() is called.
 * Wraps useQuery with enabled: false initially.
 *
 * @example
 * ```ts
 * const { data, execute, isLoading } = useLazyQuery({
 *   queryKey: ["user", userId],
 *   queryFn: ({ queryKey }) => fetch(`/api/users/${queryKey[1]}`).then(r => r.json()),
 * });
 *
 * // Fetch on button click
 * const handleLoad = () => execute();
 * ```
 *
 * @param options - Same as useQuery but without enabled (always starts disabled)
 * @returns Same as useQuery plus execute() to trigger fetch
 */
export function useLazyQuery<T = unknown>(
  options: UseLazyQueryOptions<T>,
): UseLazyQueryReturn<T> {
  const query = useQuery({
    ...options,
    enabled: false,
  });

  const execute = () => query.refetch();

  return {
    ...query,
    execute,
  };
}
