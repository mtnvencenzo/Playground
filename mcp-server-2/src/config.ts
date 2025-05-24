import dotenvFlow from 'dotenv-flow';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.resolve(__dirname, '../');

dotenvFlow.config({
  path: envPath
});

export const config = {
  api: {
    baseUrl: process.env.API_BASE_URL || '',
    subscriptionKey: process.env.API_SUBSCRIPTION_KEY || '',
  }
};