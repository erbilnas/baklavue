import { existsSync, readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  CATEGORY_LABELS,
  COMPONENT_CATEGORIES,
  COMPONENT_LIST,
} from "./component-categories.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * Resolve docs path for MCP server.
 * - When published (npx @baklavue/mcp): docs are bundled at dist/docs/
 * - When running from monorepo: docs are at repo root docs/
 */
function getDocsPath(): string {
  // Published package: loaders are in dist/data/, docs are in dist/docs/
  const packageDocs = join(__dirname, "..", "docs");
  if (existsSync(join(packageDocs, "components"))) {
    return packageDocs;
  }
  // Monorepo: repo root has docs/
  const cwd = process.cwd();
  if (existsSync(join(cwd, "docs")) && existsSync(join(cwd, "packages"))) {
    return join(cwd, "docs");
  }
  const mcpParent = join(cwd, "..", "..");
  if (existsSync(join(mcpParent, "docs"))) {
    return join(mcpParent, "docs");
  }
  return packageDocs;
}

const docsPath = getDocsPath();

export interface ComponentInfo {
  name: string;
  bvName: string;
  category: string;
  categoryLabel: string;
  description?: string;
}

export interface ComposableInfo {
  name: string;
  description?: string;
}

export function listComponents(): ComponentInfo[] {
  return COMPONENT_LIST.map((name) => {
    const category = COMPONENT_CATEGORIES[name] ?? "other";
    return {
      name,
      bvName: `Bv${name}`,
      category,
      categoryLabel: CATEGORY_LABELS[category] ?? category,
    };
  });
}

export function getComponentDoc(componentName: string): string | null {
  const normalized = componentName.replace(/^Bv/, "");
  const path = join(docsPath, "components", `${normalized.toLowerCase()}.md`);
  if (!existsSync(path)) return null;
  return readFileSync(path, "utf-8");
}

