import { CocktailsLLMClient } from './llm-client';

// This is a simplified example of how an LLM might process and respond to cocktail-related queries
export class CocktailChatBot {
  private client: CocktailsLLMClient;

  constructor(subscriptionKey: string) {
    this.client = new CocktailsLLMClient('http://localhost:3000', subscriptionKey);
  }

  async processMessage(message: string): Promise<string> {
    // Simple intent detection
    if (message.toLowerCase().includes('search') || message.toLowerCase().includes('find')) {
      const searchResults = await this.client.searchCocktails(message);
      return this.formatSearchResults(searchResults);
    }
    
    if (message.toLowerCase().includes('details') || message.toLowerCase().includes('recipe')) {
      // Extract cocktail ID from message (in a real LLM, this would be more sophisticated)
      const cocktailId = message.toLowerCase().replace(/[^a-z-]/g, '');
      const details = await this.client.getCocktailDetails(cocktailId);
      return this.formatCocktailDetails(details);
    }

    if (message.toLowerCase().includes('ingredients') || message.toLowerCase().includes('filters')) {
      const filters = await this.client.getIngredientFilters();
      return this.formatIngredientFilters(filters);
    }

    return "I can help you search for cocktails, get recipe details, or find cocktails by ingredients. What would you like to know?";
  }

  private formatSearchResults(results: string): string {
    const cocktails = JSON.parse(results);
    if (cocktails.length === 0) {
      return "I couldn't find any cocktails matching your search. Try different keywords!";
    }

    let response = "Here are some cocktails I found:\n\n";
    cocktails.forEach((cocktail: any) => {
      response += `🍸 ${cocktail.name}\n`;
      response += `Ingredients: ${cocktail.ingredients}\n\n`;
    });
    response += "Would you like to know more details about any of these cocktails?";
    return response;
  }

  private formatCocktailDetails(details: string): string {
    const cocktail = JSON.parse(details);
    let response = `🍸 ${cocktail.name}\n\n`;
    response += `Description: ${cocktail.description}\n\n`;
    response += `Ingredients:\n${cocktail.ingredients}\n\n`;
    response += `Instructions:\n${cocktail.instructions}\n\n`;
    response += `Glassware: ${cocktail.glassware}\n`;
    response += `Prep Time: ${cocktail.prepTime}\n`;
    response += `Serves: ${cocktail.serves}\n`;
    return response;
  }

  private formatIngredientFilters(filters: string): string {
    const data = JSON.parse(filters);
    let response = "Here are the available ingredient categories:\n\n";
    
    // Format each category
    Object.entries(data).forEach(([category, items]: [string, any]) => {
      response += `${category}:\n`;
      items.forEach((item: any) => {
        response += `- ${item.name}\n`;
      });
      response += "\n";
    });
    
    return response;
  }
}

// Example usage:
/*
const bot = new CocktailChatBot('your-subscription-key');

// Example conversation
async function chat() {
  console.log(await bot.processMessage("Find me some gin cocktails"));
  console.log(await bot.processMessage("Tell me more about the clover-club"));
  console.log(await bot.processMessage("What ingredients can I filter by?"));
}

chat();
*/ 