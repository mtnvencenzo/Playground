import axios from 'axios';

interface CocktailResponse {
  items: Array<{
    id: string;
    title: string;
    description: string;
    ingredients: Array<{
      name: string;
      display: string;
    }>;
    instructions: Array<{
      display: string;
      order: number;
    }>;
  }>;
}

export class CocktailsLLMClient {
  private baseUrl: string;
  private subscriptionKey: string;

  constructor(baseUrl: string = 'http://localhost:3000', subscriptionKey: string) {
    this.baseUrl = baseUrl;
    this.subscriptionKey = subscriptionKey;
  }

  /**
   * Search for cocktails based on a natural language query
   */
  async searchCocktails(query: string): Promise<string> {
    try {
      const response = await axios.get<CocktailResponse>(`${this.baseUrl}/api/v1/cocktails`, {
        headers: {
          'X-Key': this.subscriptionKey
        },
        params: {
          freeText: query,
          take: 5
        }
      });
      // Format the response in a way that's easy for an LLM to understand
      const cocktails = response.data.items.map((cocktail: CocktailResponse['items'][0]) => ({
        name: cocktail.title,
        ingredients: cocktail.ingredients.map((i: { display: string }) => i.display).join(', '),
        instructions: cocktail.instructions
          .sort((a: { order: number }, b: { order: number }) => a.order - b.order)
          .map(i => i.display)
          .join('\n')
      }));

      return JSON.stringify(cocktails, null, 2);
    } catch (error) {
      console.error('Error searching cocktails:', error);
      throw error;
    }
  }

  /**
   * Get detailed information about a specific cocktail
   */
  async getCocktailDetails(cocktailId: string): Promise<string> {
    try {
      const response = await axios.get(`${this.baseUrl}/api/v1/cocktails/${cocktailId}`, {
        headers: {
          'X-Key': this.subscriptionKey
        }
      });

      const cocktail = response.data.item;
      return JSON.stringify({
        name: cocktail.title,
        description: cocktail.description,
        ingredients: cocktail.ingredients.map((i: any) => i.display).join(', '),
        instructions: cocktail.instructions
          .sort((a: any, b: any) => a.order - b.order)
          .map((i: any) => i.display)
          .join('\n'),
        glassware: cocktail.glassware.join(', '),
        prepTime: `${cocktail.prepTimeMinutes} minutes`,
        serves: cocktail.serves
      }, null, 2);
    } catch (error) {
      console.error('Error getting cocktail details:', error);
      throw error;
    }
  }

  /**
   * Get ingredient filters for cocktail search
   */
  async getIngredientFilters(): Promise<string> {
    try {
      const response = await axios.get(`${this.baseUrl}/api/v1/cocktails/ingredients/filters`, {
        headers: {
          'X-Key': this.subscriptionKey
        }
      });

      return JSON.stringify(response.data, null, 2);
    } catch (error) {
      console.error('Error getting ingredient filters:', error);
      throw error;
    }
  }
}

// Example usage:
/*
const client = new CocktailsLLMClient('http://localhost:3000', 'your-subscription-key');

// Example 1: Search for cocktails
const searchResults = await client.searchCocktails('gin based cocktails');
console.log(searchResults);

// Example 2: Get details for a specific cocktail
const cocktailDetails = await client.getCocktailDetails('clover-club');
console.log(cocktailDetails);

// Example 3: Get ingredient filters
const filters = await client.getIngredientFilters();
console.log(filters);
*/ 