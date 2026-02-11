import { ref } from "vue";

/**
 * Options for the confirm dialog.
 */
export interface ConfirmDialogOptions {
  /** Dialog title/caption */
  caption?: string;
  /** Dialog body/description */
  description?: string;
}

type ResolveFn = (value: boolean) => void;

/**
 * Composable for driving BvDialog confirm/cancel flows.
 * Returns a promise that resolves to true when the user confirms, false when cancelled.
 * Often used with useNotification for success/error feedback.
 *
 * @example
 * ```ts
 * const { confirm, isOpen, caption, description, handleConfirm, handleCancel } = useConfirmDialog();
 *
 * const handleDelete = async () => {
 *   const ok = await confirm({ caption: "Delete?", description: "Are you sure?" });
 *   if (ok) {
 *     await deleteItem();
 *     success({ description: "Deleted" });
 *   }
 * };
 *
 * // In template - bind to BvDialog:
 * // <BvDialog v-model:open="isOpen" :caption="caption" :description="description">
 * //   <template #footer>
 * //     <BvButton @click="handleCancel">Cancel</BvButton>
 * //     <BvButton variant="primary" @click="handleConfirm">Confirm</BvButton>
 * //   </template>
 * // </BvDialog>
 * ```
 *
 * @returns Confirm dialog state and handlers
 */
export const useConfirmDialog = () => {
  const isOpen = ref(false);
  const caption = ref("");
  const description = ref("");
  const isPending = ref(false);

  let resolvePromise: ResolveFn | null = null;

  const confirm = (options: ConfirmDialogOptions = {}): Promise<boolean> => {
    caption.value = options.caption ?? "";
    description.value = options.description ?? "";
    isOpen.value = true;
    isPending.value = true;

    return new Promise<boolean>((resolve) => {
      resolvePromise = resolve;
    });
  };

  const close = (result: boolean) => {
    isOpen.value = false;
    isPending.value = false;
    if (resolvePromise) {
      resolvePromise(result);
      resolvePromise = null;
    }
  };

  const handleConfirm = () => {
    close(true);
  };

  const handleCancel = () => {
    close(false);
  };

  return {
    confirm,
    isOpen,
    caption,
    description,
    isPending,
    handleConfirm,
    handleCancel,
    close,
  };
};
