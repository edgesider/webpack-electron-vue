const {abs_path} = require('./utils')
const merge = require('./webpack.base.config')
const webpack = require('webpack')
const config = require('./config')

module.exports = merge({
    mode: 'development',
    target: 'electron-main',
    entry: './src/main/main.ts',
    output: {
        filename: 'main.js',
        path: abs_path('dist')
    },
    plugins: [
        new webpack.DefinePlugin({
            'WDS_PORT': config.wds_port
        })
    ],
    devtool: 'source-map'
})