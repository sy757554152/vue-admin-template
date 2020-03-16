const Router=require('koa-router');
let router =new Router();
const mongoose=require('mongoose');

router.post('/addStudent',async(ctx)=>{
    // console.log('请求成功');
    // ctx.body='请求成功';

    // 获取model
    const Student =mongoose.model('Student');
    // 接收post请求封装成user对象
    let newStudent =new Student(ctx.request.body);
    // 使用save()保存用户信息
    await newStudent.save()
    .then(()=>{
        ctx.body={
            code:20000,
            message:'注册成功'
        }
    }).catch((err)=>{
        ctx.body={
            code:500,
            message:err
        }
    });
})
router.get('/show',async(ctx)=>{
    const Student=mongoose.model('Student')
    if(ctx.query.studentName!=''){
        var studentName=new RegExp(ctx.query.studentName);
        await Student.find({studentName:studentName}).exec().then(res=>{
            if(res){
                ctx.body={
                    code:20000,
                    message:'搜索成功',
                    data:res
                }
            }else{
                ctx.body={
                    code: 50000,
                    message: '不存在该用户'
                }
            }
        })
    }else if(ctx.query.studentNumber!=''){
        var studentNumber=new RegExp(ctx.query.studentNumber);
        await Student.find({studentNumber:studentNumber}).exec().then(res=>{
            if(res){
                ctx.body={
                    code:20000,
                    message:'搜索成功',
                    data:res
                }
            }else{
                ctx.body={
                    code: 50000,
                    message: '不存在该用户'
                }
            }
        })
    }else{
        await Student.find({}).exec().then(res=>{
            if(res){
                ctx.body={
                    code:20000,
                    message:'搜索成功',
                    data:res
                }
            }else{
                ctx.body={
                    code: 50000,
                    message: '不存在该用户'
                }
            }
        })
    }
})

router.post('/change',async(ctx)=>{
    const Student=mongoose.model('Student');
    // console.log(ctx.request.body)
    await Student.findOneAndUpdate({studentNumber:ctx.request.body.studentNumber},{
        studentName:ctx.request.body.studentName,
        sex:ctx.request.body.sex,
        IdCard:ctx.request.body.IdCard,
        state:ctx.request.body.state,
        political:ctx.request.body.political,
        phone:ctx.request.body.phone,
        institute:ctx.request.body.institute,
        major:ctx.request.body.major,
        class:ctx.request.body.class
    }).exec().then(res=>{
        // console.log(res)
        if(res){
            ctx.body={
                code:20000,
                message:'success',
                data:res
            }
        }else{
            ctx.body={
                code:50000,
                message:'error'
            }
        }
    })
    // ctx.body={
    //     code:20000,
    //     message:'success'
    // }
})
router.post('/dele',async(ctx)=>{
    const Student=mongoose.model('Student')
    await Student.findOneAndRemove({studentNumber:ctx.request.body.studentNumber}).exec().then(res=>{
        // console.log(res)
        if(res){
            ctx.body={
                code: 20000,
                message: 'success',
                data: res
            }
        }else{
            ctx.body={
                code: 20000,
                message: 'error'
            }
        }
    })
})
module.exports=router;