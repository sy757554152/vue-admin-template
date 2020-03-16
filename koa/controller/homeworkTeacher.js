const Router=require('koa-router');
let router=new Router();
const mongoose=require('mongoose');
// router.post('/addHomework',async(ctx)=>{
//     // console.log(ctx.request.body)
//     const homeworkTeacher=mongoose.model('HomeworkTeacher');
//     let newHomework=new homeworkTeacher(ctx.request.body);
//     console.log(newHomework)
//     await newHomework.save(res=>{
//         console.log(res)
//     }).then(res=>{
//         console.log(res)
//         ctx.body={
//             code: 20000,
//             message: 'success',
//             data: res
//         }
//     }).catch(err=>{
//         ctx.body={
//             code: 50000,
//             message: 'error',
//         }
//     })
//     // ctx.body={
//     //     code: 20000,
//     //     message: 'success'
//     // }
// })
router.post('/addHomework',async(ctx)=>{
    // console.log('请求成功');
    // ctx.body='请求成功';
    // console.log(ctx.request.body)
    // 获取model
    const HomeworkTeacher =mongoose.model('HomeworkTeacher');
    // 接收post请求封装成user对象
    let homework =new HomeworkTeacher(ctx.request.body);
    // 使用save()保存用户信息
    await homework.save()
    .then(()=>{
        ctx.body={
            code:20000,
            message:'注册成功'
        }
    }).catch((err)=>{
        ctx.body={
            code:50000,
            message:err
        }
    });
})

router.get('/getTeacher',async(ctx)=>{
    // console.log(ctx.query)
    const Teacher=mongoose.model('Teacher')
    await Teacher.findOne({teacherNumber:ctx.query.teacherNumber}).exec().then(res=>{
        if(res){
            ctx.body={
                code: 20000,
                data: res,
                message: 'success'
            }
        }else{
            ctx.body={
                code: 50000,
                message: 'not found'
            }
        }
    }).catch(err=>{
        ctx.body={
            code: 50000,
            message: 'error'
        }
    })
})
module.exports=router;