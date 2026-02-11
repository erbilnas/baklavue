<script setup>
import { useNotification } from "@baklavue/composables";
import { BvButton, BvNotification } from "@baklavue/ui";

const { success, error, warning, info } = useNotification();
</script>

<template>
  <div>
    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap">
      <BvButton
        kind="success"
        @click="
          () =>
            success({
              caption: 'Success!',
              description: 'Operation completed successfully.',
            })
        "
      >
        Success
      </BvButton>
      <BvButton
        kind="danger"
        @click="
          () =>
            error({ caption: 'Error', description: 'Something went wrong.' })
        "
      >
        Error
      </BvButton>
      <BvButton
        kind="default"
        @click="
          () =>
            warning({
              caption: 'Warning',
              description: 'Please check your input.',
            })
        "
      >
        Warning
      </BvButton>
      <BvButton
        kind="neutral"
        @click="
          () =>
            info({
              caption: 'Info',
              description: 'This is an informational message.',
            })
        "
      >
        Info
      </BvButton>
    </div>
    <BvNotification />
  </div>
</template>
