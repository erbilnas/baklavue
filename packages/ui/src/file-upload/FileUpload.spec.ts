import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import BvFileUpload from "./FileUpload.vue";

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
});
