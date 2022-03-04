import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import * as OpenApiValidator from 'express-openapi-validator';
import { config } from './config';
import { createApiProxy } from './middleware/proxy';

const app = express();
const port = config.server.port;

// Middleware
app.use(cors());
app.use(express.json());

// Response logging middleware
app.use((req, res, next) => {
  const originalJson = res.json;
  res.json = function(body) {
    console.log('Response:', {
      path: req.path,
      method: req.method,
      status: res.statusCode,
      body: body
    });
    return originalJson.call(this, body);
  };
  next();
});

// OpenAPI validation with less strict settings
app.use(
  OpenApiValidator.middleware({
    apiSpec: './openapi.json',
    validateRequests: true,
    validateResponses: {
      onError: (error, body, req) => {
        console.log('Validation Error:', {
          path: req.path,
          method: req.method,
          error: error.message,
          body: body
        });
      }
    },
    validateSecurity: false,
    ignoreUndocumented: true, // Ignore endpoints not in the spec
    coerceTypes: true, // Try to coerce types
    unknownFormats: 'ignore' // Ignore unknown formats
  })
);

// Swagger documentation
const swaggerDocument = require('../openapi.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Proxy all API requests to the real API
app.use('/api/v1', createApiProxy());

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', {
    path: req.path,
    method: req.method,
    error: err.message,
    status: err.status
  });
  
  res.status(err.status || 500).json({
    type: 'https://tools.ietf.org/html/rfc7231#section-6.6.1',
    title: 'Internal Server Error',
    status: err.status || 500,
    detail: err.message,
    instance: req.url
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

app.listen(port, () => {
  console.log(`MCP Server is running on port ${port}`);
  console.log(`Swagger documentation available at http://localhost:${port}/api-docs`);
  console.log(`Proxying requests to: ${config.api.baseUrl}`);
}); 