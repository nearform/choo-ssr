const h = require('choo/html')

function home (state, emit) {
  emit('data', new Date())
  return h`
    <div>
      ${state.data.map(data => h`<p>${data}</p>`)}
    </div>
  `
}

module.exports = home
