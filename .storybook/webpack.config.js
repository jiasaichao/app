// you can use this file to add your custom webpack plugins, loaders and anything you like.
// This is just the basic way to add additional webpack configurations.
// For more information refer the docs: https://storybook.js.org/docs/react-storybook/configurations/custom-webpack-config

// IMPORTANT
// When you add this file, we won't add the default configurations which is similar
// to "React Create App". This only has babel loader to load JavaScript.
var path = require('path');
var webpack = require('webpack');
module.exports = {
  // resolve: {
  //   mainFiles: ["index.web","index"],// 这里哦
  //   modules: ['app', 'node_modules', path.join(__dirname, '../node_modules')],
  //   extensions: [
  //     '.web.tsx', '.web.ts', '.web.jsx', '.web.js', '.ts', '.tsx',
  //     '.js',
  //     '.jsx',
  //     '.react.js',
  //   ],
  //   mainFields: [
  //     'browser',
  //     'jsnext:main',
  //     'main',
  //   ],
  // },
  plugins: [
    new webpack.DefinePlugin({
      DEVELOPMENTZIP: JSON.stringify(false),
      DEVELOPMENT: JSON.stringify(true)
    })
  ],
  module: {
    rules: [{
      test: /\.md$/,
      loader: "raw-loader"
    }, {
      test: /\.css$/,
      loader: "css-loader"
    }, {
      test: /\.(png|jpg)$/,
      loader: "url-loader?limit=8192"
    }, {
      test: /\.svg$/,
      loader: "svg-sprite-loader"
    }, {
      test: /\.less$/,
      use: [{
        loader: "style-loader"
      }, {
        loader: "css-loader"
      }, {
        loader: "less-loader", options: {
          strictMath: true,
          noIeCompat: true
        }
      }]
    }]
  }
};