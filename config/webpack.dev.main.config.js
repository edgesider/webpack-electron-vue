const {abs_path} = require('./utils')
const merge = require('./webpack.base.config')
const webpack = require('webpack')
const {wds_port, dev_source_map} = require('./config')

module.exports = merge({
    mode: 'development',
    target: 'electron-main',
    devtool: dev_source_map,
    entry: './src/main/main.ts',
    output: {
        filename: 'main.js',
        path: abs_path('dist')
    },
    plugins: [
        new webpack.DefinePlugin({
            'WDS_PORT': wds_port
        })
    ],
})