const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

const WatchExternalFilesPlugin = require('webpack-watch-files-plugin').default;

const {
  CONFIG,
  PATHS
} = require('../config');

const {
  DEV_PORT,
  ASSET_TEMPLATE,
  ASSET_LIMIT_KB,
  APP_BASE_URL
} = CONFIG;

const {
  SRC,
  DIST,
  ROOT
} = PATHS;

const baseConfig = require('./webpack.base.js');

const SOURCE_MAP = true;

const cssLoaderOptions = {
  root: APP_BASE_URL,
  sourceMap: SOURCE_MAP,
  minimize: {
    preset: 'default',
  }
};

const cssModuleOptions = {
  modules: false,
  localIdentName: '[local]--[hash:base64:6]',
  camelCase: 'dashes'
};

const config = {
  mode: 'development',
  watch: true,
  cache: true,
  devtool: 'cheap-module-eval-source-map',
  output: {
    pathinfo: true,
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /^(?!.+(?:\.component)\.scss).*\w+\.scss$/,
        include: [SRC],
        use: [
          {
            loader: "style-loader",
            options: {sourceMap: SOURCE_MAP}
          },
          {
            loader: "css-loader",
            options: {...cssLoaderOptions, importLoaders: 3}
          },
          {
            loader: "postcss-loader",
            options: {sourceMap: SOURCE_MAP}
          },
          {
            loader: 'resolve-url-loader',
            options: {sourceMap: SOURCE_MAP}
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: SOURCE_MAP,
              data: "$ENV: development;"
            }
          }
        ]
      },
      {
        test: /^(?!.+(?:\.component)\.css).*\w+\.css$/,
        include: [SRC],
        use: [
          {
            loader: "style-loader",
            options: {sourceMap: SOURCE_MAP}
          },
          {
            loader: "css-loader",
            options: {...cssLoaderOptions, importLoaders: 1}
          },
          {
            loader: "postcss-loader"

          }
        ]
      },

      {
        test: /\.component\.scss$/,
        include: [SRC],
        use: [
          {
            loader: "style-loader",
            options: {sourceMap: SOURCE_MAP}
          },
          {
            loader: "css-loader",
            options: {
              ...cssLoaderOptions,
              ...cssModuleOptions,
              importLoaders: 2
            }
          },
          {
            loader: "postcss-loader",
            options: {sourceMap: SOURCE_MAP}
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: SOURCE_MAP,
              data: "$ENV: development;"
            }
          }
        ]
      },
      {
        test: /\.component\.css$/,
        include: [SRC],
        use: [
          {
            loader: "style-loader",
            options: {sourceMap: SOURCE_MAP}
          },
          {
            loader: "css-loader",
            options: {
              ...cssLoaderOptions,
              ...cssModuleOptions,
              importLoaders: 1
            }
          },
          {
            loader: "postcss-loader"
          }
        ]
      },

      {
        test: /\.css$/,
        include: /node_modules/,
        use: [
          {
            loader: "style-loader",
            options: {sourceMap: SOURCE_MAP}
          },
          {
            loader: "css-loader",
            options: {sourceMap: SOURCE_MAP}
          }
        ]
      },

    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      debug: true,
      options: {
        context: baseConfig.context
      }
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    host: '0.0.0.0',
    hot: true,
    stats: "minimal",
    port: DEV_PORT,
    contentBase: DIST,
    historyApiFallback: {
      rewrites: [
        {from: /./, to: '/index.html'}
      ]
    }
  }
};

module.exports = merge(baseConfig, config);
