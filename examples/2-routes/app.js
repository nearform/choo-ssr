const choo = require('choo')
const ssr = require('choo-ssr')

const home = require('./views/home')
const foobar = require('./views/foobar')
const notfound = require('./views/notfound')

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
  app.route('/foobar', page(foobar))
  app.route('*', page(notfound))

  app.mount('html')

  return app
}

if (typeof window !== 'undefined') {
  main()
}

module.exports = main
