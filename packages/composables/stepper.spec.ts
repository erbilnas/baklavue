import { mount } from "@vue/test-utils";
import { defineComponent } from "vue";
import { describe, expect, it } from "vitest";
import { useStepper } from "./stepper";

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

describe("useStepper", () => {
  const steps = [
    { label: "Step 1" },
    { label: "Step 2" },
    { label: "Step 3" },
  ];

  it("returns initial step and totalSteps", () => {
    const { result } = withSetup(() => useStepper({ steps }));

    expect(result.currentStep.value).toBe(0);
    expect(result.totalSteps.value).toBe(3);
    expect(result.isFirst.value).toBe(true);
    expect(result.isLast.value).toBe(false);
  });

  it("respects initialStep option", () => {
    const { result } = withSetup(() =>
      useStepper({ steps, initialStep: 2 }),
    );

    expect(result.currentStep.value).toBe(2);
    expect(result.isFirst.value).toBe(false);
    expect(result.isLast.value).toBe(true);
  });

  it("next advances to next step", async () => {
    const { result, wrapper } = withSetup(() => useStepper({ steps }));

    result.next();
    await wrapper.vm.$nextTick();
    expect(result.currentStep.value).toBe(1);

    result.next();
    await wrapper.vm.$nextTick();
    expect(result.currentStep.value).toBe(2);

    result.next();
    await wrapper.vm.$nextTick();
    expect(result.currentStep.value).toBe(2);
  });

  it("prev goes to previous step", async () => {
    const { result, wrapper } = withSetup(() =>
      useStepper({ steps, initialStep: 2 }),
    );

    result.prev();
    await wrapper.vm.$nextTick();
    expect(result.currentStep.value).toBe(1);

    result.prev();
    await wrapper.vm.$nextTick();
    expect(result.currentStep.value).toBe(0);

    result.prev();
    await wrapper.vm.$nextTick();
    expect(result.currentStep.value).toBe(0);
  });

  it("goTo jumps to step by index", async () => {
    const { result, wrapper } = withSetup(() => useStepper({ steps }));

    result.goTo(2);
    await wrapper.vm.$nextTick();
    expect(result.currentStep.value).toBe(2);

    result.goTo(0);
    await wrapper.vm.$nextTick();
    expect(result.currentStep.value).toBe(0);
  });

  it("goTo clamps to valid range", async () => {
    const { result, wrapper } = withSetup(() => useStepper({ steps }));

    result.goTo(-1);
    await wrapper.vm.$nextTick();
    expect(result.currentStep.value).toBe(0);

    result.goTo(10);
    await wrapper.vm.$nextTick();
    expect(result.currentStep.value).toBe(2);
  });

  it("goTo ignores disabled steps", async () => {
    const stepsWithDisabled = [
      { label: "Step 1" },
      { label: "Step 2", disabled: true },
      { label: "Step 3" },
    ];
    const { result, wrapper } = withSetup(() =>
      useStepper({ steps: stepsWithDisabled }),
    );

    result.goTo(1);
    await wrapper.vm.$nextTick();
    expect(result.currentStep.value).toBe(0);

    result.goTo(2);
    await wrapper.vm.$nextTick();
    expect(result.currentStep.value).toBe(2);
  });

  it("canGoNext is false when on last step", () => {
    const { result } = withSetup(() =>
      useStepper({ steps, initialStep: 2 }),
    );
    expect(result.canGoNext.value).toBe(false);
  });

  it("canGoPrev is false when on first step", () => {
    const { result } = withSetup(() => useStepper({ steps }));
    expect(result.canGoPrev.value).toBe(false);
  });

  it("canGoNext is false when next step is disabled", () => {
    const stepsWithDisabled = [
      { label: "Step 1" },
      { label: "Step 2", disabled: true },
    ];
    const { result } = withSetup(() =>
      useStepper({ steps: stepsWithDisabled }),
    );
    expect(result.canGoNext.value).toBe(false);
  });

  it("setStepError updates step error state", async () => {
    const { result, wrapper } = withSetup(() => useStepper({ steps }));

    result.setStepError(1, true);
    await wrapper.vm.$nextTick();
    expect(result.steps.value[1]?.error).toBe(true);

    result.setStepError(1, false);
    await wrapper.vm.$nextTick();
    expect(result.steps.value[1]?.error).toBe(false);
  });

  it("stepVariant returns correct variant for each step", () => {
    const { result } = withSetup(() =>
      useStepper({ steps, initialStep: 1 }),
    );

    expect(result.stepVariant(0)).toBe("success");
    expect(result.stepVariant(1)).toBe("active");
    expect(result.stepVariant(2)).toBe("default");
  });

  it("stepVariant returns error when step has error", async () => {
    const { result, wrapper } = withSetup(() =>
      useStepper({ steps, initialStep: 1 }),
    );

    result.setStepError(1, true);
    await wrapper.vm.$nextTick();
    expect(result.stepVariant(1)).toBe("error");
  });
});
