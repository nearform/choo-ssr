const h = require('choo/html')

function home (state, emit) {
  return h`
    <div>Welcome!</div>
  `
}

module.exports = home
