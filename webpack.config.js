const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const {BabelMultiTargetPlugin} = require('webpack-babel-multi-target-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const context = path.resolve(__dirname, 'frontend');

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  context,
  entry: {
    index: [
      './polyfills.js',
      './index.js'
    ]
  },
  resolve: {
    mainFields: [
      'es2015',
      'module',
      'main'
    ]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          BabelMultiTargetPlugin.loader()
        ],
      }
    ]
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build')
  },
  plugins: [
    new CleanWebpackPlugin(['build']),
    new CopyWebpackPlugin(['**/*'], {context: path.resolve(__dirname, 'static')}),
    new CopyWebpackPlugin(
      ['webcomponentsjs/**/*'],
      {context: path.resolve(__dirname, 'node_modules', '@webcomponents')}
    ),
    new webpack.ProvidePlugin({
      regeneratorRuntime: 'regenerator-runtime'
    }),
    new BabelMultiTargetPlugin({
      babel: {
        presetOptions: {
          // debug: true, // uncomment to debug the babel configuration
          useBuiltIns: false
        }
      },
      doNotTarget: [],
      exclude: [],
      targets: {
        'es6': {
          browsers: [
            'last 2 Chrome major versions',
            'last 2 ChromeAndroid major versions',
            'last 2 Edge major versions',
            'last 2 Firefox major versions',
            'last 2 Safari major versions',
            'last 2 iOS major versions'
          ],
          tagAssetsWithKey: false,
          esModule: true
        },
        'es5': {
          browsers: [
            'ie 11'
          ],
          tagAssetsWithKey: true,
          noModule: true
        }
      }
    }),
    new HtmlWebpackPlugin({
      template: 'index.html'
    })
  ]
};
