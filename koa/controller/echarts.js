const Router=require('koa-router');
let router =new Router();
const mongoose=require('mongoose');

router.get('/getcircledata',async(ctx) => {
    const Comment = mongoose.model('Comment')
    await Comment.find({commentNumber:ctx.query.commentNumber}).exec().then(res => {
        if(res){
            ctx.body = {
                code: 20000,
                message: '成功',
                data: res
            }
        } else {
            ctx.body = {
                code: 50000,
                message: '未找到'
            }
        }
    })
})

router.get('/getstudentdata',async(ctx)=> {
    const Comment = mongoose.model('Comment')
    await Comment.find({studentNumber:ctx.query.studentNumber}).exec().then(res => {
        if(res){
            ctx.body = {
                code: 20000,
                message: '成功',
                data: res
            }
        } else {
            ctx.body = {
                code: 50000,
                message: '未找到'
            }
        }
    })
})

module.exports = router