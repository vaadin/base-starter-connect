const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const {BabelMultiTargetPlugin} = require('webpack-babel-multi-target-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');

// This folder is served as static in a spring-boot installation
const outputFolder = 'target/classes/META-INF/resources';
let compilations = 0;

module.exports = (env, argv) => {
  return {

    // Default build mode (the frontend development server forces 'development')
    mode: 'production',

    // Include source maps in the build
    devtool: 'source-map',

    // The directory with the frontend sources
    context: path.resolve(__dirname, 'frontend'),

    entry: {
      polyfills: './polyfills.js',
      index: './index.js'
    },

    resolve: {
      // Prefer ES module dependencies when declared in package.json
      mainFields: [
        'es2015',
        'module',
        'main'
      ]
    },

    module: {
      rules: [
        // Process .js files though Babel with multiple targets
        {
          test: /\.js$/,
          use: [
            BabelMultiTargetPlugin.loader(),
            'uglify-template-string-loader'
          ],
        }
      ]
    },

    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, outputFolder)
    },

    performance: {
      maxAssetSize: 500000,
      maxEntrypointSize: 500000
    },

    plugins: [

      // Copy static assets
      new CopyWebpackPlugin(['**/*'], {context: path.resolve(__dirname, 'static')}),

      // Copy @webcomponents/webcomponentsjs
      new CopyWebpackPlugin(
        ['webcomponentsjs/**/*'],
        {context: path.resolve(__dirname, 'node_modules', '@webcomponents')}
      ),

      // Provide regeneratorRuntime for Babel async transforms
      new webpack.ProvidePlugin({
        regeneratorRuntime: 'regenerator-runtime'
      }),

      // Babel configuration for multiple output bundles targeting different sets
      // of browsers
      new BabelMultiTargetPlugin({
        babel: {
          plugins: [
            [
              require('babel-plugin-template-html-minifier'),
              {
                modules: {
                  '@polymer/polymer/lib/utils/html-tag.js': ['html']
                },
                htmlMinifier: {
                  collapseWhitespace: true,
                  minifyCSS: true,
                  removeComments: true
                }
              }
            ]
          ],

          // @babel/preset-env options common for all bundles
          presetOptions: {
            // debug: true, // uncomment to debug the babel configuration

            // Don’t add polyfills, they are provided from webcomponents-loader.js
            useBuiltIns: false
          }
        },

        // Modules excluded from targeting into different bundles
        doNotTarget: [
          // Array of RegExp patterns
        ],

        // Modules that should not be transpiled
        exclude: [
          // Array of RegExp patterns
        ],

        // Target browsers with and without ES modules support
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
            tagAssetsWithKey: false, // don’t append a suffix to the file name
            esModule: true // marks the bundle used with <script type="module">
          },
          'es5': {
            browsers: [
              'ie 11'
            ],
            tagAssetsWithKey: true, // append a suffix to the file name
            noModule: true // marks the bundle included without `type="module"`
          }
        }
      }),

      // Insert the bundles in the html file
      new HtmlWebpackPlugin({
        template: 'index.html',

        // Prevent adding multiple bunldles for polyfills, browsers that have ES
        // modules support don’t need them. The polyfills are listed directly in
        // the html template to ensure correct loading order.
        excludeChunks: ['polyfills']
      }),

      // Append Spring Boot LiveReload script in development mode
      argv.mode === 'development' && new HtmlWebpackIncludeAssetsPlugin({
        assets: ['http://localhost:35729/livereload.js'],
        append: true,
        resolvePaths: false,
        publicPath: false
      }),

      // Monitor Webpack progress to show a message when in devmode
      new webpack.ProgressPlugin((percentage, message, ...args) => {
        if (percentage === 1) {
          if (argv.mode === 'development') {
            let msg;
            if (compilations++) {
              msg = '\r 🚀  \x1b[36mVaadin Connect\x1b[0m Webpack has reloaded changes';
            } else {
              msg = '\r 🌀  \x1b[36mVaadin Connect\x1b[0m Webpack is watching for changes on ./fronted\n';
              if (env && env.backend) {
                msg += `\n 👍  \x1b[36mVaadin Connect\x1b[0m Application Ready at \x1b[32m${env.backend}\x1b[0m 👍\n`;
              }
            }
            console.log(msg);
          }
        }
      })

    ].filter(Boolean)
  };
};
