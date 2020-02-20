const router = require('koa-router')()
const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

router.prefix('/api/user')

router.post('/login', async function(ctx, next) {
	console.log('ctx.request.body: ', ctx.request.body);
	const result = await login(ctx.request.body)
	console.log('result: ', result);
	if (result.username) {
		ctx.session.username = result.username
		ctx.session.realname = result.realname
		// set(req.sessionId, result.session)
		ctx.body = new SuccessModel('登陆成功')
		return
	}
  ctx.body = new ErrorModel('登陆失败')
	// ctx.body = 'this is a users response!'
})

module.exports = router
