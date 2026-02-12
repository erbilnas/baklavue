#!/usr/bin/env node
/**
 * Baklavue MCP Server
 * Provides AI assistants with access to Baklavue Vue component APIs, composables, and documentation.
 */
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import {
  listComponents,
  getComponentDoc,
  getComponentMetadata,
  listComposables,
  getComposableDoc,
  getDocumentationPage,
  listDocumentationPages,
} from "./data/loaders.js";
import { COMPONENT_CATEGORIES, CATEGORY_LABELS } from "./data/component-categories.js";

const server = new McpServer({
  name: "baklavue",
  version: "1.0.0",
});

// --- list_components ---
server.registerTool(
  "list_components",
  {
    description: "List all available Baklavue components with their categories and basic information",
  },
  async () => {
    const components = listComponents();
    const text = JSON.stringify(
      components.map((c) => ({
        name: c.bvName,
        component: c.name,
        category: c.category,
        categoryLabel: c.categoryLabel,
      })),
      null,
      2
    );
    return { content: [{ type: "text" as const, text }] };
  }
);

// --- get_component ---
server.registerTool(
  "get_component",
  {
    description: "Retrieve full component documentation including props, events, slots, usage examples, and types",
    inputSchema: {
      componentName: z.string().describe("Component name (e.g., Button, BvButton, Input)"),
    },
  },
  async ({ componentName }) => {
    const doc = getComponentDoc(componentName);
    if (!doc) {
      const names = Object.keys(COMPONENT_CATEGORIES).join(", ");
      return {
        content: [
          {
            type: "text" as const,
            text: `Component "${componentName}" not found. Available components: ${names}. Use Bv prefix (e.g., BvButton) or plain name (e.g., Button).`,
          },
        ],
      };
    }
    return { content: [{ type: "text" as const, text: doc }] };
  }
);

// --- get_component_metadata ---
server.registerTool(
  "get_component_metadata",
  {
    description: "Retrieve lightweight component metadata: props, events, and slots only (no full documentation)",
    inputSchema: {
      componentName: z.string().describe("Component name (e.g., Button, BvButton)"),
    },
  },
  async ({ componentName }) => {
    const meta = getComponentMetadata(componentName);
    if (!meta) {
      return {
        content: [
          {
            type: "text" as const,
            text: `Component "${componentName}" not found.`,
          },
        ],
      };
    }
    const parts: string[] = [];
    if (meta.props) parts.push(`## Props\n\n${meta.props}`);
    if (meta.events) parts.push(`## Events\n\n${meta.events}`);
    if (meta.slots) parts.push(`## Slots\n\n${meta.slots}`);
    return {
      content: [{ type: "text" as const, text: parts.join("\n\n") || "No metadata available." }],
    };
  }
);

// --- list_composables ---
server.registerTool(
  "list_composables",
  {
    description: "List all available Baklavue composables with their descriptions",
  },
  async () => {
    const composables = listComposables();
    const text = JSON.stringify(
      composables.map((c) => ({ name: c.name, description: c.description })),
      null,
      2
    );
    return { content: [{ type: "text" as const, text }] };
  }
);

// --- get_composable ---
server.registerTool(
  "get_composable",
  {
    description: "Retrieve composable API documentation and usage",
    inputSchema: {
      composableName: z.string().describe("Composable name (e.g., useNotification, useTheme)"),
    },
  },
  async ({ composableName }) => {
    const doc = getComposableDoc(composableName);
    if (!doc) {
      const names = listComposables().map((c) => c.name).join(", ");
      return {
        content: [
          {
            type: "text" as const,
            text: `Composable "${composableName}" not found. Available: ${names}`,
          },
        ],
      };
    }
    return { content: [{ type: "text" as const, text: doc }] };
  }
);

// --- search_components_by_category ---
server.registerTool(
  "search_components_by_category",
  {
    description: "Search components by category (form, feedback, layout, navigation, data) or text filter",
    inputSchema: {
      category: z
        .string()
        .optional()
        .describe("Category: form, feedback, layout, navigation, data"),
      filter: z.string().optional().describe("Optional text filter to match component names"),
    },
  },
  async ({ category, filter }) => {
    let components = listComponents();
    if (category) {
      const cat = category.toLowerCase();
      if (cat in CATEGORY_LABELS) {
        components = components.filter((c) => c.category === cat);
      }
    }
    if (filter) {
      const f = filter.toLowerCase();
      components = components.filter(
        (c) =>
          c.name.toLowerCase().includes(f) ||
          c.bvName.toLowerCase().includes(f) ||
          c.categoryLabel.toLowerCase().includes(f)
      );
    }
    const text = JSON.stringify(
      components.map((c) => ({
        name: c.bvName,
        component: c.name,
        category: c.category,
        categoryLabel: c.categoryLabel,
      })),
      null,
      2
    );
    return { content: [{ type: "text" as const, text }] };
  }
);

// --- get_documentation_page ---
server.registerTool(
  "get_documentation_page",
  {
    description: "Get guide documentation page content (e.g., installation, getting-started, design-tokens)",
    inputSchema: {
      path: z.string().describe("Page path without .md (e.g., installation, getting-started)"),
    },
  },
  async ({ path }) => {
    const doc = getDocumentationPage(path);
    if (!doc) {
      const pages = listDocumentationPages();
      return {
        content: [
          {
            type: "text" as const,
            text: `Page "${path}" not found. Available: ${pages.join(", ")}`,
          },
        ],
      };
    }
    return { content: [{ type: "text" as const, text: doc }] };
  }
);

// --- list_documentation_pages ---
server.registerTool(
  "list_documentation_pages",
  {
    description: "List all available documentation/guide pages",
  },
  async () => {
    const pages = listDocumentationPages();
    return {
      content: [{ type: "text" as const, text: JSON.stringify(pages, null, 2) }],
    };
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Baklavue MCP server running on stdio");
}

main().catch((error) => {
  console.error("Server error:", error);
  process.exit(1);
});
