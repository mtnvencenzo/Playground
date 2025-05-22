import { Configuration, OpenAIApi } from 'openai';
import { CocktailsLLMClient } from './llm-client';

// example
// http://localhost:3000/api/v1/clover-club

export class CocktailOpenAI {
  private openai: OpenAIApi;
  private cocktailsClient: CocktailsLLMClient;

  constructor(openaiKey: string, subscriptionKey: string) {
    this.openai = new OpenAIApi(new Configuration({ apiKey: openaiKey }));
    this.cocktailsClient = new CocktailsLLMClient('http://localhost:3000', subscriptionKey);
  }

  async processMessage(message: string): Promise<string> {
    // First, get relevant cocktail data based on the message
    const cocktailData = await this.getRelevantCocktailData(message);

    // Create a system message that explains the cocktail data format
    const systemMessage = `You are a cocktail expert assistant. You have access to the following cocktail data:
${cocktailData}

Please provide a natural, conversational response to the user's query. Use the cocktail data to inform your response.
If the user asks for specific details about a cocktail, use the detailed information provided.
If the user asks about ingredients or filters, explain the available options.
Always be helpful and engaging in your responses.`;

    // Get response from OpenAI
    const completion = await this.openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemMessage },
        { role: "user", content: message }
      ],
      temperature: 0.7,
      max_tokens: 500
    });

    return completion.data.choices[0].message?.content || "I'm sorry, I couldn't process that request.";
  }

  private async getRelevantCocktailData(message: string): Promise<string> {
    // Simple intent detection to determine what data to fetch
    const lowerMessage = message.toLowerCase();

    if (lowerMessage.includes('search') || lowerMessage.includes('find')) {
      const searchResults = await this.cocktailsClient.searchCocktails(message);
      return `Search Results:\n${searchResults}`;
    }

    if (lowerMessage.includes('details') || lowerMessage.includes('recipe')) {
      // Extract cocktail ID from message (in a real implementation, this would be more sophisticated)
      const cocktailId = lowerMessage.replace(/[^a-z-]/g, '');
      const details = await this.cocktailsClient.getCocktailDetails(cocktailId);
      return `Cocktail Details:\n${details}`;
    }

    if (lowerMessage.includes('ingredients') || lowerMessage.includes('filters')) {
      const filters = await this.cocktailsClient.getIngredientFilters();
      return `Ingredient Filters:\n${filters}`;
    }

    // Default to search if we can't determine the intent
    const searchResults = await this.cocktailsClient.searchCocktails(message);
    return `Search Results:\n${searchResults}`;
  }
}

// Example usage:
/*
const bot = new CocktailOpenAI('your-openai-key', 'your-subscription-key');

// Example conversation
async function chat() {
  const messages = [
    "Find me some gin cocktails",
    "Tell me more about the clover-club",
    "What ingredients can I filter by?",
    "I have gin, lemon juice, and simple syrup. What can I make?"
  ];

  for (const message of messages) {
    console.log('\nUser:', message);
    const response = await bot.processMessage(message);
    console.log('\nAssistant:', response);
  }
}

chat();
*/ 