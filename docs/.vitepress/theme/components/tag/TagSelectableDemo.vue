<script setup>
import { BvTag } from "@baklavue/ui";
import { ref } from "vue";

const filters = ref(["Vue", "React", "Svelte"]);
const selected = ref(["Vue"]);

function toggleFilter(filter, value) {
  if (value) {
    if (!selected.value.includes(filter)) selected.value.push(filter);
  } else {
    selected.value = selected.value.filter((s) => s !== filter);
  }
}
</script>

<template>
  <div>
    <p style="margin-bottom: 0.5rem; font-size: 0.875rem; color: var(--vp-c-text-2)">
      Filter by framework (click to toggle):
    </p>
    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap">
      <BvTag
        v-for="filter in filters"
        :key="filter"
        variant="selectable"
        :selected="selected.includes(filter)"
        :value="filter"
        @update:selected="(v) => toggleFilter(filter, v)"
      >
        {{ filter }}
      </BvTag>
    </div>
  </div>
</template>
