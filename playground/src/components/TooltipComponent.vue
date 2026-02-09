<script setup lang="ts">
import { BvTooltip, BvButton } from '@baklavue/ui'

const emit = defineEmits<{
  logEvent: [message: string]
}>()

const handleShow = (id: string) => {
  emit('logEvent', `Tooltip "${id}" shown`)
}

const handleHide = (id: string) => {
  emit('logEvent', `Tooltip "${id}" hidden`)
}
</script>

<template>
  <section class="component-demo">
    <h2>Tooltip Component</h2>

    <div class="tooltip-category">
      <h3>Tooltip Examples</h3>
      <div class="tooltip-list">
        <div class="tooltip-item">
          <BvTooltip
            content="This is a tooltip"
            @show="() => handleShow('tooltip1')"
            @hide="() => handleHide('tooltip1')"
          >
            <BvButton>Hover for Tooltip</BvButton>
          </BvTooltip>
        </div>
        <div class="tooltip-item">
          <BvTooltip
            content="Tooltip on top"
            placement="top"
            @show="() => handleShow('tooltip2')"
            @hide="() => handleHide('tooltip2')"
          >
            <BvButton>Top Tooltip</BvButton>
          </BvTooltip>
        </div>
        <div class="tooltip-item">
          <BvTooltip
            content="Tooltip on bottom"
            placement="bottom"
            @show="() => handleShow('tooltip3')"
            @hide="() => handleHide('tooltip3')"
          >
            <BvButton>Bottom Tooltip</BvButton>
          </BvTooltip>
        </div>
        <div class="tooltip-item">
          <BvTooltip
            content="Tooltip on left"
            placement="left"
            @show="() => handleShow('tooltip4')"
            @hide="() => handleHide('tooltip4')"
          >
            <BvButton>Left Tooltip</BvButton>
          </BvTooltip>
        </div>
        <div class="tooltip-item">
          <BvTooltip
            content="Tooltip on right"
            placement="right"
            @show="() => handleShow('tooltip5')"
            @hide="() => handleHide('tooltip5')"
          >
            <BvButton>Right Tooltip</BvButton>
          </BvTooltip>
        </div>
      </div>
    </div>

    <div class="tooltip-category">
      <h3>Tooltip with Custom Content</h3>
      <div class="tooltip-list">
        <div class="tooltip-item">
          <BvTooltip @show="() => handleShow('tooltip6')" @hide="() => handleHide('tooltip6')">
            <template #content>
              <div style="padding: 0.5rem;">
                <strong>Custom Tooltip</strong>
                <p>This tooltip has custom HTML content</p>
              </div>
            </template>
            <BvButton>Custom Content Tooltip</BvButton>
          </BvTooltip>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="css" scoped>
.component-demo {
  margin-bottom: 2rem;
  padding: 1.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  background: #ffffff;
  box-shadow:
    0 1px 3px 0 rgba(0, 0, 0, 0.1),
    0 1px 2px 0 rgba(0, 0, 0, 0.06);
}

.component-demo h2 {
  margin-bottom: 1.5rem;
  color: #111827;
  font-size: 1.5rem;
  font-weight: 600;
  border-bottom: 2px solid #f3f4f6;
  padding-bottom: 0.75rem;
}

.tooltip-category {
  margin-bottom: 2rem;
  padding: 1.25rem;
  border: 1px solid #f3f4f6;
  border-radius: 8px;
  background: #fafafa;
}

.tooltip-category:last-child {
  margin-bottom: 0;
}

.tooltip-category h3 {
  margin-bottom: 1rem;
  color: #374151;
  font-size: 1.125rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.tooltip-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
}

.tooltip-item {
  display: flex;
  align-items: center;
}
</style>
