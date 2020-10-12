const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const merge = require('./webpack.base.config')
const {abs_path} = require('./utils')
const {app_name, dev_source_map} = require('./config')

module.exports = merge({
    mode: 'development',
    target: 'electron-renderer',
    devtool: dev_source_map,
    entry: './src/renderer/main.ts',
    output: {
        filename: 'renderer.js',
        path: abs_path('dist')
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: abs_path('src/renderer/index.html'),
            title: app_name
        }),
        new VueLoaderPlugin(),
    ],
})