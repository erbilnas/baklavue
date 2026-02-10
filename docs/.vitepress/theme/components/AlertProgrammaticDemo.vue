<script setup>
import { ref } from "vue";
import { BvAlert, BvButton } from "@baklavue/ui";

const alertRef = ref();
const isClosed = ref(false);

const openAlert = () => {
  alertRef.value?.open();
  isClosed.value = false;
};

const closeAlert = () => {
  alertRef.value?.close();
  isClosed.value = true;
};
</script>

<template>
  <div>
    <div style="margin-bottom: 1rem; display: flex; gap: 0.5rem">
      <BvButton @click="openAlert">Open</BvButton>
      <BvButton @click="closeAlert">Close</BvButton>
    </div>
    <BvAlert
      ref="alertRef"
      variant="info"
      description="This alert can be controlled via buttons or programmatically."
      :closed="isClosed"
      closable
      @close="isClosed = true"
    />
  </div>
</template>
