import { mount } from "@vue/test-utils";
import { describe, expect, it, vi } from "vitest";
import type { FileUploadInvalidEntry } from "./file-upload.types";
import BvFileUpload from "./FileUpload.vue";

function createFile(
  name: string,
  size: number,
  type = "application/octet-stream",
): File {
  return new File([new Blob(["x".repeat(size)])], name, { type });
}

function createImageFile(name: string, size: number): File {
  return new File([new Blob(["x".repeat(size)])], name, {
    type: "image/png",
  });
}

describe("BvFileUpload", () => {
  it("renders with label", () => {
    const wrapper = mount(BvFileUpload, {
      props: { label: "Upload file" },
    });
    expect(wrapper.text()).toContain("Upload file");
  });

  it("renders drop zone", () => {
    const wrapper = mount(BvFileUpload);
    expect(wrapper.find(".file-upload-zone").exists()).toBe(true);
  });

  it("displays help text when provided and no error", () => {
    const wrapper = mount(BvFileUpload, {
      props: { helpText: "Max 5MB" },
    });
    expect(wrapper.text()).toContain("Max 5MB");
  });

  it("displays invalid text when provided", () => {
    const wrapper = mount(BvFileUpload, {
      props: { invalidText: "File too large" },
    });
    expect(wrapper.text()).toContain("File too large");
  });

  it("hides help text when invalidText is set", () => {
    const wrapper = mount(BvFileUpload, {
      props: { helpText: "Help", invalidText: "Error" },
    });
    expect(wrapper.find(".file-upload-help").exists()).toBe(false);
    expect(wrapper.find(".file-upload-invalid").exists()).toBe(true);
  });

  it("applies size class to zone", () => {
    const small = mount(BvFileUpload, { props: { size: "small" } });
    const large = mount(BvFileUpload, { props: { size: "large" } });
    expect(small.find(".file-upload-zone").classes()).toContain(
      "file-upload-zone--small",
    );
    expect(large.find(".file-upload-zone").classes()).toContain(
      "file-upload-zone--large",
    );
  });

  it("processes files via input change and emits update:modelValue", async () => {
    const wrapper = mount(BvFileUpload);
    const file = createFile("doc.pdf", 100);
    const input = wrapper.find('input[type="file"]').element as HTMLInputElement;

    Object.defineProperty(input, "files", {
      value: [file],
      writable: false,
    });
    wrapper.find('input[type="file"]').trigger("change");

    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("update:modelValue")).toBeDefined();
    expect(wrapper.emitted("update:modelValue")![0][0]).toBe(file);
    expect(wrapper.emitted("change")).toBeDefined();
    expect(wrapper.emitted("change")![0][0]).toEqual([file]);
  });

  it("processes multiple files when multiple prop is true", async () => {
    const wrapper = mount(BvFileUpload, { props: { multiple: true } });
    const file1 = createFile("a.pdf", 100);
    const file2 = createFile("b.pdf", 200);
    const input = wrapper.find('input[type="file"]').element as HTMLInputElement;

    Object.defineProperty(input, "files", {
      value: [file1, file2],
      writable: false,
    });
    wrapper.find('input[type="file"]').trigger("change");

    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("update:modelValue")).toBeDefined();
    expect(wrapper.emitted("update:modelValue")![0][0]).toEqual([file1, file2]);
    expect(wrapper.emitted("change")![0][0]).toEqual([file1, file2]);
  });

  it("appends to existing files when multiple and modelValue has files", async () => {
    const existing = createFile("existing.pdf", 50);
    const wrapper = mount(BvFileUpload, {
      props: { modelValue: existing, multiple: true },
    });
    const newFile = createFile("new.pdf", 100);
    const input = wrapper.find('input[type="file"]').element as HTMLInputElement;

    Object.defineProperty(input, "files", {
      value: [newFile],
      writable: false,
    });
    wrapper.find('input[type="file"]').trigger("change");

    await wrapper.vm.$nextTick();
    const emitted = wrapper.emitted("update:modelValue")![0][0] as File[];
    expect(Array.isArray(emitted)).toBe(true);
    expect(emitted).toHaveLength(2);
    expect(emitted[0].name).toBe("existing.pdf");
    expect(emitted[1].name).toBe("new.pdf");
  });

  it("emits invalid when file exceeds maxSize", async () => {
    const wrapper = mount(BvFileUpload, { props: { maxSize: 50 } });
    const file = createFile("large.pdf", 1000);
    const input = wrapper.find('input[type="file"]').element as HTMLInputElement;

    Object.defineProperty(input, "files", {
      value: [file],
      writable: false,
    });
    wrapper.find('input[type="file"]').trigger("change");

    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("invalid")).toBeDefined();
    expect(wrapper.emitted("invalid")![0][0]).toHaveLength(1);
    expect((wrapper.emitted("invalid")![0][0] as FileUploadInvalidEntry[])[0].reason).toBe("size");
    expect(wrapper.emitted("update:modelValue")).toBeUndefined();
  });

  it("emits invalid when file is below minSize", async () => {
    const wrapper = mount(BvFileUpload, { props: { minSize: 100 } });
    const file = createFile("tiny.pdf", 10);
    const input = wrapper.find('input[type="file"]').element as HTMLInputElement;

    Object.defineProperty(input, "files", {
      value: [file],
      writable: false,
    });
    wrapper.find('input[type="file"]').trigger("change");

    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("invalid")).toBeDefined();
    expect((wrapper.emitted("invalid")![0][0] as FileUploadInvalidEntry[])[0].reason).toBe("size");
  });

  it("emits invalid when file type does not match accept", async () => {
    const wrapper = mount(BvFileUpload, { props: { accept: "image/*" } });
    const file = createFile("doc.pdf", 100, "application/pdf");
    const input = wrapper.find('input[type="file"]').element as HTMLInputElement;

    Object.defineProperty(input, "files", {
      value: [file],
      writable: false,
    });
    wrapper.find('input[type="file"]').trigger("change");

    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("invalid")).toBeDefined();
    expect((wrapper.emitted("invalid")![0][0] as FileUploadInvalidEntry[])[0].reason).toBe("type");
  });

  it("accepts image when accept is image/*", async () => {
    const wrapper = mount(BvFileUpload, { props: { accept: "image/*" } });
    const file = createImageFile("img.png", 100);
    const input = wrapper.find('input[type="file"]').element as HTMLInputElement;

    Object.defineProperty(input, "files", {
      value: [file],
      writable: false,
    });
    wrapper.find('input[type="file"]').trigger("change");

    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("update:modelValue")).toEqual([[file]]);
  });

  it("accepts file when accept matches extension", async () => {
    const wrapper = mount(BvFileUpload, { props: { accept: ".pdf" } });
    const file = createFile("doc.pdf", 100, "application/pdf");
    const input = wrapper.find('input[type="file"]').element as HTMLInputElement;

    Object.defineProperty(input, "files", {
      value: [file],
      writable: false,
    });
    wrapper.find('input[type="file"]').trigger("change");

    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("update:modelValue")).toEqual([[file]]);
  });

  it("emits invalid when exceeding maxFiles in multiple mode", async () => {
    const existing = createFile("a.pdf", 50);
    const wrapper = mount(BvFileUpload, {
      props: { modelValue: [existing], multiple: true, maxFiles: 1 },
    });
    const newFile = createFile("b.pdf", 50);
    const input = wrapper.find('input[type="file"]').element as HTMLInputElement;

    Object.defineProperty(input, "files", {
      value: [newFile],
      writable: false,
    });
    wrapper.find('input[type="file"]').trigger("change");

    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("invalid")).toBeDefined();
    expect((wrapper.emitted("invalid")![0][0] as FileUploadInvalidEntry[])[0].reason).toBe("count");
  });

  it("processes files via drop", async () => {
    const wrapper = mount(BvFileUpload);
    const file = createFile("dropped.pdf", 100);
    const dataTransfer = { files: [file] } as unknown as DataTransfer;

    const dropEvent = new DragEvent("drop", {
      bubbles: true,
      dataTransfer,
    });
    Object.defineProperty(dropEvent, "dataTransfer", { value: dataTransfer });

    wrapper.find(".file-upload-zone").element.dispatchEvent(dropEvent);
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("update:modelValue")).toEqual([[file]]);
  });

  it("does not process drop when disabled", async () => {
    const wrapper = mount(BvFileUpload, { props: { disabled: true } });
    const file = createFile("dropped.pdf", 100);
    const dataTransfer = { files: [file] } as unknown as DataTransfer;

    const dropEvent = new DragEvent("drop", {
      bubbles: true,
      dataTransfer,
    });
    Object.defineProperty(dropEvent, "dataTransfer", { value: dataTransfer });

    wrapper.find(".file-upload-zone").element.dispatchEvent(dropEvent);
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("update:modelValue")).toBeUndefined();
  });

  it("sets dragging state on dragover and clears on dragleave", async () => {
    const wrapper = mount(BvFileUpload);
    const zone = wrapper.find(".file-upload-zone");

    const dragover = new DragEvent("dragover", { bubbles: true });
    zone.element.dispatchEvent(dragover);
    await wrapper.vm.$nextTick();
    expect(zone.classes()).toContain("file-upload-zone--dragging");

    zone.element.dispatchEvent(new DragEvent("dragleave", { bubbles: true }));
    await wrapper.vm.$nextTick();
    expect(zone.classes()).not.toContain("file-upload-zone--dragging");
  });

  it("does not set dragging when disabled", async () => {
    const wrapper = mount(BvFileUpload, { props: { disabled: true } });
    const zone = wrapper.find(".file-upload-zone");
    zone.element.dispatchEvent(
      new DragEvent("dragover", { bubbles: true, dataTransfer: {} as unknown as DataTransfer }),
    );
    await wrapper.vm.$nextTick();
    expect(zone.classes()).not.toContain("file-upload-zone--dragging");
  });

  it("opens file picker on zone click when not disabled", async () => {
    const wrapper = mount(BvFileUpload);
    const clickSpy = vi.spyOn(HTMLInputElement.prototype, "click");
    wrapper.find(".file-upload-zone").trigger("click");
    await wrapper.vm.$nextTick();
    expect(clickSpy).toHaveBeenCalled();
    clickSpy.mockRestore();
  });

  it("does not open file picker when disabled", async () => {
    const wrapper = mount(BvFileUpload, { props: { disabled: true } });
    const clickSpy = vi.spyOn(HTMLInputElement.prototype, "click");
    wrapper.find(".file-upload-zone").trigger("click");
    await wrapper.vm.$nextTick();
    expect(clickSpy).not.toHaveBeenCalled();
    clickSpy.mockRestore();
  });

  it("displays file list when modelValue has files", () => {
    const file = createFile("doc.pdf", 1024);
    const wrapper = mount(BvFileUpload, { props: { modelValue: file } });
    expect(wrapper.find(".file-upload-list").exists()).toBe(true);
    expect(wrapper.text()).toContain("doc.pdf");
    expect(wrapper.text()).toContain("1.0 KB");
  });

  it("removes file when tag close is clicked", async () => {
    const file = createFile("doc.pdf", 100);
    const wrapper = mount(BvFileUpload, { props: { modelValue: file } });
    wrapper.find("bl-tag").element.dispatchEvent(
      new CustomEvent("bl-tag-click", {
        bubbles: true,
        detail: { value: null, selected: true },
      }),
    );
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("update:modelValue")).toEqual([[null]]);
    expect(wrapper.emitted("change")![0][0]).toEqual([]);
  });

  it("removes file at index in multiple mode", async () => {
    const file1 = createFile("a.pdf", 50);
    const file2 = createFile("b.pdf", 100);
    const wrapper = mount(BvFileUpload, {
      props: { modelValue: [file1, file2], multiple: true },
    });
    const tags = wrapper.findAll("bl-tag");
    tags[1].element.dispatchEvent(
      new CustomEvent("bl-tag-click", {
        bubbles: true,
        detail: { value: null, selected: true },
      }),
    );
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("update:modelValue")![0][0]).toEqual([file1]);
  });

  it("shows preview for image files when showPreview is true", () => {
    const file = createImageFile("img.png", 100);
    const wrapper = mount(BvFileUpload, {
      props: { modelValue: file, showPreview: true },
    });
    expect(wrapper.find(".file-upload-preview").exists()).toBe(true);
    expect(wrapper.find("img.file-upload-thumb").exists()).toBe(true);
  });

  it("does not show preview for non-image files", () => {
    const file = createFile("doc.pdf", 100);
    const wrapper = mount(BvFileUpload, {
      props: { modelValue: file, showPreview: true },
    });
    expect(wrapper.find(".file-upload-preview").exists()).toBe(false);
  });

  it("renders hint slot", () => {
    const wrapper = mount(BvFileUpload, {
      slots: { hint: "Drag and drop or click" },
    });
    expect(wrapper.text()).toContain("Drag and drop or click");
  });
});
