const path = require('path')
const {spawnSync} = require('child_process')

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

module.exports = {
    abs_path,
    shell_do
}