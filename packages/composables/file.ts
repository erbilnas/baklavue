import Papa from "papaparse";
import type { ParseError, ParseMeta, ParseResult, Parser } from "papaparse";
import type { z } from "zod";
import * as XLSX from "xlsx";

/** Re-exported for consumer use */
export type { ParseError, ParseMeta };

export type FileFormat = "csv" | "tsv" | "json" | "xlsx" | "xls";

export type FileOrBlob = File | Blob;

/**
 * Options for parsing CSV/TSV strings or files.
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
 * Options for creating CSV/TSV strings or downloading.
 */
export interface CsvCreateOptions {
  /** Delimiter character. Default: comma for CSV, tab for TSV. */
  delimiter?: string;
  /** If false, omit header row. Ignored for array of arrays. Default: true. */
  header?: boolean;
  /** Column order for array of objects. Uses object keys if not specified. */
  columns?: string[];
  /** If true, escape formulae injection (values starting with =, +, -, @). */
  escapeFormulae?: boolean;
}

/**
 * Base options for parse/parseFile.
 */
export interface FileParseOptions<T = unknown> extends CsvParseOptions {
  /** File format. Default: 'csv'. */
  format?: FileFormat;
  /** Zod schema for validation. Applied after parsing and transform. */
  schema?: z.ZodType<T>;
  /** Transform each row. Return null to skip. Applied after parse, before validation. */
  transform?: (row: unknown) => T | null;
}

/**
 * Options for create/download.
 */
export interface FileCreateOptions extends CsvCreateOptions {
  /** File format. Default: 'csv'. */
  format?: FileFormat;
}

/** Parse result with data, errors, and meta. Use ParseResult<T> for typed rows. */
export type { ParseResult };

/** Data accepted by create() and download(): array of objects, array of arrays, or explicit fields+data. */
export type FileData =
  | Record<string, unknown>[]
  | unknown[][]
  | { fields: string[]; data: unknown[][] };

/** Result of preview() - first N rows only. */
export interface PreviewResult<T = unknown> {
  data: T[];
  meta?: ParseMeta;
  truncated: boolean;
}

/** Schema type that supports safeParse/safeParseAsync (Zod 3/4 compatible) */
type ZodSchemaLike = {
  safeParse: (data: unknown) =>
    | { success: true; data: unknown }
    | { success: false; error: z.ZodError };
  safeParseAsync?: (
    data: unknown,
  ) => Promise<
    | { success: true; data: unknown }
    | { success: false; error: z.ZodError }
  >;
};

function getDelimiterForFormat(format: FileFormat): string {
  return format === "tsv" ? "\t" : ",";
}

function detectFormatFromFilename(filename: string): FileFormat {
  const ext = filename.split(".").pop()?.toLowerCase() ?? "";
  if (ext === "json") return "json";
  if (ext === "tsv") return "tsv";
  if (ext === "xlsx") return "xlsx";
  if (ext === "xls") return "xls";
  return "csv";
}

function getBlobFormat(blob: Blob): FileFormat | null {
  const t = blob.type?.toLowerCase() ?? "";
  if (
    t.includes("spreadsheet") ||
    t.includes("excel") ||
    t.includes("xlsx") ||
    t.includes("xls")
  )
    return "xlsx";
  if (t.includes("json")) return "json";
  if (t.includes("csv") || t.includes("text")) return "csv";
  return null;
}

function resolveFormat(
  input: File | Blob,
  optionsFormat?: FileFormat,
): FileFormat {
  if (optionsFormat) return optionsFormat;
  if (input instanceof File) return detectFormatFromFilename(input.name);
  const blobFormat = getBlobFormat(input);
  return blobFormat ?? "csv";
}

function getMimeType(format: FileFormat): string {
  if (format === "json") return "application/json;charset=utf-8";
  if (format === "xlsx" || format === "xls")
    return "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
  return "text/csv;charset=utf-8";
}

function getDefaultExtension(format: FileFormat): string {
  if (format === "xlsx") return "xlsx";
  if (format === "xls") return "xls";
  if (format === "json") return "json";
  if (format === "tsv") return "tsv";
  return "csv";
}

function isExcelFormat(format: FileFormat): format is "xlsx" | "xls" {
  return format === "xlsx" || format === "xls";
}

function fileDataToArray(data: FileData): unknown[] {
  if (Array.isArray(data)) return data;
  if ("data" in data && "fields" in data) {
    const { fields, data: rows } = data as {
      fields: string[];
      data: unknown[][];
    };
    return rows.map((row) =>
      Object.fromEntries(fields.map((f, i) => [f, row[i]])),
    );
  }
  return [];
}

