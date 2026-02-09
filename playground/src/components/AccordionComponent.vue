<script setup lang="ts">
import { BvAccordion } from '@baklavue/ui'
import { ref } from 'vue'
import type { BaklavaIcon } from '@trendyol/baklava-icons'

const emit = defineEmits<{
  logEvent: [message: string]
}>()

// Accordion states
const accordion1Open = ref(false)
const accordion2Open = ref(true)
const accordion3Open = ref(false)
const accordion4Open = ref(false)

// Accordion configurations
const accordionExamples = [
  {
    id: 'basic',
    caption: 'Basic Accordion',
    content: 'This is a basic accordion with default settings. Click to expand or collapse.',
  },
  {
    id: 'with-icon',
    caption: 'Accordion with Icon',
    icon: 'info' as BaklavaIcon,
    content: 'This accordion has an icon displayed before the caption.',
  },
  {
    id: 'disabled',
    caption: 'Disabled Accordion',
    disabled: true,
    content: 'This accordion is disabled and cannot be toggled.',
  },
  {
    id: 'custom-content',
    caption: 'Accordion with Custom Content',
    content: 'This accordion contains custom HTML content including lists and formatting.',
  },
]

const handleToggle = (accordionId: string, open: boolean) => {
  emit('logEvent', `Accordion "${accordionId}" ${open ? 'opened' : 'closed'}`)
  
  // Update local state
  if (accordionId === 'accordion1') accordion1Open.value = open
  if (accordionId === 'accordion2') accordion2Open.value = open
  if (accordionId === 'accordion3') accordion3Open.value = open
  if (accordionId === 'accordion4') accordion4Open.value = open
}
</script>

<template>
  <section class="component-demo">
    <h2>Accordion Component</h2>

    <!-- Basic Examples Section -->
    <div class="accordion-category">
      <h3>Basic Examples</h3>
      <div class="accordion-list">
        <div class="accordion-item">
          <BvAccordion
            :open="accordion1Open"
            caption="Simple Accordion"
            @toggle="(open) => handleToggle('accordion1', open)"
          >
            <p>This is a simple accordion with basic content. You can put any content inside.</p>
          </BvAccordion>
        </div>

        <div class="accordion-item">
          <BvAccordion
            :open="accordion2Open"
            caption="Pre-opened Accordion"
            @toggle="(open) => handleToggle('accordion2', open)"
          >
            <p>This accordion starts in an open state.</p>
            <ul>
              <li>Item 1</li>
              <li>Item 2</li>
              <li>Item 3</li>
            </ul>
          </BvAccordion>
        </div>
      </div>
    </div>

    <!-- With Icons Section -->
    <div class="accordion-category">
      <h3>With Icons</h3>
      <div class="accordion-list">
        <div class="accordion-item">
          <BvAccordion
            :open="accordion3Open"
            caption="Accordion with Info Icon"
            icon="info"
            @toggle="(open) => handleToggle('accordion3', open)"
          >
            <p>This accordion has an info icon displayed before the caption.</p>
          </BvAccordion>
        </div>

        <div class="accordion-item">
          <BvAccordion
            :open="accordion4Open"
            caption="Accordion with Alert Icon"
            icon="alert"
            @toggle="(open) => handleToggle('accordion4', open)"
          >
            <p>This accordion uses an alert icon.</p>
          </BvAccordion>
        </div>
      </div>
    </div>

    <!-- States Section -->
    <div class="accordion-category">
      <h3>States</h3>
      <div class="accordion-list">
        <div class="accordion-item">
          <BvAccordion caption="Disabled Accordion" :disabled="true">
            <p>This accordion is disabled and cannot be interacted with.</p>
          </BvAccordion>
        </div>
      </div>
    </div>

    <!-- Custom Content Section -->
    <div class="accordion-category">
      <h3>Custom Content</h3>
      <div class="accordion-list">
        <div class="accordion-item">
          <BvAccordion caption="Accordion with Rich Content">
            <div>
              <h4>Rich Content Example</h4>
              <p>You can include any HTML content inside an accordion:</p>
              <ul>
                <li>Lists</li>
                <li>Paragraphs</li>
                <li>Images</li>
                <li>Forms</li>
              </ul>
              <p><strong>Bold text</strong> and <em>italic text</em> work too!</p>
            </div>
          </BvAccordion>
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

.accordion-category {
  margin-bottom: 2rem;
  padding: 1.25rem;
  border: 1px solid #f3f4f6;
  border-radius: 8px;
  background: #fafafa;
}

.accordion-category:last-child {
  margin-bottom: 0;
}

.accordion-category h3 {
  margin-bottom: 1rem;
  color: #374151;
  font-size: 1.125rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.accordion-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.accordion-item {
  width: 100%;
}

.accordion-item p {
  margin: 0.5rem 0;
  color: #6b7280;
  line-height: 1.6;
}

.accordion-item ul {
  margin: 0.5rem 0;
  padding-left: 1.5rem;
  color: #6b7280;
}

.accordion-item h4 {
  margin: 0.5rem 0;
  color: #111827;
  font-size: 1.125rem;
  font-weight: 600;
}
</style>
