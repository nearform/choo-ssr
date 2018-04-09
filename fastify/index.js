function runner (functions, ...args) {
  return new Promise((resolve, reject) => {
    var i = 0

    const handleResolve = () => next()
    const handleReject = err => reject(err)

    function next (err) {
      if (err) reject(err)
      else if (i === functions.length) resolve()
      else {
        const result = functions[i++](...args, next)
        if (result && typeof result.then === 'function') {
          result.then(handleResolve, handleReject)
        }
      }
    }

    next()
  })
}

async function routes (fastify, opts) {
  opts.plugins = opts.plugins || []

  const plugins = opts.plugins.map(function (plugin) {
    if (Array.isArray(plugin)) {
      return plugin[0](plugin[1])
    }
    return plugin()
  })
  const pre = plugins.map(plugin => plugin.pre)
  const post = plugins.map(plugin => plugin.post)

  fastify.get('*', async (request, reply) => {
    const state = {}
    const location = request.raw.url

    try {
      await runner(pre, state) // plugin pre-render phase
      const app = opts.app()
      const html = await app.toString(location, state)
      reply.type('text/html; charset=utf-8')
      await runner(post, html, state, reply) // plugin post-render phase
      return html
    } catch (e) {
      reply.code(500)
      return e
    }
  })
}

module.exports = routes
