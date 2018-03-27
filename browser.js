var common = require('./common')

function store () {
  return common.store()
}

function state () {
  return function (state, emit) {
    return null
  }
}

module.exports = store
module.exports.state = state
module.exports.html = common.html
module.exports.head = common.head
module.exports.body = common.body