export function getComponentMetadata(componentName: string): {
  props?: string;
  events?: string;
  slots?: string;
} | null {
  const doc = getComponentDoc(componentName);
  if (!doc) return null;

  const result: { props?: string; events?: string; slots?: string } = {};

  // Extract Props table (between ## Props and next ## or end)
  const propsMatch = doc.match(/## Props\s*\n\n([\s\S]*?)(?=\n## |$)/);
  if (propsMatch) result.props = propsMatch[1].trim();

  // Extract Events table
  const eventsMatch = doc.match(/## Events\s*\n\n([\s\S]*?)(?=\n## |$)/);
  if (eventsMatch) result.events = eventsMatch[1].trim();

  // Extract Slots table
  const slotsMatch = doc.match(/## Slots\s*\n\n([\s\S]*?)(?=\n## |$)/);
  if (slotsMatch) result.slots = slotsMatch[1].trim();

  return result;
}

export function listComposables(): ComposableInfo[] {
  const indexPath = join(docsPath, "composables", "index.md");
  if (!existsSync(indexPath)) return [];

  const composables: ComposableInfo[] = [
    { name: "useCsv", description: "Parse, create, and download CSV files" },
    {
      name: "useNotification",
      description: "Programmatically manage notifications",
    },
    {
      name: "useScrollToError",
      description: "Scroll to element with validation error",
    },
    {
      name: "useZodForm",
      description: "Form validation with Zod schemas",
    },
    {
      name: "useBaklavaTheme",
      description: "Overwrite Baklava colors (Vue preset or custom)",
    },
    {
      name: "useDisclosure",
      description: "Open/close state for Dialog, Drawer, Dropdown",
    },
    {
      name: "usePagination",
      description: "Pagination state for tables and lists",
    },
    {
      name: "useConfirmDialog",
      description: "Confirm/cancel dialog flow",
    },
    {
      name: "useClipboard",
      description: "Copy text to clipboard",
    },
    {
      name: "useBreakpoints",
      description: "Responsive breakpoints (isMobile, isTablet, isDesktop)",
    },
    {
      name: "useMediaQuery",
      description: "Single media query matcher",
    },
    {
      name: "useLocalStorage",
      description: "Reactive sync with localStorage",
    },
    {
      name: "useSessionStorage",
      description: "Reactive sync with sessionStorage",
    },
    {
      name: "useDebounceFn",
      description: "Debounce function execution",
    },
    {
      name: "useDebouncedRef",
      description: "Debounced ref value",
    },
    {
      name: "useThrottleFn",
      description: "Throttle function execution",
    },
    {
      name: "useThrottledRef",
      description: "Throttled ref value",
    },
    {
      name: "useIntervalFn",
      description: "Pausable interval",
    },
    {
      name: "useTimeoutFn",
      description: "Cancellable timeout",
    },
    {
      name: "createFetch",
      description: "Create preconfigured useFetch instance (axios.create-like)",
    },
    {
      name: "useFetch",
      description: "Reactive fetch with loading/error/data (axios-like API)",
    },
    {
      name: "useQuery",
      description: "Data fetching with caching, retries, and invalidation",
    },
    {
      name: "useQueryClient",
      description: "Cache invalidation and manual cache access for useQuery",
    },
    {
      name: "useIntersectionObserver",
      description: "Detect element visibility in viewport",
    },
    {
      name: "useRafFn",
      description: "Animation frame loop",
    },
    {
      name: "useStepper",
      description: "Multi-step wizard state for BvStepper",
    },
    {
      name: "useScrollVisibility",
      description: "Scroll-based visibility for scroll-to-top and sticky UI",
    },
    {
      name: "useScrollLock",
      description: "Lock body scroll when modals/drawers are open",
    },
    {
      name: "useAlert",
      description: "Programmatic show/hide for inline BvAlert",
    },
    {
      name: "useLoading",
      description: "Generic loading state with optional delay",
    },
    {
      name: "useFocusTrap",
      description: "Trap focus within modals/dialogs",
    },
    {
      name: "useId",
      description: "Stable unique IDs for accessibility attributes",
    },
    {
      name: "useFormState",
      description: "Form dirty and touched state without validation",
    },
    {
      name: "useFieldArray",
      description: "Dynamic array fields for forms",
    },
    {
      name: "useFormPersistence",
      description: "Auto-save form data to localStorage/sessionStorage",
    },
    {
      name: "useStepperForm",
      description: "Multi-step form validation with useStepper",
    },
  ];

  return composables;
}

const COMPOSABLE_TO_FILE: Record<string, string> = {
  useCsv: "csv",
  useNotification: "notification",
  useScrollToError: "scrollToError",
  useZodForm: "formValidation",
  useBaklavaTheme: "theme",
  useDisclosure: "disclosure",
  usePagination: "pagination",
  useConfirmDialog: "confirmDialog",
  useClipboard: "clipboard",
  useBreakpoints: "breakpoints",
  useMediaQuery: "breakpoints",
  useLocalStorage: "storage",
  useSessionStorage: "storage",
  useDebounceFn: "debounce",
  useDebouncedRef: "debounce",
  useThrottleFn: "throttle",
  useThrottledRef: "throttle",
  useIntervalFn: "timer",
  useTimeoutFn: "timer",
  createFetch: "fetch",
  useFetch: "fetch",
  useQuery: "query",
  useQueryClient: "query",
  useIntersectionObserver: "intersectionObserver",
  useRafFn: "raf",
  useStepper: "stepper",
  useScrollVisibility: "scrollVisibility",
  useScrollLock: "scrollLock",
  useAlert: "alert",
  useLoading: "loading",
  useFocusTrap: "focusTrap",
  useId: "id",
  useFormState: "formState",
  useFieldArray: "fieldArray",
  useFormPersistence: "formPersistence",
  useStepperForm: "stepperForm",
};

export function getComposableDoc(composableName: string): string | null {
  const file =
    COMPOSABLE_TO_FILE[composableName] ??
    composableName.replace(/^use/, "").toLowerCase();
  const path = join(docsPath, "composables", `${file}.md`);
  if (!existsSync(path)) return null;
  return readFileSync(path, "utf-8");
}

export function getDocumentationPage(path: string): string | null {
  // path could be "installation", "getting-started", "design-tokens", etc.
  const normalized = path.replace(/^\//, "").replace(/\.md$/, "");
  const fullPath = join(docsPath, "guide", `${normalized}.md`);
  if (!existsSync(fullPath)) return null;
  return readFileSync(fullPath, "utf-8");
}

export function listDocumentationPages(): string[] {
  const guidePath = join(docsPath, "guide");
  if (!existsSync(guidePath)) return [];

  try {
    return readdirSync(guidePath)
      .filter((f) => f.endsWith(".md"))
      .map((f) => f.replace(".md", ""));
  } catch {
    return ["installation", "getting-started", "design-tokens", "contributing"];
  }
}
