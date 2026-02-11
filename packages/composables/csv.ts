import Papa from "papaparse";
import type { ParseError, ParseMeta, ParseResult } from "papaparse";

/** Re-exported for consumer use */
export type { ParseError, ParseMeta };

/**
 * Options for parsing CSV strings or files.
 */
export interface CsvParseOptions {
  /** Delimiter character. Leave empty to auto-detect. */
  delimiter?: string;
  /** If true, first row is treated as header (returns array of objects). */
  header?: boolean;
  /** If true, numeric and boolean values are converted to their types. */
  dynamicTyping?: boolean;
  /** If true, skip completely empty lines. Use 'greedy' to also skip whitespace-only lines. */
  skipEmptyLines?: boolean | "greedy";
}

/**
 * Options for creating CSV strings or downloading.
 */
export interface CsvCreateOptions {
  /** Delimiter character. Default: comma. */
  delimiter?: string;
  /** If false, omit header row. Ignored for array of arrays. Default: true. */
  header?: boolean;
  /** Column order for array of objects. Uses object keys if not specified. */
  columns?: string[];
  /** If true, escape formulae injection (values starting with =, +, -, @). */
  escapeFormulae?: boolean;
}

/** Parse result with data, errors, and meta. Use ParseResult<T> for typed rows. */
export type { ParseResult };

/** Data accepted by create() and download(): array of objects, array of arrays, or explicit fields+data. */
export type CsvData =
  | Record<string, unknown>[]
  | unknown[][]
  | { fields: string[]; data: unknown[][] };

/**
 * Composable for CSV parsing, creating, and downloading.
 * Uses PapaParse for RFC 4180-compliant handling of quoted fields and edge cases.
 *
 * @example
 * ```ts
 * const { parse, parseFile, create, download } = useCsv();
 *
 * // Parse string
 * const result = parse('name,age\nAlice,30\nBob,25', { header: true });
 *
 * // Parse file (async)
 * const fileResult = await parseFile(file, { header: true });
 *
 * // Create CSV
 * const csv = create([{ name: 'Alice', age: 30 }, { name: 'Bob', age: 25 }]);
 *
 * // Download
 * download([{ name: 'Alice', age: 30 }], 'export.csv');
 * ```
 */
export const useCsv = () => {
  const parse = (csv: string, options?: CsvParseOptions): ParseResult<unknown> => {
    return Papa.parse(csv, {
      delimiter: options?.delimiter ?? "",
      header: options?.header ?? false,
      dynamicTyping: options?.dynamicTyping ?? false,
      skipEmptyLines: options?.skipEmptyLines ?? false,
    });
  };

  const parseFile = (
    file: File,
    options?: CsvParseOptions
  ): Promise<ParseResult<unknown>> => {
    return new Promise((resolve, reject) => {
      Papa.parse(file, {
        delimiter: options?.delimiter ?? "",
        header: options?.header ?? false,
        dynamicTyping: options?.dynamicTyping ?? false,
        skipEmptyLines: options?.skipEmptyLines ?? false,
        complete: (results: ParseResult<unknown>) => resolve(results),
        error: (err: Error) => reject(err),
      });
    });
  };

  const create = (data: CsvData, options?: CsvCreateOptions): string => {
    return Papa.unparse(data as Parameters<typeof Papa.unparse>[0], {
      delimiter: options?.delimiter ?? ",",
      header: options?.header ?? true,
      columns: options?.columns ?? undefined,
      escapeFormulae: options?.escapeFormulae ?? false,
    });
  };

  const download = (
    data: CsvData,
    filename = "export.csv",
    options?: CsvCreateOptions
  ): void => {
    if (typeof document === "undefined") return;

    const csv = create(data, options);
    const BOM = "\uFEFF";
    const blob = new Blob([BOM + csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = filename.endsWith(".csv") ? filename : `${filename}.csv`;
    link.click();

    URL.revokeObjectURL(url);
  };

  return {
    parse,
    parseFile,
    create,
    download,
  };
};
