<template>
  <a
    href="https://www.npmjs.com/package/@trendyol/baklava"
    target="_blank"
    rel="noopener noreferrer"
    class="baklava-version-badge"
    title="Based on @trendyol/baklava"
  >
    <span class="baklava-version-badge__dot" aria-hidden="true" />
    Builds on Baklava v3.4.2
  </a>
</template>

<style scoped>
.baklava-version-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.375rem 0.75rem;
  margin-left: 0.875rem;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  text-decoration: none;
  border-radius: 9999px;
  border: 1px solid color-mix(in srgb, var(--vp-c-brand-1) 40%, transparent);
  background: linear-gradient(
    135deg,
    color-mix(in srgb, var(--vp-c-brand-1) 14%, transparent) 0%,
    color-mix(in srgb, var(--vp-c-brand-1) 8%, transparent) 100%
  );
  color: var(--vp-c-brand-1);
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 1px 3px color-mix(in srgb, var(--vp-c-brand-1) 10%, transparent);
}

.baklava-version-badge:hover {
  background: linear-gradient(
    135deg,
    color-mix(in srgb, var(--vp-c-brand-1) 22%, transparent) 0%,
    color-mix(in srgb, var(--vp-c-brand-1) 14%, transparent) 100%
  );
  border-color: color-mix(in srgb, var(--vp-c-brand-1) 55%, transparent);
  box-shadow: 0 2px 8px color-mix(in srgb, var(--vp-c-brand-1) 20%, transparent);
  transform: translateY(-1px);
}

.baklava-version-badge__dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--vp-c-brand-1);
  box-shadow: 0 0 6px color-mix(in srgb, var(--vp-c-brand-1) 60%, transparent);
}
</style>
