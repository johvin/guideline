var path = require('path');
var webpack = require('webpack');
var SmartBannerPlugin = require('smart-banner-webpack-plugin');
var pkg = require('./package.json');

module.exports = {

  entry: {
    index: './index.js',
  },

  output: {
    path: path.resolve(__dirname, './dist'),
    filename: "guideline.min.js",
    pathinfo: false,
    libraryTarget: 'commonjs2',
    library: 'guideline'
  },

  target: 'web',

  module: {
    rules: [
      {
        test: /\.js/,
        loader: 'babel-loader',
        query: {
          babelrc: false,
          presets: [
            // A Babel preset that can automatically determine the Babel plugins and polyfills
            // https://github.com/babel/babel-preset-env
            ['env', {
              targets: {
                browsers: [
                  ">1%",
                  "last 4 versions",
                  "Firefox ESR",
                  "not ie < 9"
                ],
              },
              modules: false,
              useBuiltIns: false,
              debug: false,
            }],
            // Experimental ECMAScript proposals
            // https://babeljs.io/docs/plugins/#presets-stage-x-experimental-presets-
            'stage-2'
          ],
        }
      }
    ]
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      compress: {
        warnings: true
      },
      output: {
        // remove file comment (webpack.BannerPlugin)
        comments: false,
        screw_ie8: true,
      }
    }),
    new SmartBannerPlugin({
      banner: `[filename] v${pkg.version}\n\nAuthor: johvin\nDate: ${new Date().toISOString()}`,
      raw: false,
      entryOnly: true
    })
  ],

  stats: {
    colors: true,
    reasons: false,
    hash: false,
    version: false,
    timings: true,
    chunks: false,
    chunkModules: false,
    cached: false,
    cachedAssets: false
  }

};