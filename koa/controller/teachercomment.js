const Router=require('koa-router');
let router =new Router();
const mongoose=require('mongoose');

router.get('/search',async(ctx) => {
    const Teacher = mongoose.model('Teacher')
    console.log(ctx.query.number)
    await Teacher.findOne({teacherNumber: ctx.query.number}).exec().then(res => {
        if(res){
            // console.log(res)
            ctx.body = {
                code: 20000,
                message: '成功',
                data: res
            }
        } else {
            // console.log('0')
            ctx.body = {
                code: 50000,
                message: '失败'
            }
        }
    })
})

router.get('/gethomework',async(ctx) => {
    const HomeworkTeacher = mongoose.model('HomeworkTeacher')
    await HomeworkTeacher.find({teacherNumber: ctx.query.number}).exec().then(res => {
        if(res){
            console.log(res)
            ctx.body = {
                code: 20000,
                message: '成功',
                data: res
            }
        } else {
            // console.log('0')
            ctx.body = {
                code: 50000,
                message: '失败'
            }
        }
    })
})

router.get('/getteachercomment',async(ctx) => {
    const Comment = mongoose.model('Comment')
    await Comment.find({homeworkId: ctx.query.homeworkId}).exec().then(res => {
        if (res) {
            ctx.body = {
                code: 20000,
                message: '成功',
                data: res
            }
        } else {
            ctx.body = {
                code: 50000,
                message: '未找到',
            }
        }
    })
})

router.post('/changeteachercomment',async(ctx) => {
    const Comment = mongoose.model('Comment')
    // console.log(ctx.request.body)
    await Comment.findOneAndUpdate({_id: ctx.request.body.commentId},{
        teachercontent: ctx.request.body.teachercontent,
        teacherscore: ctx.request.body.teacherscore,
        teacherflag: true
    }).exec().then(res => {
        if(res){
            ctx.body = {
                code: 20000,
                message: '成功'
            }
        } else {
            ctx.body = {
                code: 50000,
                message: '未找到'
            }
        }
    })
})

module.exports = router;