function createExcelBuffer(data: FileData, bookType: "xlsx" | "xls"): ArrayBuffer {
  const arr = fileDataToArray(data) as Record<string, unknown>[];
  const sheet = XLSX.utils.json_to_sheet(arr);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, sheet, "Sheet1");
  return XLSX.write(wb, { type: "array", bookType }) as unknown as ArrayBuffer;
}

function ensureExtension(filename: string, format: FileFormat): string {
  const ext = `.${getDefaultExtension(format)}`;
  return filename.endsWith(ext) ? filename : `${filename}${ext}`;
}

function applyTransform<T>(
  data: unknown[],
  transform: (row: unknown) => T | null,
): T[] {
  const result: T[] = [];
  for (const row of data) {
    const transformed = transform(row);
    if (transformed !== null) {
      result.push(transformed);
    }
  }
  return result;
}

async function validateWithSchema<T>(
  data: unknown[],
  schema: ZodSchemaLike,
): Promise<{
  data: T[] | null;
  validationError?: z.ZodError;
}> {
  if (schema.safeParseAsync) {
    const result = await schema.safeParseAsync(data);
    if (result.success) {
      return { data: result.data as T[] };
    }
    return { data: null, validationError: result.error };
  }
  const result = schema.safeParse(data);
  if (result.success) {
    return { data: result.data as T[] };
  }
  return { data: null, validationError: result.error };
}

/**
 * Composable for file parsing, creating, and downloading.
 * Supports CSV, TSV, and JSON formats with streaming, Zod validation, transforms, and preview.
 *
 * @example
 * ```ts
 * const { parse, parseFile, parseStream, preview, create, download } = useFile();
 *
 * // Parse string
 * const result = parse('name,age\nAlice,30\nBob,25', { format: 'csv', header: true });
 *
 * // Parse file (async)
 * const fileResult = await parseFile(file, { format: 'csv', header: true });
 *
 * // Preview first 10 rows
 * const previewResult = await preview(file, { rows: 10, format: 'csv' });
 *
 * // Create CSV
 * const csv = create([{ name: 'Alice', age: 30 }, { name: 'Bob', age: 25 }]);
 *
 * // Download
 * download([{ name: 'Alice', age: 30 }], 'export.csv');
 * ```
 */
