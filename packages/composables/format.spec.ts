import { mount } from "@vue/test-utils";
import { defineComponent, ref } from "vue";
import { describe, expect, it } from "vitest";
import { useDateFormat, useNumberFormat } from "./format";

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

describe("useDateFormat", () => {
  it("formats date with default options", () => {
    const date = new Date("2025-02-11T12:00:00Z");
    const { result } = withSetup(() => useDateFormat(date));

    expect(result.value).toBeTruthy();
    expect(typeof result.value).toBe("string");
  });

  it("formats date with dateStyle", () => {
    const date = new Date("2025-02-11T12:00:00Z");
    const { result } = withSetup(() =>
      useDateFormat(date, { dateStyle: "short" }),
    );

    expect(result.value).toBeTruthy();
  });

  it("returns empty string for null", () => {
    const { result } = withSetup(() => useDateFormat(null));
    expect(result.value).toBe("");
  });

  it("returns empty string for undefined", () => {
    const { result } = withSetup(() => useDateFormat(undefined));
    expect(result.value).toBe("");
  });

  it("returns empty string for NaN date", () => {
    const { result } = withSetup(() => useDateFormat(new Date("invalid")));
    expect(result.value).toBe("");
  });

  it("is reactive when source is ref", async () => {
    const date = ref<Date | null>(new Date("2025-01-01T00:00:00Z"));
    const { result, wrapper } = withSetup(() =>
      useDateFormat(date, { dateStyle: "short" }),
    );

    const first = result.value;
    date.value = new Date("2025-12-31T23:59:59Z");
    await wrapper.vm.$nextTick();
    expect(result.value).not.toBe(first);
  });

  it("accepts string date", () => {
    const { result } = withSetup(() =>
      useDateFormat("2025-02-11", { dateStyle: "short" }),
    );
    expect(result.value).toBeTruthy();
  });

  it("accepts timestamp number", () => {
    const { result } = withSetup(() =>
      useDateFormat(1739260800000, { dateStyle: "short" }),
    );
    expect(result.value).toBeTruthy();
  });
});

describe("useNumberFormat", () => {
  it("formats number with default options", () => {
    const { result } = withSetup(() => useNumberFormat(1234.56));

    expect(result.value).toBeTruthy();
    expect(typeof result.value).toBe("string");
  });

  it("formats as currency", () => {
    const { result } = withSetup(() =>
      useNumberFormat(99.99, { style: "currency", currency: "USD" }),
    );

    expect(result.value).toContain("99");
    expect(result.value).toContain("99");
  });

  it("returns empty string for null", () => {
    const { result } = withSetup(() => useNumberFormat(null));
    expect(result.value).toBe("");
  });

  it("returns empty string for undefined", () => {
    const { result } = withSetup(() => useNumberFormat(undefined));
    expect(result.value).toBe("");
  });

  it("returns empty string for NaN", () => {
    const { result } = withSetup(() => useNumberFormat(Number.NaN));
    expect(result.value).toBe("");
  });

  it("is reactive when source is ref", async () => {
    const value = ref(100);
    const { result, wrapper } = withSetup(() =>
      useNumberFormat(value, { style: "decimal" }),
    );

    expect(result.value).toContain("100");
    value.value = 200;
    await wrapper.vm.$nextTick();
    expect(result.value).toContain("200");
  });
});
