const { merge } = require('webpack-merge')
const devConf = require('./webpack.dev.main.config')

module.exports = merge(devConf, {
    mode: 'production',
    devtool: 'hidden-nosources-cheap-source-map'
})