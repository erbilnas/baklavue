import { ref } from "vue";

export type AlertVariant = "info" | "success" | "warning" | "danger";

export interface UseAlertOptions {
  variant?: AlertVariant;
  caption?: string;
  description?: string;
  closable?: boolean;
}

/**
 * Composable for programmatic show/hide of inline BvAlert.
 * Use with v-if="isVisible" or :closed="!isVisible" on BvAlert.
 *
 * @example
 * ```ts
 * const { isVisible, variant, caption, description, show, hide } = useAlert();
 *
 * show({ variant: "success", description: "Saved!" });
 * hide();
 *
 * <BvAlert v-if="isVisible" :variant="variant" :caption="caption" :description="description" closable @close="hide" />
 * ```
 *
 * @returns Object with isVisible, variant, caption, description, closable, show, hide
 */
export function useAlert() {
  const isVisible = ref(false);
  const variant = ref<AlertVariant>("info");
  const caption = ref("");
  const description = ref("");
  const closable = ref(false);

  const show = (options: UseAlertOptions = {}) => {
    variant.value = options.variant ?? "info";
    caption.value = options.caption ?? "";
    description.value = options.description ?? "";
    closable.value = options.closable ?? false;
    isVisible.value = true;
  };

  const hide = () => {
    isVisible.value = false;
  };

  return {
    isVisible,
    variant,
    caption,
    description,
    closable,
    show,
    hide,
  };
}
