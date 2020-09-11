const { createProxyMiddleware } = require('http-proxy-middleware');
const globalConfig = require('./global.config.json')


module.exports = function (app) {


/**
 * Followed guidlines from server/src/app.ts
 */



    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://localhost:'+ globalConfig.server.dev.port,
            // changeOrigin: true,
        })
    );
    app.use(
        '/public/resume',
        createProxyMiddleware({
            target: 'http://localhost:'+ globalConfig.server.dev.port,
            // changeOrigin: true,
        })
    );
};