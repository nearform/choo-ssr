# choo-ssr

Server-side rendering for Choo with Fastify

[Usage](#usage) -
[Install](#install) -
[License: MIT](#license)

[![stability][stability-image]][stability-url]
[![standard][standard-image]][standard-url]

[stability-image]: https://img.shields.io/badge/stability-experimental-orange.svg?style=flat-square
[stability-url]: https://nodejs.org/api/documentation.html#documentation_stability_index
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[standard-url]: http://npm.im/standard

## Usage

See [examples](https://github.com/nearform/choo-ssr/tree/master/examples) for more

```js
// app.js

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
```

```js
// server.js
const fastify = require('fastify')()

fastify.register(require('choo-ssr/fastify'), {
  app: require('./app'),
})
```

## Install

```
npm install choo-ssr
```

## License

[MIT](LICENSE.md)

