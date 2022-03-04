import { CocktailOpenAI } from './openai-integration';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Replace with your actual API keys
const OPENAI_KEY = 'your-openai-key';
const SUBSCRIPTION_KEY = 'your-subscription-key';

const bot = new CocktailOpenAI(OPENAI_KEY, SUBSCRIPTION_KEY);

console.log('🍸 Welcome to the AI Cocktail Assistant!');
console.log('Type "exit" to quit\n');

async function chat() {
  rl.question('You: ', async (message) => {
    if (message.toLowerCase() === 'exit') {
      console.log('Goodbye! 👋');
      rl.close();
      return;
    }

    try {
      const response = await bot.processMessage(message);
      console.log('\nAssistant:', response, '\n');
    } catch (error: any) {
      console.error('\nError:', error.message, '\n');
    }

    chat();
  });
}

chat(); 