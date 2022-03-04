import { createProxyMiddleware } from 'http-proxy-middleware';
import { config } from '../config';

export const createApiProxy = () => {
  return createProxyMiddleware({
    target: config.api.baseUrl,
    changeOrigin: true,
    pathRewrite: {
      '^/api/v1': '', // Keep the same path
    },
    onProxyReq: (proxyReq) => {
      // Add subscription key header
      if (config.api.subscriptionKey) {
        proxyReq.setHeader('X-Key', config.api.subscriptionKey);
      }
    },
    onError: (err, req, res) => {
      console.error('Proxy Error:', err);
      res.status(500).json({
        type: 'https://tools.ietf.org/html/rfc7231#section-6.6.1',
        title: 'Proxy Error',
        status: 500,
        detail: 'Error forwarding request to API',
        instance: req.url
      });
    }
  });
}; 