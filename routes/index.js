const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

router.get('/session-test', async (ctx, next) => {
  // console.log('ctx.session.viewCount', ctx.session.viewCount)
  if (ctx.session.viewCount === null || ctx.session.viewCount === undefined) {
    ctx.session.viewCount = 0
  }
  ctx.session.viewCount++
  ctx.body = {
    error: 1,
    viewCount: ctx.session.viewCount
  }
})

module.exports = router
