/**
 * Playground component schemas.
 * Defines which props to expose and how to control them for each component.
 */

export type PropControlType = "select" | "text" | "boolean" | "number";

export interface PropSchemaSelect {
  key: string;
  type: "select";
  options: string[];
  default: string;
  description?: string;
}

export interface PropSchemaText {
  key: string;
  type: "text";
  default: string;
  description?: string;
}

export interface PropSchemaBoolean {
  key: string;
  type: "boolean";
  default: boolean;
  description?: string;
}

export interface PropSchemaNumber {
  key: string;
  type: "number";
  default: number;
  description?: string;
}

export type PropSchema =
  | PropSchemaSelect
  | PropSchemaText
  | PropSchemaBoolean
  | PropSchemaNumber;

export interface ComponentSchema {
  id: string;
  name: string;
  component: string;
  /** Components that use v-model need special handling in preview/code */
  usesVModel?: boolean;
  /** Docs path (e.g. /components/button). Base /baklavue/ is prepended by VitePress. */
  docsLink?: string;
  props: PropSchema[];
}

export const PLAYGROUND_SCHEMAS: ComponentSchema[] = [
  {
    id: "button",
    name: "Button",
    component: "BvButton",
    props: [
      {
        key: "variant",
        type: "select",
        options: ["primary", "secondary", "tertiary"],
        default: "primary",
        description: "Visual style: primary (filled), secondary (outlined), tertiary (ghost)",
      },
      {
        key: "kind",
        type: "select",
        options: ["default", "neutral", "success", "danger"],
        default: "default",
        description: "Semantic color: default, neutral, success, or danger",
      },
      {
        key: "size",
        type: "select",
        options: ["small", "medium", "large"],
        default: "medium",
        description: "Button height and padding",
      },
      { key: "label", type: "text", default: "Click me" },
      { key: "disabled", type: "boolean", default: false, description: "Prevents interaction" },
      { key: "loading", type: "boolean", default: false, description: "Shows loading spinner" },
    ],
  },
  {
    id: "input",
    name: "Input",
    component: "BvInput",
    usesVModel: true,
    props: [
      {
        key: "type",
        type: "select",
        options: ["text", "email", "password", "number"],
        default: "text",
        description: "HTML input type for validation and keyboard",
      },
      { key: "label", type: "text", default: "Label" },
      { key: "placeholder", type: "text", default: "Placeholder..." },
      {
        key: "size",
        type: "select",
        options: ["small", "medium", "large"],
        default: "medium",
        description: "Input height",
      },
      { key: "disabled", type: "boolean", default: false },
      { key: "readonly", type: "boolean", default: false },
      { key: "required", type: "boolean", default: false },
    ],
  },
  {
    id: "badge",
    name: "Badge",
    component: "BvBadge",
    props: [
      {
        key: "size",
        type: "select",
        options: ["small", "medium", "large"],
        default: "medium",
        description: "Badge dimensions",
      },
      { key: "content", type: "text", default: "99" },
    ],
  },
  {
    id: "switch",
    name: "Switch",
    component: "BvSwitch",
    usesVModel: true,
    props: [
      { key: "label", type: "text", default: "Toggle" },
      {
        key: "size",
        type: "select",
        options: ["small", "medium", "large"],
        default: "medium",
      },
      { key: "checked", type: "boolean", default: false },
      { key: "disabled", type: "boolean", default: false },
    ],
  },
  {
    id: "alert",
    name: "Alert",
    component: "BvAlert",
    props: [
      {
        key: "variant",
        type: "select",
        options: ["success", "danger", "info", "warning"],
        default: "info",
      },
      { key: "description", type: "text", default: "This is an alert message." },
      { key: "closable", type: "boolean", default: false },
    ],
  },
  {
    id: "spinner",
    name: "Spinner",
    component: "BvSpinner",
    props: [
      {
        key: "size",
        type: "select",
        options: [
          "var(--bl-font-size-s)",
          "var(--bl-font-size-m)",
          "var(--bl-font-size-l)",
        ],
        default: "var(--bl-font-size-m)",
      },
      { key: "label", type: "text", default: "Loading..." },
    ],
  },
  {
    id: "tag",
    name: "Tag",
    component: "BvTag",
    props: [
      {
        key: "variant",
        type: "select",
        options: ["selectable", "removable"],
        default: "selectable",
      },
      {
        key: "size",
        type: "select",
        options: ["small", "medium", "large"],
        default: "medium",
      },
      { key: "content", type: "text", default: "Tag" },
      { key: "selected", type: "boolean", default: false },
      { key: "closable", type: "boolean", default: false },
      { key: "disabled", type: "boolean", default: false },
    ],
  },
  {
    id: "checkbox",
    name: "Checkbox",
    component: "BvCheckbox",
    usesVModel: true,
    props: [
      { key: "label", type: "text", default: "Checkbox" },
      { key: "modelValue", type: "boolean", default: false },
      { key: "disabled", type: "boolean", default: false },
      { key: "indeterminate", type: "boolean", default: false },
    ],
  },
  {
    id: "file-upload",
    name: "File Upload",
    component: "BvFileUpload",
    usesVModel: true,
    props: [
      { key: "label", type: "text", default: "Upload file" },
      {
        key: "accept",
        type: "select",
        options: ["*", "image/*", ".pdf", "image/*,.pdf"],
        default: "*",
      },
      {
        key: "size",
        type: "select",
        options: ["small", "medium", "large"],
        default: "medium",
      },
      { key: "multiple", type: "boolean", default: false },
      { key: "showPreview", type: "boolean", default: false },
      { key: "disabled", type: "boolean", default: false },
      { key: "helpText", type: "text", default: "" },
    ],
  },
  {
    id: "chip",
    name: "Chip",
    component: "BvChip",
    props: [
      { key: "text", type: "text", default: "5" },
      {
        key: "color",
        type: "select",
        options: ["primary", "success", "danger", "warning", "info", "neutral"],
        default: "primary",
      },
      {
        key: "size",
        type: "select",
        options: ["xs", "sm", "md", "lg"],
        default: "md",
      },
      {
        key: "position",
        type: "select",
        options: ["top-right", "bottom-right", "top-left", "bottom-left"],
        default: "top-right",
      },
      { key: "standalone", type: "boolean", default: true },
      { key: "inset", type: "boolean", default: false },
    ],
  },
  {
    id: "icon",
    name: "Icon",
    component: "BvIcon",
    props: [
      {
        key: "name",
        type: "select",
        options: ["info", "search", "close", "settings", "mail", "heart"],
        default: "info",
      },
      {
        key: "size",
        type: "select",
        options: ["16px", "24px", "32px", "1rem", "1.5rem"],
        default: "24px",
      },
      { key: "color", type: "text", default: "" },
    ],
  },
  {
    id: "link",
    name: "Link",
    component: "BvLink",
    props: [
      { key: "href", type: "text", default: "/docs" },
      {
        key: "variant",
        type: "select",
        options: ["inline", "standalone"],
        default: "standalone",
      },
      {
        key: "size",
        type: "select",
        options: ["small", "medium", "large"],
        default: "medium",
      },
      {
        key: "kind",
        type: "select",
        options: ["primary", "neutral"],
        default: "primary",
      },
      { key: "content", type: "text", default: "Learn more" },
      { key: "disabled", type: "boolean", default: false },
    ],
  },
  {
    id: "skeleton",
    name: "Skeleton",
    component: "BvSkeleton",
    props: [
      {
        key: "variant",
        type: "select",
        options: ["text", "rectangle", "circle"],
        default: "rectangle",
      },
      { key: "width", type: "text", default: "200px" },
      { key: "height", type: "text", default: "1rem" },
      { key: "count", type: "number", default: 1 },
    ],
  },
  {
    id: "textarea",
    name: "Textarea",
    component: "BvTextarea",
    usesVModel: true,
    props: [
      { key: "label", type: "text", default: "Message" },
      { key: "placeholder", type: "text", default: "Enter your message..." },
      {
        key: "size",
        type: "select",
        options: ["small", "medium", "large"],
        default: "medium",
      },
      { key: "rows", type: "number", default: 4 },
      { key: "disabled", type: "boolean", default: false },
      { key: "required", type: "boolean", default: false },
    ],
  },
  {
    id: "radio",
    name: "Radio",
    component: "BvRadio",
    usesVModel: true,
    props: [
      { key: "modelValue", type: "text", default: "" },
      { key: "disabled", type: "boolean", default: false },
    ],
  },
  {
    id: "select",
    name: "Select",
    component: "BvSelect",
    usesVModel: true,
    props: [
      { key: "label", type: "text", default: "Choose" },
      { key: "placeholder", type: "text", default: "Select an option..." },
      {
        key: "size",
        type: "select",
        options: ["small", "medium", "large"],
        default: "medium",
      },
      { key: "disabled", type: "boolean", default: false },
      { key: "multiple", type: "boolean", default: false },
      { key: "clearable", type: "boolean", default: false },
    ],
  },
  {
    id: "image",
    name: "Image",
    component: "BvImage",
    props: [
      {
        key: "src",
        type: "text",
        default: "https://picsum.photos/200/120",
      },
      { key: "alt", type: "text", default: "Sample image" },
      { key: "width", type: "text", default: "200px" },
      { key: "height", type: "text", default: "120px" },
      {
        key: "loading",
        type: "select",
        options: ["lazy", "eager"],
        default: "lazy",
      },
      {
        key: "placeholder",
        type: "select",
        options: ["skeleton", "none"],
        default: "skeleton",
      },
    ],
  },
  {
    id: "banner",
    name: "Banner",
    component: "BvBanner",
    props: [
      { key: "title", type: "text", default: "Welcome! Check out our new features." },
      {
        key: "color",
        type: "select",
        options: ["primary", "success", "danger", "warning", "info", "neutral"],
        default: "primary",
      },
      { key: "close", type: "boolean", default: false },
    ],
  },
  {
    id: "pagination",
    name: "Pagination",
    component: "BvPagination",
    usesVModel: true,
    props: [
      { key: "currentPage", type: "number", default: 1 },
      { key: "totalItems", type: "number", default: 100 },
      { key: "pageSize", type: "number", default: 10 },
      { key: "hasJumper", type: "boolean", default: false },
      { key: "hasSelect", type: "boolean", default: false },
    ],
  },
  {
    id: "accordion",
    name: "Accordion",
    component: "BvAccordion",
    props: [
      { key: "caption", type: "text", default: "Accordion item" },
      { key: "content", type: "text", default: "Accordion content goes here." },
      { key: "open", type: "boolean", default: false },
      { key: "disabled", type: "boolean", default: false },
    ],
  },
  {
    id: "datepicker",
    name: "Datepicker",
    component: "BvDatepicker",
    usesVModel: true,
    props: [
      { key: "label", type: "text", default: "Select date" },
      { key: "placeholder", type: "text", default: "Choose a date..." },
      {
        key: "type",
        type: "select",
        options: ["single", "multiple", "range"],
        default: "single",
      },
      {
        key: "size",
        type: "select",
        options: ["small", "medium", "large"],
        default: "medium",
      },
      { key: "disabled", type: "boolean", default: false },
      { key: "required", type: "boolean", default: false },
    ],
  },
  {
    id: "dialog",
    name: "Dialog",
    component: "BvDialog",
    usesVModel: true,
    props: [
      { key: "open", type: "boolean", default: true },
      { key: "caption", type: "text", default: "Dialog title" },
      { key: "content", type: "text", default: "Dialog content goes here." },
      { key: "closable", type: "boolean", default: true },
      { key: "backdrop", type: "boolean", default: true },
      {
        key: "size",
        type: "select",
        options: ["small", "medium", "large"],
        default: "medium",
      },
    ],
  },
  {
    id: "drawer",
    name: "Drawer",
    component: "BvDrawer",
    usesVModel: true,
    props: [
      { key: "open", type: "boolean", default: true },
      { key: "caption", type: "text", default: "Drawer title" },
      { key: "content", type: "text", default: "Drawer content goes here." },
      {
        key: "width",
        type: "select",
        options: ["small", "medium", "large"],
        default: "medium",
      },
    ],
  },
  {
    id: "dropdown",
    name: "Dropdown",
    component: "BvDropdown",
    props: [
      { key: "label", type: "text", default: "Open menu" },
      {
        key: "placement",
        type: "select",
        options: ["bottom", "top", "left", "right", "bottom-start", "bottom-end"],
        default: "bottom",
      },
      {
        key: "variant",
        type: "select",
        options: ["primary", "secondary", "tertiary"],
        default: "primary",
      },
      {
        key: "size",
        type: "select",
        options: ["small", "medium", "large"],
        default: "medium",
      },
      { key: "disabled", type: "boolean", default: false },
    ],
  },
  {
    id: "tooltip",
    name: "Tooltip",
    component: "BvTooltip",
    props: [
      { key: "content", type: "text", default: "Tooltip content" },
      {
        key: "placement",
        type: "select",
        options: ["top", "bottom", "left", "right", "top-start", "top-end", "bottom-start", "bottom-end"],
        default: "top",
      },
      { key: "triggerContent", type: "text", default: "Hover me" },
    ],
  },
  {
    id: "stepper",
    name: "Stepper",
    component: "BvStepper",
    usesVModel: true,
    props: [
      { key: "currentStep", type: "number", default: 0 },
      {
        key: "orientation",
        type: "select",
        options: ["horizontal", "vertical"],
        default: "horizontal",
      },
      { key: "showLabels", type: "boolean", default: true },
    ],
  },
  {
    id: "split-button",
    name: "Split Button",
    component: "BvSplitButton",
    props: [
      { key: "label", type: "text", default: "Actions" },
      {
        key: "variant",
        type: "select",
        options: ["primary", "secondary"],
        default: "primary",
      },
      {
        key: "size",
        type: "select",
        options: ["small", "medium", "large"],
        default: "medium",
      },
      { key: "disabled", type: "boolean", default: false },
      { key: "loading", type: "boolean", default: false },
    ],
  },
  {
    id: "tab",
    name: "Tab",
    component: "BvTab",
    usesVModel: true,
    props: [
      { key: "activeTab", type: "text", default: "tab1" },
      {
        key: "variant",
        type: "select",
        options: ["line", "enclosed"],
        default: "line",
      },
      {
        key: "orientation",
        type: "select",
        options: ["horizontal", "vertical"],
        default: "horizontal",
      },
    ],
  },
  {
    id: "scroll-to-top",
    name: "Scroll To Top",
    component: "BvScrollToTop",
    props: [
      { key: "threshold", type: "number", default: 300 },
      {
        key: "position",
        type: "select",
        options: ["bottom-right", "bottom-left", "top-right", "top-left"],
        default: "bottom-right",
      },
      {
        key: "size",
        type: "select",
        options: ["small", "medium", "large"],
        default: "medium",
      },
      {
        key: "variant",
        type: "select",
        options: ["primary", "secondary", "tertiary"],
        default: "primary",
      },
    ],
  },
  {
    id: "table",
    name: "Table",
    component: "BvTable",
    props: [
      { key: "title", type: "text", default: "Sample table" },
      { key: "sortable", type: "boolean", default: false },
      { key: "selectable", type: "boolean", default: false },
      { key: "multiple", type: "boolean", default: false },
      { key: "isLoading", type: "boolean", default: false },
    ],
  },
  {
    id: "notification",
    name: "Notification",
    component: "BvNotification",
    props: [
      { key: "duration", type: "number", default: 7 },
      { key: "noAnimation", type: "boolean", default: false },
    ],
  },
];

