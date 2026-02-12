import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import BvImage from "./Image.vue";

describe("BvImage", () => {
  it("renders img with src and alt", () => {
    const wrapper = mount(BvImage, {
      props: { src: "/photo.jpg", alt: "Photo" },
    });
    const img = wrapper.find("img");
    expect(img.exists()).toBe(true);
    expect(img.attributes("src")).toBe("/photo.jpg");
    expect(img.attributes("alt")).toBe("Photo");
  });

  it("emits load when image loads", async () => {
    const wrapper = mount(BvImage, {
      props: { src: "/test.jpg", alt: "Test" },
    });
    await wrapper.find("img").trigger("load");
    expect(wrapper.emitted("load")).toHaveLength(1);
  });
});
