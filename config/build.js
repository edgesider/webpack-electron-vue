#! /bin/env node
const {shell_do, run_webpack} = require("./utils")
const yargs = require("yargs")

const args = yargs.version(false)
    .strict()
    .option('tb', {description: 'use taobao cdn while build electron'})
    .boolean('tb')
    .argv

function build_electron() {
    const {tb} = args
    const env = Object.assign({}, process.env, tb ? {
        ELECTRON_MIRROR: "https://cdn.npm.taobao.org/dist/electron/",
        ELECTRON_BUILDER_BINARIES_MIRROR: "https://npm.taobao.org/mirrors/electron-builder-binaries/"
    } : {})

    console.log(`[ElectronBuilder] building electron...${tb ? " [tb cdn]" : ""}`)
    shell_do('electron-builder', {env})
}

(async () => {
    console.log('[Webpack] compiling for main...')
    await run_webpack(require('./webpack.prod.main.config'))

    console.log('[Webpack] compiling for renderer...')
    await run_webpack(require('./webpack.prod.renderer.config'))

    build_electron()
})()