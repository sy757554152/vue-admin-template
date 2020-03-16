const Router=require('koa-router');
let router =new Router();
const mongoose=require('mongoose');

router.get('/getcomment',async(ctx) => {
    const Comment = mongoose.model('Comment')
    await Comment.findOne({homeworkId: ctx.query.homeworkId, commentNumber: ctx.query.commentNumber}).exec().then(res => {
        if(res){
            ctx.body = {
                code: 20000,
                message: '成功',
                flag: true,
                data: res
            }
        } else {
            ctx.body = {
                code: 20000,
                message: '未找到'
            }
        }
    })
})

module.exports = router