const fs = require('fs');
const path = require("path");
const requireEnv = require('require-environment-variables');
const webpack = require('webpack');

const EnvPlugin = webpack.EnvironmentPlugin;
const HtmlPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const StatsWriterPlugin = require("webpack-stats-plugin").StatsWriterPlugin;
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

const {CONFIG, PATHS, utils} = require('../config');

const {
  APP_BASE_URL,
  CLIENT_ENV_VARS,
  JS_TEMPLATE,
  JS_CHUNK_TEMPLATE,
  ASSET_LIMIT_KB,
  ASSET_TEMPLATE
} = CONFIG;

const {
  SRC,
  DIST,
  TMP,
  ROOT
} = PATHS;

if (!fs.existsSync(TMP)) fs.mkdirSync(TMP);

requireEnv(CLIENT_ENV_VARS.filter(el=>el!=='API_URL'));


const config = {
  context: SRC,
  entry: {
    main: 'main.js',
    polyfills: ['@babel/polyfill'],
    vendor: 'vendor.js'
  },
  output: {
    path: DIST,
    publicPath: APP_BASE_URL,
    filename: JS_TEMPLATE,
    chunkFilename: JS_CHUNK_TEMPLATE,
    hotUpdateChunkFilename: "[id].[hash].hot-update.js",
  },
  resolve: {
    extensions: [
      '.js'
      , '.scss'
      , '.json'
      , '.html'
    ],
    modules: [
      SRC, // for legacy
      "node_modules"
    ],
    alias: {
      'jquery': path.resolve(ROOT,'node_modules/jquery'),
      'angular': path.resolve(ROOT,'node_modules/angular'),
      'firebase': path.resolve(ROOT,'node_modules/firebase')
    }
  },
  optimization: {
    runtimeChunk: {
      name: 'webpack-runtime'
    },
    minimizer: []
  },
  module: {

    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules\/(?!(dom7|swiper)\/).*|bower_components|\.spec\.)/,
        use: [
          // {
          //   loader: 'ng-annotate-loader'
          // },
          {
            loader: 'nginject-loader',
            options: {
              deprecate: true
            }
          },
          {
            loader: "babel-loader",
            query: {
              retainLines: true
            }
          }
        ]
      },
      {
        test: /\.html$/,
        include: [SRC],
        exclude: [
          path.join(SRC, 'templates'),
          path.join(SRC, 'pages')
        ],
        use: [
          {
            loader: 'html-srcsets-loader',
            options: {
              interpolate: false,
              attrs: ['img:src', 'img:srcset', 'link:href']
            }
          }
        ]
      },
      {
        test: /\.html$/,
        include: [path.join(SRC, 'pages')],
        use: [
          {
            loader: 'html-srcsets-loader',
            options: {
              interpolate: true,
              attrs: ['img:src', 'img:srcset', 'link:href']
            }
          }
        ]
      },
      {
        test: /\.html$/,
        include: [path.join(SRC, 'templates')],
        use: [
          {
            loader: 'ng-cache-loader',
            options: {
              prefix: 'templates/*/'
            }
          }
        ]
      },
      {
        test: /.ejs$/,
        include: [SRC],
        use: [
          {
            loader: 'ejs-loader'
          }
        ]
      },
      {
        test: /\.(png|jpg|svg|gif|ico|eot|ttf|woff|woff2|otf)$/,
        exclude: path.join(SRC, 'images/favicon'),
        use: [{
          loader: `url-loader?limit=${ASSET_LIMIT_KB * 1024}&name=${ASSET_TEMPLATE}`,
        }]
      },
      {
        test: /\.(png|jpg|svg|gif|ico|eot|ttf|woff|woff2|otf)$/,
        include: path.join(SRC, 'images/favicon'),
        use: [{
          loader: `file-loader?name=${ASSET_TEMPLATE}&name=${ASSET_TEMPLATE}`,
        }]
      }
    ]
  },
  plugins: [

    new HtmlPlugin({
      filename: './index.html',
      template: './pages/index.html',
      chunks: ['webpack-runtime', 'polyfills', 'vendor', 'main'],
      chunksSortMode: (...args) => utils.sortChunks(
        ['webpack-runtime', 'polyfills', 'vendor', 'main'],
        ...args
      )
    }),

    new EnvPlugin(CLIENT_ENV_VARS),

		new CopyWebpackPlugin([
			{from: path.join(SRC, 'images'), to: 'images'},
			{from: path.join(SRC, 'fonts'), to: 'fonts'},
		], {
			copyUnmodified: true
		}),

    // Write out stats file to build directory.
    new StatsWriterPlugin({
      filename: 'build-stats.json' // Default
    }),

    // new HardSourceWebpackPlugin(),

  ],
  recordsPath: path.join(TMP, 'build-records.json')
};

module.exports = config;

