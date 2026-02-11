import { mount } from "@vue/test-utils";
import { defineComponent } from "vue";
import { describe, expect, it } from "vitest";
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

      const parsed = result.parse("a,b,c\n1,2,3", { format: "csv", header: false });

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

    it("applies transform", () => {
      const { result } = withSetup(() => useFile());

      const parsed = result.parse("name,age\nAlice,30", {
        format: "csv",
        header: true,
        dynamicTyping: true,
        transform: (row) =>
          typeof row === "object" && row !== null && "name" in row
            ? { ...(row as object), upper: (row as { name: string }).name.toUpperCase() }
            : null,
      });

      expect(parsed.data).toEqual([
        { name: "Alice", age: 30, upper: "ALICE" },
      ]);
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
  });

  describe("download", () => {
    it("does not throw when called", () => {
      const { result } = withSetup(() => useFile());

      expect(() => result.download([{ a: 1 }], "export.csv")).not.toThrow();
    });
  });
});
