import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import BvNotification from "./Notification.vue";

describe("BvNotification", () => {
  it("renders bl-notification", () => {
    const wrapper = mount(BvNotification);
    expect(wrapper.find("bl-notification").exists()).toBe(true);
  });

  it("passes duration to bl-notification", () => {
    const wrapper = mount(BvNotification, {
      props: { duration: 5 },
    });
    const el = wrapper.find("bl-notification").element;
    expect(el.getAttribute("duration")).toBe("5");
  });
});
