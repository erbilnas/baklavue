import { mount } from "@vue/test-utils";
import { defineComponent } from "vue";
import { afterEach, describe, expect, it } from "vitest";
import { useScrollLock } from "./scrollLock";

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

describe("useScrollLock", () => {
  afterEach(() => {
    const { result } = withSetup(() => useScrollLock());
    for (let i = 0; i < 5; i++) {
      result.unlock();
    }
  });

  it("returns isLocked false initially", () => {
    const { result } = withSetup(() => useScrollLock());

    expect(result.isLocked.value).toBe(false);
  });

  it("lock sets isLocked to true", async () => {
    const { result, wrapper } = withSetup(() => useScrollLock());

    result.lock();
    await wrapper.vm.$nextTick();

    expect(result.isLocked.value).toBe(true);
  });

  it("unlock sets isLocked to false", async () => {
    const { result, wrapper } = withSetup(() => useScrollLock());

    result.lock();
    await wrapper.vm.$nextTick();
    result.unlock();
    await wrapper.vm.$nextTick();

    expect(result.isLocked.value).toBe(false);
  });

  it("supports nested lock/unlock", async () => {
    const { result: r1, wrapper: w1 } = withSetup(() => useScrollLock());
    const { result: r2, wrapper: w2 } = withSetup(() => useScrollLock());

    r1.lock();
    r2.lock();
    await w1.vm.$nextTick();

    expect(r1.isLocked.value).toBe(true);
    expect(r2.isLocked.value).toBe(true);

    r1.unlock();
    await w1.vm.$nextTick();
    r2.unlock();
    await w2.vm.$nextTick();
    expect(r2.isLocked.value).toBe(false);
  });

  it("toggleLock toggles lock state", async () => {
    const { result, wrapper } = withSetup(() => useScrollLock());

    result.toggleLock();
    await wrapper.vm.$nextTick();
    expect(result.isLocked.value).toBe(true);

    result.toggleLock();
    await wrapper.vm.$nextTick();
    expect(result.isLocked.value).toBe(false);
  });
});