/** Props that render as slot content instead of component props */
export const SLOT_CONTENT_KEYS: Record<string, string> = {
  badge: "content",
  tag: "content",
  link: "content",
  tooltip: "triggerContent",
  dialog: "content",
  drawer: "content",
  accordion: "content",
};

export function getSchemaById(id: string): ComponentSchema | undefined {
  return PLAYGROUND_SCHEMAS.find((s) => s.id === id);
}

/** Get docs URL for a component (relative to site base) */
export function getComponentDocsLink(schema: ComponentSchema): string {
  return schema.docsLink ?? `/components/${schema.id}`;
}

export function getDefaultProps(schema: ComponentSchema): Record<string, unknown> {
  const props: Record<string, unknown> = {};
  for (const p of schema.props) {
    props[p.key] = p.default;
  }
  if (schema.usesVModel && schema.id === "file-upload") {
    props.modelValue = null;
  }
  if (schema.id === "select") {
    props.options = [
      { value: "opt1", label: "Option 1" },
      { value: "opt2", label: "Option 2" },
      { value: "opt3", label: "Option 3" },
    ];
  }
  if (schema.id === "radio") {
    props.items = [
      { value: "a", label: "Option A" },
      { value: "b", label: "Option B" },
      { value: "c", label: "Option C" },
    ];
  }
  if (schema.id === "pagination") {
    props.itemsPerPageOptions = [
      { text: "10", value: 10 },
      { text: "20", value: 20 },
      { text: "50", value: 50 },
    ];
  }
  if (schema.id === "datepicker") {
    props.modelValue = null;
  }
  if (schema.id === "dropdown") {
    props.items = [
      { caption: "Action 1" },
      { caption: "Action 2" },
      { caption: "Action 3" },
    ];
  }
  if (schema.id === "stepper") {
    props.steps = [
      { label: "Step 1", description: "First step" },
      { label: "Step 2", description: "Second step" },
      { label: "Step 3", description: "Third step" },
    ];
  }
  if (schema.id === "tab") {
    props.tabs = [
      { label: "Tab 1", value: "tab1" },
      { label: "Tab 2", value: "tab2" },
      { label: "Tab 3", value: "tab3" },
    ];
  }
  if (schema.id === "table") {
    props.columns = [
      { key: "name", label: "Name" },
      { key: "email", label: "Email" },
      { key: "role", label: "Role" },
    ];
    props.data = [
      { id: 1, name: "Alice", email: "alice@example.com", role: "Admin" },
      { id: 2, name: "Bob", email: "bob@example.com", role: "User" },
      { id: 3, name: "Charlie", email: "charlie@example.com", role: "User" },
    ];
  }
  return props;
}
