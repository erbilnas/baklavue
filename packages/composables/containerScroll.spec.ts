import { mount } from "@vue/test-utils";
import { defineComponent, ref } from "vue";
import { describe, expect, it } from "vitest";
import { useContainerScroll } from "./containerScroll";

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

describe("useContainerScroll", () => {
  it("returns scrollTop and scrollLeft", () => {
    const container = ref<HTMLElement | null>(null);
    const { result } = withSetup(() => useContainerScroll(container));

    expect(result.scrollTop).toBeDefined();
    expect(result.scrollLeft).toBeDefined();
    expect(result.scrollTop.value).toBe(0);
    expect(result.scrollLeft.value).toBe(0);
  });

  it("updates scroll position when container scrolls", async () => {
    const div = document.createElement("div");
    div.style.overflow = "auto";
    div.style.height = "100px";
    div.style.width = "100px";
    div.innerHTML = "<div style='height:1000px;width:1000px'></div>";
    document.body.appendChild(div);

    const container = ref<HTMLElement | null>(div);
    const { result, wrapper } = withSetup(() => useContainerScroll(container));

    await wrapper.vm.$nextTick();

    expect(result.scrollTop.value).toBe(0);
    expect(result.scrollLeft.value).toBe(0);

    Object.defineProperty(div, "scrollTop", {
      value: 50,
      writable: true,
      configurable: true,
    });
    Object.defineProperty(div, "scrollLeft", {
      value: 25,
      writable: true,
      configurable: true,
    });
    div.dispatchEvent(new Event("scroll"));

    await new Promise((r) => setTimeout(r, 50));
    await wrapper.vm.$nextTick();

    expect(result.scrollTop.value).toBe(50);
    expect(result.scrollLeft.value).toBe(25);

    document.body.removeChild(div);
  });
});
