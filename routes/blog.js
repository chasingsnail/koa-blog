const router = require('koa-router')()
const {
	getList,
	getDetail,
	createBlog,
	updateBlog,
	delBlog
} = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const loginCheck = require('../middleware/loginCheck')

router.prefix('/api/blog')

router.get('/list', async function(ctx, next) {
	let author = ctx.query.author || ''
	const keyword = ctx.query.keyword || ''
	if (ctx.query.isadmin === '1') {
		if (ctx.session.username === null) {
			ctx.body = new ErrorModel('未登录')
		}
		author = ctx.session.username
	}
	const data = await getList(author, keyword)
	ctx.body = new SuccessModel(data)
})

router.get('/detail', async function(ctx, next) {
	const data = await getDetail(ctx.query.id)
	ctx.body = new SuccessModel(data)
})

router.post('/new', loginCheck, async function(ctx, next) {
	ctx.request.body.author = ctx.session.username
	const data = await createBlog(ctx.request.body)
	ctx.body = new SuccessModel(data, '新增成功')
})

router.post('/update', loginCheck, async function(ctx, next) {
	const flag = await updateBlog(ctx.query.id, ctx.request.body)
	if (flag) {
		ctx.body = new SuccessModel('修改成功')
	} else {
		ctx.body = new SuccessModel('失败')
	}
})

router.post('/del', loginCheck, async function(ctx, next) {
	const flag = await delBlog(ctx.query.id, ctx.session.username)
	if (flag) {
		ctx.body = new SuccessModel('删除成功')
	} else {
		ctx.body = new SuccessModel('删除失败')
	}
})

module.exports = router
