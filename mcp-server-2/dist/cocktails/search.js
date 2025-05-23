export const searchTool = {
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
