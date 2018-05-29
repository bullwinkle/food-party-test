const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

const LoaderOptionsPlugin = webpack.LoaderOptionsPlugin;
const CleanPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
// const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');

const {
  CONFIG,
  PATHS
} = require('../config');

const {
  JS_TEMPLATE,
  CSS_TEMPLATE,
  ASSET_TEMPLATE,
  ASSET_LIMIT_KB,
  APP_BASE_URL
} = CONFIG;

const {
  ROOT,
  SRC,
  DIST
} = PATHS;



const baseConfig = require('./webpack.base.js');

const SOURCE_MAP = true;

const cssLoaderOptions = {
  root: APP_BASE_URL,
  sourceMap: SOURCE_MAP
};

const cssModuleOptions = {
  modules: true,
  localIdentName: '[hash:base64:12]',
  camelCase: 'dashes'
};

const config = {
  mode: 'production',
  watch: false,
  cache: false,
  bail: true,
  devtool: 'source-map',
  optimization: {
    ...baseConfig.optimization,
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: SOURCE_MAP
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  module: {
    rules: [
      {
        test: /^(?!.+(?:\.component)\.scss).*\w+\.scss$/,
        include: [SRC],
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {...cssLoaderOptions, importLoaders: 3}
          },
          {
            loader: 'postcss-loader',
            options: {sourceMap: SOURCE_MAP}
          },
          {
            loader: 'resolve-url-loader',
            options: {sourceMap: SOURCE_MAP}
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: SOURCE_MAP,
              data: "$ENV: production;"
            }
          }
        ]
      },
      {
        test: /^(?!.+(?:\.component)\.css).*\w+\.css$/,
        include: [SRC],
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {...cssLoaderOptions, importLoaders: 1}
          },
          {
            loader: 'postcss-loader',
            options: {sourceMap: SOURCE_MAP}
          }
        ]
      },

      {
        test: /\.component\.scss$/,
        include: [SRC],
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              ...cssLoaderOptions,
              ...cssModuleOptions,
              importLoaders: 2
            }
          },
          {
            loader: 'postcss-loader',
            options: {sourceMap: SOURCE_MAP}
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: SOURCE_MAP,
              data: "$ENV: production;"
            }
          }
        ]
      },
      {
        test: /\.component\.css$/,
        include: [SRC],
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              ...cssLoaderOptions,
              ...cssModuleOptions,
              importLoaders: 1
            }
          },
          {
            loader: 'postcss-loader',
            options: {sourceMap: SOURCE_MAP}
          }
        ]
      },

      {
        test: /\.css$/,
        include: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {sourceMap: SOURCE_MAP}
          }
        ]
      },

    ]
  },
  plugins: [
    new CleanPlugin([
      DIST
    ], {root: ROOT}),

    new MiniCssExtractPlugin({
      filename: CSS_TEMPLATE
    }),

    new LoaderOptionsPlugin({
      debug: false,
      options: {
        context: baseConfig.context
      }
    }),

    // new ServiceWorkerWebpackPlugin({
    // 	entry: path.join(ROOT, 'src/workers/cache-all.js'),
    // 	excludes: [
    // 		'**/*.map'
    // 	]
    // })
  ]
};

// if (process.env.ENV !== 'development') {
//   config.optimization.minimizer.push(
//     new UglifyJsPlugin({
//       cache: true,
//       parallel: true,
//       sourceMap: SOURCE_MAP
//     }),
//     new OptimizeCSSAssetsPlugin({})
//   )
// }

module.exports = merge(baseConfig, config);
