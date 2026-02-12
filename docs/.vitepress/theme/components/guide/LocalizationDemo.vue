<script setup>
import { BvButton, BvDatepicker, BvPagination } from "@baklavue/ui";
import { onMounted, ref } from "vue";

const date = ref("");
const currentPage = ref(1);
const currentLocale = ref("en");

const locales = [
  { code: "en", label: "English" },
  { code: "tr", label: "Türkçe" },
  { code: "ar", label: "العربية" },
  { code: "ro", label: "Română" },
];

function setLocale(code) {
  document.documentElement.lang = code;
  currentLocale.value = code;
  if (code === "ar") {
    document.documentElement.dir = "rtl";
  } else {
    document.documentElement.dir = "ltr";
  }
}

onMounted(async () => {
  try {
    const { init } = await import(
      "@trendyol/baklava/dist/localization.js"
    );
    await init();
  } catch (e) {
    console.warn("Baklava localization init failed:", e);
  }
});
</script>

<template>
  <div class="localization-demo">
    <div class="locale-switcher">
      <span class="locale-label">Locale:</span>
      <div class="locale-buttons">
        <BvButton
          v-for="loc in locales"
          :key="loc.code"
          :variant="currentLocale === loc.code ? 'primary' : 'secondary'"
          size="small"
          @click="setLocale(loc.code)"
        >
          {{ loc.label }}
        </BvButton>
      </div>
    </div>
    <div class="demo-components">
      <BvDatepicker
        v-model="date"
        label="Select date"
        placeholder="Pick a date"
      />
      <div class="pagination-section">
        <p class="pagination-label">Current page: {{ currentPage }}</p>
        <BvPagination
          v-model:current-page="currentPage"
          :total-items="100"
          :page-size="10"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.localization-demo {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.locale-switcher {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.locale-label {
  font-weight: 500;
  font-size: 0.875rem;
}

.locale-buttons {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.demo-components {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.pagination-section {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.pagination-label {
  margin: 0;
  font-size: 0.875rem;
}
</style>