export const useFile = () => {
  const parse = <T = unknown>(
    content: string,
    options?: FileParseOptions<T>,
  ): ParseResult<T> & { validationError?: z.ZodError } => {
    const format = options?.format ?? "csv";
    if (isExcelFormat(format)) {
      throw new Error(
        "parse() does not support Excel format; use parseFile() with a File or Blob instead.",
      );
    }
    const delimiter =
      options?.delimiter ?? (format === "tsv" ? "\t" : "");

    if (format === "json") {
      let data: unknown;
      try {
        data = JSON.parse(content);
      } catch (err) {
        return {
          data: [] as T[],
          errors: [
            {
              type: "Quotes",
              code: "MissingQuotes",
              message: String(err),
              row: 0,
            } as ParseError,
          ],
          meta: {} as ParseMeta,
        } as ParseResult<T>;
      }
      const arr = Array.isArray(data) ? data : [data];
      let processed = arr as unknown[];

      if (options?.transform) {
        processed = applyTransform(processed, options.transform);
      }

      if (options?.schema) {
        const result = (options.schema as ZodSchemaLike).safeParse(processed);
        if (!result.success) {
          return {
            data: [] as T[],
            errors: [],
            meta: {} as ParseMeta,
            validationError: result.error,
          } as ParseResult<T> & { validationError?: z.ZodError };
        }
        processed = result.data as unknown[];
      }

      return {
        data: processed as T[],
        errors: [],
        meta: {} as ParseMeta,
      } as ParseResult<T>;
    }

    const papaResult = Papa.parse(content, {
      delimiter: delimiter || undefined,
      header: options?.header ?? false,
      dynamicTyping: options?.dynamicTyping ?? false,
      skipEmptyLines: options?.skipEmptyLines ?? false,
    }) as ParseResult<unknown>;

    let processed = (papaResult.data ?? []) as unknown[];
    if (options?.transform) {
      processed = applyTransform(processed, options.transform);
    }

    if (options?.schema) {
      const result = (options.schema as ZodSchemaLike).safeParse(processed);
      if (!result.success) {
        return {
          ...papaResult,
          data: processed as T[],
          validationError: result.error,
        } as ParseResult<T> & { validationError?: z.ZodError };
      }
      processed = result.data as unknown[];
    }

    return {
      ...papaResult,
      data: processed as T[],
    } as ParseResult<T>;
  };

  const parseFile = async <T = unknown>(
    file: File | Blob,
    options?: FileParseOptions<T>,
  ): Promise<ParseResult<T> & { validationError?: z.ZodError }> => {
    const format = resolveFormat(file, options?.format);

    if (format === "json") {
      const text = await file.text();
      return parse<T>(text, { ...options, format: "json" });
    }

    if (isExcelFormat(format)) {
      const buffer = await file.arrayBuffer();
      const wb = XLSX.read(buffer, { type: "array" });
      const sheetName = wb.SheetNames[0];
      const sheet = sheetName ? wb.Sheets[sheetName] : null;
      if (!sheet) {
        return {
          data: [] as T[],
          errors: [],
          meta: {} as ParseMeta,
        } as ParseResult<T>;
      }
      const rawRows = XLSX.utils.sheet_to_json(sheet, {
        header: options?.header === false ? 1 : undefined,
        defval: "",
      });
      const rows = Array.isArray(rawRows) ? rawRows : [rawRows];
      let processed = rows as unknown[];
      if (options?.transform) {
        processed = applyTransform(processed, options.transform);
      }
      if (options?.schema) {
        const validated = await validateWithSchema<T>(
          processed,
          options.schema as ZodSchemaLike,
        );
        if (validated.validationError) {
          return {
            data: processed as T[],
            errors: [],
            meta: {} as ParseMeta,
            validationError: validated.validationError,
          } as ParseResult<T> & { validationError?: z.ZodError };
        }
        processed = (validated.data ?? processed) as unknown[];
      }
      return {
        data: processed as T[],
        errors: [],
        meta: {} as ParseMeta,
      } as ParseResult<T>;
    }

    return new Promise((resolve, reject) => {
      const delimiter =
        options?.delimiter ?? getDelimiterForFormat(format);
      (Papa.parse as (input: File | Blob | string, config: object) => void)(
        file,
        {
          delimiter: delimiter || undefined,
          header: options?.header ?? false,
          dynamicTyping: options?.dynamicTyping ?? false,
          skipEmptyLines: options?.skipEmptyLines ?? false,
          complete: async (results: ParseResult<unknown>) => {
            let processed = (results.data ?? []) as unknown[];
            if (options?.transform) {
              processed = applyTransform(processed, options.transform);
            }
            if (options?.schema) {
              const validated = await validateWithSchema<T>(
                processed,
                options.schema as ZodSchemaLike,
              );
              if (validated.validationError) {
                resolve({
                  ...results,
                  data: processed as T[],
                  validationError: validated.validationError,
                } as ParseResult<T> & { validationError?: z.ZodError });
                return;
              }
              processed = validated.data ?? processed;
            }
            resolve({
              ...results,
              data: processed as T[],
            } as ParseResult<T>);
          },
          error: (err: Error) => reject(err),
        },
      );
    });
  };

  const parseStream = (
    file: File | Blob,
    options: {
      format?: "csv" | "tsv";
      header?: boolean;
      dynamicTyping?: boolean;
      skipEmptyLines?: boolean | "greedy";
      transform?: (row: unknown) => unknown | null;
      step?: (result: ParseResult<unknown>, parser: Parser) => void;
      chunk?: (result: ParseResult<unknown>, parser: Parser) => void;
      complete?: () => void;
      error?: (err: Error) => void;
    },
  ): { abort: () => void } => {
    const format = resolveFormat(file, options.format ?? "csv");
    if (isExcelFormat(format)) {
      throw new Error(
        "parseStream does not support Excel format; use parseFile instead.",
      );
    }
    const delimiter =
      format === "tsv" ? "\t" : options.format === "tsv" ? "\t" : ",";

    let parserRef: Parser | null = null;

    const stepFn = options.step;
    const chunkFn = options.chunk;
    const transformFn = options.transform;

    const wrapStep = stepFn
      ? (result: ParseResult<unknown>, parser: Parser) => {
          parserRef = parser;
          const rows = (result.data ?? []) as unknown[];
          if (transformFn) {
            for (const row of rows) {
              const transformed = transformFn(row);
              if (transformed !== null) {
                stepFn({ ...result, data: [transformed] }, parser);
              }
            }
          } else {
            stepFn(result, parser);
          }
        }
      : undefined;

    const wrapChunk = chunkFn
      ? (result: ParseResult<unknown>, parser: Parser) => {
          parserRef = parser;
          const rows = (result.data ?? []) as unknown[];
          if (transformFn) {
            const transformed = rows
              .map((r) => transformFn(r))
              .filter((r): r is unknown => r !== null);
            chunkFn({ ...result, data: transformed }, parser);
          } else {
            chunkFn(result, parser);
          }
        }
      : undefined;

    const config = {
      delimiter,
      header: options.header ?? false,
      dynamicTyping: options.dynamicTyping ?? false,
      skipEmptyLines: options.skipEmptyLines ?? false,
      ...(wrapStep && { step: wrapStep }),
      ...(wrapChunk && { chunk: wrapChunk }),
      complete: options.complete,
      error: options.error,
    };
    (Papa.parse as (input: File | Blob | string, config: object) => void)(
      file,
      config,
    );

    return {
      abort: () => {
        if (parserRef) {
          parserRef.abort();
        }
      },
    };
  };

  const preview = async <T = unknown>(
    file: File | Blob,
    options: {
      rows?: number;
      format?: FileFormat;
      header?: boolean;
      dynamicTyping?: boolean;
      skipEmptyLines?: boolean | "greedy";
    } = {},
  ): Promise<PreviewResult<T>> => {
    const format = resolveFormat(file, options.format);
    const rows = options.rows ?? 10;

    if (format === "json") {
      const text = await file.text();
      let data: unknown;
      try {
        data = JSON.parse(text);
      } catch {
        return { data: [], truncated: false };
      }
      const arr = Array.isArray(data) ? data : [data];
      const sliced = arr.slice(0, rows) as T[];
      return {
        data: sliced,
        truncated: arr.length > rows,
      };
    }

    if (isExcelFormat(format)) {
      const buffer = await file.arrayBuffer();
      const wb = XLSX.read(buffer, { type: "array" });
      const sheetName = wb.SheetNames[0];
      const sheet = sheetName ? wb.Sheets[sheetName] : null;
      if (!sheet) return { data: [], truncated: false };
      const rawRows = XLSX.utils.sheet_to_json(sheet, {
        header: options.header === false ? 1 : undefined,
        defval: "",
      });
      const arr = Array.isArray(rawRows) ? rawRows : [rawRows];
      const sliced = arr.slice(0, rows) as T[];
      return {
        data: sliced,
        truncated: arr.length > rows,
      };
    }

    return new Promise((resolve, reject) => {
      const delimiter = getDelimiterForFormat(format);
      (Papa.parse as (input: File | Blob | string, config: object) => void)(
        file,
        {
          delimiter,
          header: options.header ?? false,
          dynamicTyping: options.dynamicTyping ?? false,
          skipEmptyLines: options.skipEmptyLines ?? false,
          preview: rows,
          complete: (results: ParseResult<unknown>) => {
            const meta = results.meta ?? {};
            const truncated =
              (meta as { truncated?: boolean }).truncated ?? false;
            resolve({
              data: (results.data ?? []) as T[],
              meta: results.meta,
              truncated,
            });
          },
          error: (err: Error) => reject(err),
        },
      );
    });
  };

  const create = (
    data: FileData,
    options?: FileCreateOptions,
  ): string => {
    const format = options?.format ?? "csv";

    if (format === "json") {
      let arr: unknown[];
      if (Array.isArray(data)) {
        arr = data;
      } else if ("data" in data && "fields" in data) {
        const { fields, data: rows } = data as {
          fields: string[];
          data: unknown[][];
        };
        arr = rows.map((row) =>
          Object.fromEntries(fields.map((f, i) => [f, row[i]])),
        );
      } else {
        arr = [];
      }
      return JSON.stringify(arr, null, 0);
    }

    if (isExcelFormat(format)) {
      const arr = fileDataToArray(data) as Record<string, unknown>[];
      const sheet = XLSX.utils.json_to_sheet(arr);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, sheet, "Sheet1");
      return XLSX.write(wb, { type: "base64", bookType: format });
    }

    const delimiter =
      options?.delimiter ?? getDelimiterForFormat(format);
    return Papa.unparse(data as Parameters<typeof Papa.unparse>[0], {
      delimiter,
      header: options?.header ?? true,
      columns: options?.columns ?? undefined,
      escapeFormulae: options?.escapeFormulae ?? false,
    });
  };

  const download = (
    data: FileData,
    filename = "export.csv",
    options?: FileCreateOptions,
  ): void => {
    if (typeof document === "undefined") return;

    const format = options?.format ?? "csv";
    const mimeType = getMimeType(format);

    if (isExcelFormat(format)) {
      const buffer = createExcelBuffer(data, format);
      const blob = new Blob([buffer], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = ensureExtension(filename, format);
      link.click();
      URL.revokeObjectURL(url);
      return;
    }

    const content = create(data, options);
    const BOM = format !== "json" ? "\uFEFF" : "";
    const blob = new Blob([BOM + content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = ensureExtension(filename, format);
    link.click();
    URL.revokeObjectURL(url);
  };

  return {
    parse,
    parseFile,
    parseStream,
    preview,
    create,
    download,
  };
};
