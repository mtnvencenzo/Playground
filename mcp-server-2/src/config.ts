import dotenvFlow from 'dotenv-flow';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.resolve(__dirname, '../');

dotenvFlow.config({
  path: envPath
});

// Validate required environment variables
const requiredEnvVars = ['API_BASE_URL', 'API_SUBSCRIPTION_KEY'];
const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
  console.warn(`Warning: Missing required environment variables: ${missingVars.join(', ')}`);
  console.warn('Please check your .env file and ensure all required variables are set.');
}

export const config = {
  api: {
    baseUrl: process.env.API_BASE_URL || '',
    subscriptionKey: process.env.API_SUBSCRIPTION_KEY || '',
  }
};