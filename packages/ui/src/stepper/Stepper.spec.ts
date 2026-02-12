import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import BvStepper from "./Stepper.vue";

describe("BvStepper", () => {
  it("renders with steps prop", () => {
    const wrapper = mount(BvStepper, {
      props: {
        steps: [
          { label: "Step 1" },
          { label: "Step 2" },
          { label: "Step 3" },
        ],
      },
    });
    expect(wrapper.find("bl-stepper").exists()).toBe(true);
    expect(wrapper.findAll("bl-stepper-item")).toHaveLength(3);
  });

  it("emits update:currentStep when bl-stepper fires bl-stepper-change", async () => {
    const wrapper = mount(BvStepper, {
      props: {
        steps: [{ label: "A" }, { label: "B" }],
        currentStep: 0,
      },
    });
    wrapper.find("bl-stepper").element.dispatchEvent(
      new CustomEvent("bl-stepper-change", {
        bubbles: true,
        detail: { activeStep: 1, totalSteps: 2 },
      }),
    );
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("update:currentStep")).toEqual([[1]]);
    expect(wrapper.emitted("step-change")).toHaveLength(1);
  });
});
