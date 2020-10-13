#! /bin/env node
const {spawn} = require('child_process')
const webpack = require('webpack')
const WDS = require('webpack-dev-server')
const renderer_conf = require('./webpack.dev.renderer.config.js')
const app_conf = require('./config')
const {run_webpack} = require("./utils");

(async () => {
    console.log('[Webpack] compiling main...')
    await run_webpack(require('./webpack.dev.main.config'))

    console.log('[WDS] starting...')
    const wds = new WDS(webpack(renderer_conf), {
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
        const app = spawn('electron', ['dist/main.js',
            (app_conf.pause_at_start ? '--inspect-brk' : '--inspect') + `=${app_conf.main_debug_port}`,
            `--remote-debugging-port=${app_conf.renderer_debug_port}`,
        ], {
            stdio: 'inherit',
        })
        app.on("close", () => {
            console.log('[App] stopped')
            wds.close()
        })
    })
})()