import { CocktailChatBot } from './chat-example';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Replace with your actual subscription key
const SUBSCRIPTION_KEY = 'your-subscription-key';

const bot = new CocktailChatBot(SUBSCRIPTION_KEY);

console.log('🍸 Welcome to the Cocktail Chat Bot!');
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
      console.log('\nBot:', response, '\n');
    } catch (error) {
      console.error('\nError:', error.message, '\n');
    }

    chat();
  });
}

chat(); 