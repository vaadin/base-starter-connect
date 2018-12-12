const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const {BabelMultiTargetPlugin} = require('webpack-babel-multi-target-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  context: path.resolve(__dirname, 'frontend'),
  entry: {
    index: './index.js'
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
        ]
      }
    ]
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build')
  },
  plugins: [
    new CleanWebpackPlugin(['build']),
    new CopyWebpackPlugin(
      ['../static/**/*'],
      {context: path.resolve('static')}
    ),
    new BabelMultiTargetPlugin({
      targets: {
        'es6': {
          browsers: [
            'last 2 Chrome versions',
            'last 2 Edge versions',
            'last 2 Firefox versions',
            'last 2 Safari versions',
            'not dead'
          ],
          tagAssetsWithKey: false,
          esModule: true
        },
        'es5': {
          browsers: [
            'last 2 versions',
            'ie <= 11',
            'not dead'
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
