const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
  app.use(
    '/google-sheets',
    createProxyMiddleware({
      target: 'https://docs.google.com',
      changeOrigin: true,
      secure: true,
      pathRewrite: {
        '^/google-sheets': '',
      },
    })
  );
};
