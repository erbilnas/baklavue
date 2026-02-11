# MCP (Model Context Protocol) Support

Baklavue provides an MCP server that lets AI assistants (Cursor, Claude, Windsurf, etc.) access component documentation, composables, and usage examples directly. This helps AI tools generate accurate Baklavue code when you're building Vue applications.

## What is MCP?

[Model Context Protocol (MCP)](https://modelcontextprotocol.io) is a standardized protocol that enables AI assistants to access external data and tools. The Baklavue MCP server exposes structured data about components, composables, and documentation so AI tools can assist with Baklavue development.

## Available Tools

The Baklavue MCP server provides these tools:

| Tool | Description |
| ---- | ----------- |
| `list_components` | List all Bv* components with category and basic info |
| `get_component` | Full component docs: props, events, slots, types, usage examples |
| `get_component_metadata` | Lightweight: props, events, slots only |
| `list_composables` | List composables (useNotification, useTheme, etc.) |
| `get_composable` | Composable API and usage documentation |
| `search_components_by_category` | Filter by category (form, feedback, layout, etc.) |
| `get_documentation_page` | Get guide pages (installation, getting-started, design-tokens) |
| `list_documentation_pages` | List all available guide pages |

## Setup

### Cursor

1. The Baklavue repo includes a project-level MCP config at `.cursor/mcp.json`
2. If you're using Baklavue in your own project, add to your `.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "Baklavue": {
      "command": "bun",
      "args": ["run", "mcp"]
    }
  }
}
```

Or when running from the Baklavue repo:

```json
{
  "mcpServers": {
    "Baklavue": {
      "command": "bun",
      "args": ["run", "--cwd", "packages/mcp", "start"]
    }
  }
}
```

3. Restart Cursor to load the MCP server

### Claude Desktop

Add to your Claude config (`claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "baklavue": {
      "command": "npx",
      "args": ["@baklavue/mcp"]
    }
  }
}
```

### Windsurf

Add to your MCP config:

```json
{
  "mcpServers": {
    "Baklavue": {
      "type": "stdio",
      "command": "bun",
      "args": ["run", "--cwd", "/path/to/baklavue", "mcp"]
    }
  }
}
```

## Usage Examples

Once configured, you can ask your AI assistant:

- "List all Baklavue components"
- "Get BvButton component documentation"
- "What props does BvInput accept?"
- "Find form-related components"
- "Show me useNotification composable usage"
- "Get installation guide"

The AI will use the MCP server to fetch structured data and provide accurate Baklavue code and guidance.

## Running Locally

To run the MCP server from the Baklavue repository:

```bash
# From repo root
bun run mcp

# Or from packages/mcp
cd packages/mcp && bun run start
```

The server communicates over stdio and is designed to be spawned by the AI client.

## Package

The MCP server lives in `packages/mcp`. When published, it will be available as `@baklavue/mcp`:

```bash
npx @baklavue/mcp
```
