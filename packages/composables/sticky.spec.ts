import { mount } from "@vue/test-utils";
import { defineComponent, ref } from "vue";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useSticky } from "./sticky";

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

describe("useSticky", () => {
  let scrollContainer: HTMLDivElement;

  afterEach(() => {
    if (scrollContainer?.parentNode) {
      document.body.removeChild(scrollContainer);
    }
  });

  it("returns isSticky ref", () => {
    const target = ref<HTMLElement | null>(null);
    const { result } = withSetup(() => useSticky(target));

    expect(result.isSticky).toBeDefined();
    expect(result.isSticky.value).toBe(false);
  });

  it("attaches scroll listener and calls update on scroll", async () => {
    scrollContainer = document.createElement("div");
    scrollContainer.style.overflow = "auto";
    scrollContainer.style.height = "100px";
    scrollContainer.style.width = "100px";
    scrollContainer.innerHTML =
      '<div style="height:200px;width:100px"><div id="sticky-el" style="height:20px;position:sticky;top:0"></div></div>';
    document.body.appendChild(scrollContainer);

    const stickyEl = scrollContainer.querySelector("#sticky-el") as HTMLElement;
    const rectSpy = vi.spyOn(stickyEl, "getBoundingClientRect");
    rectSpy.mockReturnValue({
      top: -5,
      left: 0,
      right: 100,
      bottom: 15,
      width: 100,
      height: 20,
      x: 0,
      y: -5,
      toJSON: () => ({}),
    });

    const target = ref<HTMLElement | null>(stickyEl);

    const { result, wrapper } = withSetup(() =>
      useSticky(target, { threshold: 0, scrollTarget: ref(scrollContainer) }),
    );

    await wrapper.vm.$nextTick();

    expect(rectSpy).toHaveBeenCalled();
    expect(result.isSticky.value).toBe(true);
  });
});
