import { computed, toValue } from "vue";
import type { ComputedRef, MaybeRefOrGetter } from "vue";

/** Options for Intl.DateTimeFormat */
export type UseDateFormatOptions = Intl.DateTimeFormatOptions & {
  /** Locale string. Default: undefined (host environment) */
  locale?: string | string[];
};

/** Options for Intl.NumberFormat */
export type UseNumberFormatOptions = Intl.NumberFormatOptions & {
  /** Locale string. Default: undefined (host environment) */
  locale?: string | string[];
};

/**
 * Composable for reactive, locale-aware date formatting using Intl.DateTimeFormat.
 * No external date library required.
 *
 * @example
 * ```ts
 * const date = ref(new Date());
 * const formatted = useDateFormat(date, { dateStyle: "medium" });
 * // formatted: "Feb 11, 2025"
 * ```
 *
 * @example
 * ```ts
 * const formatted = useDateFormat(new Date(), {
 *   year: "numeric",
 *   month: "short",
 *   day: "numeric",
 *   locale: "tr-TR",
 * });
 * ```
 *
 * @param date - Date to format (ref, getter, or plain value)
 * @param options - Intl.DateTimeFormatOptions plus optional locale
 * @returns ComputedRef with formatted string
 */
export function useDateFormat(
  date: MaybeRefOrGetter<Date | string | number | null | undefined>,
  options: UseDateFormatOptions = {},
): ComputedRef<string> {
  const { locale, ...intlOptions } = options;

  return computed(() => {
    const value = toValue(date);
    if (value == null || (typeof value === "number" && Number.isNaN(value))) {
      return "";
    }
    const d = value instanceof Date ? value : new Date(value);
    if (Number.isNaN(d.getTime())) return "";
    return new Intl.DateTimeFormat(locale, intlOptions).format(d);
  });
}

/**
 * Composable for reactive, locale-aware number/currency formatting using Intl.NumberFormat.
 *
 * @example
 * ```ts
 * const price = ref(99.99);
 * const formatted = useNumberFormat(price, { style: "currency", currency: "USD" });
 * // formatted: "$99.99"
 * ```
 *
 * @example
 * ```ts
 * const count = ref(1234);
 * const formatted = useNumberFormat(count, {
 *   style: "decimal",
 *   minimumFractionDigits: 2,
 *   locale: "tr-TR",
 * });
 * ```
 *
 * @param value - Number to format (ref, getter, or plain value)
 * @param options - Intl.NumberFormatOptions plus optional locale
 * @returns ComputedRef with formatted string
 */
export function useNumberFormat(
  value: MaybeRefOrGetter<number | null | undefined>,
  options: UseNumberFormatOptions = {},
): ComputedRef<string> {
  const { locale, ...intlOptions } = options;

  return computed(() => {
    const val = toValue(value);
    if (val == null || (typeof val === "number" && Number.isNaN(val))) {
      return "";
    }
    return new Intl.NumberFormat(locale, intlOptions).format(val);
  });
}
