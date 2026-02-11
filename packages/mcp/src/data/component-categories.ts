/**
 * Component to category mapping for Baklavue components.
 * Based on docs/components/index.md structure.
 */
export const COMPONENT_CATEGORIES: Record<string, string> = {
  // Form Components
  Button: "form",
  Input: "form",
  Checkbox: "form",
  Radio: "form",
  Switch: "form",
  Select: "form",
  Textarea: "form",
  Datepicker: "form",
  // Feedback Components
  Alert: "feedback",
  Badge: "feedback",
  Tag: "feedback",
  Notification: "feedback",
  Spinner: "feedback",
  // Layout Components
  Dialog: "layout",
  Drawer: "layout",
  Dropdown: "layout",
  Tooltip: "layout",
  Accordion: "layout",
  Tab: "layout",
  Stepper: "layout",
  // Navigation Components
  Link: "navigation",
  Pagination: "navigation",
  SplitButton: "navigation",
  // Data Display
  Table: "data",
  Icon: "data",
};

export const CATEGORY_LABELS: Record<string, string> = {
  form: "Form",
  feedback: "Feedback",
  layout: "Layout",
  navigation: "Navigation",
  data: "Data",
};

export const COMPONENT_LIST = Object.keys(COMPONENT_CATEGORIES);
