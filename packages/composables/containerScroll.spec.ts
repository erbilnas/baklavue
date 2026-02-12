import { mount } from "@vue/test-utils";
import { describe, expect, it, vi } from "vitest";
import { defineComponent, ref } from "vue";
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

  it("detaches when target changes from element to null", async () => {
    const div = document.createElement("div");
    const container = ref<HTMLElement | null>(div);
    const removeSpy = vi.spyOn(div, "removeEventListener");

    const { result, wrapper } = withSetup(() => useContainerScroll(container));

    await wrapper.vm.$nextTick();
    container.value = null;
    await wrapper.vm.$nextTick();

    expect(removeSpy).toHaveBeenCalled();
    expect(result.scrollTop.value).toBe(0);
    expect(result.scrollLeft.value).toBe(0);
    removeSpy.mockRestore();
  });

  it("handles passive option", () => {
    const div = document.createElement("div");
    const addSpy = vi.spyOn(div, "addEventListener");

    const container = ref<HTMLElement | null>(div);
    withSetup(() => useContainerScroll(container, { passive: false }));

    expect(addSpy).toHaveBeenCalledWith("scroll", expect.any(Function), {
      passive: false,
    });
    addSpy.mockRestore();
  });

  it("cancels RAF and detaches on unmount when element exists", async () => {
    const div = document.createElement("div");
    div.style.overflow = "auto";
    const container = ref<HTMLElement | null>(div);
    const cancelSpy = vi.spyOn(window, "cancelAnimationFrame");
    const removeSpy = vi.spyOn(div, "removeEventListener");

    const { wrapper } = withSetup(() => useContainerScroll(container));
    await wrapper.vm.$nextTick();

    div.dispatchEvent(new Event("scroll"));
    wrapper.unmount();

    expect(removeSpy).toHaveBeenCalledWith("scroll", expect.any(Function));
    cancelSpy.mockRestore();
    removeSpy.mockRestore();
  });

  it("handleScroll skips when scrollEl is null during RAF", async () => {
    const div = document.createElement("div");
    div.style.overflow = "auto";
    const container = ref<HTMLElement | null>(div);
    const { result, wrapper } = withSetup(() => useContainerScroll(container));

    await wrapper.vm.$nextTick();
    container.value = null;
    await wrapper.vm.$nextTick();

    div.dispatchEvent(new Event("scroll"));
    await new Promise((r) => setTimeout(r, 50));
    expect(result.scrollTop.value).toBe(0);
  });

  it("handleScroll skips when rafId is already pending", async () => {
    const div = document.createElement("div");
    div.style.overflow = "auto";
    div.style.height = "100px";
    div.innerHTML = "<div style='height:1000px'></div>";
    document.body.appendChild(div);

    const container = ref<HTMLElement | null>(div);
    const { result, wrapper } = withSetup(() => useContainerScroll(container));

    await wrapper.vm.$nextTick();
    div.dispatchEvent(new Event("scroll"));
    div.dispatchEvent(new Event("scroll"));
    await new Promise((r) => setTimeout(r, 50));

    expect(result.scrollTop.value).toBe(0);
    document.body.removeChild(div);
  });

  it("detaches from old element when target changes", async () => {
    const div1 = document.createElement("div");
    const div2 = document.createElement("div");
    const container = ref<HTMLElement | null>(div1);
    const removeSpy1 = vi.spyOn(div1, "removeEventListener");

    const { wrapper } = withSetup(() => useContainerScroll(container));
    await wrapper.vm.$nextTick();

    container.value = div2;
    await wrapper.vm.$nextTick();

    expect(removeSpy1).toHaveBeenCalledWith("scroll", expect.any(Function));
    removeSpy1.mockRestore();
  });

  it("does not detach on unmount when target is null", () => {
    const container = ref<HTMLElement | null>(null);
    const { wrapper } = withSetup(() => useContainerScroll(container));
    expect(() => wrapper.unmount()).not.toThrow();
  });
});
