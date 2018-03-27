const choo = require('choo')
const html = require('choo/html')
const ssr = require('choo-ssr')

const store = require('./store')
const home = require('./views/home')
const notfound = require('./views/notfound')

function main () {
  const app = choo()

  const page = view => (
    ssr.html(
      ssr.head(
        ssr.state(),
        () => html`<script src="/public/bundle.js"></script>`
      ),
      ssr.body(view)
    )
  )

  app.use(ssr())
  app.use(store())
  app.route('/', page(home))
  app.route('*', page(notfound))
  app.mount('html')

  return app
}

if (typeof window !== 'undefined') {
  main()
}

module.exports = main
