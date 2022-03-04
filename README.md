# Cocktails MCP Server

A Mock Control Panel server for the Cocktails API, built with Node.js and TypeScript.

## Features

- Full implementation of the Cocktails API endpoints
- Swagger documentation
- Mock data generation
- TypeScript support
- Hot reloading during development

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

## Development

To start the development server with hot reloading:

```bash
npm run dev
```

The server will start on port 3000 by default. You can change this by setting the `PORT` environment variable.

## Building for Production

To build the TypeScript code:

```bash
npm run build
```

To start the production server:

```bash
npm start
```

## API Documentation

Once the server is running, you can access the Swagger documentation at:

```
http://localhost:3000/api-docs
```

## Available Endpoints

### Cocktails
- GET /api/v1/cocktails - List cocktails
- GET /api/v1/cocktails/:id - Get cocktail details
- PUT /api/v1/cocktails - Seed cocktails
- GET /api/v1/cocktails/ingredients/filters - Get ingredient filters

### Ingredients
- GET /api/v1/cocktails/ingredients - List ingredients
- PUT /api/v1/cocktails/ingredients - Seed ingredients

### Legal
- GET /api/v1/legal/documents/privacy-policy - Get privacy policy
- GET /api/v1/legal/documents/terms-of-service - Get terms of service

### Accounts
- GET /api/v1/accounts/owned/profile - Get user profile
- PUT /api/v1/accounts/owned/profile - Update user profile
- PUT /api/v1/accounts/owned/profile/email - Update email
- PUT /api/v1/accounts/owned/accessibility-settings - Update accessibility settings

## License

MIT 