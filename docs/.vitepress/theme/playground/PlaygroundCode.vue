<script setup lang="ts">
import { computed } from "vue";
import type { ComponentSchema } from "./schemas";
import { SLOT_CONTENT_KEYS } from "./schemas";

const props = defineProps<{
  schema: ComponentSchema;
  model: Record<string, unknown>;
  copied?: boolean;
}>();

const emit = defineEmits<{
  copy: [];
}>();

const code = computed(() => {
  const comp = props.schema.component;
  const slotKey = SLOT_CONTENT_KEYS[props.schema.id];

  const attrs: string[] = [];
  let slotContent = "";

  const vModelKeys = new Set([
    "modelValue",
    "checked",
    "currentPage",
    "open",
    "currentStep",
    "activeTab",
  ]);

  for (const [key, value] of Object.entries(props.model)) {
    if (slotKey && key === slotKey) {
      slotContent = String(value);
      continue;
    }
    if (vModelKeys.has(key)) continue;
    if (value === undefined || value === null) continue;
    if (typeof value === "string" && value === "") continue;
    if (typeof value === "boolean") {
      if (value) attrs.push(key);
      continue;
    }
    if (typeof value === "string") {
      attrs.push(`${key}="${escapeAttr(value)}"`);
      continue;
    }
    if (typeof value === "number") {
      attrs.push(`:${key}="${value}"`);
      continue;
    }
    if (Array.isArray(value) || (typeof value === "object" && value !== null)) {
      const json = JSON.stringify(value);
      attrs.push(`:${key}='${json.replace(/'/g, "\\'")}'`);
      continue;
    }
  }

  const vModelAttr =
    props.schema.usesVModel && props.schema.id === "input"
      ? ` v-model="value"`
      : props.schema.usesVModel && props.schema.id === "switch"
        ? ` v-model:checked="checked"`
        : props.schema.usesVModel && props.schema.id === "checkbox"
          ? ` v-model="checked"`
          : props.schema.usesVModel && props.schema.id === "file-upload"
            ? ` v-model="files"`
            : props.schema.usesVModel && props.schema.id === "textarea"
              ? ` v-model="value"`
              : props.schema.usesVModel && props.schema.id === "radio"
                ? ` v-model="selected"`
                : props.schema.usesVModel && props.schema.id === "select"
                  ? ` v-model="selected"`
                  : props.schema.usesVModel && props.schema.id === "pagination"
                    ? ` v-model:current-page="page"`
                    : props.schema.usesVModel && props.schema.id === "datepicker"
                      ? ` v-model="date"`
                      : props.schema.usesVModel && props.schema.id === "dialog"
                        ? ` v-model:open="open"`
                        : props.schema.usesVModel && props.schema.id === "drawer"
                          ? ` v-model:open="open"`
                          : props.schema.usesVModel && props.schema.id === "stepper"
                            ? ` v-model:current-step="step"`
                            : props.schema.usesVModel && props.schema.id === "tab"
                              ? ` v-model:active-tab="activeTab"`
                              : "";

  const attrsStr = attrs.length > 0 ? " " + attrs.join(" ") : "";
  const tagContent = slotContent ? `>${escapeHtml(slotContent)}</${comp}` : ` />`;
  const openTag = `<${comp}${vModelAttr}${attrsStr}${tagContent}`;

  const imports = [comp];
  const refs: string[] = [];
  if (props.schema.id === "input" || props.schema.id === "textarea") {
    refs.push('const value = ref("");');
  } else if (props.schema.id === "switch" || props.schema.id === "checkbox") {
    refs.push("const checked = ref(false);");
  } else if (props.schema.id === "file-upload") {
    refs.push("const files = ref(null);");
  } else if (props.schema.id === "radio" || props.schema.id === "select") {
    refs.push('const selected = ref(null);');
  } else if (props.schema.id === "pagination") {
    refs.push("const page = ref(1);");
  } else if (props.schema.id === "datepicker") {
    refs.push("const date = ref(null);");
  } else if (props.schema.id === "dialog" || props.schema.id === "drawer") {
    refs.push("const open = ref(true);");
  } else if (props.schema.id === "stepper") {
    refs.push("const step = ref(0);");
  } else if (props.schema.id === "tab") {
    refs.push('const activeTab = ref("tab1");');
  }

  const scriptSetup = refs.length > 0
    ? `import { ref } from "vue";
import { ${imports.join(", ")} } from "@baklavue/ui";

${refs.join("\n")}`
    : `import { ${imports.join(", ")} } from "@baklavue/ui";`;

  // Break up script tags to prevent SFC parser from misinterpreting
  const scriptOpen = "<scr" + "ipt setup>";
  const scriptClose = "</scr" + "ipt>";
  return `<template>
  ${openTag}
</template>

${scriptOpen}
${scriptSetup}
${scriptClose}`;
});

function escapeAttr(s: string): string {
  return s.replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function escapeHtml(s: string): string {
  return s.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

async function copyToClipboard() {
  try {
    await navigator.clipboard.writeText(code.value);
    emit("copy");
  } catch {
    // fallback
  }
}
</script>

<template>
  <div class="playground-code">
    <div class="playground-code-header">
      <div class="playground-code-header-left">
        <span class="playground-code-title">Code</span>
        <span class="playground-code-import-hint">Import from <code>@baklavue/ui</code></span>
      </div>
      <button
        type="button"
        class="playground-code-copy"
        :class="{ 'playground-code-copy--success': copied }"
        :aria-label="copied ? 'Copied' : 'Copy code'"
        @click="copyToClipboard"
      >
        <span v-if="copied" class="playground-code-copy-icon">✓</span>
        <span v-else>Copy</span>
      </button>
    </div>
    <pre class="playground-code-block"><code>{{ code }}</code></pre>
  </div>
</template>

<style scoped>
.playground-code {
  margin-top: 1rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
}

.playground-code-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.5rem 0.75rem;
  background: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-divider);
}

.playground-code-header-left {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.playground-code-title {
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--vp-c-text-2);
}

.playground-code-import-hint {
  font-size: 0.6875rem;
  color: var(--vp-c-text-3);
}

.playground-code-import-hint code {
  font-family: var(--vp-font-mono);
  padding: 0.125rem 0.25rem;
  background: var(--vp-c-bg-mute);
  border-radius: 4px;
}

.playground-code-copy {
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  cursor: pointer;
}

.playground-code-copy:hover {
  background: var(--vp-c-bg-mute);
}

.playground-code-copy--success {
  color: var(--vp-c-green-1);
  border-color: var(--vp-c-green-1);
}

.playground-code-copy-icon {
  font-weight: 600;
}

.playground-code-block {
  margin: 0;
  padding: 1.25rem 1.5rem;
  min-height: 200px;
  font-size: 0.875rem;
  line-height: 1.6;
  overflow-x: auto;
}

.playground-code-block code {
  font-family: var(--vp-font-mono);
  color: var(--vp-c-text-1);
}
</style>
