<script setup>
import { BvTab } from "@baklavue/ui";
import { ref } from "vue";

const activeTab = ref("profile");
</script>

<template>
  <div>
    <p style="margin-bottom: 0.5rem">Active tab: {{ activeTab }}</p>
    <BvTab
      v-model:activeTab="activeTab"
      :tabs="[
        { label: 'Overview', value: 'overview' },
        { label: 'Profile', value: 'profile' },
        { label: 'Settings', value: 'settings' },
      ]"
    >
      <div v-if="activeTab === 'overview'" style="color: black; padding: 1rem">
        Overview content
      </div>
      <div v-if="activeTab === 'profile'" style="color: black; padding: 1rem">
        Profile content
      </div>
      <div v-if="activeTab === 'settings'" style="color: black; padding: 1rem">
        Settings content
      </div>
    </BvTab>
  </div>
</template>
