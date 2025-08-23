// craco.config.js
const webpack = require('webpack');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const path = require('path');

module.exports = {
  webpack: {
    configure: (config) => {
      // Алиасы (webpack4 вместо resolve.fallback)
      config.resolve = config.resolve || {};
      config.resolve.alias = {
        ...(config.resolve.alias || {}),
        crypto: require.resolve('crypto-browserify'),
        stream: require.resolve('stream-browserify'),
        buffer: require.resolve('buffer/'),
        // 👉 Полная заглушка рантайм-оверлея CRA
        'react-error-overlay': path.resolve(__dirname, 'src/__mocks__/react-error-overlay.js'),
      };

      if (process.env.NODE_ENV === 'development') {
        // Убираем ESLint-плагин (чтобы предупреждения не перекрывали экран)
        config.plugins = (config.plugins || []).filter(
          (p) => !(p && p.constructor && p.constructor.name === 'ESLintWebpackPlugin')
        );
        // Выключаем overlay у React Refresh
        config.plugins = config.plugins.map((p) => {
          if (p && p.constructor && p.constructor.name === 'ReactRefreshWebpackPlugin') {
            return new ReactRefreshWebpackPlugin({ overlay: false });
          }
          return p;
        });
      }

      // Глобалы
      config.plugins.push(
        new webpack.ProvidePlugin({
          Buffer: ['buffer', 'Buffer'],
          process: ['process'],
        })
      );

      // Нодовые модули, которых нет в браузере
      config.node = { ...(config.node || {}), fs: 'empty', net: 'empty', tls: 'empty' };
      return config;
    },
  },

  // 👉 Отключаем overlay вебпак-дев-сервера
  devServer: (devServerConfig) => {
    // для webpack-dev-server v3 (CRA4) это поле есть
    devServerConfig.overlay = false;
    return devServerConfig;
  },
};
