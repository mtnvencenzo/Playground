import dotenv from 'dotenv';

dotenv.config();

export const config = {
  api: {
    baseUrl: process.env.API_BASE_URL || 'http://aca-vec-eus-prd-cocktailsapi-001.proudfield-08e1f932.eastus.azurecontainerapps.io',
    subscriptionKey: process.env.API_SUBSCRIPTION_KEY || '',
  },
  server: {
    port: process.env.PORT || 3000,
  }
}; 