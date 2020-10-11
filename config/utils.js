const path = require('path')

function abs_path(p) {
    return path.resolve(__dirname, '..', p)
}

module.exports = {
    abs_path
}