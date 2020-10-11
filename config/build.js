#! /bin/env node
const {shell_do} = require("./utils")
const yargs = require("yargs")

const {tb} = yargs.version(false).strict().option('tb', {
    description: 'use taobao cdn while build electron'
}).boolean('tb').argv

console.log('[Webpack] compiling for main...')
shell_do('webpack --config ./config/webpack.prod.main.config.js')

console.log('[Webpack] compiling for renderer...')
shell_do('webpack --config ./config/webpack.prod.renderer.config.js')

console.log(`[ElectronBuilder] building electron...${tb ? " [tb cdn]" : ""}`)
if (tb) {
    shell_do('electron-builder', {
        env: Object.assign({}, process.env, {
            ELECTRON_MIRROR: "https://cdn.npm.taobao.org/dist/electron/",
            ELECTRON_BUILDER_BINARIES_MIRROR: "https://npm.taobao.org/mirrors/electron-builder-binaries/"
        })
    })
} else {
    shell_do('electron-builder')
}