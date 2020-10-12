const path = require('path')
const {spawnSync} = require('child_process')
const webpack = require('webpack')

function abs_path(p) {
    return path.resolve(__dirname, '..', p)
}

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

async function webpack_async(conf) {
    return new Promise(resolve => {
        webpack(conf, (err, stats) => {
            resolve({err, stats})
        })
    })
}

async function run_webpack(conf) {
    const stats_conf = conf.stats || {}
    const {err, stats} = await webpack_async(conf)
    if (err) {
        console.error(err.toString())
        process.exit(1)
    }
    console.log(stats.toString(stats_conf) + '\n')
    if (stats.hasErrors()) {
        process.exit(1)
    }
}

module.exports = {
    abs_path,
    shell_do,
    run_webpack
}