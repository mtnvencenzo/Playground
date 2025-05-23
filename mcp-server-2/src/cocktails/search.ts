import { Tool } from "@modelcontextprotocol/sdk/types.js";

export interface SearchArgs {
  freeText: string;
}

export const searchTool: Tool = {
  name: "cocktails_search",
  description: "Search cocktails data from the cocktails API",
  inputSchema: {
    type: "object",
    required: ["freeText"],
    properties: {
      freeText: {
        type: "string",
        description: "The free text search query",
      }
    },
  },
};