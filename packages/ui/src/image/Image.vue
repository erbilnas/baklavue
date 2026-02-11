<script setup lang="ts">
/**
 * Image Component
 *
 * Performance-focused image wrapper with lazy loading,
 * skeleton placeholder, and error handling.
 *
 * @component
 * @example
 * ```vue
 * <template>
 *   <BvImage src="/photo.jpg" alt="Photo" width="200px" height="120px" />
 * </template>
 * ```
 */
import { ref, computed, onMounted } from "vue";
import { loadBaklavaResources } from "../utils/loadBaklavaResources";
import BvSkeleton from "../skeleton/Skeleton.vue";
import type { ImageProps } from "./image.types";

const props = withDefaults(defineProps<ImageProps>(), {
  loading: "lazy",
  placeholder: "skeleton",
  objectFit: "cover",
});

const emit = defineEmits<{
  load: [event: Event];
  error: [event: Event];
}>();

const isLoading = ref(true);
const hasError = ref(false);

const showPlaceholder = computed(
  () => isLoading.value && props.placeholder === "skeleton" && !hasError.value,
);

const showImage = computed(() => !hasError.value);

const wrapperStyle = computed(() => ({
  width: props.width ?? "100%",
  height: props.height ?? "auto",
  aspectRatio: !props.height && props.width ? "16 / 9" : undefined,
}));

function onLoad(event: Event) {
  isLoading.value = false;
  emit("load", event);
}

function onError(event: Event) {
  isLoading.value = false;
  hasError.value = true;
  emit("error", event);
}

onMounted(() => {
  loadBaklavaResources();
});
</script>

<template>
  <div class="image-wrapper" :style="wrapperStyle">
    <!-- Placeholder (skeleton or custom slot) -->
    <div v-if="showPlaceholder" class="image-placeholder">
      <slot name="placeholder">
        <BvSkeleton
          class="image-skeleton"
          width="100%"
          height="100%"
          variant="rectangle"
        />
      </slot>
    </div>

    <!-- Loaded image -->
    <img
      v-show="showImage"
      :src="src"
      :alt="alt"
      :loading="loading"
      :srcset="srcset"
      :sizes="sizes"
      class="image-img"
      :style="{ objectFit }"
      @load="onLoad"
      @error="onError"
    />

    <!-- Error fallback -->
    <div v-if="hasError" class="image-fallback">
      <slot name="fallback">
        <div class="image-fallback-default" role="img" :aria-label="alt">
          Failed to load image
        </div>
      </slot>
    </div>
  </div>
</template>

<style scoped>
.image-wrapper {
  position: relative;
  overflow: hidden;
  display: block;
}

.image-placeholder {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-skeleton {
  width: 100% !important;
  height: 100% !important;
}

.image-img {
  display: block;
  width: 100%;
  height: 100%;
  vertical-align: middle;
}

.image-fallback {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-fallback-default {
  background: var(--bl-color-neutral-light, #e5e7eb);
  color: var(--bl-color-neutral-darker, #6b7280);
  font-size: 0.875rem;
  padding: 1rem;
  text-align: center;
}
</style>
