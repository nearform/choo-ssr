var h = require('choo/html')

function store () {
  return function ssr (state, emitter, app) {
    state.ssr = true
  }
}

function html (head, body) {
  return function (state, emit) {
    // We want to render body first so that the state gets populated before serializing it into the the head
    var bodyRender = body(state, emit)
    var headRender = head(state, emit)
    return h`
      <html>
        ${headRender}
        ${bodyRender}
      </html>
    `
  }
}

function head () {
  var args = extract(arguments)
  return function (state, emit) {
    return h`
      <head ${args.props}>
        ${args.children.map(child => child(state, emit))}
      </head>
    `
  }
}

function body () {
  var args = extract(arguments)
  return function (state, emit) {
    return h`
      <body ${args.props}>
        ${args.children.map(child => child(state, emit))}
      </body>
    `
  }
}

function extract (args) {
  if (typeof args[0] === 'object') {
    return {
      props: args[0],
      children: [].slice.call(args, 1)
    }
  }
  return {
    props: {},
    children: [].slice.call(args)
  }
}

module.exports.store = store
module.exports.html = html
module.exports.head = head
module.exports.body = body
