const fastify = require('fastify')()

fastify.register(require('choo-ssr/fastify'), {
  app: require('./app')
})

fastify.listen(8080, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('listening on 8080')
})
