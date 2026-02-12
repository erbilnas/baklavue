import { mount } from "@vue/test-utils";
import { describe, expect, it, vi } from "vitest";
import { defineComponent } from "vue";
import * as XLSX from "xlsx";
import { z } from "zod";
import { useFile } from "./file";

function withSetup<T>(composable: () => T) {
  let result: T;
  const TestComponent = defineComponent({
    setup() {
      result = composable();
      return () => null;
    },
  });
  const wrapper = mount(TestComponent);
  return { result: result!, wrapper };
}

describe("useFile", () => {
  it("returns parse, parseFile, parseStream, preview, create, download", () => {
    const { result } = withSetup(() => useFile());

    expect(typeof result.parse).toBe("function");
    expect(typeof result.parseFile).toBe("function");
    expect(typeof result.parseStream).toBe("function");
    expect(typeof result.preview).toBe("function");
    expect(typeof result.create).toBe("function");
    expect(typeof result.download).toBe("function");
  });

  describe("parse", () => {
    it("parses CSV string", () => {
      const { result } = withSetup(() => useFile());

      const parsed = result.parse("name,age\nAlice,30\nBob,25", {
        format: "csv",
        header: true,
        dynamicTyping: true,
      });

      expect(parsed.data).toEqual([
        { name: "Alice", age: 30 },
        { name: "Bob", age: 25 },
      ]);
    });

    it("parses CSV without header", () => {
      const { result } = withSetup(() => useFile());

      const parsed = result.parse("a,b,c\n1,2,3", {
        format: "csv",
        header: false,
      });

      expect(parsed.data).toEqual([
        ["a", "b", "c"],
        ["1", "2", "3"],
      ]);
    });

    it("parses TSV string", () => {
      const { result } = withSetup(() => useFile());

      const parsed = result.parse("name\tage\nAlice\t30", {
        format: "tsv",
        header: true,
        dynamicTyping: true,
      });

      expect(parsed.data).toEqual([{ name: "Alice", age: 30 }]);
    });

    it("parses JSON string", () => {
      const { result } = withSetup(() => useFile());

      const parsed = result.parse('[{"id":1},{"id":2}]', { format: "json" });

      expect(parsed.data).toEqual([{ id: 1 }, { id: 2 }]);
    });

    it("parses JSON object (non-array)", () => {
      const { result } = withSetup(() => useFile());

      const parsed = result.parse('{"id":1}', { format: "json" });

      expect(parsed.data).toEqual([{ id: 1 }]);
    });

    it("handles invalid JSON with error in data", () => {
      const { result } = withSetup(() => useFile());

      const parsed = result.parse("not json", { format: "json" });

      expect(parsed.data).toEqual([]);
      expect(parsed.errors).toHaveLength(1);
    });

    it("applies transform", () => {
      const { result } = withSetup(() => useFile());

      const parsed = result.parse("name,age\nAlice,30", {
        format: "csv",
        header: true,
        dynamicTyping: true,
        transform: (row) =>
          typeof row === "object" && row !== null && "name" in row
            ? {
                ...(row as object),
                upper: (row as { name: string }).name.toUpperCase(),
              }
            : null,
      });

      expect(parsed.data).toEqual([{ name: "Alice", age: 30, upper: "ALICE" }]);
    });

    it("applies schema validation for JSON", () => {
      const schema = z.array(z.object({ id: z.number() }));
      const { result } = withSetup(() => useFile());

      const valid = result.parse('[{"id":1},{"id":2}]', {
        format: "json",
        schema,
      });
      expect(valid.data).toEqual([{ id: 1 }, { id: 2 }]);

      const invalid = result.parse('[{"id":"not-a-number"}]', {
        format: "json",
        schema,
      });
      expect(invalid.data).toEqual([]);
      expect(invalid.validationError).toBeDefined();
    });

    it("applies schema validation for CSV", () => {
      const schema = z.array(z.object({ age: z.number() }));
      const { result } = withSetup(() => useFile());

      const invalid = result.parse("name,age\nAlice,30\nBob,invalid", {
        format: "csv",
        header: true,
        dynamicTyping: true,
        schema,
      });
      expect(invalid.validationError).toBeDefined();
    });

    it("throws for Excel format in parse", () => {
      const { result } = withSetup(() => useFile());

      expect(() => result.parse("data", { format: "xlsx" })).toThrow(
        "parse() does not support Excel format",
      );
    });
  });

  describe("parseFile", () => {
    it("parses file with format from Blob MIME type", async () => {
      const { result } = withSetup(() => useFile());
      const blob = new Blob(['[{"x":1}]'], { type: "application/json" });

      const parsed = await result.parseFile(blob);
      expect(parsed.data).toEqual([{ x: 1 }]);
    });

    it("parses Excel file with header: false returns array of arrays", async () => {
      const { result } = withSetup(() => useFile());
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet([{ a: 1, b: 2 }]);
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
      const xlsxBuffer = XLSX.write(wb, {
        type: "array",
        bookType: "xlsx",
      }) as ArrayBuffer;
      const file = new File([xlsxBuffer], "sheet.xlsx", {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      const parsed = await result.parseFile(file, {
        format: "xlsx",
        header: false,
      });
      expect(parsed.data).toEqual([
        ["a", "b"],
        [1, 2],
      ]);
    });

    it("parseFile with schema validation error returns validationError", async () => {
      const schema = z.array(z.object({ id: z.number() }));
      const { result } = withSetup(() => useFile());
      const file = new File(['[{"id":"not-number"}]'], "data.json", {
        type: "application/json",
      });

      const parsed = await result.parseFile(file, { schema });
      expect(parsed.validationError).toBeDefined();
    });

    it("parseFile with transform", async () => {
      const { result } = withSetup(() => useFile());
      const file = new File(["name,age\nAlice,30"], "data.csv", {
        type: "text/csv",
      });

      const parsed = await result.parseFile(file, {
        format: "csv",
        header: true,
        dynamicTyping: true,
        transform: (row) =>
          typeof row === "object" && row !== null && "name" in row
            ? {
                ...(row as object),
                upper: (row as { name: string }).name.toUpperCase(),
              }
            : null,
      });

      expect(parsed.data).toEqual([{ name: "Alice", age: 30, upper: "ALICE" }]);
    });
    it("parses CSV file with Papa", async () => {
      const { result } = withSetup(() => useFile());
      const file = new File(["name,age\nAlice,30\nBob,25"], "data.csv", {
        type: "text/csv",
      });

      const parsed = await result.parseFile(file, {
        format: "csv",
        header: true,
        dynamicTyping: true,
      });

      expect(parsed.data).toEqual([
        { name: "Alice", age: 30 },
        { name: "Bob", age: 25 },
      ]);
    });

    it("parses JSON file", async () => {
      const { result } = withSetup(() => useFile());
      const file = new File(['[{"id":1}]'], "data.json", {
        type: "application/json",
      });

      const parsed = await result.parseFile(file);

      expect(parsed.data).toEqual([{ id: 1 }]);
    });

    it("parses Blob with JSON type", async () => {
      const { result } = withSetup(() => useFile());
      const blob = new Blob(['[{"x":1}]'], { type: "application/json" });

      const parsed = await result.parseFile(blob);

      expect(parsed.data).toEqual([{ x: 1 }]);
    });

    it("parses Blob with CSV type detects format", async () => {
      const { result } = withSetup(() => useFile());
      const blob = new Blob(["a,b\n1,2"], { type: "text/csv" });

      const parsed = await result.parseFile(blob);

      expect(parsed.data).toEqual([["a", "b"], ["1", "2"]]);
    });

    it("parses Blob with spreadsheet type detects format", async () => {
      const { result } = withSetup(() => useFile());
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet([{ x: 1 }]);
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
      const blob = new Blob([XLSX.write(wb, { type: "array", bookType: "xlsx" }) as ArrayBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      const parsed = await result.parseFile(blob);

      expect(parsed.data).toEqual([{ x: 1 }]);
    });

    it("parses Excel file", async () => {
      const { result } = withSetup(() => useFile());
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet([{ a: 1, b: 2 }]);
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
      const xlsxBuffer = XLSX.write(wb, {
        type: "array",
        bookType: "xlsx",
      }) as ArrayBuffer;
      const file = new File([xlsxBuffer], "sheet.xlsx", {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      const parsed = await result.parseFile(file, { format: "xlsx" });

      expect(parsed.data).toEqual([{ a: 1, b: 2 }]);
    });
  });

  describe("parseStream", () => {
    it("returns abort function", () => {
      const { result } = withSetup(() => useFile());
      const file = new File(["a,b\n1,2"], "data.csv");

      const stream = result.parseStream(file, {
        format: "csv",
        step: () => {},
      });

      expect(typeof stream.abort).toBe("function");
      stream.abort();
    });

    it("throws for Excel format", () => {
      const { result } = withSetup(() => useFile());
      const file = new File([""], "data.xlsx");

      expect(() =>
        result.parseStream(file, { format: "xlsx" } as unknown as { format?: "csv" | "tsv" }),
      ).toThrow(
        "parseStream does not support Excel format",
      );
    });

    it("calls chunk callback with transformed data", async () => {
      const { result } = withSetup(() => useFile());
      const file = new File(["a,b\n1,2\n3,4"], "data.csv");
      const chunkFn = vi.fn();

      result.parseStream(file, {
        format: "csv",
        chunk: chunkFn,
        transform: (row) =>
          Array.isArray(row) ? row.map((v) => String(v).toUpperCase()) : null,
      });

      await new Promise((r) => setTimeout(r, 50));
      expect(chunkFn).toHaveBeenCalled();
    });
  });

  describe("preview", () => {
    it("previews Excel file", async () => {
      const { result } = withSetup(() => useFile());
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet([{ a: 1 }, { a: 2 }, { a: 3 }]);
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
      const xlsxBuffer = XLSX.write(wb, {
        type: "array",
        bookType: "xlsx",
      }) as ArrayBuffer;
      const file = new File([xlsxBuffer], "sheet.xlsx", {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      const preview = await result.preview(file, { rows: 2, format: "xlsx" });
      expect(preview.data).toHaveLength(2);
      expect(preview.truncated).toBe(true);
    });

    it("previews JSON file", async () => {
      const { result } = withSetup(() => useFile());
      const file = new File(['[{"a":1},{"a":2},{"a":3}]'], "data.json");

      const preview = await result.preview(file, { rows: 2 });

      expect(preview.data).toHaveLength(2);
      expect(preview.truncated).toBe(true);
    });

    it("previews CSV file", async () => {
      const { result } = withSetup(() => useFile());
      const file = new File(["a,b\n1,2\n3,4\n5,6"], "data.csv");

      const preview = await result.preview(file, { rows: 2, format: "csv" });

      expect(preview.data).toBeDefined();
    });
  });

  describe("create", () => {
    it("creates CSV from array of objects", () => {
      const { result } = withSetup(() => useFile());

      const csv = result.create([
        { name: "Alice", age: 30 },
        { name: "Bob", age: 25 },
      ]);

      expect(csv).toContain("name");
      expect(csv).toContain("age");
      expect(csv).toContain("Alice");
      expect(csv).toContain("30");
    });

    it("creates JSON string", () => {
      const { result } = withSetup(() => useFile());

      const json = result.create([{ id: 1 }, { id: 2 }], { format: "json" });

      expect(JSON.parse(json)).toEqual([{ id: 1 }, { id: 2 }]);
    });

    it("creates from fields and data", () => {
      const { result } = withSetup(() => useFile());

      const csv = result.create({
        fields: ["a", "b"],
        data: [
          [1, 2],
          [3, 4],
        ],
      });

      expect(csv).toContain("a");
      expect(csv).toContain("b");
    });

    it("creates XLSX format", () => {
      const { result } = withSetup(() => useFile());

      const output = result.create([{ a: 1, b: 2 }], { format: "xlsx" });

      expect(typeof output).toBe("string");
      expect(output.length).toBeGreaterThan(0);
    });

    it("creates XLS format", () => {
      const { result } = withSetup(() => useFile());

      const output = result.create([{ a: 1 }], { format: "xls" });

      expect(typeof output).toBe("string");
      expect(output.length).toBeGreaterThan(0);
    });

    it("creates TSV with delimiter", () => {
      const { result } = withSetup(() => useFile());

      const tsv = result.create([{ x: 1, y: 2 }], {
        format: "tsv",
        delimiter: "\t",
      });

      expect(tsv).toContain("\t");
    });

    it("creates with escapeFormulae", () => {
      const { result } = withSetup(() => useFile());

      const csv = result.create([{ formula: "=1+1", name: "test" }], {
        escapeFormulae: true,
      });

      expect(csv).toBeDefined();
    });

    it("creates Excel format", () => {
      const { result } = withSetup(() => useFile());

      const xlsx = result.create([{ a: 1 }, { b: 2 }], { format: "xlsx" });

      expect(typeof xlsx).toBe("string");
      expect(xlsx.length).toBeGreaterThan(0);
    });

    it("creates xls format", () => {
      const { result } = withSetup(() => useFile());

      const xls = result.create([{ a: 1 }], { format: "xls" });
      expect(typeof xls).toBe("string");
      expect(xls.length).toBeGreaterThan(0);
    });

    it("creates from empty array when not array in create json branch", () => {
      const { result } = withSetup(() => useFile());

      const json = result.create(
        { fields: ["x"], data: [] } as { fields: string[]; data: unknown[][] },
        { format: "json" },
      );
      expect(json).toBe("[]");
    });
  });

  describe("download", () => {
    it("does not throw when called", () => {
      const { result } = withSetup(() => useFile());

      expect(() => result.download([{ a: 1 }], "export.csv")).not.toThrow();
    });

    it("downloads JSON with correct extension", () => {
      const { result } = withSetup(() => useFile());
      const createSpy = vi
        .spyOn(URL, "createObjectURL")
        .mockReturnValue("blob:test");
      const revokeSpy = vi
        .spyOn(URL, "revokeObjectURL")
        .mockImplementation(() => {});

      result.download([{ a: 1 }], "export", { format: "json" });

      expect(createSpy).toHaveBeenCalled();
      expect(revokeSpy).toHaveBeenCalledWith("blob:test");

      createSpy.mockRestore();
      revokeSpy.mockRestore();
    });

    it("downloads xlsx with correct extension", () => {
      const { result } = withSetup(() => useFile());
      const createSpy = vi
        .spyOn(URL, "createObjectURL")
        .mockReturnValue("blob:test");
      const revokeSpy = vi
        .spyOn(URL, "revokeObjectURL")
        .mockImplementation(() => {});

      result.download([{ a: 1 }], "export", { format: "xlsx" });

      expect(createSpy).toHaveBeenCalled();
      expect(revokeSpy).toHaveBeenCalledWith("blob:test");
    });

    it("download with filename that already has extension preserves it", () => {
      const { result } = withSetup(() => useFile());
      const createSpy = vi
        .spyOn(URL, "createObjectURL")
        .mockReturnValue("blob:test");
      const revokeSpy = vi
        .spyOn(URL, "revokeObjectURL")
        .mockImplementation(() => {});

      result.download([{ a: 1 }], "export.csv", { format: "csv" });

      expect(createSpy).toHaveBeenCalled();
      createSpy.mockRestore();
      revokeSpy.mockRestore();
    });
  });
});
