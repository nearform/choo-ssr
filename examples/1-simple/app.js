const choo = require('choo')
const html = require('choo/html')
const ssr = require('choo-ssr')

function main () {
  const app = choo()

  const page = view => (
    ssr.html(
      ssr.head(ssr.state()),
      ssr.body(view)
    )
  )

  app.use(ssr())
  app.route('/', page(home))
  app.route('*', page(notfound))
  app.mount('html')

  function home (state, emit) {
    return html`<div>Hello World!</div>`
  }

  function notfound (state, emit) {
    return html`<div>Not found :(</div>`
  }

  return app
}

if (typeof window !== 'undefined') {
  main()
}

module.exports = main
