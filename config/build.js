const { spawn, spawnSync } = require('child_process')
const { shell } = require('electron')

function shell_do(cmd, conf) {
    conf = conf || {}
    const env = conf.env || process.env

    let p = spawnSync(cmd, {
        shell: true,
        stdio: 'inherit',
        env
    })
    if (p.status !== 0) {
        process.exit(p.status)
    }
}

console.log('[Webpack] compiling for main...')
shell_do('webpack --config ./config/webpack.prod.main.config.js')

console.log('[Webpack] compiling for renderer...')
shell_do('webpack --config ./config/webpack.prod.renderer.config.js')

console.log('[ElectronBuilder] building electron...')
shell_do('electron-builder', {
    env: Object.assign({}, process.env, {
        ELECTRON_MIRROR: "https://cdn.npm.taobao.org/dist/electron/",
        ELECTRON_BUILDER_BINARIES_MIRROR: "https://npm.taobao.org/mirrors/electron-builder-binaries/"
    })
})