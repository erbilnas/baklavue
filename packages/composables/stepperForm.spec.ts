import { mount } from "@vue/test-utils";
import { defineComponent } from "vue";
import { describe, expect, it } from "vitest";
import type { FormErrors } from "./formValidation";
import { useStepper } from "./stepper";
import { useStepperForm } from "./stepperForm";

function withStepperForm(options?: { stepFields?: (i: number) => string[] }) {
  let stepper: ReturnType<typeof useStepper>;
  let result: ReturnType<typeof useStepperForm>;
  const TestComponent = defineComponent({
    setup() {
      stepper = useStepper({
        steps: [{ label: "Step 1" }, { label: "Step 2" }],
      });
      result = useStepperForm(stepper, options);
      return () => null;
    },
  });
  const wrapper = mount(TestComponent);
  return { result: result!, stepper: stepper!, wrapper };
}

describe("useStepperForm", () => {
  it("returns hasStepError and nextWithValidation", () => {
    const { result } = withStepperForm();

    expect(result.hasStepError).toBeDefined();
    expect(result.nextWithValidation).toBeDefined();
  });

  it("hasStepError returns false when step has no error", () => {
    const { result } = withStepperForm();

    expect(result.hasStepError()).toBe(false);
  });

  it("hasStepError returns true when step has error", async () => {
    const { result, stepper, wrapper } = withStepperForm();

    stepper.setStepError(0, true);
    await wrapper.vm.$nextTick();

    expect(result.hasStepError()).toBe(true);
  });

  it("nextWithValidation advances when validate returns null", async () => {
    const { result, stepper } = withStepperForm();

    const validate = () => Promise.resolve(null);
    const ok = await result.nextWithValidation(validate);

    expect(ok).toBe(true);
    expect(stepper.currentStep.value).toBe(1);
  });

  it("nextWithValidation does not advance when validate returns errors", async () => {
    const { result, stepper } = withStepperForm();

    const validate = () =>
      Promise.resolve({ email: "Required" } as unknown as FormErrors);
    const ok = await result.nextWithValidation(validate);

    expect(ok).toBe(false);
    expect(stepper.currentStep.value).toBe(0);
  });

  it("nextWithValidation sets step error when validation fails", async () => {
    const { result, stepper } = withStepperForm();

    await result.nextWithValidation(() =>
      Promise.resolve({ email: "Invalid" } as unknown as FormErrors),
    );

    expect(stepper.steps.value[0]?.error).toBe(true);
  });

  it("stepFields filters errors to current step", async () => {
    const { result, stepper } = withStepperForm({
      stepFields: (i) => (i === 0 ? ["email", "name"] : ["address"]),
    });

    const ok = await result.nextWithValidation(() =>
      Promise.resolve({ other: "Error" } as unknown as FormErrors),
    );

    expect(ok).toBe(false);
    expect(stepper.steps.value[0]?.error).toBe(false);
  });
});
