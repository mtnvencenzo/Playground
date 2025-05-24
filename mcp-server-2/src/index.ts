#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequest,
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { SearchArgs, searchTool } from "./cocktails/search.js";
import { CocktailsApiClient } from "./cocktails/api/cocktailsApi/cocktailsApiClient.js";
import { config } from "./config.js";
import axios from "axios";

const server = new Server(
  {
    name: "cocktails-model-context-protocol-server",
    version: "0.0.1",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

server.setRequestHandler(ListToolsRequestSchema, async () => {
  console.error("Received ListTools request");
  return {
    tools: [searchTool],
  };
});

server.setRequestHandler(
  CallToolRequestSchema,
  async (request: CallToolRequest) => {
    console.error("Received CallTool request:", request.params.name);
    try {
      if (!request.params.arguments) {
        throw new Error("Arguments are required");
      }

      switch (request.params.name) {
        case "cocktails_search": {
          const args = request.params.arguments as unknown as SearchArgs;
          if (!args.freeText) {
            throw new Error("Missing required arguments");
          }

          const axiosInstance = axios.create({
            headers: { "X-Key": config.api.subscriptionKey },
            transformResponse: (data) => data,
          });

          const client = new CocktailsApiClient(config.api.baseUrl, axiosInstance);

          const response = await client.getCocktailsList(
            args.freeText,
            0,
            1000
          );
          return {
            content: [{ type: "text", text: JSON.stringify(response) }],
          };
        }

        default:
          throw new Error(`Unknown tool: ${request.params.name}`);
      }
    } catch (error) {
      console.error("Error executing tool:", error);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({
              error: error instanceof Error ? error.message : String(error),
            }),
          },
        ],
      };
    }
  }
);

/**
 * Starts the Cocktails MCP server using standard input/output for communication.
 *
 * Establishes a connection to the server via {@link StdioServerTransport} and logs the server status.
 */
async function runServer() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Cocktails MCP Server running on stdio");
}

runServer().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});