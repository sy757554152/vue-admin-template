const Router=require('koa-router');
let router =new Router();
const mongoose=require('mongoose');

router.post('/addTeacher',async(ctx)=>{
    // console.log('请求成功');
    // ctx.body='请求成功';

    // 获取model
    const Teacher =mongoose.model('Teacher');
    // 接收post请求封装成user对象
    let newTeacher =new Teacher(ctx.request.body);
    // 使用save()保存用户信息
    await newTeacher.save()
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
    const Teacher=mongoose.model('Teacher')
    console.log(ctx.query)
    if(ctx.query.teacherName!=''){
        console.log('1')
        var teacherName=new RegExp(ctx.query.teacherName);
        await Teacher.find({teacherName:teacherName}).exec().then(res=>{
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
    }else if(ctx.query.teacherNumber!=''){
        console.log('2')
        var teacherNumber=new RegExp(ctx.query.teacherNumber);
        await Teacher.find({teacherNumber:teacherNumber}).exec().then(res=>{
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
        await Teacher.find({}).exec().then(res=>{
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
    const Teacher=mongoose.model('Teacher');
    // console.log(ctx.request.body)
    await Teacher.findOneAndUpdate({teacherNumber:ctx.request.body.teacherNumber},{
        teacherName:ctx.request.body.teacherName,
        sex:ctx.request.body.sex,
        IdCard:ctx.request.body.IdCard,
        political:ctx.request.body.political,
        phone:ctx.request.body.phone,
        institute:ctx.request.body.institute,
        education:ctx.request.body.education,
        university:ctx.request.body.university,
        joinTime:ctx.request.body.joinTime
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
    const Teacher=mongoose.model('Teacher')
    await Teacher.findOneAndRemove({teacherNumber:ctx.request.body.teacherNumber}).exec().then(res=>{
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