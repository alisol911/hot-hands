const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = require('./webpack.shared.config')({
    mode: 'production',
    output: {
        filename: '[name].[chunkhash].js',
        chunkFilename: '[name].[chunkhash].chunk.js',
    },

    plugins: [
        new OptimizeCssAssetsPlugin({
          cssProcessorOptions: { discardComments: { removeAll: true } }
        }),
// TODO Migrate to webpack 4
/*
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            compress: {
                warnings: false
            },
            screw_ie8: true
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            children: true,
            minChunks: 2,
            async: true,
        }),
*/
        new HtmlWebpackPlugin({
            template: 'client/index.html',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
            },
            inject: true,
        }),
        new webpack.DefinePlugin({
            'DEBUG': false,
        })
    ]
});
