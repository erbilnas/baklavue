# @baklavue/mcp

MCP (Model Context Protocol) server for Baklavue. Exposes Baklavue component APIs, composables, and documentation to AI assistants like Cursor, Claude, and Windsurf.

## Usage

### From the Baklavue Repo

```bash
# From repo root
bun run mcp

# Or from this package
cd packages/mcp && bun run start
```

### From Another Project (when published)

```bash
npx @baklavue/mcp
```

### Cursor Configuration

Add to `.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "Baklavue": {
      "command": "bun",
      "args": ["run", "--cwd", "/path/to/baklavue", "mcp"]
    }
  }
}
```

Or with npx (when published):

```json
{
  "mcpServers": {
    "Baklavue": {
      "command": "npx",
      "args": ["@baklavue/mcp"]
    }
  }
}
```

## Tools

| Tool | Description |
|------|-------------|
| `list_components` | List all Bv* components with categories |
| `get_component` | Full component documentation |
| `get_component_metadata` | Props, events, slots only |
| `list_composables` | List composables |
| `get_composable` | Composable documentation |
| `search_components_by_category` | Filter by category |
| `get_documentation_page` | Get guide pages |
| `list_documentation_pages` | List guide pages |

## Build

```bash
bun run build
```

## Documentation

See the [MCP Guide](https://erbilnas.github.io/baklavue/guide/mcp) for full setup instructions and usage examples.
