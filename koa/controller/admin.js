const Router=require('koa-router');
let router =new Router();
const mongoose=require('mongoose');
const fs=require('fs');
// 导入数据
router.get('/innerAdmin',async(ctx)=>{
    fs.readFile('./data/admin.json','utf8',(err,data)=>{
        data=JSON.parse(data);
        // console.log(data);
        let count=0;//计数器
        const Admin=mongoose.model('Admin');
        data.map((value,index)=>{
            // console.log(value);
            let admin= new Admin(value);
            admin.save().then(()=>{
                count++;
                // console.log('成功'+count);
            }).catch((err)=>{
                console.error(err);
            });
        })
    })
    ctx.body='导入数据';
})
router.get('/innerStudent',async(ctx)=>{
    fs.readFile('./data/student.json','utf8',(err,data)=>{
        data=JSON.parse(data);
        // console.log(data);
        let count=0;//计数器
        const Student=mongoose.model('Student');
        data.map((value,index)=>{
            // console.log(value);
            let student= new Student(value);
            student.save().then(()=>{
                count++;
                // console.log('成功'+count);
            }).catch((err)=>{
                console.error(err);
            });
        })
    })
    ctx.body='导入数据';
})
router.get('/innerTeacher',async(ctx)=>{
    fs.readFile('./data/teacher.json','utf8',(err,data)=>{
        data=JSON.parse(data);
        // console.log(data);
        let count=0;//计数器
        const Teacher=mongoose.model('Teacher');
        data.map((value,index)=>{
            // console.log(value);
            let teacher= new Teacher(value);
            teacher.save().then(()=>{
                count++;
                // console.log('成功'+count);
            }).catch((err)=>{
                console.error(err);
            });
        })
    })
    ctx.body='导入数据';
})
// 登录
router.post('/login',async(ctx)=>{
    let loginAdmin=ctx.request.body;
    let adminNumber=loginAdmin.adminNumber;
    let adminpassword=loginAdmin.adminPassword;
    let adminType=loginAdmin.adminType;
    // console.log(loginAdmin);
    // console.log(ctx.request.body);
    if(adminType==='1'){
        // console.log('123456')
        const Student=mongoose.model('Student');
        await Student.findOne({studentNumber:adminNumber}).exec().then(async(res)=>{
            // console.log(res);
            if(res){
                let newStudent=new Student();
                await newStudent.comparePassword(adminpassword,res.password).then(isMatch=>{
                    // console.log(res);
                    if(isMatch){
                        ctx.body={
                            code: 20000,
                            message: "登陆成功",
                            data: {
                                token: res.studentNumber+res.type,
                                data: res
                            }
                        }
                    }else{
                        ctx.body={
                            code: 201,
                            message: '登陆失败',
                        }
                    }
                })
            }else{
                ctx.body={
                    code: 202,
                    message:'用户名不存在',
                }
            }
        })   
    }else if(adminType==='2'){
        // console.log('456789')
        const Teacher=mongoose.model('Teacher');
        await Teacher.findOne({teacherNumber:adminNumber}).exec().then(async(res)=>{
            // console.log(res);
            if(res){
                let newTeacher=new Teacher();
                await newTeacher.comparePassword(adminpassword,res.password).then(isMatch=>{
                    // console.log(res);
                    if(isMatch){
                        ctx.body={
                            code: 20000,
                            message: "登陆成功",
                            data: {
                                token: res.teacherNumber+res.type,
                                data: res
                            }
                        }
                    }else{
                        ctx.body={
                            code: 201,
                            message: '登陆失败',
                        }
                    }
                })
            }else{
                ctx.body={
                    code: 202,
                    message:'用户名不存在2222',
                }
            }
        })
    }else if(adminType==='3'){
        // console.log('789123')
        const Admin=mongoose.model('Admin');
        await Admin.findOne({adminNumber:adminNumber}).exec().then(async(res)=>{
            // console.log(res);
            if(res){
                let newAdmin=new Admin();
                await newAdmin.comparePassword(adminpassword,res.password).then(isMatch=>{
                    // console.log(res);
                    if(isMatch){
                        ctx.body={
                            code: 20000,
                            message: "登陆成功",
                            data: {
                                token: res.adminNumber+res.type,
                                data: res
                            }
                        }
                    }else{
                        ctx.body={
                            code: 201,
                            message: '登陆失败',
                        }
                    }
                })
            }else{
                ctx.body={
                    code: 202,
                    message:'用户名不存在2222',
                }
            }
        })
    }
    
})
router.get('/info',async(ctx)=>{
    const token=ctx.query.token.slice(0,ctx.query.token.length-1);
    const type=ctx.query.token.slice(ctx.query.token.length-1);
    // console.log(token,type)
    if(type==='1'){
        // console.log('Student')
        const Student=mongoose.model('Student');
        await Student.find({studentNumber:token}).exec().then(res=>{
            // console.log(res)
            ctx.body={
                code: 20000,
                data:{
                    roles: ['admin'],
                    instroduction: 'I am a student',
                    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
                    name: res[0].studentName,
                    state: res[0].state,
                    institute: res[0].institute,
                    major: res[0].major,
                    classes: res[0].class
                }
            }
        }).catch(err=>{
            ctx.body={
                code: 201,
                data: err
            }
            // console.log(err);
        })
    }else if(type==='2'){
        // console.log('2')
        const Teacher=mongoose.model('Teacher');
        await Teacher.find({teacherNumber:token}).exec().then(res=>{
            // console.log(res)
            ctx.body={
                code: 20000,
                data:{
                    roles: ['admin'],
                    instroduction: 'I am a teacher',
                    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
                    name: res[0].teacherName
                }
            }
        }).catch(err=>{
            ctx.body={
                code: 201,
                data: err
            }
            // console.log(err);
        })
    }else if(type==='3'){
        const Admin=mongoose.model('Admin');
        await Admin.find({adminNumber:token}).exec().then(res=>{
            // console.log(res[0].adminName)
            ctx.body={
                code: 20000,
                data:{
                    roles: ['admin'],
                    instroduction: 'I am a admin',
                    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
                    name: res[0].adminName
                }
            }
        }).catch(err=>{
            ctx.body={
                code: 201,
                data: err
            }
            // console.log(err);
        })
    }
    
})
router.post('/logout',async(ctx)=>{
    const Admin=mongoose.model('Admin')
    await Admin.find({}).exec().then(res=>{
        ctx.body={
            code: 20000,
            data: 'success'
        }
    }).catch(err=>{
        ctx.body={
            code: 200,
            data: 'error'
        }
    })
})

