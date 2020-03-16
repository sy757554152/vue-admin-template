const Router=require('koa-router');
let router=new Router();
const mongoose=require('mongoose');

router.get('/show',async(ctx) => {
    const state = ctx.query.state;
    const institute = ctx.query.institute;
    const major = ctx.query.major;
    const classes = ctx.query.class;
    const HomeworkTeacher =mongoose.model('HomeworkTeacher');
    // console.log(major)
    await HomeworkTeacher.find({state:state,institute:institute,major:major,class:classes}).exec().then(res => {
        if (res) {
            ctx.body = {
                code: 20000,
                message: '查找成功',
                data: res
            }
        } else {
            ctx.body = {
                code: 50000,
                message: '没有信息'
            }
        }
    }).catch(err => {
        ctx.body = {
            code: 50000,
            message: '查找错误'
        }
    })
})
router.get('/getcomment',async(ctx) => {
    // console.log('123456')
    // console.log(ctx.query)
    const Comment = mongoose.model('Comment')
    await Comment.findOne({homeworkId: ctx.query.homeworkId, commentNumber: ctx.query.commentNumber, commentName: ctx.query.commentName}).exec().then(res => {
        if(res){
            ctx.body = {
                code: 20000,
                flag: true,
                data: res
            }
        } else {
            ctx.body = {
                code: 20000,
                flag: false,
                message: '未评论'
            }
        }
    }).catch(err => {
        console.log(err)
    })
})

router.get('/getvideos',async(ctx) => {
    // console.log(ctx.query)
    const Videoupload = mongoose.model('Videoupload')
    await Videoupload.find({homeworkId: ctx.query.homeworkId, flag: ctx.query.flag}).exec().then(res => {
        // console.log(res[0])
        // console.log(res.length)
        if(res.length===0){
            // console.log('4')
            ctx.body = {
                code: 20000,
                flag: false,
                message: '无视频'
            }
        }
        else{
            if(res[0].studentNumber == ctx.query.studentNumber) {
                // console.log('1')
                if(res.length === 1) {
                    // console.log('2')
                    ctx.body = {
                        code: 20000,
                        flag: false,
                        message: '请稍后重试,他人视频未上传完成'
                    }
                } else {
                    // console.log('3')
                    ctx.body = {
                        code: 20000,
                        flag: true,
                        data: res[1]
                    }
                }
            } else {
                // console.log('4')
                ctx.body = {
                    code: 20000,
                    flag: true,
                    data: res[0]
                }
            } 
        }
        
        // ctx.body = {
        //     code: 20000,
        //     flag: true,
        //     data: res
        // }
    })
})
router.get('/gethomework',async(ctx) => {
    const HomeworkTeacher = mongoose.model('HomeworkTeacher')
    // console.log(ctx.query)
    await HomeworkTeacher.findOne({_id: ctx.query.homeworkId}).exec().then(res => {
        if (res) {
            ctx.body = {
                code: 20000,
                message: '成功',
                data: res
            }
        } else {
            ctx.body = {
                code: 20000,
                message: '未找到',
            }
        }
    })
})
router.post('/addcomment',async(ctx) => {
    const Comment = mongoose.model('Comment')
    let comment = new Comment(ctx.request.body)
    await comment.save().then(res => {
        if (res) {
            ctx.body = {
                code: 20000,
                flag: true,
                message: '成功'
            }
        } else {
            ctx.body = {
                code: 20000,
                flag: false,
                message: '失败'
            }
        }
    })

})
router.post('/changehomeworkflag',async(ctx) => {
    const Videoupload = mongoose.model('Videoupload')
    // console.log(ctx.request.body)
    await Videoupload.findOneAndUpdate({_id: ctx.request.body.videoId},{
        flag: ctx.request.body.flag
    }).exec().then(res => {
        if(res){
            ctx.body={
                code: 20000,
                flag: true,
                message: '修改完成'
            }
        } else {
            ctx.body = {
                code: 20000,
                flag: false,
                message: '未修改'
            }
        }
    })
})
router.post('/changecomment',async(ctx) => {
    const Comment = mongoose.model('Comment')
    // console.log(ctx.request.body)
    await Comment.findOneAndUpdate({homeworkId: ctx.request.body.homeworkId, commentNumber:ctx.request.body.commentNumber, commentName: ctx.request.body.commentName},{
        time: ctx.request.body.time,
        frequency: ctx.request.body.frequency,
        commentcontent: ctx.request.body.commentcontent,
        commentscore: ctx.request.body.commentscore
    }).exec().then(res => {
        if(res){
            ctx.body = {
                code: 20000,
                flag: true,
                message: '修改成功'
            }
        } else {
            ctx.body = {
                code: 20000,
                flag: false,
                message: '未找到' 
            }
        }
    })
})
module.exports=router