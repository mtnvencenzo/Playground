# Cocktails MCP Server

A Model Context Server running sdtio for local Claude integration

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation & Running

1. Clone the repository
2. Install dependencies:
```bash
npm install
npm run build
npm run loc
```

## Claud Integration

Open the Claude Developer Settings and edit the config file.  Paste this in and update the paths for the node.exe and the path to the mcp server entry point.

> **Note:** Purposely using Node.js v20 because I couldn't get it working in the latest 23.x.x builds.

```json
{
  "mcpServers": {
    "mcp-cocktails-claude": {
      "command": "C:\\Users\\rvecc\\.nvm\\versions\\node\\v20.19.2\\bin\\node.exe",
      "args": ["D:\\Github\\Playground\\mcp-server-2\\dist\\index.js"]
    }
  }
}
```


## License

MIT 