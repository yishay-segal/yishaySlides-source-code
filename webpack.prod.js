const path = require('path');
const common = require('./webpack.common');
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const miniCss = require('mini-css-extract-plugin');
const OptimizeCssAssetPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: '[name].[Hash].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  optimization: {
    minimize: true,
    minimizer: [
      new OptimizeCssAssetPlugin(),
      new HtmlWebpackPlugin({
        template: './assets/index.html',
        minify: {
          removeAttributeQuotes: true,
          collapseWhitespace: true,
          removeComments: true,
        },
      }),
      new HtmlWebpackPlugin({
        filename: 'slides.html',
        template: './assets/slides.html',
        chunks: ['slidesEntry'],
        minify: {
          removeAttributeQuotes: true,
          collapseWhitespace: true,
          removeComments: true,
        },
        scriptLoading: 'defer',
      }),
      new TerserPlugin(),
    ],
  },
  plugins: [
    new miniCss({ filename: '[name].[Hash].css' }),
    new CleanWebpackPlugin(),
  ],
});
