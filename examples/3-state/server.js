const fs = require('fs')
const path = require('path')
const fastify = require('fastify')()
const browserify = require('browserify')

browserify('app.js')
  .bundle()
  .pipe(fs.createWriteStream('./public/bundle.js'))

fastify.register(require('fastify-static'), {
  root: path.join(__dirname, './public'),
  prefix: '/public'
})

fastify.register(require('choo-ssr/fastify'), {
  app: require('./app')
})

fastify.listen(8080, function (err) {
  if (err) {
    console.log(err)
  }
  console.log('listening on 8080')
})
