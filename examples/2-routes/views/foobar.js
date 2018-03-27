const h = require('choo/html')

function foobar (state, emit) {
  return h`
    <div>Foobar!</div>
  `
}

module.exports = foobar
