<script setup lang="ts">
defineEmits<{
  click: [];
}>();
</script>

<template>
  <button
    type="button"
    class="theme-customizer-toggle"
    aria-label="Customize theme"
    title="Customize theme"
    @click="$emit('click')"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 26 26"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <circle cx="13.5" cy="6.5" r="0.5" />
      <circle cx="17.5" cy="10.5" r="0.5" />
      <circle cx="8.5" cy="7.5" r="0.5" />
      <circle cx="6.5" cy="12.5" r="0.5" />
      <path
        d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.648 0-.437-.18-.835-.437-1.125.29-.439.728-.719 1.125-.719 1.01 0 1.868.492 2.661 1.199.303-.304.658-.503 1.062-.496.944.014 1.713.778 1.708 1.722h-.006c-.37 0-.709.137-.985.36A7.975 7.975 0 0 0 12 2z"
      />
    </svg>
  </button>
</template>

<style scoped>
.theme-customizer-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  padding: 0;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  border: none;
  border-radius: 6px;
  background: transparent;
  color: var(--vp-c-text-2);
  cursor: pointer;
  transition:
    background 0.2s,
    color 0.2s;
}

.theme-customizer-toggle:hover {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
}
</style>
