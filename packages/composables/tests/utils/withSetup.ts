import { mount } from "@vue/test-utils";
import { defineComponent } from "vue";

/**
 * Helper to test composables that need Vue lifecycle/context.
 * Mounts a wrapper component that runs the composable and returns the result.
 */
export function withSetup<T>(composable: () => T) {
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
