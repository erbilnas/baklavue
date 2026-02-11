import { readFileSync, existsSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import {
  COMPONENT_CATEGORIES,
  CATEGORY_LABELS,
  COMPONENT_LIST,
} from "./component-categories.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * Resolve the project root (where docs/ lives).
 * When running via "bun run mcp" from repo root, cwd is repo root.
 * When running from packages/mcp, we need to go up two levels.
 */
function getProjectRoot(): string {
  const cwd = process.cwd();
  // Check if we're in the repo root (has docs/ and packages/)
  if (existsSync(join(cwd, "docs")) && existsSync(join(cwd, "packages"))) {
    return cwd;
  }
  // Check if we're in packages/mcp (has ../../docs)
  const mcpParent = join(cwd, "..", "..");
  if (existsSync(join(mcpParent, "docs"))) {
    return mcpParent;
  }
  // Fallback: assume cwd is project root
  return cwd;
}

const projectRoot = getProjectRoot();
const docsPath = join(projectRoot, "docs");

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
    { name: "useNotification", description: "Programmatically manage notifications" },
    { name: "useScrollToError", description: "Scroll to element with validation error" },
    { name: "useBaklavaTheme", description: "Overwrite Baklava colors (Vue preset or custom)" },
  ];

  return composables;
}

const COMPOSABLE_TO_FILE: Record<string, string> = {
  useCsv: "csv",
  useNotification: "notification",
  useScrollToError: "scrollToError",
  useBaklavaTheme: "theme",
};

export function getComposableDoc(composableName: string): string | null {
  const file = COMPOSABLE_TO_FILE[composableName] ?? composableName.replace(/^use/, "").toLowerCase();
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
