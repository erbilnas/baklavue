import { computed, toValue } from "vue";
import type { ComputedRef, MaybeRefOrGetter } from "vue";

export interface UseSlugOptions {
  /** Character to replace spaces/special chars. Default: '-' */
  separator?: string;
  /** Lowercase the result. Default: true */
  lowercase?: boolean;
}

const defaultSeparator = "-";

function toSlug(
  str: string,
  options: UseSlugOptions = {},
): string {
  const { separator = defaultSeparator, lowercase = true } = options;

  let s = str
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
    .replace(/[^\w\s-]/g, "") // Remove non-word chars except space and hyphen
    .replace(/\s+/g, separator) // Replace spaces with separator
    .replace(new RegExp(`${separator}+`, "g"), separator) // Collapse multiple separators
    .replace(new RegExp(`^${separator}|${separator}$`, "g"), ""); // Trim separators

  if (lowercase) {
    s = s.toLowerCase();
  }

  return s;
}

/**
 * Composable for converting a string to a URL-friendly slug.
 * Useful for SEO-friendly URLs, filenames, unique keys.
 *
 * @example
 * ```ts
 * const title = ref("Hello World!");
 * const slug = useSlug(title);
 * // slug: "hello-world"
 * ```
 *
 * @example
 * ```ts
 * const slug = useSlug("My Project Name", { separator: "_", lowercase: false });
 * // slug: "my_project_name" (lowercase still default)
 * ```
 *
 * @param source - String to convert (ref, getter, or plain value)
 * @param options - Optional: separator, lowercase, allow
 * @returns ComputedRef with slug string
 */
export function useSlug(
  source: MaybeRefOrGetter<string | null | undefined>,
  options: UseSlugOptions = {},
): ComputedRef<string> {
  return computed(() => {
    const value = toValue(source);
    if (value == null || typeof value !== "string") return "";
    return toSlug(value, options);
  });
}
