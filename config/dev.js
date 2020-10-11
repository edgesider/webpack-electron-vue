#! /bin/env node
const {spawn, spawnSync} = require('child_process')
const Webpack = require('webpack')
const WDS = require('webpack-dev-server')
const renderer_conf = require('./webpack.dev.renderer.config.js')
const app_conf = require('./config')

console.log('[Webpack] compiling main...')
spawnSync('webpack --config ./config/webpack.dev.main.config.js', {
    shell: true,
    stdio: 'inherit'
})

console.log('[WDS] starting...')
const wds = new WDS(Webpack(renderer_conf), {
    port: app_conf.wds_port,
    hot: true,
    stats: {
        chunks: false,
        modules: false,
        colors: true
    }
})

wds.listen(app_conf.wds_port, 'localhost', () => {
    console.log('[WDS] started')

    console.log('[App] starting...')
    const app = spawn('electron dist/main.js', {
        stdio: 'inherit',
        shell: true
    })
    app.on("close", () => {
        console.log('[App] stopped')
        wds.close()
    })
})
