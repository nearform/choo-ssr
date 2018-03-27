var h = require('choo/html')
var raw = require('choo/html/raw')
var common = require('./common')

function store () {
  return common.store()
}

function state () {
  return function (state, emit) {
    // @TODO: omit unnecessary props from the state
    var content = `window.initialState=${JSON.stringify(state)}`
    return h`<script>${raw(content)}</script>`
  }
}

module.exports = store
module.exports.state = state
module.exports.html = common.html
module.exports.head = common.head
module.exports.body = common.body