router.post('/addAdmin',async(ctx)=>{
    // console.log('请求成功');
    // ctx.body='请求成功';

    // 获取model
    const Admin =mongoose.model('Admin');
    // 接收post请求封装成user对象
    let newAdmin =new Admin(ctx.request.body);
    // 使用save()保存用户信息
    await newAdmin.save()
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
    const Admin=mongoose.model('Admin')
    if(ctx.query.adminName!=''){
        var adminName=new RegExp(ctx.query.adminName);
        await Admin.find({adminName:adminName}).exec().then(res=>{
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
    }else if(ctx.query.adminNumber!=''){
        var adminNumber=new RegExp(ctx.query.adminNumber);
        await Admin.find({adminNumber:adminNumber}).exec().then(res=>{
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
        await Admin.find({}).exec().then(res=>{
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
    const Admin=mongoose.model('Admin');
    // console.log(ctx.request.body)
    await Admin.findOneAndUpdate({adminNumber:ctx.request.body.adminNumber},{
        adminName:ctx.request.body.adminName,
        sex:ctx.request.body.sex,
        IdCard:ctx.request.body.IdCard,
        political:ctx.request.body.political,
        phone:ctx.request.body.phone,
        position:ctx.request.body.position,
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
    const Admin=mongoose.model('Admin')
    await Admin.findOneAndRemove({adminNumber:ctx.request.body.adminNumber}).exec().then(res=>{
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
//修改密码
// router.post('/changepassword',async(ctx)=>{
//     console.log(ctx.request.body)
//     const type = ctx.request.body.type
//     if(type === '1'){
//         const Student = mongoose.model('Student')
//         await Student.findOneAndUpdate({studentNumber:ctx.request.body.number},{
//             password: ctx.request.body.pass
//         }).exec().then(res => {
//             if(res){
//                 ctx.body = {
//                     code: 20000,
//                     message: '修改成功'
//                 }
//             } else {
//                 ctx.body = {
//                     code: 50000,
//                     message: '密码错误，请重新输入'
//                 }
//             }
//         })
//     } else if(type === '2') {
//         const Teacher = mongoose.model('Teacher')
//         await Teacher.findOneAndUpdate({teacherNumber:ctx.request.body.number},{
//             password: ctx.request.body.pass
//         }).exec().then(res => {
//             if(res){
//                 ctx.body = {
//                     code: 20000,
//                     message: '修改成功'
//                 }
//             } else {
//                 ctx.body = {
//                     code: 50000,
//                     message: '密码错误，请重新输入'
//                 }
//             }
//         })
//     } else if(type === '3'){
//         const Admin = mongoose.model('Admin')
//         await Admin.findOneAndUpdate({adminNumber:ctx.request.body.number},{
//             password: ctx.request.body.pass
//         }).exec().then(res => {
//             if(res){
//                 ctx.body = {
//                     code: 20000,
//                     message: '修改成功'
//                 }
//             } else {
//                 ctx.body = {
//                     code: 50000,
//                     message: '密码错误，请重新输入'
//                 }
//             }
//         })
//     }
// })
router.get('/getuserinfo',async(ctx) => {
    let adminNumber=ctx.query.number.slice(0,ctx.query.number.length - 1);
    let adminpassword=ctx.query.password;
    let adminType=ctx.query.number.slice(ctx.query.number.length-1);
    // console.log(adminNumber)
    // console.log(adminpassword)
    // console.log(adminType)
    // console.log(loginAdmin);
    // console.log(ctx.request.body);
    if(adminType==='1'){
        const Student=mongoose.model('Student');
        await Student.findOne({studentNumber:adminNumber}).exec().then(async(res)=>{
            // console.log(res);
            if(res){
                let newStudent=new Student();
                await newStudent.comparePassword(adminpassword,res.password).then(isMatch=>{
                    // console.log(isMatch);
                    if(isMatch){
                        ctx.body = {
                            code: 20000,
                            flag:true,
                            data: res
                        }
                    }else{
                        ctx.body={
                            code: 201,
                            flag:false,
                            message: '密码错误',
                        }
                    }
                })
            }else{
                ctx.body={
                    code: 202,
                    flag:false,
                    message:'用户名不存在',
                }
            }
        })   
    }else if(adminType==='2'){
        // console.log('456789')
        const Teacher=mongoose.model('Teacher');
        await Teacher.findOne({teacherNumber:adminNumber}).exec().then(async(res)=>{
            // console.log(res);
            if(res){
                let newTeacher=new Teacher();
                await newTeacher.comparePassword(adminpassword,res.password).then(isMatch=>{
                    // console.log(res);
                    if(isMatch){
                        ctx.body={
                            code: 20000,
                            flag:true,
                            data: res
                        }
                    }else{
                        ctx.body={
                            code: 201,
                            flag:false,
                            message: '密码错误',
                        }
                    }
                })
            }else{
                ctx.body={
                    code: 202,
                    flag:false,
                    message:'用户名不存在2222',
                }
            }
        })
    }else if(adminType==='3'){
        // console.log('789123')
        const Admin=mongoose.model('Admin');
        await Admin.findOne({adminNumber:adminNumber}).exec().then(async(res)=>{
            // console.log(res);
            if(res){
                let newAdmin=new Admin();
                await newAdmin.comparePassword(adminpassword,res.password).then(isMatch=>{
                    // console.log(res);
                    if(isMatch){
                        ctx.body={
                            code: 20000,
                            flag:true,
                            data: res
                        }
                    }else{
                        ctx.body={
                            code: 201,
                            flag:false,
                            message: '密码错误',
                        }
                    }
                })
            }else{
                ctx.body={
                    code: 202,
                    flag:false,
                    message:'用户名不存在2222',
                }
            }
        })
    }
})

// router.get('/deleuser',async(ctx) => {
//     const type = ctx.query.number.slice(ctx.query.number.length-1)
//     let number = ctx.query.number.slice(0,ctx.query.number.length - 1)
//     if(type === '1'){
//         const Student = mongoose.model('Student')
//         await Student.findOneAndDelete({studentNumber: number}).exec().then(res => {
//             if(res){
//                 ctx.body = {
//                     code: 20000,
//                     flag: true,
//                     data: res
//                 }
//             } else {
//                 ctx.body ={
//                     code:50000,
//                     flag: false,
//                     message: '修改失败'
//                 }
//             }
//         })
//     } else if(type === '2') {
//         const Teacher = mongoose.model('Teacher')
//         await Teacher.findOneAndDelete({teacherNumber: number}).exec().then(res => {
//             if(res){
//                 ctx.body = {
//                     code: 20000,
//                     flag: true,
//                     data: res
//                 }
//             } else {
//                 ctx.body ={
//                     code:50000,
//                     flag: false,
//                     message: '修改失败'
//                 }
//             }
//         })
//     } else if(type === '3') {
//         const Admin = mongoose.model('Admin')
//         await Admin.findOneAndDelete({adminNumber: number}).exec().then(res => {
//             if(res){
//                 ctx.body = {
//                     code: 20000,
//                     flag: true,
//                     data: res
//                 }
//             } else {
//                 ctx.body ={
//                     code:50000,
//                     flag: false,
//                     message: '修改失败'
//                 }
//             }
//         })
//     }
// })

router.post('/changepassword',async(ctx) => {
    const type = ctx.request.body.type
    console.log(ctx.request.body)
    if(type === '1'){
        const Student = mongoose.model('Student')
        let newStudent = new Student(ctx.request.body)
        await Student.findOneAndDelete({studentNumber:ctx.request.body.studentNumber}).exec().then()
        await newStudent.save().then(res => {
            if(res){
                ctx.body = {
                    code: 20000,
                    message: '修改成功'
                }
            } else {
                ctx.body = {
                    code: 50000,
                    message: '修改失败'
                }
            }
        })
    } else if(type === '2') {
        const Teacher = mongoose.model('Teacher')
        let newTeacher = new Teacher(ctx.request.body)
        await Teacher.findOneAndDelete({teacherNumber:ctx.request.body.teacherNumber}).exec().then()
        await newTeacher.save().then(res => {
            if(res){
                ctx.body = {
                    code: 20000,
                    message: '修改成功'
                }
            } else {
                ctx.body = {
                    code: 50000,
                    message: '修改失败'
                }
            }
        })
        
    } else if(type === '3') {
        const Admin = mongoose.model('Admin')
        let newAdmin = new Admin(ctx.request.body)
        await Admin.findOneAndDelete({adminNumber:ctx.request.body.adminNumber}).exec().then()
        await newAdmin.save().then(res => {
            if(res){
                ctx.body = {
                    code: 20000,
                    message: '修改成功'
                }
            } else {
                ctx.body = {
                    code: 50000,
                    message: '修改失败'
                }
            }
        })
    }
})

module.exports=router;