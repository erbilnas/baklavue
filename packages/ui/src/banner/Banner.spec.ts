import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import BvBanner from "./Banner.vue";

describe("BvBanner", () => {
  it("renders with title", () => {
    const wrapper = mount(BvBanner, {
      props: { title: "Important message" },
    });
    expect(wrapper.text()).toContain("Important message");
  });

  it("emits close when close button is clicked", async () => {
    const wrapper = mount(BvBanner, {
      props: { title: "Message", close: true },
    });
    const closeBtn = wrapper.find(".bv-banner__close-btn");
    await closeBtn.trigger("click");
    expect(wrapper.emitted("close")).toHaveLength(1);
  });

  it("applies color variant via inline style", () => {
    const wrapper = mount(BvBanner, {
      props: { title: "Test", color: "success" },
    });
    const banner = wrapper.find(".bv-banner").element;
    expect(banner.getAttribute("style")).toContain("bl-color-success");
  });
});
