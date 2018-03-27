const isServer = typeof window === 'undefined'

function store () {
  return (state, emitter) => {
    state.data = state.data || []
    emitter.on('data', data => {
      state.data.push((isServer ? 'SERVER:' : 'CLIENT:') + data)
    })
  }
}

module.exports = store
