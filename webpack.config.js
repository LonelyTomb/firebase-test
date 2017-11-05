const webpack = require('webpack')
const path = require('path')

/*
 * We've enabled UglifyJSPlugin for you! This minifies your app
 * in order to load faster and run less javascript.
 *
 * https://github.com/webpack-contrib/uglifyjs-webpack-plugin
 *
 */

const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

/*
 * We've enabled commonsChunkPlugin for you. This allows your app to
 * load faster and it splits the modules you provided as entries across
 * different bundles!
 *
 * https://webpack.js.org/plugins/commons-chunk-plugin/
 *
 */

/*
 * We've enabled ExtractTextPlugin for you. This allows your app to
 * use css modules that will be moved into a separate CSS file instead of inside
 * one of your module entries!
 *
 * https://github.com/webpack-contrib/extract-text-webpack-plugin
 *
 */

const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: {
    app: path.join(__dirname, 'public/javascripts/app.js'),
    uikit: ['uikit', path.join(__dirname, 'public/stylesheets/style.scss')],
    'uikit-icons': './node_modules/uikit/dist/js/uikit-icons.js'
  },

  output: {
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].[chunkhash].js',
    path: path.resolve(__dirname, 'public/dist')
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',

        options: {
          presets: ['es2015']
        }
      },
      {
        test: require.resolve('uikit'),
        use: [{
          loader: 'expose-loader',
          options: 'UIkit'
        }]
      },
      {
        test: /\.(scss|css)$/,

        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            }
          ],
          fallback: 'style-loader'
        })
      }
    ]
  },

  plugins: [
    new UglifyJSPlugin(),
    new ExtractTextPlugin('css/style.css'),
    new webpack.ProvidePlugin({
      UIkit: 'uikit'
    })
  ]
}
